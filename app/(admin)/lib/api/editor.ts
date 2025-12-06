"use server";

import { sdk } from "@/app/lib/medusa/config";
import { getAuthHeaders } from "./auth";

import { Page } from "@/types/page";

// ...

/**
 * Get content page data by slug
 * This is used to load page content for display and editing
 */
export async function getPageContent({
  path,
  isDraft = false,
}: {
  path?: string | null;
  isDraft?: boolean;
}) {
  if (!path) {
    return null;
  }

  try {
    const headers = await getAuthHeaders();

    console.log("Getting page content with path: ", path);

    const response = await sdk.client.fetch<Page>(
      `/admin/content/pages/by-path?path=${encodeURIComponent(path)}&draft=${isDraft}`,
      {
        method: "GET",
        headers,
        cache: "no-store", // Always fetch fresh data
      },
    );

    console.log("response from get page content: ", response);

    return response;
  } catch (error: any) {
    // Check if it's a 404 error
    if (error?.status === 404 || error?.response?.status === 404) {
      return null;
    }
    console.error("Error fetching page content:", error);
    throw error;
  }
}

export type SavePageContentInput = Pick<
  Page,
  "slug" | "title" | "path" | "puckData"
> & {
  action: "draft" | "publish";
};

/**
 * Save or update content page
 * This is used by the Puck editor when user clicks "Publish"
 */
export async function savePageContent({
  slug,
  title,
  path,
  puckData,
  action,
}: SavePageContentInput) {
  try {
    const headers = await getAuthHeaders();

    // Check if authenticated before attempting save
    if (!("authorization" in headers)) {
      throw new Error(
        "You must be logged in as an admin to save content. Please login at the admin portal first.",
      );
    }

    const response = await sdk.client.fetch<Page>(`/admin/content/pages`, {
      method: "POST",
      headers,
      body: {
        slug,
        title,
        path,
        puckData,
        action,
      },
    });

    return response;
  } catch (error) {
    console.error("Error saving page content:", error);
    throw error;
  }
}

/**
 * Get all content pages
 */
export async function getPages() {
  try {
    const headers = await getAuthHeaders();

    const response = await sdk.client.fetch<{ pages: Page[] }>(
      `/admin/content/pages`,
      {
        method: "GET",
        headers,
        cache: "no-store",
      },
    );

    return response.pages;
  } catch (error) {
    console.error("Error fetching pages:", error);
    throw error;
  }
}

export type CreatePageInput = Pick<Page, "title" | "slug" | "type"> & {
  path?: string;
};

/**
 * Create a new content page
 */
export async function createPage({ title, slug, type, path }: CreatePageInput) {
  try {
    const headers = await getAuthHeaders();

    // Check if authenticated before attempting save
    if (!("authorization" in headers)) {
      throw new Error(
        "You must be logged in as an admin to create content. Please login at the admin portal first.",
      );
    }

    const response = await sdk.client.fetch<Page>(`/admin/content/pages`, {
      method: "POST",
      headers,
      body: {
        slug,
        title,
        type,
        path,
        puckData: {
          content: [],
          root: { props: { title } },
        },
        action: "draft",
      },
    });

    return response;
  } catch (error) {
    console.error("Error creating page:", error);
    throw error;
  }
}

/**
 * Delete a content page
 */
export async function deletePage(id: string) {
  try {
    const headers = await getAuthHeaders();

    // Check if authenticated
    if (!("authorization" in headers)) {
      throw new Error(
        "You must be logged in as an admin to delete content. Please login at the admin portal first.",
      );
    }

    const response = await sdk.client.fetch(`/admin/content/pages`, {
      method: "DELETE",
      headers,
      body: { id },
    });

    return response;
  } catch (error) {
    console.error("Error deleting page:", error);
    throw error;
  }
}

/**
 * Discard draft changes and revert to published version
 */
export async function discardDraft(id: string) {
  try {
    const headers = await getAuthHeaders();

    // Check if authenticated
    if (!("authorization" in headers)) {
      throw new Error(
        "You must be logged in as an admin to discard drafts. Please login at the admin portal first.",
      );
    }

    const response = await sdk.client.fetch(
      `/admin/content/pages/${id}/draft`,
      {
        method: "DELETE",
        headers,
      },
    );

    return response;
  } catch (error) {
    console.error("Error discarding draft:", error);
    throw error;
  }
}
