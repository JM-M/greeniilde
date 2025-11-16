"use client";

import { siteConfig } from "@/app/site.config";
import Link from "next/link";
import { Button } from "../../ui/button";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useActiveIndicator } from "./use-active-indicator";

export const Navbar = () => {
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

  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-transparent px-4  supports-backdrop-filter:backdrop-blur-xl text-background">
      <nav className="container mx-auto flex items-center min-h-14 gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Open navigation menu"
          className="md:hidden"
        >
          <MenuIcon />
        </Button>
        <Link href="/" className="text-2xl font-bold">
          {siteConfig.name}
        </Link>
        <div className="relative ml-auto hidden md:flex items-center h-14 gap-6 text-sm font-medium">
          {siteConfig.nav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors h-full px-2 flex items-center hover:text-background text-background/80"
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
            >
              {item.title}
            </Link>
          ))}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-0 block h-0.5 rounded-full bg-background transition-all duration-300"
            style={{
              width: `${styles.width}px`,
              transform: `translateX(${styles.left}px)`,
            }}
          />
        </div>
      </nav>
    </div>
  );
};
