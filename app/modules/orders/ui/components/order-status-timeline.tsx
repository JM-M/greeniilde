type StepState = "completed" | "current" | "upcoming" | "canceled";

type TimelineStep = {
  key: string;
  label: string;
  at?: string;
  state: StepState;
};

import { StoreOrder } from "@medusajs/types";

export function OrderStatusTimeline({ order }: { order: StoreOrder }) {
  const createdDate = new Date(order.created_at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const isShipped =
    order.fulfillment_status === "shipped" ||
    order.fulfillment_status === "fulfilled" ||
    order.fulfillment_status === "partially_shipped";

  // Mock, static steps purely for UI but updated with some real data logic
  const steps: TimelineStep[] = [
    {
      key: "placed",
      label: "Placed",
      at: createdDate,
      state: "completed",
    },
    {
      key: "processed",
      label: "Processed",
      at: isShipped ? "Completed" : "In Progress", // Simplified logic
      state: isShipped ? "completed" : "current",
    },
    {
      key: "shipped",
      label: "Shipped",
      state: isShipped ? "completed" : "upcoming",
    },
    {
      key: "delivered",
      label: "Delivered",
      state: "upcoming", // We don't have delivery status in standard order object yet
    },
  ];

  return (
    <div aria-label="Order progress" className="rounded-xl border p-4 md:p-5">
      {/* Horizontal on md+, vertical on mobile */}
      <ol className="relative flex flex-col gap-6">
        {steps.map((step) => {
          const baseNode =
            "relative z-10 flex size-5 items-center justify-center rounded-full ring-2 ring-background";

          const stateNode: Record<StepState, string> = {
            completed: "bg-primary text-primary-foreground",
            current: "bg-background text-primary border-2 border-primary",
            upcoming: "bg-muted text-muted-foreground",
            canceled: "bg-destructive text-white",
          };

          const isCurrent = step.state === "current";

          return (
            <li
              key={step.key}
              className="relative"
              {...(isCurrent ? { "aria-current": "step" } : {})}
            >
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
