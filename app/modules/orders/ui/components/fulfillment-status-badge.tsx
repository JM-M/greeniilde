import { Badge } from "@/app/components/ui/badge";

export const FulfillmentStatusBadge = ({ status }: { status: string }) => {
  return <Badge className="capitalize">{status.replaceAll("_", " ")}</Badge>;
};
