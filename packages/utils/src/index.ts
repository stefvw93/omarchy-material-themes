import {
  argbFromHex,
  hexFromArgb,
  Hct,
  MaterialDynamicColors,
  DynamicScheme,
} from "@material/material-color-utilities";

export function main() {
  const scheme = new DynamicScheme({
    sourceColorHct: Hct.fromInt(argbFromHex("#f82506")),
    isDark: true,
    variant: 0,
    contrastLevel: 0,
  });

  const colors = new MaterialDynamicColors();
  const surfaceContainerLowest = hexFromArgb(colors.surfaceContainerLowest().getArgb(scheme));
  const surfaceContainer = hexFromArgb(colors.surfaceContainer().getArgb(scheme));
  const primaryFixedDim = hexFromArgb(colors.primaryFixedDim().getArgb(scheme));
  console.log(
    JSON.stringify({ surfaceContainerLowest, surfaceContainer, primaryFixedDim }, null, 2),
  );
}
