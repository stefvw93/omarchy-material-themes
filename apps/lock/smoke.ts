// Live checks against the running session (`stef smoke lock`): the deployed
// variant is the lock the shell runs, and its view comes up as a preview.
// Never locks the session.
import { makeChecks, OmarchyShell, type SmokeTest } from "@stef/omarchy";
import { Effect } from "effect";

const smoke: SmokeTest<OmarchyShell> = ({ id }) =>
  Effect.gen(function* () {
    const shell = yield* OmarchyShell;
    const { check, failures } = makeChecks();

    const plugins = yield* shell.listPlugins;
    const lock = plugins.find((p) => p.id === id);
    const stock = plugins.find((p) => p.id === "omarchy.lock");
    yield* check("enabled", lock?.enabled === true, lock ? "" : `${id} not installed`);
    yield* check("stock lock disabled", stock?.enabled === false, "");

    const status = yield* shell.query("lock", "status").pipe(Effect.orElseSucceed(() => ""));
    yield* check(
      "answers lock status",
      status.includes('"passwordPam":true'),
      status || "no answer",
    );

    const shown = yield* shell.query("lock", "preview").pipe(Effect.orElseSucceed(() => ""));
    yield* check("preview shows", shown !== "", shown || "no answer");
    yield* Effect.sleep("1 second");
    yield* shell.ipc("lock", "hidePreview");

    if (failures() > 0) return yield* Effect.fail(`${failures()} smoke check(s) failed`);
  });

export default smoke;
