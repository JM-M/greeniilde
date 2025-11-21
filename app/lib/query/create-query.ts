import type {
  InfiniteData,
  MutationOptions,
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

type QueryFn<TData, TVariables = void> = (
  variables: TVariables,
) => Promise<TData>;
type MutationFn<TData, TVariables> = (variables: TVariables) => Promise<TData>;

type InfiniteQueryFn<TData, TVariables = void, TPageParam = unknown> = (
  variables: TVariables,
  pageParam: TPageParam,
) => Promise<TData>;

/**
 * Creates query utilities for a server action
 * Returns an object with queryKey and queryOptions methods
 * Similar to tRPC's pattern: action.queryKey(), action.queryOptions()
 */
export function createQuery<TData, TVariables = void>(
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
export function createSuspenseQuery<TData, TVariables = void>(
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
 * Creates infinite query utilities for a server action
 * Returns an object with queryKey and queryOptions methods
 */
export function createInfiniteQuery<
  TData,
  TVariables = void,
  TPageParam = unknown,
>(fn: InfiniteQueryFn<TData, TVariables, TPageParam>, baseKey: string[]) {
  return {
    queryKey: (variables?: TVariables): QueryKey => {
      if (variables === undefined) {
        return [...baseKey] as QueryKey;
      }
      return [...baseKey, variables] as QueryKey;
    },
    queryOptions: <TSelectData = InfiniteData<TData>>(
      variables: TVariables,
      options: Omit<
        UseInfiniteQueryOptions<
          TData,
          Error,
          TSelectData,
          QueryKey,
          TPageParam
        >,
        "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
      > & {
        initialPageParam: TPageParam;
        getNextPageParam: (
          lastPage: TData,
          allPages: TData[],
          lastPageParam: TPageParam,
          allPageParams: TPageParam[],
        ) => TPageParam | undefined | null;
      },
    ): UseInfiniteQueryOptions<
      TData,
      Error,
      TSelectData,
      QueryKey,
      TPageParam
    > => {
      return {
        queryKey:
          variables === undefined
            ? ([...baseKey] as QueryKey)
            : ([...baseKey, variables] as QueryKey),
        queryFn: ({ pageParam }: { pageParam?: unknown }) =>
          fn(variables as TVariables, pageParam as TPageParam),
        ...options,
      };
    },
  };
}

/**
 * Creates suspense infinite query utilities for a server action
 * Returns an object with queryKey and queryOptions methods
 */
export function createSuspenseInfiniteQuery<
  TData,
  TVariables = void,
  TPageParam = unknown,
>(fn: InfiniteQueryFn<TData, TVariables, TPageParam>, baseKey: string[]) {
  return {
    queryKey: (variables?: TVariables): QueryKey => {
      if (variables === undefined) {
        return [...baseKey] as QueryKey;
      }
      return [...baseKey, variables] as QueryKey;
    },
    queryOptions: <TSelectData = InfiniteData<TData>>(
      variables: TVariables,
      options: Omit<
        UseSuspenseInfiniteQueryOptions<
          TData,
          Error,
          TSelectData,
          QueryKey,
          TPageParam
        >,
        "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
      > & {
        initialPageParam: TPageParam;
        getNextPageParam: (
          lastPage: TData,
          allPages: TData[],
          lastPageParam: TPageParam,
          allPageParams: TPageParam[],
        ) => TPageParam | undefined | null;
      },
    ): UseSuspenseInfiniteQueryOptions<
      TData,
      Error,
      TSelectData,
      QueryKey,
      TPageParam
    > => {
      return {
        queryKey:
          variables === undefined
            ? ([...baseKey] as QueryKey)
            : ([...baseKey, variables] as QueryKey),
        queryFn: ({ pageParam }: { pageParam?: unknown }) =>
          fn(variables as TVariables, pageParam as TPageParam),
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
