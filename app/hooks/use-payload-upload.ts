"use client";

import { useCallback, useState } from "react";

interface UsePayloadUploadOptions {
  collectionSlug?: string;
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
  onProgress?: (progress: number) => void;
}

interface UsePayloadUploadReturn {
  upload: (file: File) => Promise<string>;
  isUploading: boolean;
  progress: number;
  error: Error | null;
}

export function usePayloadUpload({
  collectionSlug = "media",
  onSuccess,
  onError,
  onProgress,
}: UsePayloadUploadOptions = {}): UsePayloadUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const upload = useCallback(
    async (file: File): Promise<string> => {
      setIsUploading(true);
      setProgress(0);
      setError(null);

      try {
        // Step 1: Get presigned URL from Payload
        const response = await fetch("/api/storage-s3-generate-signed-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            collectionSlug,
            filename: file.name,
            mimeType: file.type,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to get upload URL: ${errorText}`);
        }

        const { url: presignedUrl } = await response.json();

        // Step 2: Upload directly to S3 using XHR for progress tracking
        const permanentUrl = await new Promise<string>((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percent = Math.round((event.loaded / event.total) * 100);
              setProgress(percent);
              onProgress?.(percent);
            }
          };

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              // Extract permanent URL (strip query params)
              resolve(presignedUrl.split("?")[0]);
            } else {
              reject(new Error(`S3 upload failed: ${xhr.statusText}`));
            }
          };

          xhr.onerror = () => {
            reject(new Error("Network error during upload"));
          };

          xhr.open("PUT", presignedUrl);
          xhr.setRequestHeader("Content-Type", file.type);
          xhr.send(file);
        });

        setProgress(100);
        onSuccess?.(permanentUrl);
        return permanentUrl;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        onError?.(error);
        throw error;
      } finally {
        setIsUploading(false);
      }
    },
    [collectionSlug, onSuccess, onError, onProgress],
  );

  return { upload, isUploading, progress, error };
}
