type StepState = "completed" | "current" | "upcoming" | "canceled";

type TimelineStep = {
  key: string;
  label: string;
  at?: string;
  state: StepState;
};

export function OrderStatusTimeline() {
  // Mock, static steps purely for UI
  const steps: TimelineStep[] = [
    {
      key: "placed",
      label: "Placed",
      at: "Nov 08, 9:15 AM",
      state: "completed",
    },
    {
      key: "processed",
      label: "Processed",
      at: "Nov 08, 11:42 AM",
      state: "completed",
    },
    {
      key: "shipped",
      label: "Shipped",
      at: "Nov 09, 3:10 PM",
      state: "completed",
    },
    {
      key: "out-for-delivery",
      label: "Out for delivery",
      at: "Nov 12, 8:05 AM",
      state: "current",
    },
    { key: "delivered", label: "Delivered", state: "upcoming" },
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
