// Shared by smoke.ts and stress.ts: reading back what a flight changes.
import { execFileSync } from "node:child_process";
import { Effect } from "effect";

export const hyprctl = (...args: string[]) =>
  Effect.sync(() => execFileSync("hyprctl", args, { encoding: "utf8" }).trim());

// What a flight changes and must give back: every floating window's
// no_shadow, and Hyprland's workspace animation.
export const leftovers = (floating: readonly string[]) =>
  Effect.all({
    shadows: Effect.forEach(floating, (a) => hyprctl("getprop", `address:${a}`, "no_shadow")),
    animation: Effect.map(hyprctl("animations", "-j"), (text) => {
      const lists = JSON.parse(text) as unknown[];
      const all = (Array.isArray(lists[0]) ? lists[0] : lists) as { name: string }[];
      return JSON.stringify(all.find((a) => a.name === "workspaces"));
    }),
  });

// Windows still hidden by a flight (the hook's periphery-hide tag).
export const hiddenCount = `(function() local n = 0
  for _, w in ipairs(hl.get_windows() or {}) do
    if tostring(type(w.tags) == "table" and table.concat(w.tags, " ") or w.tags):find("periphery%-hide") then n = n + 1 end
  end
  return tostring(n) end)()`;
