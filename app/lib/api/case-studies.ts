"use server";

import { getPayloadClient } from "@/app/lib/payload/client";
import {
  CaseStudy,
  transformPageToCaseStudy,
} from "@/app/modules/case-studies/transforms";

/**
 * List all published case studies from Payload CMS.
 */
export async function listCaseStudies(): Promise<CaseStudy[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "pages",
    where: {
      type: { equals: "case-study" },
    },
    draft: false,
    limit: 100,
  });

  return result.docs.map(transformPageToCaseStudy);
}

/**
 * Get a single case study by slug from Payload CMS.
 */
export async function getCaseStudy(
  slug: string,
): Promise<CaseStudy | undefined> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "pages",
    where: {
      slug: { equals: slug },
      type: { equals: "case-study" },
    },
    limit: 1,
  });

  const page = result.docs[0];
  if (!page) return undefined;

  return transformPageToCaseStudy(page);
}
