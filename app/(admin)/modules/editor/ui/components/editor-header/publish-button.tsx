"use client";

import { Button } from "@/app/components/ui/button";
import { Spinner } from "@/app/components/ui/spinner";
import { useIsMobile } from "@/app/hooks/use-mobile";
import { usePuck } from "@measured/puck";
import { GlobeIcon } from "lucide-react";

export const PublishButton = ({
  onPublish,
  isPublishing,
}: {
  onPublish: (data: any) => void;
  isPublishing: boolean;
}) => {
  const { appState } = usePuck();

  const isMobile = useIsMobile();

  return (
    <Button
      variant="outline"
      onClick={() => {
        onPublish(appState.data);
      }}
      size={isMobile ? "icon" : "default"}
    >
      {isPublishing ? <Spinner /> : <GlobeIcon />}
      {!isMobile && "Publish"}
    </Button>
  );
};
