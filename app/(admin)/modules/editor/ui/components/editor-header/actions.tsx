"use client";

import { useDiscardDraft } from "@/app/(admin)/modules/editor/hooks/use-editor-mutations";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { EllipsisVerticalIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { DiscardDraftDialog } from "./discard-draft-dialog";

interface ActionsProps {
  pageId: string;
  pagePath: string;
  onDiscardSuccess?: () => void;
}

export const Actions = ({
  pageId,
  pagePath,
  onDiscardSuccess,
}: ActionsProps) => {
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const discardDraftMutation = useDiscardDraft({
    onSuccess: () => {
      setShowDiscardDialog(false);
      onDiscardSuccess?.();
    },
  });

  const handleDiscard = () => {
    discardDraftMutation.mutate({ id: pageId, path: pagePath });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowDiscardDialog(true)}>
            <Trash2 className="size-4" />
            Discard draft
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DiscardDraftDialog
        open={showDiscardDialog}
        onOpenChange={setShowDiscardDialog}
        onConfirm={handleDiscard}
        isLoading={discardDraftMutation.isPending}
      />
    </>
  );
};
