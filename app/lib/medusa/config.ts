import Medusa from "@medusajs/js-sdk";

// Defaults to standard port for Medusa server
export const sdk = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL!,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  auth: {
    type: "session",
  },
  globalHeaders: {
    // TODO: Do this properly
    "x-store-id": process.env.NEXT_PUBLIC_STORE_ID!,
  },
});
