"use client";

import { login, logout, register } from "@/app/lib/api/customer";
import { authQueries } from "@/app/modules/auth/queries";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

const invalidateCustomer = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: authQueries.retrieveCustomer.queryKey(),
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (typeof data === "string") {
        toast.error(data);
        return;
      }
      invalidateCustomer(queryClient);
      toast.success("Logged in successfully");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error("Login failed");
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (typeof data === "string") {
        toast.error(data);
        return;
      }
      invalidateCustomer(queryClient);
      toast.success("Account created successfully");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      toast.error("Registration failed");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      invalidateCustomer(queryClient);
      toast.success("Logged out successfully");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    },
  });
};
