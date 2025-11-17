import { PageTitle } from "@/app/components/shared/page-title";
import { CheckoutStepRouter } from "@/app/modules/checkout/ui/components/checkout-step-router";
import { CheckoutStepsBreadcrumb } from "@/app/modules/checkout/ui/components/checkout-steps-breadcrumb";

export const CheckoutView = () => {
  return (
    <div className="view-container">
      <PageTitle title="Checkout" />
      <CheckoutStepsBreadcrumb />
      <div className="mt-4">
        <CheckoutStepRouter />
      </div>
    </div>
  );
};
