import { PageTitle } from "@/app/components/shared/page-title";
import { FulfillmentGroupsList } from "@/app/modules/orders/ui/components/fulfillment-groups/fulfillment-groups-list";
import { BillingAddressCard } from "@/app/modules/orders/ui/components/order-addresses/billing-address-card";
import { ShippingAddressCard } from "@/app/modules/orders/ui/components/order-addresses/shipping-address-card";
import { OrderItemsList } from "@/app/modules/orders/ui/components/order-items/order-items-list";
import { OrderNotes } from "@/app/modules/orders/ui/components/order-notes";
import { OrderStatusTimeline } from "@/app/modules/orders/ui/components/order-status-timeline";
import { DeliverySummaryCard } from "@/app/modules/orders/ui/components/order-summary/delivery-summary-card";
import { PaymentSummaryCard } from "@/app/modules/orders/ui/components/order-summary/payment-summary-card";
import { ShippingSummaryCard } from "@/app/modules/orders/ui/components/order-summary/shipping-summary-card";
import { OrderTotals } from "@/app/modules/orders/ui/components/order-totals";

export const OrderDetailsView = () => {
  const orderId = "A3F9D2";
  const statusLabel = "Shipped";
  const orderDate = "Nov 12, 2025";
  const totalFormatted = "$148.00";

  return (
    <div className="view-container">
      <PageTitle
        title={`Order #${orderId}`}
        subtitle={`${statusLabel} • ${orderDate} • ${totalFormatted}`}
      />
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <OrderStatusTimeline />
        </div>
        <div>
          <OrderTotals className="h-full" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <ShippingSummaryCard />
        <DeliverySummaryCard />
        <PaymentSummaryCard />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <FulfillmentGroupsList />
        </div>
        <div>
          <OrderItemsList className="h-full" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <ShippingAddressCard />
        <BillingAddressCard />
      </div>
      <div>
        <OrderNotes />
      </div>
    </div>
  );
};
