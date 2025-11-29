import { Badge } from "@/app/components/ui/badge";

export const PaymentStatusBadge = ({ status }: { status: string }) => {
  return <Badge className="capitalize">{status.replaceAll("_", " ")}</Badge>;
};
