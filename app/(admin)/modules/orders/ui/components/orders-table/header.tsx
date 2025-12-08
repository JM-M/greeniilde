import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/components/ui/input-group";
import { SearchIcon } from "lucide-react";

interface OrderTableHeaderProps {
  value: string;
  onChange: (value: string) => void;
}

export const OrderTableHeader = ({
  value,
  onChange,
}: OrderTableHeaderProps) => {
  return (
    <div className="flex items-center gap-3">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search orders"
          className="flex-1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </InputGroup>
    </div>
  );
};
