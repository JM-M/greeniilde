"use client";

import { Thumbnail } from "@/app/(admin)/dashboard/components/shared/thumbnail";
import { HttpTypes } from "@medusajs/types";

import { Checkbox } from "@/app/components/ui/checkbox";
import { TableCell, TableRow } from "@/app/components/ui/table";

interface ProductRowProps {
  product: HttpTypes.AdminProduct;
  isSelected: boolean;
  onToggle: (productId: string) => void;
}

export function ProductRow({ product, isSelected, onToggle }: ProductRowProps) {
  const variant = product.variants?.[0];
  const price = variant?.prices?.[0];
  const priceDisplay = price
    ? `${price.currency_code?.toUpperCase()} ${price.amount}`
    : "-";

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="w-10">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggle(product.id)}
          aria-label={`Select ${product.title}`}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <Thumbnail src={product.thumbnail} alt={product.title} />
          <span className="font-medium">{product.title}</span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        {variant?.inventory_quantity ?? 0}
      </TableCell>
      <TableCell className="text-right">{priceDisplay}</TableCell>
    </TableRow>
  );
}
