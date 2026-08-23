import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { component } from "@/features/shared";
import {
  WALLHAVEN_CATEGORIES,
  WALLHAVEN_CATEGORY,
  WALLHAVEN_PURITIES,
  WALLHAVEN_PURITY,
  WallhavenSearchParams,
} from "@/features/wallhaven/service";
import { Schema } from "effect";
import { Action, define } from "react-argon";
import BONK from "@/assets/bonk.png";

const CATEGORIES: { value: WALLHAVEN_CATEGORY; label: string }[] = WALLHAVEN_CATEGORIES.map(
  (value) => ({ value, label: value }),
);

const PURITY: { value: WALLHAVEN_PURITY; label: string }[] = WALLHAVEN_PURITIES.filter(
  (p) => p !== "nsfw",
).map((value) => ({
  value,
  label: value,
}));

//
// Props
//

const WallhavenInputsProps = Schema.Struct({
  value: WallhavenSearchParams,
  loading: Schema.Boolean,
});
type WallhavenInputsProps = typeof WallhavenInputsProps.Type;

//
// State
//

const WallhavenInputsState = Schema.Struct({});
type WallhavenInputsState = typeof WallhavenInputsState.Type;

//
// Actions
//

const WallhavenInputsActions = Action.of([]);

//
// Outputs
//

const Change = Action.output("Change", WallhavenSearchParams.fields);
const Submit = Action.output("Submit", WallhavenSearchParams.fields);

const WallhavenInputsOutputs = Action.of([Change, Submit]);

//
// Factory
//

const WallhavenInputsFactory = define({
  props: WallhavenInputsProps,
  state: WallhavenInputsState,
  action: WallhavenInputsActions,
  output: WallhavenInputsOutputs,
});

//
// Implementations
//

const initialState = WallhavenInputsFactory.initialState(() => ({}));

const reducer = WallhavenInputsFactory.reducer({});

const render = WallhavenInputsFactory.render(({ props, dispatch }) => {
  console.log({ props });
  return (
    <div className="flex gap-2">
      <Select
        items={CATEGORIES}
        value={[...(props.value.categories ?? ["general"])]}
        onValueChange={(values) => dispatch(Change.make({ ...props.value, categories: values }))}
        multiple
      >
        <SelectTrigger>
          <SelectValue placeholder="category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {CATEGORIES.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        items={PURITY}
        value={[...(props.value.purity ?? ["sfw"])]}
        onValueChange={(values) => dispatch(Change.make({ ...props.value, purity: values }))}
        multiple
      >
        <SelectTrigger>
          <SelectValue placeholder="purity" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {PURITY.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {props.value.purity?.some((purity) => purity === "nsfw" || purity === "sketchy") && (
        <img className="size-8" src={BONK} alt="bonk" />
      )}

      <Button disabled={props.loading} onClick={() => dispatch(Submit.make(props.value))}>
        {props.loading ? "loading..." : "search"}
      </Button>
    </div>
  );
});

//
// Component
//

export const WallhavenInputs = component(
  WallhavenInputsFactory.create({
    initialState,
    reducer,
    render,
  }),
  { name: "WallhavenInputs" },
);
