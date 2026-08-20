import { Context, Effect, Layer, Schema } from "effect";

// {
//   id: number;
//   width: number;
//   height: number;
//   url: string;
//   photographer: string;
//   photographer_url: string;
//   photographer_id: number;
//   avg_color: string;
//   src: {
//     original: string;
//     large2x: string;
//     large: string;
//     medium: string;
//     small: string;
//     portrait: string;
//     landscape: string;
//     tiny: string;
//   };
//   liked: boolean;
//   alt: string;
// }
export const PexelsPhoto = Schema.Any;
export type PexelsPhoto = typeof PexelsPhoto.Type;

export class PexelsService extends Context.Service<
  PexelsService,
  {
    curated: Effect.Effect<PexelsPhoto[], never, never>;
  }
>()("features/pexels/PexelsService") {
  static readonly layer = Layer.succeed(this, {
    curated: Effect.promise(async () => {
      const data = await import("./assets/curated.json");
      console.log(data.default);
      return data.default;
    }),
  });
}
