export function FulfillmentStatusInline({
  label,
}: {
  label: string;
}) {
  return (
    <div className="text-muted-foreground text-xs">
      {label}
    </div>
  );
}


