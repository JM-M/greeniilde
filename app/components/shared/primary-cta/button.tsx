"use client";

import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";

import { PrimaryCtaDialog } from "./dialog";

type PrimaryCtaProps = {
  label: string;
  className?: string;
};

export const PrimaryCta = ({ label, className }: PrimaryCtaProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        className={cn("h-14 w-full sm:w-auto", className)}
        onClick={() => setIsDialogOpen(true)}
      >
        {label}
      </Button>

      <PrimaryCtaDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={label}
        description="Please fill in the form below to book a project consult."
      />
    </>
  );
};
