"use client";

import { login } from "@/app/(editor)/lib/api/auth";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { authMutations } from "../mutations";

export const useLogin = (
  options?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof login>>,
      Error,
      Parameters<typeof login>[0]
    >,
    "mutationFn" | "mutationKey"
  >,
) => {
  return useMutation(
    authMutations.login.mutationOptions({
      ...options,
      onSuccess: (data, variables, context) => {
        (options?.onSuccess as any)?.(data, variables, context);
      },
    }),
  );
};
