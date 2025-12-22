// E-commerce disabled: returning 404
// Original imports and content preserved below for re-enabling

import { notFound } from "next/navigation";

// import { CheckoutView } from "@/app/modules/checkout/ui/views/checkout-view";

// const CheckoutPage = () => {
//   return <CheckoutView />;
// };

const CheckoutPage = () => {
  notFound();
};

export default CheckoutPage;
