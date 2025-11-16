"use client";

import Link from "next/link";
import { SiWhatsapp } from "react-icons/si";

import { Button } from "@/app/components/ui/button";
import { siteConfig } from "@/app/site.config";

export const ContactWhatsappChannel = () => (
  <div className="flex flex-col gap-3 sm:justify-between">
    <div className="flex items-start gap-4">
      <span className="bg-primary/10 text-primary flex size-12 min-w-12 items-center justify-center rounded-2xl">
        <SiWhatsapp className="size-5" />
      </span>
      <div className="space-y-1">
        <p className="text-lg font-semibold text-foreground">
          WhatsApp Concierge
        </p>
        <p className="text-sm font-medium text-primary/80">
          Replies in 5 minutes
        </p>
      </div>
    </div>
    <Button asChild size="lg" className="h-12 px-8 w-full mt-5">
      <Link href={siteConfig.links.whatsapp} target="_blank" rel="noreferrer">
        Continue in WhatsApp
      </Link>
    </Button>
  </div>
);
