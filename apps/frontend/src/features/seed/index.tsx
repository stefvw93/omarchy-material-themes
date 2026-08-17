import { Button } from "@/components/ui/button";
import { Schema } from "effect";
import { Action, Children, define } from "react-argon";
import { component } from "../shared";

const Props = Schema.Struct({
  children: Schema.optionalKey(Children),
});

const State = Schema.Struct({});

const Hello = Action("Hello", {});

const SeedAction = Action.of([Hello]);

const SeedFactory = define({
  props: Props,
  state: State,
  action: SeedAction,
});

const initialState = SeedFactory.initialState(() => ({}));

const reducer = SeedFactory.reducer({
  Hello: (_action, { state }) => state,
});

const render = SeedFactory.render(() => (
  <div>
    <Button>Seed</Button>
  </div>
));

const seed = SeedFactory.create({ initialState, reducer, render });

const Seed = component(seed, { name: "Seed" });

export { Seed };
