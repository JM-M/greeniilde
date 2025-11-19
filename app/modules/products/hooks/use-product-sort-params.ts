import { parseAsStringEnum, useQueryStates } from "nuqs";

export const SORT_OPTIONS = [
  "newest",
  "oldest",
  "most-expensive",
  "least-expensive",
  "name-asc",
  "name-desc",
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export const useProductSortParams = () => {
  return useQueryStates(
    {
      sort: parseAsStringEnum([...SORT_OPTIONS])
        .withDefault("newest")
        .withOptions({
          clearOnDefault: true,
        }),
    },
    {
      shallow: true,
    },
  );
};
