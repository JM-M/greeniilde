"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useState } from "react";
import { CreatePageForm } from "./create-page-form";

type Props = {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
};

export function CreatePageDialog({ children, onOpenChange }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <CreatePageForm onSuccess={() => handleOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
