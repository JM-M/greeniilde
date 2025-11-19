import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/app/lib/utils";
import { HttpTypes } from "@medusajs/types";
import { useProductDetailsContext } from "../contexts/product-details-context";

type ProductInfoProps = {
  name: string;
  tags: string[];
  className?: string;
};

export const ProductInfo = ({ name, tags, className }: ProductInfoProps) => {
  const { selectedVariant } = useProductDetailsContext();

  const calculatedPrice =
    selectedVariant?.calculated_price as HttpTypes.StoreCalculatedPrice;

  const price = calculatedPrice?.calculated_amount;
  const currencyCode = calculatedPrice?.currency_code;

  const sku = selectedVariant?.sku;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="space-y-1">
        <h1 className="text-2xl leading-tight font-semibold">{name}</h1>
        {/* <p className="text-muted-foreground text-sm">SKU: {sku}</p> */}
      </div>

      <div className="text-xl font-semibold uppercase">
        {currencyCode} {price}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};
