"use server";

import { REGION_ID } from "@/app/constants/api";
import { TerminalRate } from "@/app/modules/terminal/types";
import { HttpTypes } from "@medusajs/types";
import { sdk } from "../medusa/config";
import { getAuthHeaders } from "./auth";
import {
  getCartIdCookie,
  removeCartIdCookie,
  setCartIdCookie,
} from "./cookies";

export type RetrieveCartParams = { cartId?: string; fields?: string };

/**
 * Retrieves a cart by its ID. If no ID is provided, it will use the cart ID from the cookies.
 * @param cartId - optional - The ID of the cart to retrieve.
 * @returns The cart object if found, or null if not found.
 */
export async function retrieveCart({
  cartId,
  fields,
}: RetrieveCartParams = {}) {
  const id = cartId || (await getCartIdCookie());
  fields ??=
    "*items, *region, *items.product, *items.variant, *items.thumbnail, *items.metadata, +items.total, *promotions, +shipping_methods.name, +shipping_methods.data, *payment_collection, *payment_collection.payment_sessions";

  if (!id) {
    return null;
  }

  const headers = await getAuthHeaders();

  return await sdk.client
    .fetch<HttpTypes.StoreCartResponse>(`/store/carts/${id}`, {
      method: "GET",
      query: {
        fields,
      },
      headers,
    })
    .then(
      ({
        cart,
      }: {
        cart: HttpTypes.StoreCart & { completed_at?: string | null };
      }) => {
        if (!!cart.completed_at) return null;
        return cart;
      },
    )
    .catch(() => null);
}

export async function getOrSetCart() {
  let cart = await retrieveCart({ fields: "id,region_id" });

  if (!cart) {
    const cartResp = await sdk.store.cart.create(
      { region_id: REGION_ID },
      {},
      await getAuthHeaders(),
    );
    cart = cartResp.cart;
    await setCartIdCookie(cart.id);
  }

  if (cart && cart?.region_id !== REGION_ID) {
    await sdk.store.cart.update(
      cart.id,
      { region_id: REGION_ID },
      {},
      await getAuthHeaders(),
    );
  }

  return cart;
}

export type UpdateCartParams = {
  cartId: string;
  data: HttpTypes.StoreUpdateCart;
};

export async function updateCart({ cartId, data }: UpdateCartParams) {
  if (!cartId) {
    throw new Error(
      "No existing cart found, please create one before updating",
    );
  }

  const headers = await getAuthHeaders();

  return sdk.store.cart
    .update(cartId, data, {}, headers)
    .then(({ cart }: { cart: HttpTypes.StoreCart }) => {
      return cart;
    })
    .catch((error) => {
      throw new Error(`Failed to update cart: ${error.message}`);
    });
}

export type AddToCartParams = {
  variantId: string;
  quantity: number;
};

/**
 * Add item to cart
 */
export async function addToCart({ variantId, quantity }: AddToCartParams) {
  if (!variantId) {
    throw new Error("Missing variant ID when adding to cart");
  }

  const cart = await getOrSetCart();

  if (!cart) {
    throw new Error("Error retrieving or creating cart");
  }

  const headers = await getAuthHeaders();

  await sdk.store.cart
    .createLineItem(
      cart.id,
      {
        variant_id: variantId,
        quantity,
      },
      {},
      headers,
    )
    .catch((error) => {
      throw new Error(`Failed to add item to cart: ${error.message}`);
    });

  return { cart_id: cart.id };
}

export type UpdateLineItemParams = {
  lineId: string;
  quantity: number;
  cartId: string;
};

/**
 * Update cart line item
 */
export async function updateLineItem({
  lineId,
  quantity,
  cartId,
}: UpdateLineItemParams) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when updating line item");
  }

  if (!cartId) {
    throw new Error("Missing cart ID when updating line item");
  }

  const headers = await getAuthHeaders();

  await sdk.store.cart
    .updateLineItem(cartId, lineId, { quantity }, {}, headers)
    .catch((error) => {
      throw new Error(`Failed to update cart item: ${error.message}`);
    });
}

export type DeleteLineItemParams = {
  lineId: string;
  cartId: string;
};

/**
 * Remove cart line item
 */
