import Link from "next/link";
import { SiX, SiTiktok, SiInstagram, SiFacebook } from "react-icons/si";
import { Button } from "@/app/components/ui/button";
import { siteConfig } from "@/app/site.config";

const socialLinks = [
  { href: siteConfig.links.x, label: "X", icon: SiX },
  { href: siteConfig.links.tiktok, label: "TikTok", icon: SiTiktok },
  { href: siteConfig.links.instagram, label: "Instagram", icon: SiInstagram },
  { href: siteConfig.links.facebook, label: "Facebook", icon: SiFacebook },
];

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-8">
      <div className="container mx-auto flex flex-col gap-6 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-foreground">
            {siteConfig.name}
          </p>
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
        <div className="flex gap-2">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <Button key={label} variant="ghost" size="icon" asChild>
              <Link href={href} aria-label={label}>
                <Icon />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
};
