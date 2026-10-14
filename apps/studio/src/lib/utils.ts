import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// h-text-<n> (src/m3/css.ts) is a height: registered with the h group, an
// h-* or size-* passed in className replaces it instead of both applying.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { h: [{ "h-text": [(value: string) => /^\d+(\.\d+)?$/.test(value)] }] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
