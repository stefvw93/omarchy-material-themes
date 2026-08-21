import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { WallhavenItem } from "@/features/wallhaven/service";
import type { FC, PropsWithChildren } from "react";

export const ImageGrid: FC<
  PropsWithChildren<{
    readonly onItemClick: (item: WallhavenItem) => void;
    readonly items: readonly WallhavenItem[];
  }>
> = (props) => {
  return (
    <ScrollArea className="min-h-0">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] content-start flex-1 min-h-0 gap-4 pr-px">
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
