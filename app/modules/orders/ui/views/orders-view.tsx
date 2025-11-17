import { PageTitle } from "@/app/components/shared/page-title";
import { OrdersList } from "@/app/modules/orders/ui/components/orders-list";

export const OrdersView = () => {
  return (
    <div className="view-container">
      <PageTitle title="Orders" />
      <div className="mt-4">
        <OrdersList />
      </div>
    </div>
  );
};


