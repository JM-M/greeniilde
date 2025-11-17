import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export function DeliverySummaryCard() {
  // static mock content for UI only
  const status = "Shipped";
  const primary = "Arrives Tue, Nov 18";
  const method = "Standard · 3–5 days";
  const trackingId = "1Z 999 AA1 01 2345 6784";

  return (
    <Card className="p-4 md:p-5">
  <CardHeader className="px-0 py-0 grid-rows-1 gap-0 items-center">
        <div className="flex items-center justify-between">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Delivery
          </CardTitle>
          <Badge className="border-transparent bg-blue-100 text-blue-800 dark:bg-blue-400/20 dark:text-blue-300">
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="mt-2 text-sm">
          <div className="font-semibold">{primary}</div>
          <div className="text-muted-foreground mt-1">{method}</div>
          <div className="text-muted-foreground mt-2 truncate">
            Tracking: {trackingId}
          </div>
          <div className="mt-2">
            <Button variant="link" size="sm" className="px-0">
              Track package
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
