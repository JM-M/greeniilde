import {
  getCities,
  getCountries,
  getStates,
  getTerminalRates,
} from "@/app/lib/api/terminal";
import { createQuery, createSuspenseQuery } from "@/app/lib/query/create-query";

// Create query utilities
const getCountriesQuery = createSuspenseQuery(getCountries, [
  "terminal",
  "getCountries",
]);

const getStatesQuery = createSuspenseQuery(getStates, [
  "terminal",
  "getStates",
]);

const getCitiesQuery = createSuspenseQuery(getCities, [
  "terminal",
  "getCities",
]);

const getCitiesQueryNonSuspense = createQuery(getCities, [
  "terminal",
  "getCities",
]);

const getTerminalRatesQuery = createQuery<
  Awaited<ReturnType<typeof getTerminalRates>>,
  { cartId: string; items?: unknown[]; shipping_address?: unknown }
>(({ cartId }) => getTerminalRates(cartId), ["terminal", "getTerminalRates"]);

// Export query utilities for easy access to query keys
// Usage: terminalQueries.getCountries.queryKey()
export const terminalQueries = {
  getCountries: getCountriesQuery,
  getStates: getStatesQuery,
  getCities: getCitiesQuery,
  getCitiesNonSuspense: getCitiesQueryNonSuspense,
  getTerminalRates: getTerminalRatesQuery,
} as const;
