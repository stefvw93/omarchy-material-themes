-- Periphery exposé, the Hyprland side. Loaded from ~/.config/hypr/hyprland.lua
-- before Omarchy's defaults (see README.md).
--
-- Hyprland binds are opaque (`hyprctl binds` shows only a Lua ref), so the
-- plugin can't look up which key closes a window. Instead this wraps the
-- actions themselves: every bind made after this file runs with
-- hl.dsp.window.close(), hl.dsp.window.fullscreen() or
-- hl.dsp.focus({ direction = ... }), on whatever key, first checks for a
-- selected card in the periphery. A workspace switch (hl.dsp.focus({
-- workspace = ... }), hl.dsp.window.move({ workspace = ... }) that follows)
-- goes through the plugin first, so it can fly it (routed switches).
--
-- The plugin drives the state below through hyprctl eval: periphery_open(),
-- periphery_select(address), periphery_close(). A config reload starts a
-- fresh Lua state; the plugin sends its state again on reload.

-- nil while the mode is off; while on: { bands = { l = bool, r = bool },
-- focus = { x0, x1, y0, y1 }, selected = "0x…" | nil, cursor = Vec2 | nil }.
-- bands: which bands have cards to move focus into. focus: the focus area,
-- in global pixels. cursor: where the pointer was when the card got selected.
periphery = nil

local window = hl.dsp.window
local close, fullscreen, focus, move, set_prop, tag = window.close, window.fullscreen, hl.dsp.focus, window.move, window.set_prop, window.tag

-- The plugin's IPC target. plugin-kit rewrites this line to the built id, so
-- a dev build (stef.periphery.dev) talks to its own copy of the plugin.
local PLUGIN_ID = "stef.periphery" -- plugin-kit:id

local function shell(args)
  hl.exec_cmd("omarchy-shell -q " .. PLUGIN_ID .. " " .. args)
end

-- A config gradient as a set_prop value. set_prop drops the first colour of
-- a gradient, so a dummy one goes first.
local function gradient(key)
  local g = hl.get_config(key)
  if type(g) ~= "table" then return "0x00000000 " .. tostring(g) end
  return "0x00000000 " .. table.concat(g.colors, " ") .. " " .. math.floor((g.angle or 0) + 0.5) .. "deg"
end

-- While a card is selected, the active window draws its border in the
-- inactive colour: the card has the focus, not the window.
local greyed = nil

local function set_border(address, value)
  pcall(hl.dispatch, set_prop({ window = "address:" .. address, prop = "active_border_color", value = value }))
end

local function sync_border()
  local active = periphery and periphery.selected and hl.get_active_window()
  local want = active and active.address or nil
  if greyed and greyed ~= want then
    set_border(greyed, gradient("general.col.active_border"))
    greyed = nil
  end
  if want and not greyed then
    set_border(want, gradient("general.col.inactive_border"))
    greyed = want
  end
end

-- Return and Escape belong to the card while one is selected, and are bound
-- only then: Return goes to the card's window, Escape lets go of the card.
local card_keys = nil

local function sync_keys()
  local want = periphery ~= nil and periphery.selected ~= nil
  if want and not card_keys then
    local go = function() shell("activate") end
    card_keys = {
      hl.bind("Return", go, { description = "Periphery: go to the selected card" }),
      hl.bind("KP_Enter", go, { description = "Periphery: go to the selected card" }),
      hl.bind("Escape", function()
        periphery_select(nil)
        shell("clear")
      end, { description = "Periphery: let go of the selected card" }),
    }
  elseif not want and card_keys then
    for _, key in ipairs(card_keys) do pcall(function() key:remove() end) end
    card_keys = nil
  end
end

-- Hyprland's IPC reports every tab of a tab group as visible; only the
-- group knows which one its tile shows. The plugin gets the shown tabs while
-- the mode is on, whenever they may have changed (a tab switch makes the new
-- tab active), and only when they did.
local tabs_sent = nil

local function report_tabs()
  if not periphery then return end
  local shown, seen = {}, {}
  for _, w in ipairs(hl.get_windows() or {}) do
    local current = w.group and w.group.size and w.group.size >= 2 and w.group.current
    if current and current.address and not seen[current.address] then
      seen[current.address] = true
      table.insert(shown, current.address)
    end
  end
  table.sort(shown)
  local list = table.concat(shown, " ")
  if list == tabs_sent then return end
  tabs_sent = list
  -- One quoted argument: the plugin's tabs() takes a single string, and
  -- omarchy-shell drops a call with more arguments (silently, with -q).
  -- Addresses are 0x and hex digits only, so the quotes are safe.
  shell("tabs '" .. (list == "" and "none" or list) .. "'")
