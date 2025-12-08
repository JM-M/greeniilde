import { Button } from "@/app/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/components/ui/input-group";
import { PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

interface CategoryTableHeaderProps {
  value: string;
  onChange: (value: string) => void;
}

export const CategoryTableHeader = ({
  value,
  onChange,
}: CategoryTableHeaderProps) => {
  return (
    <div className="flex items-center gap-3">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search categories"
          className="flex-1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </InputGroup>
      <Button asChild>
        <Link href="/dashboard/categories/new">
          <PlusIcon /> Create category
        </Link>
      </Button>
    </div>
  );
};
