import { Skeleton } from "@/components/ui/skeleton";
import type { OmarchyColors } from "@/features/material/colors";
import type { FC } from "react";

export const ColorsGrid: FC<{ readonly omarchyColors?: OmarchyColors }> = ({ omarchyColors }) => {
  if (!omarchyColors) return Array.from({ length: 25 }).map((_, index) => <Tile key={index} />);

  return Object.entries(omarchyColors).map(([unsafeKey, value], index) => {
    const key = unsafeKey as keyof OmarchyColors;
    let textColor: string;

    if (
      key === "accent" ||
      key === "selection" ||
      key === "muted" ||
      key === "foreground" ||
      key === "dark_foreground" ||
      key === "light_foreground" ||
      key === "bright_foreground" ||
      (index >= 10 && index <= 12)
    ) {
      textColor = omarchyColors.background;
    } else {
      textColor = omarchyColors.foreground;
    }

    return key === "mode" ? null : (
      <Tile key={key} label={key} color={value} textColor={textColor} />
    );
  });
};

const Tile: FC<{
  readonly color?: string;
  readonly textColor?: string;
  readonly label?: string;
}> = ({ color, textColor, label }) => {
  if (!color) return <Skeleton className="aspect-square" />;

  return (
    <div style={{ backgroundColor: color }} className="aspect-square py-1 px-0.5 leading-0">
      <span className="text-[.5rem]" style={{ color: textColor }}>
        {label}
      </span>
    </div>
  );
};
