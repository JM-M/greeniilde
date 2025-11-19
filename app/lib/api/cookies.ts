"use server";

import { cookies as nextCookies } from "next/headers";

/**
 * Cart cookie management functions
 */
const CART_COOKIE_NAME = "_medusa_cart_id";

export const getCartIdCookie = async (): Promise<string | undefined> => {
  const cookies = await nextCookies();
  return cookies.get(CART_COOKIE_NAME)?.value;
};

export const setCartIdCookie = async (cartId: string) => {
  const cookies = await nextCookies();
  cookies.set(CART_COOKIE_NAME, cartId, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export const removeCartIdCookie = async () => {
  const cookies = await nextCookies();
  cookies.set(CART_COOKIE_NAME, "", {
    maxAge: -1,
  });
};
