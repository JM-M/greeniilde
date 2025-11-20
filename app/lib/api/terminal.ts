"use server";

import {
  TerminalGetCitiesResponse,
  TerminalGetCountriesResponse,
  TerminalGetStatesResponse,
} from "@/app/modules/terminal/types";
import { makeTerminalRequest, terminalClient } from "../terminal/config";

/**
 * Get all countries from Terminal API
 * Public endpoint - no authentication required
 */
export const getCountries = async (): Promise<TerminalGetCountriesResponse> => {
  return makeTerminalRequest<TerminalGetCountriesResponse>(() =>
    terminalClient.get("/countries"),
  );
};

/**
 * Get states for a specific country from Terminal API
 * Public endpoint - no authentication required
 */
export const getStates = async (
  countryIsoCode: string,
): Promise<TerminalGetStatesResponse> => {
  const params = new URLSearchParams();
  params.append("country_code", countryIsoCode);

  const queryString = params.toString();
  const url = `/states?${queryString}`;

  return makeTerminalRequest<TerminalGetStatesResponse>(() =>
    terminalClient.get(url),
  );
};

/**
 * Parameters for getting cities
 */
export interface GetCitiesParams {
  countryIsoCode: string;
  stateIsoCode?: string;
}

/**
 * Get cities for a specific country and optionally state from Terminal API
 * Public endpoint - no authentication required
 */
export const getCities = async ({
  countryIsoCode,
  stateIsoCode,
}: GetCitiesParams): Promise<TerminalGetCitiesResponse> => {
  const params = new URLSearchParams();
  params.append("country_code", countryIsoCode);

  if (stateIsoCode) {
    params.append("state_code", stateIsoCode);
  }

  const queryString = params.toString();
  const url = `/cities?${queryString}`;

  return makeTerminalRequest<TerminalGetCitiesResponse>(() =>
    terminalClient.get(url),
  );
};
