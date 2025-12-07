/**
 * Represents a case study extracted from a Puck-managed Page.
 */
export type CaseStudy = {
  id: string;
  slug: string;
  name: string;
  location: string;
  overview: string;
  technologies: string[];
  imageUrls: string[];
  date: string;
  type: string;
};

/**
 * Puck component data structure within puckData.content
 */
export type PuckComponentData = {
  type: string;
  props: Record<string, unknown>;
};

/**
 * Puck data structure stored in Page.puckData
 */
export type PuckData = {
  content?: PuckComponentData[];
  root?: Record<string, unknown>;
};
