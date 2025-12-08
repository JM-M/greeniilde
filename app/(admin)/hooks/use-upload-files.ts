"use client";

import { uploadFiles } from "@/app/(admin)/lib/api/files";
import { createMutationAction } from "@/app/lib/query/create-query";
import { useMutation } from "@tanstack/react-query";

// Create mutation action utility
const uploadFilesAction = createMutationAction(uploadFiles, [
  "files",
  "uploadFiles",
]);

// Mutation hook
export const useUploadFiles = () => {
  return useMutation(uploadFilesAction.mutationOptions());
};

// Export action utility for easy access to mutation keys
export const fileActions = {
  uploadFiles: uploadFilesAction,
} as const;
