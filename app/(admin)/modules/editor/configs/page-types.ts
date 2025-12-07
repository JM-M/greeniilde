import type { Data } from "@measured/puck";

/**
 * Default puck data for case study pages with all sections pre-populated.
 */
const caseStudyDefaultContent: Data = {
  root: { props: { title: "" } },
  content: [
    {
      type: "CaseStudyHeaderSection",
      props: {
        id: "header",
        name: "New Case Study",
        location: "Lagos, Nigeria",
        date: "2024",
        type: "Residential",
      },
    },
    {
      type: "CaseStudyHeroSection",
      props: {
        id: "hero",
        images: [],
        location: "Lagos, Nigeria",
        projectType: "Residential",
        dateCompleted: "2024",
        technologies: [],
      },
    },
    {
      type: "CaseStudyContentSection",
      props: {
        id: "content",
        overview:
          "This project showcases our expertise in delivering high-quality solar installations.",
      },
    },
    {
      type: "CaseStudyRelatedSection",
      props: {
        id: "related",
        currentId: "",
      },
    },
  ],
};

/**
 * Default puck data for landing pages (empty by default since they're singletons).
 */
const landingPageDefaultContent: Data = {
  root: { props: { title: "" } },
  content: [],
};

/**
 * Centralized configuration for page types.
 * Used for path generation, form dropdowns, default content, and editor config selection.
 */
export const PAGE_TYPES = {
  "landing-page": {
    label: "Landing Page",
    pathPrefix: "",
    singleton: true,
    defaultPuckData: landingPageDefaultContent,
  },
  "case-study": {
    label: "Case Study",
    pathPrefix: "/case-studies",
    singleton: false,
    defaultPuckData: caseStudyDefaultContent,
  },
} as const;

export type PageType = keyof typeof PAGE_TYPES;

/**
 * Get the default puck data for a page type.
 */
export const getDefaultPuckData = (type: PageType, title: string): Data => {
  const config = PAGE_TYPES[type];
  return {
    ...config.defaultPuckData,
    root: { props: { title } },
  };
};

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

/**
 * Check if a page type is a singleton (cannot be deleted or duplicated).
 */
export const isSingleton = (type: PageType): boolean => {
  return PAGE_TYPES[type].singleton;
};