end

for _, event in ipairs({ "window.active", "window.open", "window.close", "window.move_to_workspace" }) do
  hl.on(event, report_tabs)
end

-- The focus area is a workspace rule: the monitor's regular workspaces get
-- the bands as side gaps, special ones keep the full width. Reserved space
-- would narrow every workspace. One rule at a time, made again only when it
-- changes: a new rule re-tiles. periphery_focus_rule describes the rule in
-- force (workspace and gaps), nil without one.
local focus_rule = nil
periphery_focus_rule = nil

local function rule_key(rule)
  if not rule then return nil end
  local g = rule.gaps_out
  return table.concat({ rule.workspace, g.top, g.right, g.bottom, g.left }, " ")
end

local function apply_focus_rule(rule)
  local key = rule_key(rule)
  if key == periphery_focus_rule then return end
  if focus_rule then focus_rule:set_enabled(false) end
  focus_rule = rule and hl.workspace_rule(rule) or nil
  periphery_focus_rule = key
end

-- The focus area on Hyprland's event socket, for other plugins (the bar):
-- custom>>periphery>>x0,x1,monitor, or custom>>periphery>>off. Only changes;
-- periphery_announce() repeats the last one for a listener that starts late.
local announced = nil

local function announce(state)
  if state == announced then return end
  announced = state
  hl.dispatch(hl.dsp.event("periphery>>" .. state))
end

function periphery_announce()
  hl.dispatch(hl.dsp.event("periphery>>" .. (announced or "off")))
end

-- During a flight the plugin hides the floating windows of the other
-- workspaces with this tag: one reaching past the focus area would show in a
-- band, where the backdrop doesn't cover it, ahead of its ghost. A rule and
-- not set_prop, as the opacity prop has no unset. Made with the mode, after
-- the config, so it comes after Omarchy's default-opacity rule and wins.
local HIDE_TAG = "periphery-hide"
local hide_rule = nil

local function show_hidden()
  for _, w in ipairs(hl.get_windows() or {}) do
    pcall(hl.dispatch, tag({ window = "address:" .. w.address, tag = "-" .. HIDE_TAG }))
  end
end

-- The plugin's states come through separate hyprctl calls, which can arrive
-- out of order; the unload's close can't even share the plugin's queue.
-- Each state is numbered and only a newer one is taken. A reset (the first
-- state after the mode turns on) is taken whatever its number.
local last_state = nil

function periphery_state(seq, reset)
  if not reset and last_state and seq <= last_state then return false end
  last_state = seq
  return true
end

-- The theme's workspace animation, to write back when the mode turns off.
-- Kept here, for this Lua state (one config generation): the plugin reads
-- it at every mode-on, and a quick off and on read its own style before the
-- theme's was back. The first one is the theme's.
local theme_animation = nil

function periphery_keep_animation(restore)
  theme_animation = theme_animation or restore
end

-- Whether it had one to write back.
function periphery_restore_animation()
  if theme_animation then theme_animation() end
  return theme_animation ~= nil
end

function periphery_open(left, right, x0, x1, y0, y1, rule, monitor)
  periphery = periphery or {}
  hide_rule = hide_rule or hl.window_rule({ name = HIDE_TAG, match = { tag = HIDE_TAG }, opacity = "0 0 0" })
  periphery.bands = { l = left, r = right }
  periphery.focus = { x0 = x0, x1 = x1, y0 = y0, y1 = y1 }
  apply_focus_rule(rule)
  if monitor then announce(x0 .. "," .. x1 .. "," .. monitor) end
  report_tabs()
end

function periphery_select(address)
  if not periphery then return end
  if address ~= periphery.selected then
    periphery.selected = address
    periphery.cursor = address and hl.get_cursor_pos() or nil
  end
  sync_border()
  sync_keys()
end

function periphery_close()
  if periphery then periphery_select(nil) end
  apply_focus_rule(nil)
  if announced then announce("off") end
  -- The plugin shows them again after every flight; this covers one that
  -- died mid-flight, also before a config reload.
  show_hidden()
  periphery = nil
  tabs_sent = nil
end

-- A routed switch waits here under a token until the plugin has its
-- backdrop up and runs it (periphery_run), or for ROUTE_TIMEOUT_MS when the
-- plugin doesn't answer: the key always switches.
local ROUTE_TIMEOUT_MS = 150
local routes, last_token = {}, 0

