import { parseAsString, useQueryStates } from "nuqs";

export const useLandingProductsParams = () => {
  return useQueryStates({
    categoryId: parseAsString.withDefault("all").withOptions({
      clearOnDefault: true,
      shallow: true,
    }),
  });
};
