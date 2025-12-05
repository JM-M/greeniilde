"use server";

import { cookies as nextCookies } from "next/headers";
import "server-only";

/**
 * Get authentication headers for admin API calls
 * Returns headers object that can be passed to SDK methods
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
 * Set admin authentication token
 * Used after admin login
 */
export const setAuthToken = async (token: string) => {
  const cookies = await nextCookies();
  cookies.set("_medusa_admin_jwt", token, {
    maxAge: 60 * 60 * 24, // 24 hours
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

/**
 * Set session cookie
 * Used after admin login to persist the connect.sid
 */
export const setSessionCookie = async (sessionId: string) => {
  const cookies = await nextCookies();
  cookies.set("connect.sid", sessionId, {
    maxAge: 60 * 60 * 24, // 24 hours
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

/**
 * Remove admin authentication token
 * Used during admin logout
 */
export const removeAuthToken = async () => {
  const cookies = await nextCookies();
  cookies.set("_medusa_admin_jwt", "", {
    maxAge: -1,
  });
};

/**
 * Remove session cookie
 * Used during admin logout
 */
export const removeSessionCookie = async () => {
  const cookies = await nextCookies();
  cookies.set("connect.sid", "", {
    maxAge: -1,
  });
};

/**
 * Guard function that returns authenticated headers if the admin is authenticated,
 * or throws an error if not. Use this in actions that require admin authentication.
 */
export const requireAuthHeaders = async (): Promise<{
  authorization: string;
}> => {
  const authHeaders = await getAuthHeaders();

  if (!authHeaders || !("authorization" in authHeaders)) {
    throw new Error("Authentication required");
  }

  return authHeaders as { authorization: string };
};

/**
 * Get authenticated admin user
 * Returns user if authenticated, null otherwise
 * Validates the token by making an actual API call
 */
export const getUser = async () => {
  try {
    const headers = await getAuthHeaders();
    const { sdk } = await import("@/app/lib/medusa/config");
    return await sdk.admin.user.me({}, headers);
  } catch (error) {
    return null;
  }
};

/**
 * Login user with email and password
 * Sets JWT token and session cookie
 */
export const login = async (input: { email: string; password: string }) => {
  try {
    const { sdk } = await import("@/app/lib/medusa/config");

    const token = await sdk.auth.login("user", "emailpass", {
      email: input.email,
      password: input.password,
    });

    // Capture the session cookie from the response headers
    const response = await fetch(`${process.env.BACKEND_URL}/auth/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      const sessionId = setCookieHeader
        .split(";")
        .find((c) => c.trim().startsWith("connect.sid="))
        ?.split("=")[1];

      if (sessionId) {
        await setSessionCookie(sessionId);
      }
    }

    await setAuthToken(token as string);

    return token;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout user
 * Removes JWT token and session cookie
 */
export const logout = async () => {
  try {
    const { sdk } = await import("@/app/lib/medusa/config");
    await sdk.auth.logout();
  } catch (error) {
    // Ignore error
  }
  await removeAuthToken();
  await removeSessionCookie();
};
