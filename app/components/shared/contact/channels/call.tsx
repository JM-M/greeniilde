"use client";

import Link from "next/link";
import { PhoneCall } from "lucide-react";

import { Button } from "@/app/components/ui/button";

const phoneNumber = "+2348065653807";
const displayPhoneNumber = "+234 806 565 3807";

export const ContactCallChannel = () => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-3 sm:justify-between">
      <div className="flex items-start gap-4">
        <span className="bg-primary/10 text-primary flex size-12 min-w-12 items-center justify-center rounded-2xl">
          <PhoneCall className="size-5" />
        </span>
        <div className="space-y-1">
          <div>
            <p className="text-lg font-semibold text-foreground">
              Call the project desk
            </p>
            <p className="text-sm font-medium text-primary/80">
              Mon–Fri · 8a–6p WAT
            </p>
          </div>
        </div>
      </div>
      <Button asChild size="lg" className="h-12 px-8 w-full mt-5">
        <Link href={`tel:${phoneNumber}`}>Call {displayPhoneNumber}</Link>
      </Button>
    </div>
    <p className="text-sm text-muted-foreground">
      Prefer a scheduled call? Email{" "}
      <Link
        href="mailto:projects@greeniilde.com"
        className="text-primary underline-offset-4 hover:underline"
      >
        projects@greeniilde.com
      </Link>{" "}
      with your availability.
    </p>
  </div>
);
