// E-commerce disabled: returning 404
// Original imports and content preserved below for re-enabling

import { notFound } from "next/navigation";

// import { CheckoutConfirmationView } from "@/app/modules/checkout/ui/views/checkout-confirmation-view";

// type CheckoutConfirmationPageProps = {
//   searchParams: Promise<{ orderId?: string }>;
// };

// const CheckoutConfirmationPage = async ({
//   searchParams,
// }: CheckoutConfirmationPageProps) => {
//   const params = await searchParams;
//   const orderId = params.orderId;

//   return <CheckoutConfirmationView orderId={orderId} />;
// };

const CheckoutConfirmationPage = () => {
  notFound();
};

export default CheckoutConfirmationPage;
