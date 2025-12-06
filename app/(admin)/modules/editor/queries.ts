import { getPageContent, getPages } from "@/app/(admin)/lib/api/editor";
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

const getPagesQuery = createQuery(getPages, ["editor", "getPages"]);

// Export query utilities for easy access to query keys
// Usage: editorQueries.getPageContent.queryKey(path)
export const editorQueries = {
  getPageContent: getPageContentQuery,
  getPageContentNonSuspense: getSuspensePageContentQuery,
  getPages: getPagesQuery,
} as const;
