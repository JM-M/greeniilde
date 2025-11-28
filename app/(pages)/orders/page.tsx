import { AuthGuard } from "@/app/modules/auth/components/auth-guard";
import { OrdersView } from "@/app/modules/orders/ui/views/orders-view";

export default function OrdersPage() {
  return (
    <AuthGuard>
      <OrdersView />
    </AuthGuard>
  );
}
