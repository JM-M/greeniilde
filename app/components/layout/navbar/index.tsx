import { siteConfig } from "@/app/site.config";
import Link from "next/link";
import { Button } from "../../ui/button";
import { MenuIcon } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="bg-background sticky top-0 z-50 min-h-12 p-4">
      <nav className="container mx-auto flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Open navigation menu"
        >
          <MenuIcon />
        </Button>
        <Link href="/" className="text-2xl font-bold">
          {siteConfig.name}
        </Link>
        <div className="ml-auto flex items-center gap-6 text-sm font-medium">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};
