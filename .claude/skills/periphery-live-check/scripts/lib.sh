# Shared by frames.sh and monkey.sh. Source it; needs hyprctl, jq, grim, magick.

mode_on() { hyprctl eval 'error(tostring(periphery ~= nil))' 2>&1 | grep -o 'true\|false'; }
active_ws() { hyprctl activeworkspace -j | jq .id; }
# A routed switch, as the workspace keys make it: through the hook's wrapper.
switch_to() { hyprctl dispatch "hl.dsp.focus({ workspace = \"$1\" })" >/dev/null; }
# The other occupied regular workspace on the focused monitor, or nothing.
other_ws() {
  local mon; mon=$(hyprctl monitors -j | jq '.[] | select(.focused) | .id')
  hyprctl clients -j | jq -r --argjson m "$mon" --argjson cur "$1" \
    '[.[] | select(.monitor == $m and .workspace.id > 0 and .workspace.id != $cur) | .workspace.id] | first // empty'
}
# Everything a flight changes and must give back, one line.
leftovers() {
  local tagged floats anim
  tagged=$(hyprctl clients -j | jq '[.[] | select(.tags | index("periphery-hide"))] | length')
  floats=$(for a in $(hyprctl clients -j | jq -r '.[] | select(.floating) | .address'); do
    printf '%s:%s/%s ' "$a" "$(hyprctl getprop "address:$a" opacity)" "$(hyprctl getprop "address:$a" no_shadow)"; done)
  anim=$(hyprctl animations -j | jq -c '.[0][] | select(.name=="workspaces") | [.enabled,.style]')
  echo "ws=$(active_ws) tagged=$tagged floats(opacity/no_shadow)=[${floats% }] workspaces-anim=$anim"
}
# Sleeps a whole number of milliseconds (no bc here).
sleep_ms() { sleep "$(printf '%d.%03d' $(($1 / 1000)) $(($1 % 1000)))"; }
# Tiles PNGs into rows of n: grid <out> <n> <files...>
grid() {
  local out=$1 n=$2; shift 2
  local rows=() row=()
  for f in "$@"; do row+=("$f"); if [ ${#row[@]} -eq "$n" ]; then rows+=("( ${row[*]} +append )"); row=(); fi; done
  [ ${#row[@]} -gt 0 ] && rows+=("( ${row[*]} +append )")
  # shellcheck disable=SC2068
  magick ${rows[@]} -append "$out"
}
