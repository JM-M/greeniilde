"use server";

import { CURRENCY_CODE, REGION_ID } from "@/app/constants/api";
import {
  MeilisearchHitsResponse,
  ProductIndexDocument,
} from "@/app/modules/products/types";
import { HttpTypes } from "@medusajs/types";
import { sdk } from "../medusa/config";
import { meilisearch } from "../meilisearch/config";
import { buildQueryString } from "../utils";

export interface SearchProductsInput extends Record<string, unknown> {
  query: string;
  fields?: string;
  limit?: number;
  offset?: number;
  language?: string;
  semanticSearch?: boolean;
  semanticRatio?: number;
}

/**
 * List products from the store
 * Public endpoint - no authentication required
 */
export const listProducts = async (query?: HttpTypes.StoreProductParams) => {
  return await sdk.store.product.list(query);
};

/**
 * Get a single product by ID
 * Public endpoint - no authentication required
 */
export const getProduct = async ({
  productId,
  query,
}: {
  productId: string;
  query?: HttpTypes.StoreProductParams;
}) => {
  return await sdk.store.product.retrieve(productId, query);
};

/**
 * Search products using Meilisearch
 * Custom endpoint for advanced search functionality
 */
export const searchProducts = async (input: SearchProductsInput) => {
  const queryString = buildQueryString({
    ...input,
    region_id: REGION_ID,
    currency_code: CURRENCY_CODE,
  });
  const url = `/store/meilisearch/products?${queryString}`;
  return await sdk.client.fetch<{
    count: number;
    products: ProductIndexDocument[];
  }>(url);
};

/**
 * Get product search hits with metadata
 * Custom endpoint for search results with highlighting and metadata
 */
export const getProductHits = async (
  input: SearchProductsInput,
): Promise<MeilisearchHitsResponse> => {
  const queryString = buildQueryString(input);
  const url = `/store/meilisearch/products-hits?${queryString}`;
  return await sdk.client.fetch<MeilisearchHitsResponse>(url);
};

/**
 * Get products directly from Meilisearch index
 * Direct access to Meilisearch for advanced search functionality
 */
export const getProductsFromMeilisearch = async (input: {
  query?: string;
  limit?: number;
  offset?: number;
  filter?: string;
  sort?: string[];
  facets?: string[];
}): Promise<{
  hits: ProductIndexDocument[];
  estimatedTotalHits: number;
  processingTimeMs: number;
  query: string;
}> => {
  const index = meilisearch.index("products");

  const searchParams: any = {
    limit: input.limit || 20,
    offset: input.offset || 0,
  };

  if (input.query) {
    searchParams.q = input.query;
  }

  if (input.filter) {
    searchParams.filter = input.filter;
  }

  if (input.sort) {
    searchParams.sort = input.sort;
  }

  if (input.facets) {
    searchParams.facets = input.facets;
  }

  const result = await index.search(input.query || "", searchParams);

  // Transform the result to match our expected interface
  return {
    hits: result.hits as ProductIndexDocument[],
    estimatedTotalHits: result.estimatedTotalHits || 0,
    processingTimeMs: result.processingTimeMs,
    query: input.query || "",
  };
};
