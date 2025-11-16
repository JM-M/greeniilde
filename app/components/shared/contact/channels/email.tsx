"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

import { Button } from "@/app/components/ui/button";

const emailAddress = "projects@greeniilde.com";

export const ContactEmailChannel = () => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-3 sm:justify-between">
      <div className="flex items-start gap-4">
        <span className="bg-primary/10 text-primary flex size-12 min-w-12 items-center justify-center rounded-2xl">
          <Mail className="size-5" />
        </span>
        <div className="space-y-1">
          <div>
            <p className="text-lg font-semibold text-foreground">
              Email our project desk
            </p>
            <p className="text-sm font-medium text-primary/80">
              Same-day response
            </p>
          </div>
        </div>
      </div>
      <Button asChild size="lg" className="h-12 px-8 w-full mt-5">
        <Link href={`mailto:${emailAddress}`} target="_blank" rel="noreferrer">
          Email project desk
        </Link>
      </Button>
    </div>
  </div>
);
