import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
import { Product } from "../../types";

type ProductCardProps = Product & {
  className?: string;
};

export const ProductCard = ({
  name,
  price,
  specs,
  image,
  className,
}: ProductCardProps) => {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 hover:scale-102",
        className,
      )}
    >
      <CardHeader className="gap-4">
        <div className="bg-secondary relative aspect-square w-full overflow-hidden rounded-lg">
          {image && (
            <Image src={image} alt={name} fill className="object-cover" />
          )}
        </div>
        <div className="space-y-2">
          <CardTitle>{name}</CardTitle>
          <CardDescription className="text-lg font-semibold">
            {price}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {specs.map((spec) => (
            <Badge key={spec} variant="outline">
              {spec}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const ProductCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Card className={className}>
      <CardHeader className="gap-4">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>
    </Card>
  );
};
