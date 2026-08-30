import { Async } from "react-argon";
import { Seed } from "@/features/seed";

/** The pexels tab's body. Reads the feature; dispatches nothing yet. */
export const PexelsResults = () => {
  const { state } = Seed.useFeature();

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {Async.match(state.curated, {
        Idle: () => <></>,
        Pending: () => "Loading...",
        Rejected: (rejected) => `Error: ${rejected.error}`,
        Resolved: (resolved) => (
          <div className="flex flex-col flex-1 min-h-0 gap-2 @container">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] content-start flex-1 min-h-0 overflow-auto gap-2">
              {resolved.value.map((item) => (
                // `thumbs.large` maxes out around 432x243, so keep cells
                // small enough that they are not upscaled on HiDPI.
                <button key={item.id} type="button" className="aspect-video relative">
                  <img
                    src={item.src.medium.toString()}
                    loading="lazy"
                    decoding="async"
                    className="size-full absolute object-cover"
                  />
                </button>
              ))}
            </div>
            <p>{`${resolved.value.length} total`}</p>
          </div>
        ),
      })}
    </div>
  );
};
