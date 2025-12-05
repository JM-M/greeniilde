"use client";

import { Button } from "@/app/components/ui/button";
import { usePuck } from "@measured/puck";
import { RedoIcon, UndoIcon } from "lucide-react";

export const HistoryButtons = () => {
  const { history } = usePuck();

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
