"use client";

type DeliveryMethod = "standard" | "express" | "overnight";

const labelByMethod: Record<DeliveryMethod, string> = {
  standard: "Standard",
  express: "Express",
  overnight: "Overnight",
};

const descriptionByMethod: Record<DeliveryMethod, string> = {
  standard: "3–5 business days · $5.00",
  express: "1–2 business days · $15.00",
  overnight: "Next business day · $25.00",
};

type DeliveryMethodSelectedProps = {
  method: DeliveryMethod;
  className?: string;
};

export const DeliveryMethodSelected = ({
  method,
  className,
}: DeliveryMethodSelectedProps) => {
  return (
    <div className={`rounded-lg border p-3 ${className ?? ""}`}>
      <div className="flex items-start gap-3">
        <div>
          <div className="text-base font-semibold">{labelByMethod[method]}</div>
          <div className="text-muted-foreground text-sm">
            {descriptionByMethod[method]}
          </div>
        </div>
      </div>
    </div>
  );
};
