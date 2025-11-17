import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export const useProductFilterParams = () => {
  return useQueryStates({
    categories: parseAsArrayOf(parseAsString).withDefault([]),
    priceRange: parseAsArrayOf(parseAsInteger).withDefault([0, 10000]),
    specs: parseAsArrayOf(parseAsString).withDefault([]),
  });
};

