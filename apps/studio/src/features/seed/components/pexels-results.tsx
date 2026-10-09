import { Task } from "@wych/react";
import { ClickedImageThumb, Seed } from "@/features/seed";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageGrid, ImageGridSkeleton } from "./image-grid";

/** The pexels tab's body. Reads the feature; dispatches nothing yet. */
export const PexelsResults = () => {
  const { state, dispatch } = Seed.useFeature();

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {Task.match(state.curated, {
        Idle: () => <></>,
        Pending: () => (
          <div className="flex flex-col flex-1 min-h-0 gap-2">
            <ImageGridSkeleton />
            <Skeleton className="h-6 w-16" />
          </div>
        ),
        Rejected: (rejected) => `Error: ${rejected.error}`,
        Resolved: (resolved) => (
          <div className="flex flex-col flex-1 min-h-0 gap-2">
            <ImageGrid
              onItemClick={(item) =>
                dispatch(ClickedImageThumb.make({ url: new URL(item.src.original) }))
              }
              items={resolved.value}
              variant="pexels"
            />
            <p>{`${resolved.value.length} total`}</p>
          </div>
        ),
      })}
    </div>
  );
};
