import { OrderDetailsView } from "@/app/(admin)/modules/orders/ui/views/order-details-view";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailsPage({ params }: PageProps) {
  const { id } = await params;
  return <OrderDetailsView orderId={id} />;
}
