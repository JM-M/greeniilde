/**
 * Centralized configuration for page types.
 * Used for path generation, form dropdowns, and editor config selection.
 */
export const PAGE_TYPES = {
  "landing-page": {
    label: "Landing Page",
    pathPrefix: "",
    singleton: true, // Only one can exist, hidden from "Create" form
  },
  "case-study": {
    label: "Case Study",
    pathPrefix: "/case-studies",
    singleton: false, // Multiple can exist
  },
} as const;

export type PageType = keyof typeof PAGE_TYPES;

/**
 * Build the full path for a page from its slug and type.
 */
export const buildPath = (slug: string, type: PageType): string => {
  const prefix = PAGE_TYPES[type].pathPrefix;
  return prefix ? `${prefix}/${slug}` : `/${slug}`;
};

/**
 * Get page type options for form dropdowns.
 * @param excludeSingletons - If true, singleton page types are excluded (default: true)
 */
export const getPageTypeOptions = (excludeSingletons = true) => {
  return Object.entries(PAGE_TYPES)
    .filter(([_, config]) => !excludeSingletons || !config.singleton)
    .map(([value, { label }]) => ({
      value: value as PageType,
      label,
    }));
};
