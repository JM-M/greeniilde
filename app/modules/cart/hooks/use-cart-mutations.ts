"use client";

import {
  addToCart,
  createCartWithChannel,
  deleteLineItem,
  initiatePaymentSession,
  placeOrder,
  setShippingMethod,
  updateCart,
  updateLineItem,
  type AddToCartParams,
  type CreateCartWithChannelParams,
  type DeleteLineItemParams,
  type SetShippingMethodParams,
  type UpdateCartParams,
  type UpdateLineItemParams,
} from "@/app/lib/api/cart";
import { cartMutations } from "@/app/modules/cart/mutations";
import { cartQueries } from "@/app/modules/cart/queries";
import { HttpTypes, StoreCart } from "@medusajs/types";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

// Shared invalidation logic
const invalidateCart = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: cartQueries.retrieveCart.queryKey(),
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AddToCartParams) => addToCart(params),
    onMutate: async ({ variantId, quantity }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: cartQueries.retrieveCart.queryKey(),
      });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData<StoreCart>(
        cartQueries.retrieveCart.queryKey(),
      );

      // Note: Without product data, we can't do detailed optimistic updates
      // In a full implementation, you'd want to pass product data for optimistic updates

      // Return a context object with the snapshotted value
      return { previousCart };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCart) {
        queryClient.setQueryData(
          cartQueries.retrieveCart.queryKey(),
          context.previousCart,
        );
      }
      console.error("Failed to add item to cart:", err);
      toast.error("Failed to add item to cart");
    },
    onSuccess: () => {
      invalidateCart(queryClient);
      toast.success("Item added to cart");
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateLineItemParams) => updateLineItem(params),
    onMutate: async ({ lineId, quantity }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: cartQueries.retrieveCart.queryKey(),
      });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData<StoreCart>(
        cartQueries.retrieveCart.queryKey(),
      );

      if (previousCart && previousCart.items) {
        // Optimistically update the cart
        const optimisticCart: StoreCart = {
          ...previousCart,
          items: previousCart.items.map((item) => {
            if (item.id === lineId) {
              const newItemTotal = (item.unit_price || 0) * quantity;
              return {
                ...item,
                quantity,
                total: newItemTotal,
              };
            }
            return item;
          }),
        };

        // Recalculate cart subtotal
        const newSubtotal =
          optimisticCart.items?.reduce(
            (sum, item) => sum + (item.total || 0),
            0,
          ) || 0;

        optimisticCart.subtotal = newSubtotal;

        // Update the cache optimistically
        queryClient.setQueryData(
          cartQueries.retrieveCart.queryKey(),
          optimisticCart,
        );
      }

      // Return a context object with the snapshotted value
      return { previousCart };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCart) {
        queryClient.setQueryData(
          cartQueries.retrieveCart.queryKey(),
          context.previousCart,
        );
      }
      console.error("Failed to update cart item:", err);
      toast.error("Failed to update cart item");
    },
    onSuccess: () => {
      invalidateCart(queryClient);
      toast.success("Cart item updated");
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteLineItemParams) => deleteLineItem(params),
    onMutate: async ({ lineId }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: cartQueries.retrieveCart.queryKey(),
      });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData<StoreCart>(
        cartQueries.retrieveCart.queryKey(),
      );

      if (previousCart && previousCart.items) {
        // Find the item being removed to calculate its total
        const itemToRemove = previousCart.items.find(
          (item) => item.id === lineId,
        );
        const removedItemTotal = itemToRemove?.total || 0;

        // Optimistically update the cart by removing the item
        const optimisticCart: StoreCart = {
          ...previousCart,
          items: previousCart.items.filter((item) => item.id !== lineId),
          subtotal: (previousCart.subtotal || 0) - removedItemTotal,
        };

        // Update the cache optimistically
        queryClient.setQueryData(
          cartQueries.retrieveCart.queryKey(),
          optimisticCart,
        );
      }

      // Return a context object with the snapshotted value
      return { previousCart };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCart) {
        queryClient.setQueryData(
          cartQueries.retrieveCart.queryKey(),
          context.previousCart,
        );
      }
      console.error("Failed to remove cart item:", err);
      toast.error("Failed to remove cart item");
    },
    onSuccess: () => {
      invalidateCart(queryClient);
      toast.success("Item removed from cart");
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateCartParams) => updateCart(params),
    onSuccess: () => {
      invalidateCart(queryClient);
      toast.success("Cart updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update cart:", error);
      toast.error("Failed to update cart");
    },
  });
};

export const useSetCartAddresses = () => {
  const queryClient = useQueryClient();

  return useMutation(
    cartMutations.setCartAddresses.mutationOptions({
      onSuccess: () => {
        invalidateCart(queryClient);
        toast.success("Addresses updated successfully");
      },
      onError: (error) => {
        console.error("Failed to set addresses:", error);
        toast.error("Failed to update addresses");
      },
    }),
  );
};

export const useSetCartShippingMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SetShippingMethodParams) => setShippingMethod(params),
    onSuccess: () => {
      invalidateCart(queryClient);
      toast.success("Shipping method updated successfully");
    },
    onError: (error) => {
      console.error("Failed to set shipping method:", error);
      toast.error("Failed to update shipping method");
    },
  });
};

export const useInitiatePaymentSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cart,
      data,
    }: {
      cart: HttpTypes.StoreCart;
      data: HttpTypes.StoreInitializePaymentSession;
    }) => initiatePaymentSession(cart, data),
    onSuccess: () => {
      invalidateCart(queryClient);
      toast.success("Payment session initiated successfully");
    },
    onError: (error) => {
      console.error("Failed to initiate payment session:", error);
      toast.error("Failed to initiate payment session");
    },
  });
};

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartId?: string) => placeOrder(cartId),
    onSuccess: () => {
      invalidateCart(queryClient);
      toast.success("Order placed successfully");
    },
    onError: (error) => {
      console.error("Failed to place order:", error);
      toast.error("Failed to place order");
    },
  });
};

export const useCreateChannelCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateCartWithChannelParams) =>
      createCartWithChannel(params),
    onSuccess: () => {
      invalidateCart(queryClient);
      toast.success("Cart created successfully");
    },
    onError: (error) => {
      console.error("Failed to create cart:", error);
      toast.error("Failed to create cart");
    },
  });
};
