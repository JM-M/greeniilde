"use server";

import { getAuthHeaders } from "./auth";

/**
 * Server actions for content pages API
 * These call the Medusa backend to fetch and save Puck editor content
 */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

/**
 * Get content page data by slug
 * This is used to load page content for display and editing
 */
export async function getPageContent(slug: string) {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(
      `${BACKEND_URL}/admin/content/pages?slug=${encodeURIComponent(slug)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers, // Add auth headers
        },
        cache: "no-store", // Always fetch fresh data
      },
    );

    console.log(response.status);

    if (response.status === 404) {
      // Page doesn't exist yet
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching page content:", error);
    throw error;
  }
}

/**
 * Save or update content page
 * This is used by the Puck editor when user clicks "Publish"
 */
export async function savePageContent(
  slug: string,
  title: string,
  puckData: any,
  status: "draft" | "published" = "published",
) {
  try {
    const headers = await getAuthHeaders();

    // Check if authenticated before attempting save
    if (!("authorization" in headers)) {
      throw new Error(
        "You must be logged in as an admin to save content. Please login at the admin portal first.",
      );
    }

    const response = await fetch(`${BACKEND_URL}/admin/content/pages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers, // Add auth headers
      },
      body: JSON.stringify({
        slug,
        title,
        puckData,
        status,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to save page: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving page content:", error);
    throw error;
  }
}
