import { FloatingActionBar } from "@/app/(admin)/dashboard/components/shared/floating-action-bar";
import { Button } from "@/app/components/ui/button";
import { Trash2Icon } from "lucide-react";

interface OrdersTableActionsProps {
  selectedCount: number;
}

export const OrdersTableActions = ({
  selectedCount,
}: OrdersTableActionsProps) => {
  return (
    <FloatingActionBar visible={selectedCount > 0}>
      <span className="text-muted-foreground px-2 text-sm">
        {selectedCount} order{selectedCount === 1 ? "" : "s"} selected
      </span>
      <Button variant="outline" size="sm">
        <Trash2Icon className="size-3" />
        Delete
      </Button>
    </FloatingActionBar>
  );
};
