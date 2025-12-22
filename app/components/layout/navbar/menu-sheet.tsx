"use client";

// E-commerce disabled: simplified menu sheet without cart/auth
// Original imports and content preserved below for re-enabling

import { Button } from "@/app/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/components/ui/sheet";
import { siteConfig } from "@/app/site.config";
import Link from "next/link";
import { usePathname } from "next/navigation";

// E-commerce imports - hidden
// import { useCartSheet } from "@/app/contexts/cart-sheet-context";
// import { useLogout } from "@/app/modules/auth/hooks/use-auth-mutations";
// import { useSuspenseCustomer } from "@/app/modules/auth/hooks/use-customer-queries";
// import { useAuthModal } from "@/app/providers/auth-modal-provider";

type MenuSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MenuSheet({ open, onOpenChange }: MenuSheetProps) {
  const pathname = usePathname();

  // E-commerce hooks - hidden
  // const customer = useSuspenseCustomer();
  // const { openAuthModal } = useAuthModal();
  // const { setOpen: setCartOpen } = useCartSheet();
  // const { mutate: logout } = useLogout();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-3/4 max-w-xs px-3">
        <SheetHeader className="text-left">
          <SheetTitle className="text-xl font-bold">
            {siteConfig.name}
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 py-6">
          {siteConfig.nav.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className="justify-start text-base font-medium"
            >
              <Link
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={pathname === item.href ? "text-primary" : ""}
              >
                {item.title}
              </Link>
            </Button>
          ))}

          {/* E-commerce menu items - hidden
          <Button
            variant="ghost"
            className="justify-start text-base font-medium"
            onClick={() => {
              onOpenChange(false);
              setCartOpen(true);
            }}
          >
            Cart
          </Button>

          {customer ? (
            <>
              <Button
                variant="ghost"
                asChild
                className="justify-start text-base font-medium"
              >
                <Link href="/orders" onClick={() => onOpenChange(false)}>
                  History
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-base font-medium"
                onClick={() => {
                  logout();
                  onOpenChange(false);
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              className="justify-start text-base font-medium"
              onClick={() => {
                onOpenChange(false);
                openAuthModal("login");
              }}
            >
              Login
            </Button>
          )}
          */}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
