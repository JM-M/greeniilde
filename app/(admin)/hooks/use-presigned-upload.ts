"use client";

import {
  getPresignedUploadUrl,
  PresignedUploadRequest,
} from "@/app/(admin)/lib/api/files";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export type UploadedFile = {
  /** The permanent URL where the file is accessible */
  url: string;
  /** The original file name */
  name: string;
  /** The file's MIME type */
  mimeType: string;
  /** File size in bytes */
  size: number;
};

type PresignedUploadResult = {
  files: UploadedFile[];
};

type PresignedUploadVariables = {
  files: File[];
};

/**
 * Get the S3 file base URL from environment.
 * This should be configured as NEXT_PUBLIC_S3_FILE_URL in your .env
 */
const getS3FileBaseUrl = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_S3_FILE_URL;
  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_S3_FILE_URL is not configured. Add it to your .env file.",
    );
  }
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
};

/**
 * Upload a single file using a presigned URL.
 * 1. Gets presigned URL from Medusa backend
 * 2. Uploads directly to S3
 * 3. Returns the permanent file URL
 */
const uploadFileWithPresignedUrl = async (
  file: File,
): Promise<UploadedFile> => {
  // Step 1: Get presigned URL from Medusa
  const presignedRequest: PresignedUploadRequest = {
    name: file.name,
    mimeType: file.type,
    size: file.size,
    access: "public",
  };

  const presignedResponse = await getPresignedUploadUrl(presignedRequest);

  // Step 2: Upload directly to S3
  const uploadResponse = await fetch(presignedResponse.url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!uploadResponse.ok) {
    throw new Error(
      `Failed to upload ${file.name}: ${uploadResponse.statusText}`,
    );
  }

  // Step 3: Construct the permanent file URL
  const s3BaseUrl = getS3FileBaseUrl();
  const permanentUrl = `${s3BaseUrl}/${presignedResponse.filename}`;

  return {
    url: permanentUrl,
    name: file.name,
    mimeType: file.type,
    size: file.size,
  };
};

/**
 * Hook for uploading files directly to S3 using presigned URLs.
 * This bypasses server action file size limits by uploading directly to S3.
 */
export const usePresignedUpload = (
  options?: Omit<
    UseMutationOptions<PresignedUploadResult, Error, PresignedUploadVariables>,
    "mutationFn"
  >,
) => {
  return useMutation<PresignedUploadResult, Error, PresignedUploadVariables>({
    mutationFn: async ({ files }) => {
      const uploadedFiles = await Promise.all(
        files.map((file) => uploadFileWithPresignedUrl(file)),
      );
      return { files: uploadedFiles };
    },
    ...options,
  });
};
