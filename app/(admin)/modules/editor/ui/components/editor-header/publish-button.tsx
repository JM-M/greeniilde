"use client";

import { Button } from "@/app/components/ui/button";
import { Spinner } from "@/app/components/ui/spinner";
import { useIsMobile } from "@/app/hooks/use-mobile";
import { createUsePuck } from "@measured/puck";
import { GlobeIcon } from "lucide-react";

// Create usePuck with selector support
const usePuck = createUsePuck();

export const PublishButton = ({
  onPublish,
  isPublishing,
  isDraft,
}: {
  onPublish: (data: any) => void;
  isPublishing: boolean;
  isDraft: boolean;
}) => {
  // Only select appState.data to minimize re-renders
  const data = usePuck((s) => s.appState.data);

  const isMobile = useIsMobile();

  return (
    <Button
      variant={isDraft ? "default" : "outline"}
      onClick={() => {
        onPublish(data);
      }}
      size={isMobile ? "icon" : "default"}
      disabled={!isDraft}
    >
      {isPublishing ? <Spinner /> : <GlobeIcon />}
      {!isMobile && "Publish"}
    </Button>
  );
};
