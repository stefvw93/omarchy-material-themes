#!/usr/bin/env bash
# One flight as a frame grid: switches to the other occupied workspace,
# settles, then switches back (optionally away again after --back-after ms,
# mid-flight) while grabbing frames every ~35 ms. Ends on the workspace it
# started on, with the mode as it found it, and prints the leftovers.
#   frames.sh <outdir> [--back-after <ms>]
set -u
. "$(dirname "$0")/lib.sh"
out=$1; mkdir -p "$out"; rm -f "$out"/*.png
back_after=${3:-}

was_on=$(mode_on)
[ "$was_on" = true ] || { omarchy-shell shell toggle stef.periphery '{}'; sleep 2.5; }
home=$(active_ws); away=$(other_ws "$home")
[ -n "$away" ] || { echo "no other occupied workspace on this monitor"; exit 1; }

switch_to "$away"; sleep 1.5
grim -s 0.4 "$out/f00.png"
switch_to "$home"
[ -n "$back_after" ] && { sleep_ms "$back_after"; switch_to "$away"; sleep_ms "$back_after"; switch_to "$home"; }
for i in 01 02 03 04 05 06 07 08 09 10 11; do grim -s 0.4 "$out/f$i.png" & sleep 0.035; done; wait
sleep 1.5; grim -s 0.4 "$out/f99.png"

grid "$out/grid.png" 3 "$out"/f00.png "$out"/f01.png "$out"/f02.png "$out"/f03.png "$out"/f04.png "$out"/f05.png "$out"/f07.png "$out"/f09.png "$out"/f99.png
leftovers
[ "$(active_ws)" = "$home" ] || switch_to "$home"
[ "$was_on" = true ] || omarchy-shell shell toggle stef.periphery '{}'
echo "grid: $out/grid.png (first frame settled away, last settled home)"
