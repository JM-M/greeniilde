import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";

interface VariantToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const VariantToggle = ({
  checked,
  onCheckedChange,
}: VariantToggleProps) => {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <div className="space-y-0.5">
        <div className="flex flex-row items-center justify-between">
          <Label className="text-base">Enable variants</Label>
          <Switch checked={checked} onCheckedChange={onCheckedChange} />
        </div>
        <div className="text-muted-foreground text-xs">
          If disabled, a default variant will be created for the product.
        </div>
      </div>
    </div>
  );
};
