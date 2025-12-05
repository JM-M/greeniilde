"use server";

import { cookies as nextCookies } from "next/headers";

/**
 * Get authentication headers from admin session
 * Reuses the admin JWT and session cookies
 */
export const getAuthHeaders = async (): Promise<
  { authorization: string; Cookie?: string } | {}
> => {
  try {
    const cookies = await nextCookies();
    const token = cookies.get("_medusa_admin_jwt")?.value;
    const sessionId = cookies.get("connect.sid")?.value;

    if (!token) {
      return {};
    }

    const headers: { authorization: string; Cookie?: string } = {
      authorization: `Bearer ${token}`,
    };

    if (sessionId) {
      headers.Cookie = `connect.sid=${sessionId}`;
    }

    return headers;
  } catch {
    return {};
  }
};

/**
 * Check if user is authenticated
 * Returns true if admin JWT token exists
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const headers = await getAuthHeaders();
  return "authorization" in headers;
};

/**
 * Require authentication - throws if not authenticated
 */
export const requireAuth = async () => {
  const authed = await isAuthenticated();
  if (!authed) {
    throw new Error("Authentication required. Please login via admin first.");
  }
};
