import { loadLandingProductsParams } from "./params";

export const getMeilisearchFilterFromLandingProductsParams = (
  landingProductsParams: Awaited<ReturnType<typeof loadLandingProductsParams>>,
) => {
  return landingProductsParams.categoryId === "all"
    ? undefined
    : `categories.id = "${landingProductsParams.categoryId}"`;
};
