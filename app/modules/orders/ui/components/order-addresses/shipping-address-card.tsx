import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import { StoreOrder } from "@medusajs/types";

export function ShippingAddressCard({ order }: { order: StoreOrder }) {
  const { shipping_address } = order;

  if (!shipping_address) {
    return null;
  }

  const {
    first_name,
    last_name,
    address_1,
    address_2,
    city,
    province,
    postal_code,
    country_code,
    phone,
  } = shipping_address;

  return (
    <Card className="p-4 md:p-5" aria-label="Shipping address">
      <CardHeader className="grid-rows-1 gap-0 px-0 py-0">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          Shipping address
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="mt-2 text-sm">
          <div className="font-semibold">{`${first_name} ${last_name}`}</div>
          <div className="mt-1">{address_1}</div>
          {address_2 && <div>{address_2}</div>}
          <div>{`${city}, ${province ? `${province} ` : ""}${postal_code}`}</div>
          <div className="text-muted-foreground uppercase">{country_code}</div>
          {phone && (
            // TODO: Format the number in a way that allow for other codes
            <div className="text-muted-foreground mt-2 truncate">
              +234{phone}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

import { Skeleton } from "@/app/components/ui/skeleton";

export function ShippingAddressCardSkeleton() {
  return (
    <Card className="p-4 md:p-5">
      <CardHeader className="grid-rows-1 gap-0 px-0 py-0">
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent className="px-0">
        <div className="mt-2 flex flex-col gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}
