import { getCities, getCountries, getStates } from "@/app/lib/api/terminal";
import {
  createQueryAction,
  createSuspenseQueryAction,
} from "@/app/lib/query/create-query-action";

// Create query utilities
const getCountriesQuery = createSuspenseQueryAction(getCountries, [
  "terminal",
  "getCountries",
]);

const getStatesQuery = createSuspenseQueryAction(getStates, [
  "terminal",
  "getStates",
]);

const getCitiesQuery = createSuspenseQueryAction(getCities, [
  "terminal",
  "getCities",
]);

const getCitiesQueryNonSuspense = createQueryAction(getCities, [
  "terminal",
  "getCities",
]);

// Export query utilities for easy access to query keys
// Usage: terminalQueries.getCountries.queryKey()
export const terminalQueries = {
  getCountries: getCountriesQuery,
  getStates: getStatesQuery,
  getCities: getCitiesQuery,
  getCitiesNonSuspense: getCitiesQueryNonSuspense,
} as const;
