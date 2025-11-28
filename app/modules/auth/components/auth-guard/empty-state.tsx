import { Button } from "@/app/components/ui/button";
import { useAuthModal } from "@/app/providers/auth-modal-provider";
import { LockIcon } from "lucide-react";

export const AuthGuardEmptyState = () => {
  const { openAuthModal } = useAuthModal();

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-y-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border">
        <LockIcon className="text-muted-foreground h-8 w-8" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Login Required
        </h2>
        <p className="text-muted-foreground">
          You must be logged in to view your order history.
        </p>
      </div>
      <Button onClick={() => openAuthModal("login")} className="mt-4">
        Login to Continue
      </Button>
    </div>
  );
};
