import { CheckoutConfirmationView } from "@/app/modules/checkout/ui/views/checkout-confirmation-view";

type CheckoutConfirmationPageProps = {
  searchParams: Promise<{ orderId?: string }>;
};

const CheckoutConfirmationPage = async ({
  searchParams,
}: CheckoutConfirmationPageProps) => {
  const params = await searchParams;
  const orderId = params.orderId;

  return <CheckoutConfirmationView orderId={orderId} />;
};

export default CheckoutConfirmationPage;
