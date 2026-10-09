import { useState } from "react";
import { springStep, type Spring } from "@stef/motion";

export interface ChartSeries {
  readonly name: string;
  readonly spring: Spring;
  /** CSS colour, from the --series-* tokens: colour follows the spring, not its rank. */
  readonly color: string;
}

const W = 520;
const H = 220;
const M = { top: 12, right: 16, bottom: 28, left: 40 };
const plotW = W - M.left - M.right;
const plotH = H - M.top - M.bottom;

/**
 * Step responses over time: one 2px line per spring, a recessive grid, a
 * direct label at each line's end, and a crosshair with every series' value
 * under the pointer.
 */
export const SpringChart = ({
  title,
  series,
  durationMs,
}: {
  readonly title: string;
  readonly series: ReadonlyArray<ChartSeries>;
  readonly durationMs: number;
}) => {
  const [hoverMs, setHoverMs] = useState<number | undefined>(undefined);
  const samples = 120;
  const curves = series.map((s) =>
    Array.from({ length: samples + 1 }, (_, i) => {
      const ms = (durationMs * i) / samples;
      return { ms, value: springStep(ms, s.spring) };
    }),
  );
  const peak = Math.max(1, ...curves.flat().map((p) => p.value));
  const yMax = Math.ceil(peak * 10) / 10;
  const x = (ms: number) => M.left + (ms / durationMs) * plotW;
  const y = (v: number) => M.top + plotH - (v / yMax) * plotH;
  // Round steps (50, 100, 200, 250 ms…) with at most five intervals.
  const xStep = [25, 50, 100, 200, 250, 500, 1000].find((step) => durationMs / step <= 5) ?? 2000;
  const xTicks = Array.from({ length: Math.floor(durationMs / xStep) + 1 }, (_, i) => i * xStep);
  const yTicks = [0, 0.5, 1, ...(yMax > 1 ? [yMax] : [])];

  // Every curve ends at 1, so labels at the line ends would stack. Label each
  // curve where they are furthest apart: the sample whose smallest gap
  // between adjacent curves is largest, right of the curve's point there.
  let labelAt = 0;
  let bestGap = -1;
  for (let i = 1; i < samples; i++) {
    const values = curves.map((c) => c[i]!.value).sort((a, b) => a - b);
    const gap = Math.min(...values.slice(1).map((v, j) => v - values[j]!));
    if (gap > bestGap) {
      bestGap = gap;
      labelAt = i;
    }
  }
  const labels = series
    .map((s, i) => {
      const point = curves[i]![labelAt]!;
      return { s, x: x(point.ms) + 8, y: y(point.value) };
    })
    .sort((a, b) => a.y - b.y);
  for (let i = 1; i < labels.length; i++) {
    if (labels[i]!.y - labels[i - 1]!.y < 12) labels[i]!.y = labels[i - 1]!.y + 12;
  }

  return (
    <figure className="flex flex-col gap-1">
      <figcaption className="text-sm font-medium">{title}</figcaption>
      <div className="flex gap-3 text-xs text-muted-foreground" aria-hidden>
        {series.map((s) => (
          <span key={s.name} className="flex items-center gap-1">
            <span className="inline-block w-3 h-0.5 rounded" style={{ background: s.color }} />
            {s.name}
          </span>
        ))}
      </div>
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={`${title}: step response of ${series.map((s) => s.name).join(", ")} over ${durationMs} ms`}
          onPointerMove={(event) => {
            const box = event.currentTarget.getBoundingClientRect();
            const px = ((event.clientX - box.left) / box.width) * W;
            const ms = ((px - M.left) / plotW) * durationMs;
            setHoverMs(ms >= 0 && ms <= durationMs ? ms : undefined);
          }}
          onPointerLeave={() => setHoverMs(undefined)}
        >
          {yTicks.map((t) => (
            <g key={`y${t}`}>
              <line
                x1={M.left}
                x2={M.left + plotW}
                y1={y(t)}
                y2={y(t)}
                stroke="var(--border)"
                strokeWidth={1}
              />
              <text
                x={M.left - 6}
                y={y(t)}
                dy="0.32em"
                textAnchor="end"
                className="fill-muted-foreground text-[10px]"
              >
                {t}
              </text>
            </g>
          ))}
          {xTicks.map((t) => (
            <text
              key={`x${t}`}
              x={x(t)}
              y={H - 8}
              textAnchor={x(t) > M.left + plotW - 20 ? "end" : "middle"}
              className="fill-muted-foreground text-[10px]"
            >
              {t} ms
            </text>
          ))}
          {series.map((s, i) => (
            <polyline
              key={s.name}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
              points={curves[i]!.map((p) => `${x(p.ms)},${y(p.value)}`).join(" ")}
            />
          ))}
          {labels.map(({ s, x: lx, y: ly }) => (
            <text
              key={s.name}
              x={lx}
              y={ly}
              dy="0.32em"
              className="fill-foreground text-[10px]"
              stroke="var(--card)"
              strokeWidth={3}
              paintOrder="stroke"
            >
              {s.name}
            </text>
          ))}
          {hoverMs !== undefined && (
            <g pointerEvents="none">
              <line
                x1={x(hoverMs)}
                x2={x(hoverMs)}
                y1={M.top}
                y2={M.top + plotH}
                stroke="var(--muted-foreground)"
                strokeWidth={1}
              />
              {series.map((s) => (
                <circle
                  key={s.name}
                  cx={x(hoverMs)}
                  cy={y(springStep(hoverMs, s.spring))}
                  r={4}
                  fill={s.color}
                  stroke="var(--card)"
                  strokeWidth={2}
                />
              ))}
            </g>
          )}
        </svg>
        {hoverMs !== undefined && (
          <div
            className="absolute top-1 pointer-events-none rounded-md border bg-popover px-2 py-1 text-xs shadow-sm"
            style={{ left: `${(x(hoverMs) / W) * 100}%`, transform: "translateX(8px)" }}
          >
            <div className="text-muted-foreground">{Math.round(hoverMs)} ms</div>
            {series.map((s) => (
              <div key={s.name} className="flex items-center gap-1">
                <span
                  className="inline-block size-2 rounded-full"
                  style={{ background: s.color }}
                />
                {s.name} {springStep(hoverMs, s.spring).toFixed(3)}
              </div>
            ))}
          </div>
        )}
      </div>
    </figure>
  );
};
