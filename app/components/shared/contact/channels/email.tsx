"use client";

import { Mail } from "lucide-react";
import Link from "next/link";

import { CopyButton } from "@/app/components/shared/copy-button";
import { Button } from "@/app/components/ui/button";
import { siteConfig } from "@/app/site.config";

export const ContactEmailChannel = () => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-3 sm:justify-between">
      <div className="flex items-start gap-4">
        <span className="bg-primary/10 text-primary flex size-12 min-w-12 items-center justify-center rounded-2xl">
          <Mail className="size-5" />
        </span>
        <div className="space-y-1">
          <div>
            <p className="text-foreground text-lg font-semibold">
              Email our project desk
            </p>
            <div className="flex items-center gap-2">
              <p className="text-primary/80 text-sm font-medium">
                {siteConfig.email}
              </p>
              <CopyButton text={siteConfig.email} />
            </div>
            <p className="text-muted-foreground text-xs">Same-day response</p>
          </div>
        </div>
      </div>
      <Button asChild size="lg" className="mt-5 h-12 w-full px-8">
        <Link
          href={`mailto:${siteConfig.email}`}
          target="_blank"
          rel="noreferrer"
        >
          Email project desk
        </Link>
      </Button>
    </div>
  </div>
);
