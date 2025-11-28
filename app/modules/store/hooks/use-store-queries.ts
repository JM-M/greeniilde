"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { storeQueries } from "../queries";

export const useSuspenseStoreConfig = () => {
  return useSuspenseQuery(storeQueries.getStoreConfig.queryOptions());
};
