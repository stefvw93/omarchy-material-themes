#!/usr/bin/env bash
# Fast switching between two workspaces, before flights settle: <rounds> of
# <switches> routed switches, <min>-<max> ms apart, grabbing a frame at each.
# After every round it settles, prints the leftovers and how many pixels
# changed between a settled frame and one a second later (only the clock,
# the cursor and live window content should).
#   monkey.sh <outdir> [rounds=3] [switches=12] [min=30] [max=300]
set -u
. "$(dirname "$0")/lib.sh"
out=$1; rounds=${2:-3}; switches=${3:-12}; min=${4:-30}; max=${5:-300}
mkdir -p "$out"; rm -f "$out"/*.png

[ "$(mode_on)" = true ] || { echo "turn the mode on first"; exit 1; }
home=$(active_ws); away=$(other_ws "$home")
[ -n "$away" ] || { echo "no other occupied workspace on this monitor"; exit 1; }

for r in $(seq "$rounds"); do
  ws=$home
  for k in $(seq "$switches"); do
    ws=$([ "$ws" = "$home" ] && echo "$away" || echo "$home")
    switch_to "$ws"
    grim -s 0.3 "$out/r${r}_$(printf %02d "$k").png" 2>/dev/null &
    sleep_ms $(( (RANDOM % (max - min + 1)) + min ))
  done; wait
  [ "$ws" = "$home" ] || switch_to "$home"
  sleep 2; grim -s 0.3 "$out/r${r}_settled.png"; sleep 1; grim -s 0.3 "$out/r${r}_later.png"
  diff=$(magick compare -metric AE -fuzz 3% "$out/r${r}_settled.png" "$out/r${r}_later.png" null: 2>&1)
  echo "round $r: $(leftovers) settled-vs-later-px=$diff"
  grid "$out/r${r}_grid.png" 4 "$out"/r"${r}"_[0-9][0-9].png
done
echo "grids: $out/r*_grid.png"
