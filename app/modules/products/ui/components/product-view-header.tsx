import { Button } from "@/app/components/ui/button";
import { ButtonGroup } from "@/app/components/ui/button-group";
import { ArrowUpDownIcon, FilterIcon } from "lucide-react";

export const ProductViewHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold">Products</h2>

      <ButtonGroup className="lg:hidden">
        <Button variant="outline">
          <FilterIcon /> Filter
        </Button>
        <Button variant="outline">
          <ArrowUpDownIcon /> Sort
        </Button>
      </ButtonGroup>
    </div>
  );
};
