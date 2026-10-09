import { Console, Effect } from "effect";

/** What `stef smoke` hands a plugin's smoke test: the id of the live variant. */
export interface SmokeContext {
  readonly id: string;
}

/** A plugin's smoke test (the default export of the module `smoke` points at). */
export type SmokeTest<R> = (ctx: SmokeContext) => Effect.Effect<void, unknown, R>;

/** One named check: prints `ok` or `FAIL` and records failures for the exit code. */
export const makeChecks = () => {
  let failures = 0;
  const check = (name: string, ok: boolean, detail = "") =>
    ok
      ? Console.log(`ok    ${name}${detail ? ` ${detail}` : ""}`)
      : Effect.andThen(
          Effect.sync(() => failures++),
          Console.error(`FAIL  ${name}${detail ? ` (${detail})` : ""}`),
        );
  return { check, failures: () => failures };
};
