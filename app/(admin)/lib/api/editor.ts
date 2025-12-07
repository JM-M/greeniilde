"use server";

import {
  getDefaultPuckData,
  isSingleton,
  type PageType,
} from "@/app/(admin)/modules/editor/configs/page-types";
import { getPayloadClient } from "@/app/lib/payload/client";
import type { Page } from "@/payload-types";

/**
 * Get content page data by path
 * This is used to load page content for display and editing
 */
export async function getPageContent({
  path,
  isDraft = false,
}: {
  path?: string | null;
  isDraft?: boolean;
}): Promise<Page | null> {
  if (!path) {
    return null;
  }

  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "pages",
    where: {
      path: { equals: path },
    },
    limit: 1,
    draft: isDraft,
  });

  return result.docs[0] || null;
}

export type SavePageContentInput = {
  slug: string;
  title: string;
  type?: string;
  path: string;
  puckData: any;
  action: "draft" | "publish";
};

/**
 * Save or update content page
 * This is used by the Puck editor when user clicks "Publish" or auto-saves
 */
export async function savePageContent({
  slug,
  title,
  type,
  path,
  puckData,
  action,
}: SavePageContentInput): Promise<Page> {
  const payload = await getPayloadClient();

  // Check if page exists
  const existing = await payload.find({
    collection: "pages",
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  });

  const existingPage = existing.docs[0];
  const isDraft = action === "draft";

  if (existingPage) {
    // Update existing page
    const result = await payload.update({
      collection: "pages",
      id: existingPage.id,
      data: {
        slug,
        title,
        type: (type as "landing-page" | "case-study") || "landing-page",
        path,
        puckData,
        _status: isDraft ? "draft" : "published",
      },
      draft: isDraft,
    });

    return result;
  } else {
    // Create new page
    const result = await payload.create({
      collection: "pages",
      data: {
        slug,
        title,
        type: (type as "landing-page" | "case-study") || "landing-page",
        path,
        puckData,
        _status: isDraft ? "draft" : "published",
      },
      draft: isDraft,
    });

    return result;
  }
}

/**
 * Get all content pages
 */
export async function getPages(): Promise<Page[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "pages",
    limit: 100,
    sort: "-createdAt",
  });

  return result.docs;
}

export type CreatePageInput = {
  title: string;
  slug: string;
  type?: string;
  path?: string;
};

/**
 * Create a new content page
 */
export async function createPage({
  title,
  slug,
  type,
  path,
}: CreatePageInput): Promise<Page> {
  const payload = await getPayloadClient();
  const pageType = (type as PageType) || "landing-page";

  const result = await payload.create({
    collection: "pages",
    data: {
      slug,
      title,
      type: pageType,
      path: path || `/${slug === "home" ? "" : slug}`,
      puckData: getDefaultPuckData(pageType, title),
      _status: "draft",
    },
    draft: true,
  });

  return result;
}

/**
 * Delete a content page
 */
export async function deletePage(id: string): Promise<{ success: boolean }> {
  const payload = await getPayloadClient();

  // Fetch the page first to check if it's a singleton
  const page = await payload.findByID({
    collection: "pages",
    id: Number(id),
  });

  if (page && isSingleton(page.type as PageType)) {
    throw new Error("Cannot delete singleton pages");
  }

  await payload.delete({
    collection: "pages",
    id: Number(id),
  });

  return { success: true };
}

/**
 * Discard draft changes and revert to published version
 */
export async function discardDraft(
  id: string,
): Promise<{ success: boolean; page?: Page }> {
  const payload = await getPayloadClient();

  // Get the published version
  const publishedResult = await payload.findByID({
    collection: "pages",
    id: Number(id),
    draft: false,
  });

  if (!publishedResult) {
    throw new Error(`No published version found for page with id ${id}`);
  }

  // Update the document with the published content
  const result = await payload.update({
    collection: "pages",
    id: Number(id),
    data: {
      ...publishedResult,
      _status: "published",
    },
    draft: false,
  });

  return { success: true, page: result };
}
