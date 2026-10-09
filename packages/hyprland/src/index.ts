export { eventArgs, type HyprEvent, parseEvent, structuralEvents } from "./events.ts";
export * from "./schema.ts";
export {
  Hyprland,
  HyprlandError,
  type HyprlandImpl,
  type HyprlandTransport,
  makeHyprland,
} from "./service.ts";
export { fixtureTransport, type HyprlandFixture } from "./testing.ts";
