import { SortOption } from "../hooks/use-product-sort-params";

/**
 * Converts product sort options to Meilisearch sort strings
 * @param sortOption - The sort option to convert
 * @returns Array of Meilisearch sort strings
 */
export const convertSortToMeilisearch = (sortOption: SortOption): string[] => {
  switch (sortOption) {
    case "newest":
      // Note: This would require 'created_at' field in the index
      // For now, falling back to title sorting as placeholder
      return ["title:desc"];

    case "oldest":
      // Note: This would require 'created_at' field in the index
      // For now, falling back to title sorting as placeholder
      return ["title:asc"];

    case "most-expensive":
      // Sort by maximum price descending (highest first)
      return ["max_price:desc"];

    case "least-expensive":
      // Sort by minimum price ascending (lowest first)
      return ["min_price:asc"];

    case "name-asc":
      return ["title:asc"];

    case "name-desc":
      return ["title:desc"];

    default:
      return ["title:asc"];
  }
};

/**
 * Gets the display label for a sort option
 * @param sortOption - The sort option
 * @returns Human-readable label
 */
export const getSortLabel = (sortOption: SortOption): string => {
  const labels: Record<SortOption, string> = {
    newest: "Newest",
    oldest: "Oldest",
    "most-expensive": "Most Expensive",
    "least-expensive": "Least Expensive",
    "name-asc": "Name (A to Z)",
    "name-desc": "Name (Z to A)",
  };

  return labels[sortOption];
};

/**
 * Checks if a sort option is supported by the current Meilisearch index configuration
 * @param sortOption - The sort option to check
 * @returns True if supported, false otherwise
 */
export const isSortOptionSupported = (sortOption: SortOption): boolean => {
  // Name and price-based sorting are now supported
  // Date sorting (newest/oldest) still requires created_at field to be properly indexed
  return sortOption !== "newest" && sortOption !== "oldest";
};
