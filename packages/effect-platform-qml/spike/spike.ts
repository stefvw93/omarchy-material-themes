// Phase 0 spike: does Effect run inside Quickshell's QML engine?
// Loaded by scripts/spike.sh in a headless `qs -p`; every check logs one
// `SPIKE <name> <ok|FAIL> <detail>` line.
import { Duration, Effect, Exit, Fiber, Schema, Stream, SubscriptionRef } from "effect";
import { install, pendingCount, type QmlHost } from "../src/index.ts";

const Toplevel = Schema.Struct({
  address: Schema.String,
  at: Schema.Tuple([Schema.Number, Schema.Number]),
  size: Schema.Tuple([Schema.Number, Schema.Number]),
  workspace: Schema.Struct({ id: Schema.Number, name: Schema.String }),
  floating: Schema.Boolean,
});

/** Built-ins Effect or our code might touch; lowering syntax doesn't add them. */
const probeBuiltins = (): Array<string> => {
  const g = globalThis as Record<string, unknown>;
  const checks: Record<string, unknown> = {
    "Object.fromEntries": (Object as unknown as Record<string, unknown>)["fromEntries"],
    "Object.hasOwn": (Object as unknown as Record<string, unknown>)["hasOwn"],
    "Array.prototype.flat": (Array.prototype as unknown as Record<string, unknown>)["flat"],
    "Array.prototype.flatMap": (Array.prototype as unknown as Record<string, unknown>)["flatMap"],
    "Array.prototype.at": (Array.prototype as unknown as Record<string, unknown>)["at"],
    "String.prototype.replaceAll": (String.prototype as unknown as Record<string, unknown>)[
      "replaceAll"
    ],
    "String.prototype.matchAll": (String.prototype as unknown as Record<string, unknown>)[
      "matchAll"
    ],
    "Promise.allSettled": (Promise as unknown as Record<string, unknown>)["allSettled"],
    "Symbol.asyncIterator": (Symbol as unknown as Record<string, unknown>)["asyncIterator"],
    globalThis: g,
    WeakRef: g["WeakRef"],
    FinalizationRegistry: g["FinalizationRegistry"],
    BigInt: g["BigInt"],
    AggregateError: g["AggregateError"],
    queueMicrotask: g["queueMicrotask"],
    setTimeout: g["setTimeout"],
    structuredClone: g["structuredClone"],
    TextEncoder: g["TextEncoder"],
    AbortController: g["AbortController"],
  };
  return Object.keys(checks).filter((k) => checks[k] === undefined);
};

const errorDetail = (e: unknown): string =>
  e instanceof Error
    ? `${e.name}: ${e.message} @ ${String(e.stack).split("\n").slice(0, 6).join(" | ")}`
    : String(e);

