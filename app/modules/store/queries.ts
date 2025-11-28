import { getStoreConfig } from "@/app/lib/api/store";
import { createSuspenseQuery } from "@/app/lib/query/create-query";

const getStoreConfigQuery = createSuspenseQuery(getStoreConfig, [
  "store",
  "config",
]);

export const storeQueries = {
  getStoreConfig: getStoreConfigQuery,
} as const;
