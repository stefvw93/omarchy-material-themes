import { Cause, Effect, Schema } from "effect";
import { Task } from "@wych/react";
import { Hyprland } from "@stef/hyprland";
import { readTokens, writeTokens } from "@stef/omarchy";
import { cssVariables, hyprlandTokensLua, type Tokens, TokensSchema } from "@stef/tokens";
import { setTypeScale } from "@/m3/text-scale";

/** Studio's own CSS follows the tokens, so its UI moves like the desktop. */
const applyCss = (tokens: Tokens) =>
  Effect.sync(() => {
    for (const [name, value] of Object.entries(cssVariables(tokens))) {
      document.documentElement.style.setProperty(name, value);
    }
    setTypeScale(tokens.type.scale);
  });

export const LoadTokens = Task("LoadTokens", {
  success: TokensSchema,
  onError: (cause) => String(Cause.squash(cause)),
  run: () => Effect.tap(readTokens, applyCss),
});

/**
 * Debounced by the take-latest default: a new edit interrupts the sleep.
 * tokens.json reaches running plugins on its own (Tokens.qml watches it);
 * Hyprland gets the generated Lua through `hyprctl eval`, which lasts until
 * the next config reload. Applying a theme renders the tokens into it.
 */
export const SaveTokens = Task("SaveTokens", {
  success: Schema.Void,
  onError: (cause) => String(Cause.squash(cause)),
  run: (input: { readonly tokens: Tokens; readonly preview: boolean }) =>
    Effect.gen(function* () {
      yield* Effect.sleep("250 millis");
      yield* writeTokens(input.tokens);
      yield* applyCss(input.tokens);
      if (input.preview) {
        const hyprland = yield* Hyprland;
        yield* hyprland.eval(hyprlandTokensLua(input.tokens));
      }
    }),
});
