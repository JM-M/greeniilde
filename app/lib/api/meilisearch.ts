"use server";

import { sdk } from "../medusa/config";

/**
 * Generate a Meilisearch tenant token for the current store
 * The token includes search rules scoped to the current store
 */
export const generateMeilisearchToken = async (): Promise<{
  token: string;
}> => {
  return await sdk.client.fetch<{
    token: string;
  }>("/store/meilisearch-token");
};
