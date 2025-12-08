"use client";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { cn } from "@/app/lib/utils";
import { OrderStatusBadge } from "@/app/modules/orders/ui/components/order-status-badge";
import { HttpTypes } from "@medusajs/types";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";

type OrderDetailsHeaderProps = {
  order: HttpTypes.AdminOrder;
  className?: string;
};

export const OrderDetailsHeader = ({
  order,
  className,
}: OrderDetailsHeaderProps) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Order #{order.display_id}</h1>
            <OrderStatusBadge status={order.status} />
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span>
              {format(new Date(order.created_at), "d MMM yyyy, HH:mm")}
            </span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>Cancel Order</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
