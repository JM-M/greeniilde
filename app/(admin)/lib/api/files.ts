"use server";

import { sdk } from "@/app/lib/medusa/config";
import { HttpTypes } from "@medusajs/types";
import { getAuthHeaders } from "./auth";

export const uploadFiles = async (
  formData: FormData,
): Promise<HttpTypes.AdminFileListResponse> => {
  const files = formData.getAll("files") as File[];
  const headers = await getAuthHeaders();

  return await sdk.admin.upload.create({ files }, {}, headers);
};
