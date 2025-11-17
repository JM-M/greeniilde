import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export function OrderNotes() {
  // Static mock note for UI only
  const note =
    "Leave the package at the back door. Please call upon arrival if the gate is closed.";

  return (
    <Card className="p-4 md:p-5">
      <CardHeader className="px-0 py-0 grid-rows-1 gap-0">
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


