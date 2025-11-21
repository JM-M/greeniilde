"use client";

import { useIsMobile } from "@/app/hooks/use-mobile";
import { cn } from "@/app/lib/utils";
import { useLogout } from "@/app/modules/auth/hooks/use-auth-mutations";
import { useSuspenseCustomer } from "@/app/modules/auth/hooks/use-customer-queries";
import { useAuthModal } from "@/app/providers/auth-modal-provider";
import { LogOutIcon, UserCircleIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { Spinner } from "../../ui/spinner";

export const AuthButton = () => {
  const customer = useSuspenseCustomer();

  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const { openAuthModal } = useAuthModal();

  const isMobile = useIsMobile();

  if (customer)
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => logout()}
        disabled={isLoggingOut}
        className="text-background"
      >
        {isLoggingOut ? (
          <Spinner />
        ) : (
          <LogOutIcon className="size-5" strokeWidth={1.4} />
        )}
      </Button>
    );

  return (
    <Button
      variant="ghost"
      size={isMobile ? "icon" : "sm"}
      onClick={() => openAuthModal("login")}
      className={cn({ "text-primary bg-background": !isMobile })}
    >
      {isMobile ? (
        <UserCircleIcon className="size-5" strokeWidth={1.4} />
      ) : (
        "Login"
      )}
    </Button>
  );
};
