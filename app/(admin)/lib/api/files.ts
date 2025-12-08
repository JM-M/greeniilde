"use server";

import { sdk } from "@/app/lib/medusa/config";
import { HttpTypes } from "@medusajs/types";
import { getAuthHeaders } from "./auth";

export type PresignedUploadRequest = {
  /** Original file name */
  name: string;
  /** MIME type (e.g., "image/jpeg") */
  mimeType: string;
  /** File size in bytes */
  size: number;
  /** Access level, defaults to "public" */
  access?: "public" | "private";
};

/**
 * Get a presigned URL for direct S3 upload.
 * The client can then PUT the file directly to S3 using this URL.
 */
export const getPresignedUploadUrl = async (
  file: PresignedUploadRequest,
): Promise<HttpTypes.AdminUploadPreSignedUrlResponse> => {
  const headers = await getAuthHeaders();
  return await sdk.admin.upload.presignedUrl(
    {
      originalname: file.name,
      mime_type: file.mimeType,
      size: file.size,
      access: file.access ?? "public",
    },
    {},
    headers,
  );
};
