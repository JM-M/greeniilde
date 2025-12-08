"use client";

import { Thumbnail } from "@/app/(admin)/dashboard/components/shared/thumbnail";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateFulfillment } from "../../hooks/use-fulfillment-mutations";
import { type OrderFulfillmentItemData } from "./order-fulfillment-item";

type FulfillItemsDialogProps = {
  children: React.ReactNode;
  items: OrderFulfillmentItemData[];
  orderId: string;
  locationId: string;
};

export const FulfillItemsDialog = ({
  children,
  items,
  orderId,
  locationId,
}: FulfillItemsDialogProps) => {
  const [open, setOpen] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    items.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {}),
  );
  const [sendNotification, setSendNotification] = useState(true);

  const { mutate: createFulfillment, isPending: isSubmitting } =
    useCreateFulfillment(orderId);

  const handleQuantityChange = (id: string, value: string) => {
    const quantity = parseInt(value);
    if (isNaN(quantity) || quantity < 0) return;
    const maxQuantity = items.find((item) => item.id === id)?.quantity || 0;
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min(quantity, maxQuantity),
    }));
  };

  const handleCreate = () => {
    const itemsToFulfill = items
      .filter((item) => quantities[item.id] > 0)
      .map((item) => ({
        id: item.id,
        quantity: quantities[item.id],
      }));

    if (itemsToFulfill.length === 0) {
      toast.error("Please select at least one item to fulfill");
      return;
    }

    createFulfillment(
      {
        items: itemsToFulfill,
        location_id: locationId,
        no_notification: !sendNotification,
      },
      {
        onSuccess: () => {
          toast.success("Fulfillment created successfully");
          setOpen(false);
        },
        onError: (error) => {
          toast.error(`Failed to create fulfillment: ${error.message}`);
        },
      },
    );
  };

  // Reset quantities when dialog opens
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setQuantities(
        items.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {}),
      );
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Fulfillment</DialogTitle>
          <DialogDescription>
            Select items and quantities to fulfill.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Items Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="w-[100px] text-right">
                    Available
                  </TableHead>
                  <TableHead className="w-[120px] text-right">
                    Quantity
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex gap-2">
                        <Thumbnail
                          src={item.thumbnail}
                          className="size-10 rounded-md"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-muted-foreground text-xs">
                            {item.sku}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="number"
                        min={0}
                        max={item.quantity}
                        value={quantities[item.id]}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        className="ml-auto h-8 w-20 text-right"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Send notifications</Label>
              <p className="text-muted-foreground text-sm">
                Send email notification to the customer.
              </p>
            </div>
            <Switch
              checked={sendNotification}
              onCheckedChange={setSendNotification}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create fulfillment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
