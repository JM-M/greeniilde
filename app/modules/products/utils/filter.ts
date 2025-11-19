/**
 * Convert product filter parameters to Meilisearch filter syntax
 */
export const convertFiltersToMeilisearch = (filters: {
  categories: string[];
  priceRange: number[] | null;
  specs: string[];
}): string | undefined => {
  const conditions: string[] = [];

  // Categories filter - OR condition (product belongs to any selected category)
  if (filters.categories.length > 0) {
    // Filter by categories.id as it's indexed in Meilisearch
    const categoryConditions = filters.categories.map(
      (categoryId) => `categories.id = "${categoryId.replace(/"/g, '\\"')}"`,
    );
    conditions.push(`(${categoryConditions.join(" OR ")})`);
  }

  // Price range filter
  if (filters.priceRange && filters.priceRange.length === 2) {
    const [minPrice, maxPrice] = filters.priceRange;
    if (minPrice > 0) {
      conditions.push(`max_price >= ${minPrice}`);
    }
    if (maxPrice < 1000000) {
      // Some reasonable upper limit
      conditions.push(`min_price <= ${maxPrice}`);
    }
  }

  // Specs filter - OR condition (product has any selected spec)
  if (filters.specs.length > 0) {
    // Specs are indexed as tags.value
    const specConditions = filters.specs.map(
      (spec) => `tags.value = "${spec.replace(/"/g, '\\"')}"`,
    );
    conditions.push(`(${specConditions.join(" OR ")})`);
  }

  // Combine all conditions with AND
  return conditions.length > 0 ? conditions.join(" AND ") : undefined;
};
