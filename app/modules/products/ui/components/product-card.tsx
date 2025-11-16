import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

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
    <Card className={className}>
      <CardHeader className="gap-4">
        <div className="aspect-video w-full rounded-2xl bg-secondary" />
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
