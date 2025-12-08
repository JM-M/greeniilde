import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { cn } from "@/app/lib/utils";
import { HttpTypes } from "@medusajs/types";

type OrderCustomerCardProps = {
  order: HttpTypes.AdminOrder;
  className?: string;
};

const formatAddress = (address: HttpTypes.AdminOrderAddress | null) => {
  if (!address) return null;

  const lines = [
    address.address_1,
    address.address_2,
    [address.city, address.province, address.postal_code]
      .filter(Boolean)
      .join(", "),
    address.country_code?.toUpperCase(),
  ].filter(Boolean);

  return lines;
};

const AddressSection = ({
  label,
  address,
  fallback,
}: {
  label: string;
  address: HttpTypes.AdminOrderAddress | null;
  fallback?: React.ReactNode;
}) => {
  const lines = formatAddress(address);
  const name = address
    ? `${address.first_name || ""} ${address.last_name || ""}`.trim()
    : null;

  return (
    <div className="space-y-1">
      <p className="text-muted-foreground text-xs font-medium uppercase">
        {label}
      </p>
      {lines && lines.length > 0 ? (
        <div className="text-sm">
          {name && <p className="font-medium">{name}</p>}
          {lines.map((line, i) => (
            <p key={i} className="text-muted-foreground">
              {line}
            </p>
          ))}
        </div>
      ) : (
        fallback || (
          <p className="text-muted-foreground text-sm">No address provided</p>
        )
      )}
    </div>
  );
};

const addressesMatch = (
  a: HttpTypes.AdminOrderAddress | null,
  b: HttpTypes.AdminOrderAddress | null,
) => {
  if (!a || !b) return false;
  return (
    a.address_1 === b.address_1 &&
    a.address_2 === b.address_2 &&
    a.city === b.city &&
    a.province === b.province &&
    a.postal_code === b.postal_code &&
    a.country_code === b.country_code
  );
};

export const OrderCustomerCard = ({
  order,
  className,
}: OrderCustomerCardProps) => {
  const customerName = order.shipping_address
    ? `${order.shipping_address.first_name || ""} ${order.shipping_address.last_name || ""}`.trim()
    : null;

  const isBillingSameAsShipping = addressesMatch(
    order.shipping_address ?? null,
    order.billing_address ?? null,
  );

  return (
    <Card className={cn("gap-4", className)}>
      <CardHeader className="gap-1">
        <CardTitle>Customer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact Info */}
        <div className="space-y-1">
          {customerName && (
            <p className="text-sm font-medium">{customerName}</p>
          )}
          <p className="text-muted-foreground text-sm">{order.email}</p>
          {order.shipping_address?.phone && (
            <p className="text-muted-foreground text-sm">
              {order.shipping_address.phone}
            </p>
          )}
        </div>

        <Separator />

        {/* Addresses */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AddressSection
            label="Shipping address"
            address={order.shipping_address ?? null}
          />
          <AddressSection
            label="Billing address"
            address={order.billing_address ?? null}
            fallback={
              isBillingSameAsShipping ? (
                <p className="text-muted-foreground text-sm">
                  Same as shipping
                </p>
              ) : undefined
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};