function periphery_run(token)
  local native = routes[token]
  routes[token] = nil
  if native then hl.dispatch(native) end
end

local function routed(native)
  return function()
    if not periphery then return hl.dispatch(native) end
    last_token = last_token + 1
    local token = last_token
    routes[token] = native
    shell("route " .. token)
    hl.timer(function() periphery_run(token) end, { timeout = ROUTE_TIMEOUT_MS, type = "oneshot" })
  end
end

local function special(workspace)
  return string.sub(tostring(workspace), 1, 7) == "special"
end

local function selected()
  return periphery and periphery.selected
end

local function with_window(args, address)
  local copy = {}
  if type(args) == "table" then for k, v in pairs(args) do copy[k] = v end end
  copy.window = "address:" .. address
  return copy
end

-- A call that names its window keeps the native action.
local function targeted(args)
  return type(args) == "table" and args.window ~= nil
end

window.close = function(args)
  local native = close(args)
  if targeted(args) then return native end
  return function()
    local address = selected()
    if address then hl.dispatch(close({ window = "address:" .. address }))
    else hl.dispatch(native) end
  end
end

-- On a card: go to its window (Hyprland switches to its workspace), then
-- fullscreen it there.
window.fullscreen = function(args)
  local native = fullscreen(args)
  if targeted(args) then return native end
  return function()
    local address = selected()
    if not address then return hl.dispatch(native) end
    periphery_select(nil)
    hl.dispatch(focus({ window = "address:" .. address }))
    hl.dispatch(fullscreen(with_window(args, address)))
  end
end

-- A move that follows its window switches workspace: routed.
window.move = function(args)
  local native = move(args)
  if type(args) ~= "table" or args.workspace == nil or targeted(args) or args.follow == false
    or special(args.workspace) then
    return native
  end
  return routed(native)
end

-- Whether the active window has no tiled window beyond it towards `dir`
-- ("l" or "r") on its workspace. Hyprland's focus wraps round at the edge,
-- so whether focus moved can't tell.
local function at_edge(dir)
  local active = hl.get_active_window()
  if not active or not active.workspace then return true end
  local function left(w) return w.at.x or w.at[1] end
  local function right(w) return left(w) + (w.size.x or w.size[1]) end
  for _, w in ipairs(active.workspace:get_windows()) do
    if w.address ~= active.address and w.mapped and not w.hidden and not w.floating then
      if dir == "l" and left(w) < left(active) - 2 then return false end
      if dir == "r" and right(w) > right(active) + 2 then return false end
    end
  end
  return true
end

-- Focus moves on into the bands: past the left or right edge of the focus
-- area it selects a card, and on a card it moves between cards (the plugin
-- knows the layout).
hl.dsp.focus = function(args)
  local native = focus(args)
  if type(args) == "table" and args.workspace ~= nil and not targeted(args) and not special(args.workspace) then
    return routed(native)
  end
  local dir = type(args) == "table" and args.direction
  if not dir then return native end
  dir = string.sub(tostring(dir), 1, 1)
  return function()
    if not periphery then return hl.dispatch(native) end
    if periphery.selected then return shell("step " .. dir) end
    -- A special workspace (the scratchpad) tiles at full width over the
    -- bands: its windows keep Hyprland's focus.
    local active = hl.get_active_window()
    if active and active.workspace and active.workspace.special then return hl.dispatch(native) end
    if periphery.bands and periphery.bands[dir] and at_edge(dir) then
      -- The active window goes along: the plugin's view of it can lag.
      return shell("enter " .. dir .. " " .. (active and active.address or "none"))
    end
    hl.dispatch(native)
  end
end

-- Pointer motion over the focus area reaches neither the plugin (its surface
-- takes input in the bands only) nor a Hyprland event. While a card is
-- selected, this watches the cursor: once it moves over the focus area, the
-- windows there get the focus back (latest input wins; a pointer resting in
-- the focus area during a keyboard selection doesn't count).
hl.timer(function()
  local from = periphery and periphery.selected and periphery.cursor
  local f = periphery and periphery.focus
  if not from or not f then return end
  local p = hl.get_cursor_pos()
  if not p or math.abs(p.x - from.x) + math.abs(p.y - from.y) < 4 then return end
  if p.x <= f.x0 or p.x >= f.x1 or p.y < f.y0 or p.y >= f.y1 then return end
  periphery_select(nil)
  shell("clear")
end, { timeout = 50, type = "repeat" })
