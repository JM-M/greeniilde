import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export function ShippingSummaryCard() {
  // static mock content for UI only
  const recipient = "Alex Johnson";
  const line1 = "123 Market Street";
  const city = "San Francisco, CA";
  const contact = "alex@example.com";

  return (
    <Card className="p-4 md:p-5">
  <CardHeader className="px-0 py-0 grid-rows-1 gap-0 items-center">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          Shipping to
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="mt-2 text-sm">
          <div className="font-semibold">{recipient}</div>
          <div className="text-muted-foreground mt-1 truncate">
            {line1}, {city}
          </div>
          <div className="text-muted-foreground mt-1 truncate">{contact}</div>
        </div>
      </CardContent>
    </Card>
  );
}
