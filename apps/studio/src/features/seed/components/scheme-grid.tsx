import type { StaticColors, SystemColors } from "@stef/theme-engine";
import { type FC } from "react";
import { Tile } from "./colors-grid";

type Role = keyof SystemColors;

/** A role painted in its colour, labelled in the colour drawn on it. */
interface Swatch {
  readonly role: Role;
  readonly on: Role;
  /** A shorter label, where the row already names the role's family. */
  readonly label?: string;
}

const swatch = (role: Role, on: Role, label?: string): Swatch => ({ role, on, label });

const ACCENTS = ["primary", "secondary", "tertiary", "error"] as const;

const FIXED = ["primary", "secondary", "tertiary"] as const;

const SURFACES: ReadonlyArray<Swatch> = [
  swatch("surface-dim", "on-surface"),
  swatch("surface", "on-surface"),
  swatch("surface-bright", "on-surface"),
];

const SURFACE_CONTAINERS: ReadonlyArray<Swatch> = [
  swatch("surface-container-lowest", "on-surface", "lowest"),
  swatch("surface-container-low", "on-surface", "low"),
  swatch("surface-container", "on-surface", "container"),
  swatch("surface-container-high", "on-surface", "high"),
  swatch("surface-container-highest", "on-surface", "highest"),
];

const SURFACE_CONTENT: ReadonlyArray<Swatch> = [
  swatch("on-surface", "surface"),
  swatch("on-surface-variant", "surface"),
  swatch("outline", "surface"),
  swatch("outline-variant", "on-surface"),
];

const INVERSE_AND_UTILITY: ReadonlyArray<Swatch> = [
  swatch("inverse-surface", "inverse-on-surface"),
  swatch("inverse-on-surface", "inverse-surface"),
  swatch("inverse-primary", "on-primary-container"),
  swatch("scrim", "on-surface"),
  swatch("shadow", "on-surface"),
];

const STATIC_HUES = ["yellow", "orange", "green", "cyan", "blue", "magenta"] as const;

/**
 * The generated md.sys.color roles, grouped as in the spec's colour roles
 * (accents, fixed accents, surfaces), and the static colours' four roles.
 */
export const SchemeGrid: FC<{
  readonly system?: SystemColors;
  readonly statics?: StaticColors;
}> = ({ system, statics }) => {
  const tiles = (swatches: ReadonlyArray<Swatch>, className: string) =>
    swatches.map(({ role, on, label }) => (
      <Tile
        key={role}
        label={label ?? role}
        title={role}
        color={system?.[role]}
        textColor={system?.[on]}
        className={className}
      />
    ));

  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-4 gap-1">
        {ACCENTS.map((name) => (
          <div key={name} className="flex flex-col">
            {tiles(
              [
                swatch(name, `on-${name}`),
                swatch(`on-${name}`, name),
                swatch(`${name}-container`, `on-${name}-container`, "container"),
                swatch(`on-${name}-container`, `${name}-container`, "on-container"),
              ],
              "h-7",
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1">
        {FIXED.map((name) => (
          <div key={name} className="flex flex-col">
            {tiles(
              [
                swatch(`${name}-fixed`, `on-${name}-fixed`),
                swatch(`${name}-fixed-dim`, `on-${name}-fixed`),
                swatch(`on-${name}-fixed`, `${name}-fixed`),
                swatch(`on-${name}-fixed-variant`, `${name}-fixed-dim`),
              ],
              "h-7",
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1">{tiles(SURFACES, "h-10")}</div>
      <div className="grid grid-cols-5 gap-1">{tiles(SURFACE_CONTAINERS, "h-10")}</div>
      <div className="grid grid-cols-4 gap-1">{tiles(SURFACE_CONTENT, "h-7")}</div>
      <div className="grid grid-cols-[3fr_3fr_3fr_2fr_2fr] gap-1">
        {tiles(INVERSE_AND_UTILITY, "h-7")}
      </div>

      <div className="grid grid-cols-6 gap-1">
        {STATIC_HUES.map((hue) => {
          const c = statics?.[hue];
          const tile = (label: string, color?: string, textColor?: string) => (
            <Tile
              label={label}
              title={`${hue} ${label}`}
              color={color}
              textColor={textColor}
              className="h-7"
            />
          );
          return (
            <div key={hue} className="flex flex-col">
              {tile(hue, c?.color, c?.onColor)}
              {tile(`on-${hue}`, c?.onColor, c?.color)}
              {tile("container", c?.colorContainer, c?.onColorContainer)}
              {tile("on-container", c?.onColorContainer, c?.colorContainer)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