export const run = (qmlHost: QmlHost, done: () => void): void => {
  install(qmlHost);
  const report = (name: string, ok: boolean, detail: unknown) =>
    qmlHost.log(`SPIKE ${name} ${ok ? "ok" : "FAIL"} ${JSON.stringify(detail)}`);

  report("missing-builtins", true, probeBuiltins());

  // 1. Synchronous path: no scheduler or timers involved.
  try {
    const t0 = Date.now();
    const n = Effect.runSync(Effect.succeed(20).pipe(Effect.map((x) => x + 22)));
    report("runSync", n === 42, { value: n, ms: Date.now() - t0 });
  } catch (e) {
    report("runSync", false, String(e));
  }

  // 2. Schema decode of a toplevel-shaped object, valid and invalid.
  try {
    const t0 = Date.now();
    const raw = {
      address: "0xabc",
      at: [10, 20],
      size: [800, 600],
      workspace: { id: 2, name: "2" },
      floating: false,
    };
    const good = Schema.decodeUnknownExit(Toplevel)(raw);
    const bad = Schema.decodeUnknownExit(Toplevel)({ ...raw, at: "nope" });
    report("schema-decode", Exit.isSuccess(good) && Exit.isFailure(bad), {
      ms: Date.now() - t0,
      badMessage: Exit.isFailure(bad) ? String(bad.cause).slice(0, 160) : null,
    });
  } catch (e) {
    report("schema-decode", false, errorDetail(e));
  }

  // 2b. Pieces the async section depends on, run synchronously.
  const step = (name: string, f: () => unknown) => {
    try {
      report(name, true, f());
    } catch (e) {
      report(name, false, errorDetail(e));
    }
  };
  step("gen-sync", () =>
    Effect.runSync(
      Effect.gen(function* () {
        const a = yield* Effect.succeed(1);
        return a + 1;
      }),
    ),
  );
  step("manual-yield-star", () => {
    const eff = Effect.succeed(1);
    const out: Array<string> = [];
    const iterFn = (eff as unknown as Record<symbol, unknown>)[Symbol.iterator];
    out.push(`iterFn:${typeof iterFn}`);
    const inner = (eff as unknown as Iterable<unknown>)[Symbol.iterator]();
    out.push(`inner.next:${typeof inner.next}`);
    function* g(): Generator<unknown, number, unknown> {
      const a = (yield* eff as unknown as Iterable<unknown>) as unknown as number;
      return a + 1;
    }
    const it = g();
    const first = it.next();
    out.push(`first.done:${String(first.done)}`);
    const second = it.next(41);
    out.push(`second:${String(second.value)}/${String(second.done)}`);
    return out;
  });
  step("duration-millis", () => Duration.toMillis(Duration.millis(50)));
  step("duration-input", () => Duration.toMillis(Duration.fromInputUnsafe("50 millis")));
  step("clock-now", () =>
    Effect.runSync(Effect.clockWith((c) => Effect.succeed(c.currentTimeMillisUnsafe()))),
  );

  // 3. Async: sleep, SubscriptionRef + changes stream, debounce, interruption.
  const program = Effect.gen(function* () {
    const t0 = Date.now();
    yield* Effect.sleep(Duration.millis(50));
    const slept = Date.now() - t0;
    report("sleep-50ms", slept >= 45 && slept < 500, { elapsedMs: slept });

    const ref = yield* SubscriptionRef.make(0);
    const collector = yield* SubscriptionRef.changes(ref).pipe(
      Stream.take(4),
      Stream.runCollect,
      Effect.forkChild,
    );
    yield* Effect.sleep(Duration.millis(5));
    for (let i = 1; i <= 3; i++) yield* SubscriptionRef.update(ref, (n) => n + i);
    const seen = yield* Fiber.join(collector);
    report("subscription-ref", seen.join(",") === "0,1,3,6", { seen });

    // Burst of 5 events 10ms apart on a stream that stays open, debounced
    // 80ms like the plugins' refreshTimer: only the timer can emit the 5.
    const t1 = Date.now();
    const debounced = yield* Stream.fromIterable([1, 2, 3, 4, 5]).pipe(
      Stream.mapEffect((n) => Effect.as(Effect.sleep(Duration.millis(10)), n)),
      Stream.concat(Stream.never),
      Stream.debounce(Duration.millis(80)),
      Stream.take(1),
      Stream.runCollect,
    );
    const debounceMs = Date.now() - t1;
    report("debounce-80ms", debounced.join(",") === "5" && debounceMs >= 120, {
      out: debounced,
      elapsedMs: debounceMs,
    });

    let finalized = false;
    const sleeper = yield* Effect.never.pipe(
      Effect.ensuring(Effect.sync(() => (finalized = true))),
      Effect.forkChild,
    );
    yield* Effect.sleep(Duration.millis(10));
    yield* Fiber.interrupt(sleeper);
    report("interrupt-finalizer", finalized, { finalized });

    // 200 small effects through the scheduler: rough throughput figure.
    const t2 = Date.now();
    const sum = yield* Effect.forEach(
      Array.from({ length: 200 }, (_, i) => i),
      (i) => Effect.yieldNow.pipe(Effect.as(i)),
    ).pipe(Effect.map((xs) => xs.reduce((a, b) => a + b, 0)));
    report("yield-200", sum === 19900, { ms: Date.now() - t2 });

    report("pending-timers", pendingCount() === 0, { pending: pendingCount() });
  });

  Effect.runFork(
    program.pipe(
      Effect.catchCause((cause) =>
        Effect.sync(() =>
          report(
            "async",
            false,
            cause.reasons.map((r) => (r._tag === "Die" ? errorDetail(r.defect) : String(r))),
          ),
        ),
      ),
      Effect.ensuring(Effect.sync(done)),
    ),
  );
};
