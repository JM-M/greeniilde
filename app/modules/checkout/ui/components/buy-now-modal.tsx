"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

type BuyNowModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const BuyNowModal = ({ open, onOpenChange }: BuyNowModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl! p-4">
        <DialogHeader>
          <DialogTitle className="text-center">Buy Now</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
