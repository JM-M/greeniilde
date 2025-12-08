import { getStoreConfig } from "@/app/lib/api/store";
import { createQuery, createSuspenseQuery } from "@/app/lib/query/create-query";

const getSuspenseStoreConfigQuery = createSuspenseQuery(getStoreConfig, [
  "store",
  "config",
]);

const getStoreConfigQuery = createQuery(getStoreConfig, ["store", "config"]);

export const storeQueries = {
  getSuspenseStoreConfig: getSuspenseStoreConfigQuery,
  getStoreConfig: getStoreConfigQuery,
} as const;
