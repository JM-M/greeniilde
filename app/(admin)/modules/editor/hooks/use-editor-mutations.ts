"use client";

import {
  createPage,
  CreatePageInput,
  deletePage,
  discardDraft,
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
      Parameters<typeof savePageContent>[0],
      { previousPage: unknown }
    > & {
      onSuccess: (
        data: Awaited<ReturnType<typeof savePageContent>>,
        variables?: SavePageContentInput,
        context?: { previousPage: unknown },
      ) => void;
      onError: (
        error: Error,
        variables?: SavePageContentInput,
        context?: { previousPage: unknown },
      ) => void;
    },
    "mutationFn" | "mutationKey"
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    editorMutations.savePageContent.mutationOptions({
      ...options,
      onMutate: async (variables) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({
          queryKey: editorQueries.getPageContent.queryKey({
            path: variables.path,
            isDraft: true,
          }),
        });

        // Snapshot the previous value
        const previousPage = queryClient.getQueryData(
          editorQueries.getPageContent.queryKey({
            path: variables.path,
            isDraft: true,
          }),
        );

        // Optimistically update to the new value
        queryClient.setQueryData(
          editorQueries.getPageContent.queryKey({
            path: variables.path,
            isDraft: true,
          }),
          (old: any) => {
            if (!old) return old;
            return {
              ...old,
              ...variables,
              _status: variables.action === "publish" ? "published" : "draft",
            };
          },
        );

        // Return a context object with the snapshotted value
        return { previousPage };
      },
      onSuccess: (data, variables, context) => {
        toast.success("Page content saved successfully!");
        options?.onSuccess?.(
          data,
          variables,
          context as { previousPage: unknown },
        );
      },
      onError: (error, variables, context) => {
        console.error("Failed to save page content:", error);
        toast.error("Failed to save page content. Please try again.");

        // If the mutation fails, use the context returned from onMutate to roll back
        if ((context as any)?.previousPage) {
          queryClient.setQueryData(
            editorQueries.getPageContent.queryKey({
              path: variables.path,
              isDraft: true,
            }),
            (context as any).previousPage,
          );
        }

        options?.onError?.(
          error,
          variables,
          context as { previousPage: unknown },
        );
      },
      onSettled: (data, error, variables) => {
        // Always refetch after error or success:
        queryClient.invalidateQueries({
          queryKey: editorQueries.getPageContent.queryKey({
            path: variables.path,
            isDraft: true,
          }),
        });
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

export const useDeletePage = (
  options?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof deletePage>>,
      Error,
      string
    > & {
      onSuccess: (
        data: Awaited<ReturnType<typeof deletePage>>,
        variables?: string,
        context?: unknown,
      ) => void;
      onError?: (error: Error, variables?: string, context?: unknown) => void;
    },
    "mutationFn" | "mutationKey"
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    editorMutations.deletePage.mutationOptions({
      ...options,
      onSuccess: (data, variables, context) => {
        // Invalidate pages list
        queryClient.invalidateQueries({
          queryKey: editorQueries.getPages.queryKey(),
        });

        toast.success("Page deleted successfully!");
        options?.onSuccess?.(data, variables, context);
      },
      onError: (error, variables, context) => {
        console.error("Failed to delete page:", error);
        toast.error("Failed to delete page. Please try again.");
        options?.onError?.(error, variables, context);
      },
    }),
  );
};

export type DiscardDraftInput = {
  id: string;
  path: string;
};

export const useDiscardDraft = (
  options?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof discardDraft>>,
      Error,
      DiscardDraftInput
    > & {
      onSuccess: (
        data: any,
        variables?: DiscardDraftInput,
        context?: unknown,
      ) => void;
      onError?: (
        error: Error,
        variables?: DiscardDraftInput,
        context?: unknown,
      ) => void;
    },
    "mutationFn" | "mutationKey"
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: editorMutations.discardDraft.mutationKey(),
    mutationFn: async (input: DiscardDraftInput) => {
      return await discardDraft(input.id);
    },
    onSuccess: (data, variables, context) => {
      toast.success("Draft discarded successfully!");
      options?.onSuccess?.(data, variables, context);

      // TODO: Dont reload, use optimistic update and qeury invalidation instead.
      // Reload the page to fetch fresh data from the backend
      window.location.reload();
    },
    onError: (error, variables, context) => {
      console.error("Failed to discard draft:", error);
      toast.error("Failed to discard draft. Please try again.");
      options?.onError?.(error, variables, context);
    },
  });
};
