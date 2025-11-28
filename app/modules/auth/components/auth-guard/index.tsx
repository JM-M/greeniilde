import { Suspense } from "react";
import { AuthGuardContent } from "./content";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  return (
    <Suspense fallback={fallback || <div>Loading...</div>}>
      <AuthGuardContent>{children}</AuthGuardContent>
    </Suspense>
  );
};
