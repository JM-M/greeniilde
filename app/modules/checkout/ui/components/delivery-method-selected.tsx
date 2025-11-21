import { convertToLocale } from "@/app/lib/utils";

type DeliveryMethodSelectedProps = {
  method?: string;
  className?: string;
  rate?: {
    carrier_name: string;
    delivery_time: string;
    amount: number;
    currency_code: string;
  };
};

export const DeliveryMethodSelected = ({
  method,
  className,
  rate,
}: DeliveryMethodSelectedProps) => {
  if (!rate) {
    return null;
  }

  return (
    <div className={`rounded-lg border p-3 ${className ?? ""}`}>
      <div className="flex items-start gap-3">
        <div>
          <div className="text-base font-semibold">{rate.carrier_name}</div>
          <div className="text-muted-foreground text-sm">
            {rate.delivery_time} ·{" "}
            {convertToLocale({
              amount: rate.amount,
              currency_code: rate.currency_code,
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
