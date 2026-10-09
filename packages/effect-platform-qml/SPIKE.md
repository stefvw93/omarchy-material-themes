# Phase 0 spike: Effect inside Quickshell's QML engine

**Verdict: viable.** Effect 4.0 (verified on rc.118 and 4.0.2) runs inside the QML engine (Qt 6.11.2, Quickshell 0.3.1). This needs four build-time shims and one output patch, all wired into `vite.config.ts`.

To reproduce, run `vp run spike`, which builds `spike/spike.ts` and runs it in a headless `qs -p`.

## What runs

| Check                                                                             | Result                                |
| --------------------------------------------------------------------------------- | ------------------------------------- |
| `Effect.runSync`, `Effect.gen` with `yield*`                                      | ok                                    |
| `Schema.decodeUnknownExit`: valid input, and invalid input with a formatted issue | ok, about 1 ms                        |
| `Effect.sleep(50ms)` on host QML `Timer`s                                         | ok, 52 ms                             |
| `SubscriptionRef` with a `changes` stream                                         | ok, `0,1,3,6`                         |
| `Stream.debounce(80ms)` over an open stream with a 10 ms-spaced burst             | ok, emits the last value after 133 ms |
| Fiber interruption runs the finalizer                                             | ok                                    |
| 200 `yieldNow` fibers' worth of scheduling                                        | 6 ms                                  |
| Leaked timers after the program finishes                                          | 0                                     |
| Bundle size (Effect, Schema, Stream, Duration)                                    | about 498 kB, unminified              |
| First evaluation of the bundle (`Qt.createComponent`)                             | about 40 ms                           |

The roughly 40 ms first evaluation is paid when a plugin's `Loader` first activates. Plugins that open often should set `keepLoaded`, or put the core in a component that stays loaded.

## Engine gaps and how each is handled

| Gap in V4                                                                          | Effect on Effect                                                                                         | Fix                                                                                                                          |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| No `globalThis`                                                                    | Module evaluation throws                                                                                 | `src/global.ts`: an object whose prototype is the real global, injected for bare `globalThis`                                |
| No `setTimeout`/`clearTimeout`                                                     | `Clock.sleep` and the scheduler                                                                          | `src/timers.ts`, backed by the host `Timer` passed in through `install(host)`                                                |
| No `BigInt`                                                                        | `Duration`/`Clock` nanoseconds, evaluated at module load                                                 | `src/bigint.ts` returns integer-valued Numbers. Exactness is lost above 2^53; do not use BigDecimal or bigint Schemas in QML |
| No `Object.hasOwn`                                                                 | Module evaluation throws                                                                                 | `src/builtins.ts`                                                                                                            |
| **`Object.defineProperties` ignores symbol keys**                                  | The spread helper drops `[Symbol.iterator]` from `EffectProto`, so `yield*` throws an opaque `TypeError` | `src/builtins.ts` `defineProperties`, built on `Reflect.ownKeys`                                                             |
| **`super()` inside an arrow always throws** "super() already called"               | Lowered class fields (`SchemaError`)                                                                     | `build/qml-compat.ts` rolldown plugin inlines the `_super` arrows; the build fails if any survive                            |
| No class fields, object spread, `async`/`await` or async generators (parse errors) | none                                                                                                     | lowered by the `es2017` target                                                                                               |

The other built-ins confirmed missing are `Object.fromEntries`, `Array.prototype.flat`/`flatMap`/`at`, `String.prototype.replaceAll`/`matchAll`, `Promise.allSettled`, `Symbol.asyncIterator`, `WeakRef`, `FinalizationRegistry`, `AggregateError`, `queueMicrotask`, `structuredClone`, `TextEncoder` and `AbortController`.

The Effect paths exercised here don't touch them. Plugin code must not use them either: the package's `lib: ["es2017"]` turns such use into a type error. Add a shim to `src/builtins.ts` and to the `inject` map when one is needed.

## Next steps

- Move the shims, the inject map and `qmlCompat` into `@stef/plugin-kit`'s preset, so every plugin bundle gets them.
- In the bundle check, assert the engine logs no warnings beyond the known `usedbeforedeclared` lints, and run the spike as part of `verify`.
- Measure inside the live `omarchy-shell` as well, to confirm it runs on the same engine under load.

## Using it in a plugin

A plugin's core is an Effect program over a stream of intents, started from QML with `runCore` (see `apps/expo/src/core.ts`):

```qml
HostTimers { id: timers }            // vendored from @stef/qml-kit
property var core: null
Component.onCompleted: core = Core.start({ startTimer: timers.start, stopTimer: timers.stop, log: …, /* plugin needs */ })
Component.onDestruction: if (core) core.dispose()
```

The core is unit-tested in Node with `TestClock`, and `tests/*.engine.qml` runs it in the real engine on QML Timers (`plugin-kit check`).
