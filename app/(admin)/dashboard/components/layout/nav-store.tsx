"use client";

import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { useStoreConfig } from "@/app/modules/store/hooks/use-store-queries";

export const NavStore = ({ className }: { className?: string }) => {
  const { data: store } = useStoreConfig();

  return (
    <span className={className}>
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <Avatar className="bg-transparent">
          <AvatarFallback className="bg-transparent">
            {store?.name[0] || ""}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{store?.name || "Store"}</span>
      </div>
    </span>
  );
};
