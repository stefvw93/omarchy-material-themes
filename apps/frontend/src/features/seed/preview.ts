import { hexFromArgb } from "@material/material-color-utilities";
import type { OmarchyColors } from "@/features/material/colors";

/**
 * Maps generated `OmarchyColors` onto the shadcn CSS variables declared in `style.css`.
 *
 * `style.css` declares `--background`, `--primary`, … on `:root` / `.dark`, and the
 * `@theme inline` block makes Tailwind utilities like `bg-background` resolve to
 * `var(--background)` at use time. So previewing only requires overriding those
 * variables as inline styles on `<html>`, which beat both `:root` and `.dark`.
 */
const toShadcnVariables = (c: OmarchyColors): Record<string, string> => {
  const hex = (argb: number) => hexFromArgb(argb);

  return {
    "--background": hex(c.omaterial_surface),
    "--foreground": hex(c.omaterial_onSurface),

    "--card": hex(c.omaterial_surfaceContainerLow),
    "--card-foreground": hex(c.omaterial_onSurface),

    "--popover": hex(c.omaterial_surfaceContainer),
    "--popover-foreground": hex(c.omaterial_onSurface),

    "--primary": hex(c.omaterial_primary),
    "--primary-foreground": hex(c.omaterial_onPrimary),

    "--secondary": hex(c.omaterial_secondaryContainer),
    "--secondary-foreground": hex(c.omaterial_onSecondaryContainer),

    "--muted": hex(c.omaterial_surfaceContainerHigh),
    "--muted-foreground": hex(c.omaterial_onSurfaceVariant),

    "--accent": hex(c.omaterial_surfaceContainerHighest),
    "--accent-foreground": hex(c.omaterial_onSurface),

    "--destructive": hex(c.omaterial_error),

    "--border": hex(c.omaterial_outlineVariant),
    "--input": hex(c.omaterial_outlineVariant),
    "--ring": hex(c.omaterial_primary),

    "--chart-1": c.blue,
    "--chart-2": c.green,
    "--chart-3": c.yellow,
    "--chart-4": c.red,
    "--chart-5": c.magenta,

    "--sidebar": hex(c.omaterial_surfaceContainerLow),
    "--sidebar-foreground": hex(c.omaterial_onSurface),
    "--sidebar-primary": hex(c.omaterial_primary),
    "--sidebar-primary-foreground": hex(c.omaterial_onPrimary),
    "--sidebar-accent": hex(c.omaterial_surfaceContainerHighest),
    "--sidebar-accent-foreground": hex(c.omaterial_onSurface),
    "--sidebar-border": hex(c.omaterial_outlineVariant),
    "--sidebar-ring": hex(c.omaterial_primary),
  };
};

/** Apply the generated colours to the app itself. Returns a function that restores the defaults. */
export const applyPreviewColors = (colors: OmarchyColors): (() => void) => {
  const root = document.documentElement;
  const variables = toShadcnVariables(colors);

  for (const [name, value] of Object.entries(variables)) {
    root.style.setProperty(name, value);
  }

  return () => {
    for (const name of Object.keys(variables)) {
      root.style.removeProperty(name);
    }
  };
};
