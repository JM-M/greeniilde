"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useListOrderChanges } from "../../hooks/use-order-queries";

type OrderActivityCardProps = {
  orderId: string;
  className?: string;
};

export const OrderActivityCard = ({
  orderId,
  className,
}: OrderActivityCardProps) => {
  const { data, isLoading } = useListOrderChanges(orderId);
  const changes = (data?.order_changes || []).sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  const [showAll, setShowAll] = useState(false);

  // Filter for relevant actions (fulfillment, shipment, delivery)
  const activities = changes
    .flatMap((change) => change.actions)
    .filter((action) =>
      ["FULFILL_ITEM", "SHIP_ITEM", "DELIVER_ITEM"].includes(action.action),
    )
    .map((action) => {
      let title = "Unknown activity";
      let description = "";

      switch (action.action) {
        case "FULFILL_ITEM":
          title = "Items fulfilled";
          description = `${(action.details as any).quantity} item`;
          break;
        case "SHIP_ITEM":
          title = "Items shipped";
          description = `${(action.details as any).quantity} item`;
          break;
        case "DELIVER_ITEM":
          title = "Items delivered";
          description = `${(action.details as any).quantity} item`;
          break;
      }

      return {
        id: action.id,
        title,
        description,
        date: new Date(action.created_at),
      };
    });

  // Always show the most recent 2 activities, collapse the rest
  const visibleActivities = showAll ? activities : activities.slice(0, 2);
  const hiddenCount = activities.length - 2;

  if (isLoading) {
    return (
      <Card className={cn("gap-4", className)}>
        <CardHeader className="gap-1">
          <CardTitle className="text-base">Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-4">
            <Loader2 className="text-muted-foreground size-5 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card className={cn("gap-4", className)}>
        <CardHeader className="gap-1">
          <CardTitle className="text-base">Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">No activity yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("gap-4", className)}>
      <CardHeader className="gap-1">
        <CardTitle className="text-base">Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          {visibleActivities.map((activity, index) => (
            <div key={activity.id} className="flex gap-3 last:pb-0">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="bg-background relative z-10 flex size-3 min-h-3 items-center justify-center rounded-full border">
                  <div className="bg-muted-foreground size-1.5 rounded-full" />
                </div>
                {index !== visibleActivities.length - 1 && (
                  <div className="bg-border h-full w-px" />
                )}
              </div>

              <div className="relative -top-1 flex flex-1 justify-between gap-2 pb-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{activity.title}</span>
                  <span className="text-muted-foreground text-sm">
                    {activity.description}
                  </span>
                </div>
                <span className="text-muted-foreground text-sm whitespace-nowrap">
                  {formatDistanceToNow(activity.date, { addSuffix: true })}
                </span>
              </div>
            </div>
          ))}

          {/* Show more button if there are hidden activities */}
          {!showAll && hiddenCount > 0 && (
            <div className="flex gap-3 pt-4">
              <div className="flex w-3 justify-center">
                <div className="bg-border h-full w-px border-dashed" />
              </div>
              <Button
                variant="link"
                className="text-muted-foreground h-auto p-0 text-sm font-normal"
                onClick={() => setShowAll(true)}
              >
                Show {hiddenCount} more activities
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
