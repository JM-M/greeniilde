import Medusa from "@medusajs/js-sdk";
import "server-only";

// Defaults to standard port for Medusa server
if (!process.env.BACKEND_URL) {
  throw new Error("BACKEND_URL is not defined");
}

export const sdk = new Medusa({
  baseUrl: process.env.BACKEND_URL!,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.MEDUSA_PUBLISHABLE_KEY,
  auth: {
    type: "session",
  },
  globalHeaders: {
    // TODO: Do this properly
    "x-store-id": process.env.STORE_ID!,
  },
});
