"use client";

import { PhoneCall } from "lucide-react";
import Link from "next/link";

import { CopyButton } from "@/app/components/shared/copy-button";
import { Button } from "@/app/components/ui/button";
import { siteConfig } from "@/app/site.config";

export const ContactCallChannel = () => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-3 sm:justify-between">
      <div className="flex items-start gap-4">
        <span className="bg-primary/10 text-primary flex size-12 min-w-12 items-center justify-center rounded-2xl">
          <PhoneCall className="size-5" />
        </span>
        <div className="space-y-1">
          <div>
            <p className="text-foreground text-lg font-semibold">
              Call the project desk
            </p>
            <div className="flex items-center gap-2">
              <p className="text-primary/80 text-sm font-medium">
                {siteConfig.displayPhone}
              </p>
              <CopyButton text={siteConfig.phone} />
            </div>
            <p className="text-muted-foreground text-xs">
              Mon-Sat · 8am-6pm WAT
            </p>
          </div>
        </div>
      </div>
      <Button asChild size="lg" className="mt-5 h-12 w-full px-8">
        <Link href={`tel:${siteConfig.phone}`}>
          Call {siteConfig.displayPhone}
        </Link>
      </Button>
    </div>
    <p className="text-muted-foreground text-sm">
      Prefer a scheduled call? Email{" "}
      <Link
        href={`mailto:${siteConfig.email}`}
        className="text-primary underline-offset-4 hover:underline"
      >
        {siteConfig.email}
      </Link>{" "}
      with your availability.
    </p>
  </div>
);
