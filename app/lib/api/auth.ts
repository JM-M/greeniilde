"use server";

import { cookies as nextCookies } from "next/headers";
import "server-only";

/**
 * Get authentication headers for storefront API calls
 * Returns headers object that can be passed to SDK methods
 * For storefront, authentication is typically session-based
 */
export const getAuthHeaders = async (): Promise<
  { authorization: string } | {}
> => {
  try {
    const cookies = await nextCookies();
    // Storefront uses different cookie name than admin
    const token = cookies.get("_medusa_jwt")?.value;

    if (!token) {
      return {};
    }

    return { authorization: `Bearer ${token}` };
  } catch {
    return {};
  }
};

/**
 * Set customer authentication token
 * Used after customer login/registration
 */
export const setAuthToken = async (token: string) => {
  const cookies = await nextCookies();
  cookies.set("_medusa_jwt", token, {
    maxAge: 60 * 60 * 24 * 30, // 30 days for customers
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

/**
 * Remove customer authentication token
 * Used during customer logout
 */
export const removeAuthToken = async () => {
  const cookies = await nextCookies();
  cookies.set("_medusa_jwt", "", {
    maxAge: -1,
  });
};

/**
 * Guard function that returns authenticated headers if the customer is authenticated,
 * or throws an error if not. Use this in actions that require customer authentication.
 */
export const requireAuthHeaders = async (): Promise<{
  authorization: string;
}> => {
  const authHeaders = await getAuthHeaders();

  if (!authHeaders || !("authorization" in authHeaders)) {
    throw new Error("Authentication required");
  }

  return authHeaders;
};
