import { Async } from "react-argon";
import { ClickedImageThumb, ClickedWallhavenPaginator, Seed } from "@/features/seed";
import type { WallhavenSearchPayload } from "@/features/wallhaven/service";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ImageGrid } from "./image-grid";

/** The wallhaven tab's body: skeletons while searching, the grid and its pager once resolved. */
export const WallhavenResults = () => {
  const { state, dispatch } = Seed.useFeature();

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {Async.match(state.search, {
        Idle: () => <></>,
        Pending: () => (
          <div className="flex flex-col flex-1 min-h-0 gap-2">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] content-start flex-1 min-h-0 gap-2 pr-px">
              {Array.from({ length: 24 }, (_, index) => (
                <Skeleton key={index} className="aspect-video" />
              ))}
            </div>
          </div>
        ),
        Rejected: (rejected) => `Error: ${rejected.error}`,
        Resolved: (resolved) => (
          <div className="flex flex-col flex-1 min-h-0 gap-2">
            <ImageGrid
              onItemClick={(item) => dispatch(ClickedImageThumb.make({ url: item.path }))}
              items={resolved.value.data}
            />
            <Paginator meta={resolved.value.meta} />
          </div>
        ),
      })}
    </div>
  );
};

/** Nested one level deeper, reading the feature on its own rather than via props. */
const Paginator = ({ meta }: { readonly meta: typeof WallhavenSearchPayload.Type.meta }) => {
  const { state, dispatch } = Seed.useFeature();
  const current = state.wallhavenSearchParams.page || 1;

  return (
    <Pagination className="col-span-full">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            type="button"
            onClick={() =>
              dispatch(ClickedWallhavenPaginator.make({ page: Math.max(1, current - 1) }))
            }
          />
        </PaginationItem>

        <PaginationItem>
          <span className="px-1">
            {`${meta.current_page} of ${Math.ceil(meta.total / meta.per_page)}`}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            type="button"
            onClick={() => dispatch(ClickedWallhavenPaginator.make({ page: current + 1 }))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
