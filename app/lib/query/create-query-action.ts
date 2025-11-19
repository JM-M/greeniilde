import type {
  MutationOptions,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

type QueryFn<TData, TVariables = void> = (
  variables: TVariables,
) => Promise<TData>;
type MutationFn<TData, TVariables> = (variables: TVariables) => Promise<TData>;

/**
 * Creates query utilities for a server action
 * Returns an object with queryKey and queryOptions methods
 * Similar to tRPC's pattern: action.queryKey(), action.queryOptions()
 */
export function createQueryAction<TData, TVariables = void>(
  fn: QueryFn<TData, TVariables>,
  baseKey: string[],
) {
  return {
    queryKey: (variables?: TVariables): QueryKey => {
      if (variables === undefined) {
        return [...baseKey] as QueryKey;
      }
      return [...baseKey, variables] as QueryKey;
    },
    queryOptions: (
      variables?: TVariables,
      options?: Omit<
        UseQueryOptions<TData, Error, TData, QueryKey>,
        "queryKey" | "queryFn"
      >,
    ): UseQueryOptions<TData, Error, TData, QueryKey> => {
      return {
        queryKey:
          variables === undefined
            ? ([...baseKey] as QueryKey)
            : ([...baseKey, variables] as QueryKey),
        queryFn: () => fn(variables as TVariables),
        ...options,
      };
    },
  };
}

/**
 * Creates suspense query utilities for a server action
 * Returns an object with queryKey and queryOptions methods
 * Similar to tRPC's pattern: action.queryKey(), action.queryOptions()
 * Designed specifically for useSuspenseQuery hooks
 */
export function createSuspenseQueryAction<TData, TVariables = void>(
  fn: QueryFn<TData, TVariables>,
  baseKey: string[],
) {
  return {
    queryKey: (variables?: TVariables): QueryKey => {
      if (variables === undefined) {
        return [...baseKey] as QueryKey;
      }
      return [...baseKey, variables] as QueryKey;
    },
    queryOptions: (
      variables?: TVariables,
      options?: Omit<
        UseSuspenseQueryOptions<TData, Error, TData, QueryKey>,
        "queryKey" | "queryFn"
      >,
    ): UseSuspenseQueryOptions<TData, Error, TData, QueryKey> => {
      return {
        queryKey:
          variables === undefined
            ? ([...baseKey] as QueryKey)
            : ([...baseKey, variables] as QueryKey),
        queryFn: () => fn(variables as TVariables),
        ...options,
      };
    },
  };
}

/**
 * Creates mutation utilities for a server action
 * Returns an object with mutationKey and mutationOptions methods
 */
export function createMutationAction<TData, TVariables>(
  fn: MutationFn<TData, TVariables>,
  baseKey: string[],
) {
  return {
    mutationKey: (): QueryKey => [...baseKey] as QueryKey,
    mutationOptions: (
      options?: Omit<
        UseMutationOptions<TData, Error, TVariables, unknown>,
        "mutationFn"
      >,
    ): MutationOptions<TData, Error, TVariables, unknown> => {
      return {
        mutationKey: [...baseKey] as QueryKey,
        mutationFn: fn,
        ...options,
      } as MutationOptions<TData, Error, TVariables, unknown>;
    },
  };
}
