import { getRegion, listRegions } from "@/app/lib/api/region";
import { createQuery, createSuspenseQuery } from "@/app/lib/query/create-query";

const getRegionQuery = createQuery(getRegion, ["regions", "get"]);
const getSuspenseRegionQuery = createSuspenseQuery(getRegion, [
  "regions",
  "get",
]);

const listRegionsQuery = createQuery(listRegions, ["regions", "list"]);
const getSuspenseListRegionsQuery = createSuspenseQuery(listRegions, [
  "regions",
  "list",
]);

export const regionQueries = {
  getRegion: getRegionQuery,
  getSuspenseRegion: getSuspenseRegionQuery,
  listRegions: listRegionsQuery,
  getSuspenseListRegions: getSuspenseListRegionsQuery,
} as const;
