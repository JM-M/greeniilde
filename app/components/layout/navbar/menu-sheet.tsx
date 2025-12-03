"use client";

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

type MenuSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MenuSheet({ open, onOpenChange }: MenuSheetProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-3/4 max-w-xs">
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
        </nav>
      </SheetContent>
    </Sheet>
  );
}
