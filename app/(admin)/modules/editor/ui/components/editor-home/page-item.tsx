import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/app/components/ui/item";
import { MoreHorizontal, Trash2Icon } from "lucide-react";

import {
  isSingleton,
  type PageType,
} from "@/app/(admin)/modules/editor/configs/page-types";
import type { Page } from "@/payload-types";
import { useState } from "react";
import { DeletePageDialog } from "./delete-page-dialog";

interface PageItemProps {
  page: Page;
  onClick?: () => void;
}

export const PageItem = ({ page, onClick }: PageItemProps) => {
  const { title, path, id, type } = page;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const canDelete = !isSingleton(type as PageType);

  return (
    <>
      <Item
        className="hover:bg-accent/50 bg-background border-border cursor-pointer transition-colors"
        onClick={onClick}
      >
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription title={path}>{path}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <DropdownMenuItem
                disabled={!canDelete}
                onClick={(e) => {
                  e.stopPropagation();
                  if (canDelete) setDeleteDialogOpen(true);
                }}
              >
                <Trash2Icon className="size-4" />
                Delete page
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      </Item>

      <DeletePageDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        pageId={String(id)}
        pageName={title}
      />
    </>
  );
};
