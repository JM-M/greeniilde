import type { Page } from "@/payload-types";

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
type PuckComponentData = {
  type: string;
  props: Record<string, unknown>;
};

/**
 * Puck data structure stored in Page.puckData
 */
type PuckData = {
  content?: PuckComponentData[];
  root?: Record<string, unknown>;
};

/**
 * Transform a Payload Page (case-study type) into a CaseStudy object.
 * Extracts data from the Puck component props stored in puckData.content.
 */
export function transformPageToCaseStudy(page: Page): CaseStudy {
  const puckData = page.puckData as PuckData | null;
  const content = puckData?.content || [];

  // Find components by type
  const headerSection = content.find(
    (c) => c.type === "CaseStudyHeaderSection",
  );
  const heroSection = content.find((c) => c.type === "CaseStudyHeroSection");
  const contentSection = content.find(
    (c) => c.type === "CaseStudyContentSection",
  );

  // Extract header data
  const headerProps = headerSection?.props || {};
  const name = (headerProps.name as string) || page.title;
  const location = (headerProps.location as string) || "";
  const date = (headerProps.date as string) || "";
  const type = (headerProps.type as string) || "Residential";

  // Extract hero data (images, technologies)
  const heroProps = heroSection?.props || {};
  const rawImages = (heroProps.images as { url?: string }[]) || [];
  const imageUrls = rawImages
    .map((img) => img?.url)
    .filter((url): url is string => Boolean(url));
  const rawTechnologies = (heroProps.technologies as { name?: string }[]) || [];
  const technologies = rawTechnologies
    .map((t) => t?.name)
    .filter((name): name is string => Boolean(name));

  // Extract content data
  const contentProps = contentSection?.props || {};
  const overview = (contentProps.overview as string) || "";

  return {
    id: page.slug,
    slug: page.slug,
    name,
    location,
    overview,
    technologies,
    imageUrls,
    date,
    type,
  };
}
