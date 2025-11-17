import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/app/lib/utils";

type ProductInfoProps = {
  name?: string;
  price?: string;
  sku?: string;
  tags?: string[];
  className?: string;
};

export const ProductInfo = ({
  name = "Helios Max Panel Kit",
  price = "$6,499",
  sku = "HEL-MAX-6500",
  tags = ["6.5 kW output", "25-year warranty", "Wi‑Fi monitoring"],
  className,
}: ProductInfoProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="space-y-1">
        <h1 className="text-2xl leading-tight font-semibold">{name}</h1>
        <p className="text-muted-foreground text-sm">SKU: {sku}</p>
      </div>

      <div className="text-xl font-semibold">{price}</div>

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
