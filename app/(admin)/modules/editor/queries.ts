import { getPageContent } from "@/app/(admin)/lib/api/editor";
import { createQuery, createSuspenseQuery } from "@/app/lib/query/create-query";

// Create query utilities
const getSuspensePageContentQuery = createSuspenseQuery(getPageContent, [
  "editor",
  "getPageContent",
]);

const getPageContentQuery = createQuery(getPageContent, [
  "editor",
  "getPageContent",
]);

// Export query utilities for easy access to query keys
// Usage: editorQueries.getPageContent.queryKey(slug)
export const editorQueries = {
  getPageContent: getPageContentQuery,
  getPageContentNonSuspense: getSuspensePageContentQuery,
} as const;
