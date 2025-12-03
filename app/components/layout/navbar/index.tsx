"use client";

import { cn } from "@/app/lib/utils";
import { siteConfig } from "@/app/site.config";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../../ui/button";
import { AuthButton } from "./auth-button";
import { CartButton } from "./cart-button";
import { CartSheet } from "./cart-sheet";
import { MenuSheet } from "./menu-sheet";
import { useActiveIndicator } from "./use-active-indicator";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const activeIndex = useMemo(() => {
    const index = siteConfig.nav.findIndex((item) => {
      if (pathname === "/") return item.href === "/";
      if (item.href !== "/") return pathname.startsWith(item.href);
      return false;
    });
    return index === -1 ? 0 : index;
  }, [pathname]);

  const { itemRefs, styles } = useActiveIndicator(activeIndex);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { rootMargin: "-1px 0px 0px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const shouldDarkenBg = isScrolled || pathname !== "/";

  return (
    <>
      {/* TODO: Add a fallback for the cart sheet */}
      <Suspense fallback={<></>}>
        <CartSheet className="text-background ml-auto md:ml-0" />
      </Suspense>
      <MenuSheet open={isMenuOpen} onOpenChange={setIsMenuOpen} />
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-white/10 px-4 transition-colors supports-backdrop-filter:backdrop-blur-xl",
          shouldDarkenBg
            ? "bg-primary/80 shadow-md"
            : "text-background bg-transparent",
        )}
      >
        <nav className="container mx-auto flex min-h-14 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Open navigation menu"
              className="text-background md:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <MenuIcon />
            </Button>
            <Link href="/" className="text-background text-2xl font-bold">
              {siteConfig.name}
            </Link>
          </div>
          <div className="relative hidden h-14 items-center gap-6 text-sm font-medium md:flex">
            {siteConfig.nav.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-background text-background/80 flex h-full items-center px-2 transition-colors"
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
              >
                {item.title}
              </Link>
            ))}
            <span
              aria-hidden
              className="bg-background pointer-events-none absolute bottom-0 block h-0.5 rounded-full transition-all duration-300"
              style={{
                width: `${styles.width}px`,
                transform: `translateX(${styles.left}px)`,
              }}
            />
          </div>
          <div className="flex items-center gap-4 md:ml-0">
            {/* TODO: Add a fallback for the cart button */}
            <Suspense fallback={<></>}>
              <CartButton className="text-background" />
            </Suspense>
            <Suspense fallback={<></>}>
              <AuthButton />
            </Suspense>
          </div>
        </nav>
      </div>
      <div ref={sentinelRef} className="h-px" aria-hidden />
    </>
  );
};
