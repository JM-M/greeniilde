import config from "@payload-config";
import { getPayload } from "payload";

/**
 * Get the Payload CMS client instance.
 * Use this in server components and server actions to query collections directly.
 */
export const getPayloadClient = async () => {
  return await getPayload({ config });
};
