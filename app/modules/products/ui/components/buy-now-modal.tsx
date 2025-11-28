"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Suspense, useState } from "react";
import {
  SinglePageCheckout,
  SinglePageCheckoutSkeleton,
} from "../../../checkout/ui/components/single-page-checkout";

type BuyNowModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartId?: string | null;
  isLoading?: boolean;
};

export const BuyNowModal = ({
  open,
  onOpenChange,
  cartId,
  isLoading,
}: BuyNowModalProps) => {
  const [isPaystackModalOpen, setIsPaystackModalOpen] = useState(false);

  let content = <SinglePageCheckoutSkeleton />;
  if (!isLoading && cartId) {
    content = (
      <Suspense fallback={<SinglePageCheckoutSkeleton />}>
        <SinglePageCheckout
          cartId={cartId}
          onPaystackOpen={() => setIsPaystackModalOpen(true)}
          onPaystackSettled={() => setIsPaystackModalOpen(false)}
        />
      </Suspense>
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      modal={!isPaystackModalOpen}
    >
      <DialogContent className="p-4 lg:max-w-5xl!">
        <DialogHeader>
          <DialogTitle className="text-center">Buy Now</DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto">{content}</div>
      </DialogContent>
    </Dialog>
  );
};
