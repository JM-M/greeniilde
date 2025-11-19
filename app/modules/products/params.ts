import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

const SORT_OPTIONS = [
  "newest",
  "oldest",
  "most-expensive",
  "least-expensive",
  "name-asc",
  "name-desc",
] as const;

export const productFilterParams = {
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  priceRange: parseAsArrayOf(parseAsInteger),
  specs: parseAsArrayOf(parseAsString).withDefault([]),
};

export const productSortParams = {
  sort: parseAsStringEnum([...SORT_OPTIONS])
    .withDefault("newest")
    .withOptions({
      clearOnDefault: true,
    }),
};

export const loadProductFilterParams = createLoader(productFilterParams);
export const loadProductSortParams = createLoader(productSortParams);
