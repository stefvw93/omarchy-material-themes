// The token sets @stef/m3 generates: every system set, and the component sets
// the engine maps something onto (Omarchy shell sections, Studio components,
// the plugins). Where the spec has an M3 Expressive set and a "(baseline)"
// predecessor, the Expressive one is listed; deprecated sets are rejected by
// the generator.

export const systemSets = [
  "md.ref.typeface",
  "md.sys.color",
  "md.sys.elevation",
  "md.sys.measurement",
  "md.sys.motion",
  "md.sys.shape",
  "md.sys.state",
  "md.sys.state.focus-indicator",
  "md.sys.typescale",
  "md.sys.typescale.emphasized",
] as const;

export const componentSets = {
  /** Omarchy bar. */
  appBar: ["md.comp.app-bar", "md.comp.app-bar.small"],
  /** Bar modules calling attention to themselves. */
  badge: ["md.comp.badge"],
  button: [
    "md.comp.button.filled",
    "md.comp.button.tonal",
    "md.comp.button.outlined",
    "md.comp.button.text",
    "md.comp.button.elevated",
    "md.comp.button.xsmall",
    "md.comp.button.small",
    "md.comp.button.medium",
  ],
  iconButton: [
    "md.comp.icon-button.standard",
    "md.comp.icon-button.filled",
    "md.comp.icon-button.tonal",
    "md.comp.icon-button.outlined",
    "md.comp.icon-button.xsmall",
    "md.comp.icon-button.small",
    "md.comp.icon-button.medium",
  ],
  /** Omarchy popups (bar flyouts), Studio select popups. */
  menus: ["md.comp.menus", "md.comp.menus.standard"],
  tooltip: ["md.comp.plain-tooltip"],
  /** Omarchy notifications (elevated), Studio cards, expo tiles (filled). */
  card: ["md.comp.elevated-card", "md.comp.filled-card", "md.comp.outlined-card"],
  /** Omarchy polkit. */
  dialog: ["md.comp.dialog"],
  /** Omarchy menu and launcher. */
  search: ["md.comp.search-view"],
  /** Omarchy lock (filled), Studio inputs and selects (outlined). */
  textField: [
    "md.comp.filled-text-field",
    "md.comp.outlined-text-field",
    "md.comp.outlined-select",
  ],
  list: ["md.comp.list"],
  tabs: ["md.comp.primary-navigation-tab", "md.comp.secondary-navigation-tab"],
  divider: ["md.comp.divider"],
  slider: ["md.comp.slider", "md.comp.slider.xsmall", "md.comp.slider.small"],
  switch: ["md.comp.switch"],
  progress: [
    "md.comp.progress-indicator",
    "md.comp.progress-indicator.circular",
    "md.comp.progress-indicator.linear",
  ],
  datePicker: ["md.comp.date-picker.docked"],
} as const;
