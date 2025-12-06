"use client";

import {
  createPage,
  CreatePageInput,
  savePageContent,
  SavePageContentInput,
} from "@/app/(admin)/lib/api/editor";
import { editorMutations } from "@/app/(admin)/modules/editor/mutations";
import { editorQueries } from "@/app/(admin)/modules/editor/queries";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useSavePageContent = (
  options?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof savePageContent>>,
      Error,
      Parameters<typeof savePageContent>[0]
    > & {
      onSuccess: (
        data: Awaited<ReturnType<typeof savePageContent>>,
        variables?: SavePageContentInput,
        context?: unknown,
      ) => void;
      onError: (
        error: Error,
        variables?: SavePageContentInput,
        context?: unknown,
      ) => void;
    },
    "mutationFn" | "mutationKey"
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    editorMutations.savePageContent.mutationOptions({
      ...options,
      onSuccess: (data, variables, context) => {
        // Invalidate page content to refetch with updated data
        queryClient.invalidateQueries({
          queryKey: editorQueries.getPageContent.queryKey(variables.path),
        });

        toast.success("Page content saved successfully!");
        options?.onSuccess?.(data, variables, context);
      },
      onError: (error, variables, context) => {
        console.error("Failed to save page content:", error);
        toast.error("Failed to save page content. Please try again.");
        options?.onError?.(error, variables, context);
      },
    }),
  );
};

export const useCreatePage = (
  options?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof createPage>>,
      Error,
      Parameters<typeof createPage>[0]
    > & {
      onSuccess: (
        data: Awaited<ReturnType<typeof createPage>>,
        variables?: CreatePageInput,
        context?: unknown,
      ) => void;
      onError: (
        error: Error,
        variables?: CreatePageInput,
        context?: unknown,
      ) => void;
    },
    "mutationFn" | "mutationKey"
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    editorMutations.createPage.mutationOptions({
      ...options,
      onSuccess: (data, variables, context) => {
        // Invalidate pages list to show new page
        queryClient.invalidateQueries({
          queryKey: editorQueries.getPages.queryKey(),
        });

        toast.success("Page created successfully!");
        options?.onSuccess?.(data, variables, context);
      },
      onError: (error, variables, context) => {
        console.error("Failed to create page:", error);
        toast.error("Failed to create page. Please try again.");
        options?.onError?.(error, variables, context);
      },
    }),
  );
};

// Re-export editorMutations for convenience
export { editorMutations } from "../mutations";
