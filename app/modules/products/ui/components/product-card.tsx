import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";

type ProductCardProps = {
  name: string;
  price: string;
  specs: string[];
  className?: string;
};

export const ProductCard = ({
  name,
  price,
  specs,
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
        <div className="bg-secondary aspect-square w-full rounded-2xl" />
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
