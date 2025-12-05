"use server";

import { sdk } from "@/app/lib/medusa/config";
import { getAuthHeaders } from "./auth";

// TODO: Implement proper types

/**
 * Get content page data by slug
 * This is used to load page content for display and editing
 */
export async function getPageContent(slug: string) {
  try {
    const headers = await getAuthHeaders();

    const response = await sdk.client.fetch<any>(
      `/admin/content/pages?slug=${encodeURIComponent(slug)}`,
      {
        method: "GET",
        headers,
        cache: "no-store", // Always fetch fresh data
      },
    );

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

export type SavePageContentInput = {
  slug: string;
  title: string;
  puckData: any;
  status: "draft" | "published";
};

/**
 * Save or update content page
 * This is used by the Puck editor when user clicks "Publish"
 */
export async function savePageContent({
  slug,
  title,
  puckData,
  status,
}: SavePageContentInput) {
  try {
    const headers = await getAuthHeaders();

    // Check if authenticated before attempting save
    if (!("authorization" in headers)) {
      throw new Error(
        "You must be logged in as an admin to save content. Please login at the admin portal first.",
      );
    }

    const response = await sdk.client.fetch<any>(`/admin/content/pages`, {
      method: "POST",
      headers,
      body: {
        slug,
        title,
        puckData,
        status,
      },
    });

    return response;
  } catch (error) {
    console.error("Error saving page content:", error);
    throw error;
  }
}
