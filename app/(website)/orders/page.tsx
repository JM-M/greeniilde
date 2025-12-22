// E-commerce disabled: returning 404
// Original imports and content preserved below for re-enabling

import { notFound } from "next/navigation";

// import { OrdersView } from "@/app/modules/orders/ui/views/orders-view";

// export default function OrdersPage() {
//   return <OrdersView />;
// }

export default function OrdersPage() {
  notFound();
}
