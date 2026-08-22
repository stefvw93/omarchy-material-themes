import { Skeleton } from "@/components/ui/skeleton";
import type { OmarchyColors } from "@/features/material/colors";
import { cn } from "@/lib/utils";
import { Hct, argbFromHex, hexFromArgb, Contrast } from "@material/material-color-utilities";
import { useMemo, type FC } from "react";

const BACKGROUND_COLOR_KEYS = [
  "background",
  "dark_background",
  "darker_background",
  "lighter_background",
] as const;

const FOREGROUND_COLOR_KEYS = [
  "foreground",
  "dark_foreground",
  "light_foreground",
  "bright_foreground",
] as const;

const BASE_COLOR_KEYS = ["red", "yellow", "orange", "green", "cyan", "blue", "magenta"] as const;

const BASE_COLOR_BRIGHT_KEYS = [
  "bright_red",
  "bright_yellow",
  "brown",
  "bright_green",
  "bright_cyan",
  "bright_blue",
  "bright_magenta",
] as const;

export const ColorsGrid: FC<{ readonly omarchyColors?: OmarchyColors }> = ({ omarchyColors }) => {
  const accentForeground = useMemo(() => {
    if (!omarchyColors) return undefined;
    const hct = Hct.fromInt(argbFromHex(omarchyColors.accent));
    const contrast =
      hct.tone < 50 ? Contrast.lighterUnsafe(hct.tone, 10) : Contrast.darkerUnsafe(hct.tone, 10);
    return hexFromArgb(contrast);
  }, [omarchyColors]);

  return (
    <div className="flex flex-col gap-1">
      <div>
        <Tile
          label="accent"
          color={omarchyColors?.accent}
          textColor={accentForeground}
          className="aspect-12/1"
        />
      </div>

      <div className="grid grid-cols-4 gap-1">
        {BACKGROUND_COLOR_KEYS.map((key) => (
          <Tile
            key={key}
            label={key}
            color={omarchyColors?.[key]}
            textColor={omarchyColors?.foreground}
            className="aspect-4/1"
          />
        ))}
      </div>

      <div className="grid grid-cols-4 gap-1">
        {FOREGROUND_COLOR_KEYS.map((key) => (
          <Tile
            key={key}
            label={key}
            color={omarchyColors?.[key]}
            textColor={omarchyColors?.background}
            className="aspect-4/1"
          />
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {BASE_COLOR_KEYS.map((key) => (
          <Tile
            key={key}
            label={key}
            color={omarchyColors?.[key]}
            textColor={omarchyColors?.darker_background}
            className="aspect-2/1"
          />
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {BASE_COLOR_BRIGHT_KEYS.map((key) => (
          <Tile
            key={key}
            label={key}
            color={omarchyColors?.[key]}
            textColor={omarchyColors?.darker_background}
            className="aspect-2/1"
          />
        ))}
      </div>
    </div>
  );
};

const Tile: FC<{
  readonly color?: string;
  readonly textColor?: string;
  readonly label?: string;
  readonly className?: string;
}> = ({ color, textColor, label, className }) => {
  if (!color) return <Skeleton className={cn(className)} />;

  return (
    <div
      style={{ backgroundColor: color }}
      className={cn(className, "py-1 px-0.5 leading-0.5 @container-normal")}
    >
      <p style={{ color: textColor, fontSize: ".65cqi" }}>{label}</p>
    </div>
  );
};
