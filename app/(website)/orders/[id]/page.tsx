// E-commerce disabled: returning 404
// Original imports and content preserved below for re-enabling

import { notFound } from "next/navigation";

// import { OrderDetailsView } from "@/app/modules/orders/ui/views/order-details-view";

// export default function OrderDetailsPage() {
//   return <OrderDetailsView />;
// }

export default function OrderDetailsPage() {
  notFound();
}
