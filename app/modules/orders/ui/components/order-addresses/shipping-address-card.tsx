import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export function ShippingAddressCard() {
  // Static mock content for UI only
  const name = "Alex Johnson";
  const line1 = "123 Market Street";
  const line2 = "Apt 4B";
  const cityStateZip = "San Francisco, CA 94103";
  const country = "United States";
  const contact = "alex@example.com";

  return (
    <Card className="p-4 md:p-5" aria-label="Shipping address">
      <CardHeader className="px-0 py-0 grid-rows-1 gap-0">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          Shipping address
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="mt-2 text-sm">
          <div className="font-semibold">{name}</div>
          <div className="mt-1">{line1}</div>
          <div>{line2}</div>
          <div>{cityStateZip}</div>
          <div className="text-muted-foreground">{country}</div>
          <div className="text-muted-foreground mt-2 truncate">{contact}</div>
        </div>
      </CardContent>
    </Card>
  );
}


