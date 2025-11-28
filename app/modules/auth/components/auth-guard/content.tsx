"use client";

import { useSuspenseCustomer } from "../../hooks/use-customer-queries";
import { AuthGuardEmptyState } from "./empty-state";

interface AuthGuardContentProps {
  children: React.ReactNode;
}

export const AuthGuardContent = ({ children }: AuthGuardContentProps) => {
  const customer = useSuspenseCustomer();

  if (!customer) {
    return <AuthGuardEmptyState />;
  }

  return <>{children}</>;
};
