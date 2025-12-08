"use server";
import { removeAuthToken, setAuthToken } from "@/app/lib/api/auth";
import { getCartIdCookie, removeCartIdCookie } from "@/app/lib/api/cookies";
import { sdk } from "@/app/lib/medusa/config";
import { HttpTypes } from "@medusajs/types";
// import { revalidateTag } from "next/cache";
import { getAuthHeaders } from "./auth";

export const retrieveCustomer = async () => {
  const headers = await getAuthHeaders();

  if (!headers || !("authorization" in headers)) {
    return null;
  }

  return await sdk.client
    .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
      method: "GET",
      query: {
        fields: "*orders",
      },
      headers,
      // TODO: Add caching
    })
    .then(({ customer }) => customer)
    .catch(() => null);
};

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const token = await sdk.auth.login("customer", "emailpass", {
    email,
    password,
  });

  await setAuthToken(token as string);
  // TODO: Add caching
  // revalidateTag("customer");

  // Transfer cart if exists
  const cartId = await getCartIdCookie();
  if (cartId) {
    await sdk.store.cart
      .transferCart(cartId, {}, { authorization: `Bearer ${token}` })
      .catch(() => {
        // Ignore transfer errors
      });
  }
}

export async function register({ email, password, firstName, lastName }: any) {
  try {
    // 1. Register with auth provider
    const token = await sdk.auth.register("customer", "emailpass", {
      email,
      password,
    });

    await setAuthToken(token as string);

    // 2. Create customer in store
    await sdk.store.customer.create(
      {
        email,
        first_name: firstName,
        last_name: lastName,
      },
      {},
      { authorization: `Bearer ${token}` },
    );

    // 3. Login to get a fresh token
    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email,
      password,
    });

    await setAuthToken(loginToken as string);
    // TODO: Add caching
    // revalidateTag("customer");

    // Transfer cart if exists
    const cartId = await getCartIdCookie();
    if (cartId) {
      await sdk.store.cart
        .transferCart(cartId, {}, { authorization: `Bearer ${loginToken}` })
        .catch(() => {
          // Ignore transfer errors
        });
    }
  } catch (error: any) {
    return error.toString();
  }

  return { success: true };
}

export async function logout() {
  try {
    await sdk.auth.logout();
  } catch {
    // Ignore logout errors
  }
  await removeAuthToken();
  await removeCartIdCookie();
  // TODO: Add caching
  // revalidateTag("customer");
}
