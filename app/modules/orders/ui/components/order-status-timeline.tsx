type StepState = "completed" | "current" | "upcoming" | "canceled";

type TimelineStep = {
  key: string;
  label: string;
  at?: string;
  state: StepState;
};

import { cn } from "@/app/lib/utils";
import { StoreOrder } from "@medusajs/types";
import { format } from "date-fns";

const formatDate = (date: string | Date) =>
  format(new Date(date), "MMM d, yyyy 'at' h:mm a");

export function OrderStatusTimeline({ order }: { order: StoreOrder }) {
  // TODO: Update this when multiple shipments is supported
  const fulfillment = order.fulfillments?.[0];
  const { shipped_at, delivered_at, packed_at } = fulfillment || {};

  const isPacked = !!packed_at;
  const isShipped = !!shipped_at;
  const isDelivered = !!delivered_at;

  // Mock, static steps purely for UI but updated with some real data logic
  const steps: TimelineStep[] = [
    {
      key: "placed",
      label: "Placed",
      at: formatDate(order.created_at),
      state: "completed",
    },
    {
      key: "processed",
      label: "Processed",
      at: isPacked ? formatDate(packed_at) : "",
      state: isPacked ? "completed" : "upcoming",
    },
    {
      key: "shipped",
      label: "Shipped",
      at: isShipped ? formatDate(shipped_at) : "",
      state: isShipped ? "completed" : "upcoming",
    },
    {
      key: "delivered",
      label: "Delivered",
      at: isDelivered ? formatDate(delivered_at) : "",
      state: isDelivered ? "completed" : "upcoming",
    },
  ];
  const stepStates = steps.map((s) => s.state);

  return (
    <div aria-label="Order progress" className="rounded-xl border p-4 md:p-5">
      {/* Horizontal on md+, vertical on mobile */}
      <ol className="relative flex flex-col">
        {steps.map((step, index) => {
          const baseNode =
            "relative z-10 top-[5px] flex size-5 items-center justify-center rounded-full ring-2 ring-background";

          const stateNode: Record<StepState, string> = {
            completed: "bg-primary text-primary-foreground",
            current: "bg-background text-primary border-2 border-primary",
            upcoming: "bg-muted text-muted-foreground",
            canceled: "bg-destructive text-white",
          };

          const isBeforeCurrent = index < stepStates.indexOf("current");
          const isCurrent = step.state === "current";

          const isLast = index === steps.length - 1;

          return (
            <li
              key={step.key}
              className={cn("relative", {
                "pb-6": !isLast,
              })}
              {...(isCurrent ? { "aria-current": "step" } : {})}
            >
              {isBeforeCurrent && (
                <span className="bg-primary absolute top-[5px] left-[9px] inline-block h-full w-px" />
              )}

              {/* Content */}
              <div className="flex items-start gap-3">
                {/* Node */}
                <span
                  className={[baseNode, stateNode[step.state]].join(" ")}
                  aria-hidden="true"
                >
                  {/* Simple inner dot for current to differentiate by more than color */}
                  {isCurrent ? (
                    <span className="bg-primary block size-2 rounded-full" />
                  ) : null}
                </span>

                {/* Labels */}
                <div className="mt-0.5 md:mt-2">
                  <div
                    className={[
                      "text-sm",
                      isCurrent ? "text-foreground font-semibold" : "",
                      step.state === "upcoming" ? "text-muted-foreground" : "",
                    ].join(" ")}
                  >
                    {step.label}
                  </div>
                  {step.at ? (
                    <div className="text-muted-foreground mt-0.5 text-xs">
                      {step.at}
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

import { Skeleton } from "@/app/components/ui/skeleton";

export function OrderStatusTimelineSkeleton() {
  return (
    <div className="rounded-xl border p-4 md:p-5">
      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="size-5 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
