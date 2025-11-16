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
};

export const ProductCard = ({ name, price, specs }: ProductCardProps) => {
  return (
    <Card>
      <CardHeader className="gap-4">
        <div className="aspect-video w-full rounded-2xl bg-secondary" />
        <CardTitle>{name}</CardTitle>
        <CardDescription>{price}</CardDescription>
      </CardHeader>

      <CardContent className="px-6">
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
