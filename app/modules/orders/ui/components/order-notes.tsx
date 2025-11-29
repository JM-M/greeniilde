import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import { StoreOrder } from "@medusajs/types";

export function OrderNotes({ order }: { order: StoreOrder }) {
  // Medusa orders don't have a standard notes field exposed in the store API by default.
  // We'll check metadata or just return null if not present.
  // For now, let's assume no notes to display unless we find a specific field.
  const note = (order.metadata?.notes as string) || null;

  if (!note) {
    return null;
  }

  return (
    <Card className="p-4 md:p-5">
      <CardHeader className="grid-rows-1 gap-0 px-0 py-0">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <p className="text-sm leading-relaxed">{note}</p>
      </CardContent>
    </Card>
  );
}

import { Skeleton } from "@/app/components/ui/skeleton";

export function OrderNotesSkeleton() {
  return (
    <Card className="p-4 md:p-5">
      <CardHeader className="grid-rows-1 gap-0 px-0 py-0">
        <Skeleton className="h-5 w-16" />
      </CardHeader>
      <CardContent className="px-0">
        <div className="mt-2 flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  );
}
