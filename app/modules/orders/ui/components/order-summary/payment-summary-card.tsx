import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export function PaymentSummaryCard() {
  // static mock content for UI only
  const method = "Visa •••• 4242";
  const total = "$148.00";
  const paid = true;

  return (
    <Card className="p-4 md:p-5">
  <CardHeader className="px-0 py-0 grid-rows-1 gap-0 items-center">
        <div className="flex items-center justify-between">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Payment
          </CardTitle>
          {paid ? (
            <Badge className="border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-300">
              Paid
            </Badge>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="mt-2 text-sm">
          <div className="font-semibold">{method}</div>
          <div className="mt-1">
            <span className="text-muted-foreground">Total:</span>{" "}
            <span className="font-semibold">{total}</span>
          </div>
          <div className="mt-2">
            <Button variant="link" size="sm" className="px-0">
              View invoice
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
