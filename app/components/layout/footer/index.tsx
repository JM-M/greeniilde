import Link from "next/link";
import { siteConfig } from "@/app/site.config";

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-8">
      <div className="container mx-auto flex flex-col gap-6 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-foreground">{siteConfig.name}</p>
          <p className="mt-1">{siteConfig.description}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="flex gap-3">
          <Link
            href={siteConfig.links.twitter}
            className="transition-colors hover:text-foreground"
          >
            Twitter
          </Link>
          <Link
            href={siteConfig.links.github}
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
};

