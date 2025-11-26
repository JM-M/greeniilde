"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { SinglePageCheckout } from "./single-page-checkout";

type BuyNowModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartId?: string | null;
};

export const BuyNowModal = ({
  open,
  onOpenChange,
  cartId,
}: BuyNowModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-4 lg:max-w-5xl!">
        <DialogHeader>
          <DialogTitle className="text-center">Buy Now</DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto">
          {cartId && <SinglePageCheckout cartId={cartId} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
