import { CheckoutSuccess } from "@/app/modules/checkout/ui/components/checkout-success";

type CheckoutConfirmationViewProps = {
  orderId?: string;
};

export const CheckoutConfirmationView = ({
  orderId,
}: CheckoutConfirmationViewProps) => {
  return (
    <div className="view-container">
      <CheckoutSuccess orderId={orderId} />
    </div>
  );
};
