"use client";

import { cn } from "@/app/lib/utils";
import { siteConfig } from "@/app/site.config";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
// E-commerce disabled: hiding cart and auth buttons
// import { AuthButton } from "./auth-button";
// import { CartButton } from "./cart-button";
// import { CartSheet } from "./cart-sheet";
import { PrimaryCta } from "@/app/components/shared/primary-cta/button";
import { MenuSheet } from "./menu-sheet";
import { useActiveIndicator } from "./use-active-indicator";
import { useActiveSectionIndex } from "./use-active-section-index";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();
  const { activeSectionIndex, setActiveIndex } = useActiveSectionIndex();

  const { itemRefs, styles } = useActiveIndicator(activeSectionIndex);

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
      {/* E-commerce disabled: cart sheet hidden
      <Suspense fallback={<></>}>
        <CartSheet className="text-background ml-auto md:ml-0" />
      </Suspense>
      */}
      <Suspense fallback={<></>}>
        <MenuSheet open={isMenuOpen} onOpenChange={setIsMenuOpen} />
      </Suspense>
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
                onClick={() => setActiveIndex(index)}
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
            <PrimaryCta label="Get a free quote" className="h-10 text-sm" />
          </div>
        </nav>
      </div>
      <div ref={sentinelRef} className="h-px" aria-hidden />
    </>
  );
};
