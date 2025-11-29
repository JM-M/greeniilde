import { AuthGuard } from "@/app/modules/auth/components/auth-guard";
import {
  OrdersViewClient,
  OrdersViewClientSkeleton,
} from "./orders-view-client";

export const OrdersView = () => {
  return (
    <AuthGuard fallback={<OrdersViewClientSkeleton />}>
      <OrdersViewClient />
    </AuthGuard>
  );
};