export async function deleteLineItem({ lineId, cartId }: DeleteLineItemParams) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when deleting line item");
  }

  if (!cartId) {
    throw new Error("Missing cart ID when deleting line item");
  }

  const headers = await getAuthHeaders();

  await sdk.store.cart
    .deleteLineItem(cartId, lineId, undefined, headers)
    .catch((error) => {
      throw new Error(`Failed to remove cart item: ${error.message}`);
    });
}

export type SetShippingMethodParams = {
  cartId: string;
  shippingMethodId: string;
  data: {
    terminal_rate_id: string;
    terminal_shipment_id: string;
    terminal_rate: TerminalRate;
  };
};

/**
 * Set shipping method for cart
 */
export async function setShippingMethod({
  cartId,
  shippingMethodId,
  data,
}: SetShippingMethodParams) {
  const headers = await getAuthHeaders();

  return sdk.store.cart
    .addShippingMethod(
      cartId,
      {
        option_id: shippingMethodId,
        data,
      },
      {},
      headers,
    )
    .catch((error) => {
      throw new Error(`Failed to set shipping method: ${error.message}`);
    });
}

/**
 * Initiate payment session
 */
export async function initiatePaymentSession(
  cart: HttpTypes.StoreCart,
  data: HttpTypes.StoreInitializePaymentSession,
) {
  const headers = await getAuthHeaders();

  return sdk.store.payment
    .initiatePaymentSession(cart, data, {}, headers)
    .catch((error) => {
      throw new Error(`Failed to initiate payment session: ${error.message}`);
    });
}

export type ApplyPromotionsParams = {
  codes: string[];
  cartId: string;
};

/**
 * Apply promotions to cart
 */
export async function applyPromotions({
  codes,
  cartId,
}: ApplyPromotionsParams) {
  if (!cartId) {
    throw new Error("No existing cart found");
  }

  const headers = await getAuthHeaders();

  return sdk.store.cart
    .update(cartId, { promo_codes: codes }, {}, headers)
    .catch((error) => {
      throw new Error(`Failed to apply promotions: ${error.message}`);
    });
}

export type SetAddressesAddressInput = Omit<
  HttpTypes.StoreCartAddress,
  "id" | "created_at" | "updated_at"
>;

export type SetAddressesParams = {
  shipping_address: SetAddressesAddressInput;
  billing_address: SetAddressesAddressInput;
  email: string;
  cartId: string;
};

/**
 * Set cart addresses - requires authentication
 */
export async function setAddresses({
  shipping_address,
  billing_address,
  email,
  cartId,
}: SetAddressesParams) {
  try {
    if (!cartId) {
      throw new Error("No existing cart found when setting addresses");
    }

    await updateCart({
      cartId,
      data: {
        shipping_address,
        billing_address,
        email,
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to set addresses: ${error.message}`);
  }
}

/**
 * Places an order for a cart
 * @param cartId - optional - The ID of the cart to place an order for.
 * @returns The order object if successful.
 */
export async function placeOrder(cartId?: string) {
  if (!cartId) {
    throw new Error("No existing cart found when placing an order");
  }

  const headers = await getAuthHeaders();

  const cartRes = await sdk.store.cart
    .complete(cartId, {}, headers)
    .catch((error) => {
      throw new Error(`Failed to place order: ${error.message}`);
    });

  if (cartRes?.type === "order") {
    removeCartIdCookie();
    return cartRes;
  }

  return cartRes;
}

export type CreateBuyNowCartParams = {
  product_id: string;
  variant_id: string;
};

/**
 * Create a buy now cart
 */
export async function createBuyNowCart({
  product_id,
  variant_id,
}: CreateBuyNowCartParams) {
  const headers = await getAuthHeaders();

  const cartResp = await sdk.store.cart.create(
    {
      region_id: REGION_ID,
      metadata: {
        is_buy_now: true,
      },
    },
    {},
    headers,
  );

  await sdk.store.cart.createLineItem(
    cartResp.cart.id,
    {
      variant_id,
      quantity: 1,
    },
    {},
    headers,
  );

  return cartResp.cart;
}

export async function listCartShippingOptions(cartId: string) {
  const headers = await getAuthHeaders();

  return sdk.store.fulfillment
    .listCartOptions(
      {
        cart_id: cartId,
      },
      headers,
    )
    .then(({ shipping_options }) => shipping_options)
    .catch((error) => {
      throw new Error(`Failed to list cart shipping options: ${error.message}`);
    });
}
