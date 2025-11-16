"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/app/components/ui/dialog";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Contact } from "../contact";

type PrimaryCtaDialogProps = {
  title: string;
  description: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const PrimaryCtaDialog = ({
  title,
  description,
  isOpen,
  onOpenChange,
}: PrimaryCtaDialogProps) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-primary">
          {title}
        </DialogTitle>
        <DialogDescription className="text-muted-foreground">
          {description}
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="max-h-[80vh] pr-2">
        <Contact />
      </ScrollArea>
    </DialogContent>
  </Dialog>
);
