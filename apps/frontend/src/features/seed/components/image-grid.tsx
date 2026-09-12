import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { WallhavenItem } from "@/features/wallhaven/service";
import { cn } from "@/lib/utils";
import type { FC, PropsWithChildren } from "react";

// 216px is based on the max width of `thumbs.large` (432px)
const COLS = "grid-cols-[repeat(auto-fill,minmax(216px,1fr))]";
const GRID = cn("grid content-start flex-1 min-h-0 gap-2 pr-px", COLS);

export const ImageGrid: FC<
  PropsWithChildren<{
    readonly onItemClick: (item: WallhavenItem) => void;
    readonly items: readonly WallhavenItem[];
  }>
> = (props) => {
  return (
    <ScrollArea className="min-h-0">
      <div className={GRID}>
        {props.items.map((item) => (
          // `thumbs.large` maxes out around 432x243, so keep cells
          // small enough that they are not upscaled on HiDPI.
          <Button
            key={item.id}
            variant="ghost"
            className="aspect-video relative cursor-pointer size-full"
            onClick={() => props.onItemClick(item)}
          >
            <img
              src={item.thumbs.large.toString()}
              loading="lazy"
              decoding="async"
              className="size-full absolute object-cover inset-0"
            />
          </Button>
        ))}

        {props.children}
      </div>
    </ScrollArea>
  );
};

/** Same scroll area and columns as `ImageGrid`, filled with placeholder cells. */
export const ImageGridSkeleton: FC<{ readonly count?: number }> = ({ count = 24 }) => (
  <ScrollArea className="min-h-0" aria-hidden>
    <div className={GRID}>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className="aspect-video" />
      ))}
    </div>
  </ScrollArea>
);
