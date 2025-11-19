import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";

export const useProductFilterParams = () => {
  return useQueryStates(
    {
      categories: parseAsArrayOf(parseAsString).withDefault([]),
      priceRange: parseAsArrayOf(parseAsInteger),
      specs: parseAsArrayOf(parseAsString).withDefault([]),
    },
    {
      shallow: true,
    },
  );
};
