import { selectColumn } from "@/app/(admin)/dashboard/components/shared/data-table/columns";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { convertToLocale } from "@/app/lib/utils";
import { FulfillmentStatusBadge } from "@/app/modules/orders/ui/components/fulfillment-status-badge";
import { PaymentStatusBadge } from "@/app/modules/orders/ui/components/payment-status-badge";
import { HttpTypes } from "@medusajs/types";
import { ColumnDef } from "@tanstack/react-table";
import { UserIcon } from "lucide-react";

export type OrderTableRow = {
  id: string;
  displayId: number;
  createdAt: string;
  customer?: HttpTypes.AdminCustomer | null;
  email: string;
  itemsCount: number;
  total: number;
  currencyCode: string;
  paymentStatus: HttpTypes.AdminOrder["payment_status"];
  fulfillmentStatus: HttpTypes.AdminOrder["fulfillment_status"];
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getCustomerInitials = (customer?: HttpTypes.AdminCustomer | null) => {
  if (!customer) return null;
  const first = customer.first_name?.[0] || "";
  const last = customer.last_name?.[0] || "";
  return (first + last).toUpperCase() || null;
};

const getCustomerName = (customer?: HttpTypes.AdminCustomer | null) => {
  if (!customer) return null;
  const name =
    `${customer.first_name || ""} ${customer.last_name || ""}`.trim();
  return name || null;
};

export const columns: ColumnDef<OrderTableRow>[] = [
  selectColumn<OrderTableRow>(),
  {
    accessorKey: "displayId",
    header: "Order",
    cell: ({ row }) => {
      return <div className="font-medium">#{row.original.displayId}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">
          {formatDate(row.original.createdAt)}
        </div>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const order = row.original;
      const customer = order.customer;
      const name = getCustomerName(customer);
      const initials = getCustomerInitials(customer);

      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarFallback className="text-xs">
              {initials || <UserIcon className="size-3" />}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{name || "Guest"}</div>
            <div className="text-muted-foreground text-sm">{order.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "itemsCount",
    header: "Items",
    cell: ({ row }) => {
      const count = row.original.itemsCount;
      return `${count} item${count === 1 ? "" : "s"}`;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const order = row.original;
      return convertToLocale({
        amount: order.total,
        currencyCode: order.currencyCode,
      });
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => {
      return <PaymentStatusBadge status={row.original.paymentStatus} />;
    },
  },
  {
    accessorKey: "fulfillmentStatus",
    header: "Fulfillment",
    cell: ({ row }) => {
      return <FulfillmentStatusBadge status={row.original.fulfillmentStatus} />;
    },
  },
];
