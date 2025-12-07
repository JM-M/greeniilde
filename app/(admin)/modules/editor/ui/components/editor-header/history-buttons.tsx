"use client";

import { Button } from "@/app/components/ui/button";
import { createUsePuck } from "@measured/puck";
import { RedoIcon, UndoIcon } from "lucide-react";

// Create usePuck with selector support
const usePuck = createUsePuck();

export const HistoryButtons = () => {
  // Use selector to only subscribe to history changes
  const history = usePuck((s) => s.history);

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={history.back}
        disabled={!history.hasPast}
      >
        <UndoIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={history.forward}
        disabled={!history.hasFuture}
      >
        <RedoIcon />
      </Button>
    </div>
  );
};
