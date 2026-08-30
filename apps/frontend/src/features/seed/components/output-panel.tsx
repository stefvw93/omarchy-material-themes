import { Task } from "react-argon";
import {
  ApplyColors,
  CommitContrastLevel,
  Seed,
  SetContrastLevel,
  SetMode,
  SetSchemeKind,
} from "@/features/seed";
import { MaterialService } from "@/features/material/service";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorsGrid } from "./colors-grid";

const CONSTRUCTORS = Object.keys(MaterialService.schemeContstructors).map((key) => ({
  value: key,
  label: key,
}));

/** The right-hand column: the chosen image, the scheme controls, the colours, apply. */
export const OutputPanel = () => {
  const { state, dispatch } = Seed.useFeature();

  return (
    <div className="col-span-6 flex flex-col gap-2" id="output">
      {state.selectedImageUrl ? (
        <div className="relative w-full aspect-video">
          <img
            key={state.selectedImageUrl.toString()}
            src={state.selectedImageUrl.toString()}
            className="size-full absolute object-cover"
          />
        </div>
      ) : (
        <Skeleton className="aspect-video" />
      )}

      {state.selectedImageUrl ? (
        <div className="flex gap-2">
          <Select
            items={CONSTRUCTORS}
            value={state.schemeKind}
            onValueChange={(value) =>
              dispatch(SetSchemeKind.make({ schemeKind: value ?? "neutral" }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="scheme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {CONSTRUCTORS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            items={[
              { value: "light", label: "light" },
              { value: "dark", label: "dark" },
            ]}
            value={state.mode}
            onValueChange={(value) => dispatch(SetMode.make({ mode: value ?? state.mode }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="light">light</SelectItem>
                <SelectItem value="dark">dark</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center flex-1 gap-2 pl-1">
            <Label>contrast</Label>
            <Slider
              min={-1}
              max={1}
              step={0.1}
              value={state.contrastLevel}
              onValueCommitted={(value) =>
                dispatch(CommitContrastLevel.make({ contrastLevel: value as number }))
              }
              onValueChange={(value) =>
                dispatch(SetContrastLevel.make({ contrastLevel: value as number }))
              }
            />
          </div>
        </div>
      ) : (
        <div className="flex gap-2 h-8" aria-hidden>
          <Skeleton className="flex-1" />
          <Skeleton className="flex-1" />
          <Skeleton className="flex-4" />
        </div>
      )}

      {Task.match(state.omarchyColors, {
        Idle: () => null,
        Pending: () => <ColorsGrid />,
        Rejected: (rejected) => `Error: ${rejected.error}`,
        Resolved: (resolved) => <ColorsGrid omarchyColors={resolved.value} />,
      })}

      <Button onClick={() => dispatch(ApplyColors.make({}))}>Apply</Button>
    </div>
  );
};
