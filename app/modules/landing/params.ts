import { createLoader, parseAsString } from "nuqs/server";

export const landingProductsParams = {
  categoryId: parseAsString.withDefault("all").withOptions({
    clearOnDefault: true,
    shallow: true,
  }),
};

export const loadLandingProductsParams = createLoader(landingProductsParams);
