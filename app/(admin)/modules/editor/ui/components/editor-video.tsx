"use client";

import { Film } from "lucide-react";
import { EditorMedia, EditorMediaProps } from "./editor-media";

type EditorVideoProps = Omit<
  EditorMediaProps,
  "accept" | "renderPreview" | "icon" | "placeholder" | "urlPlaceholder"
>;

export function EditorVideo(props: EditorVideoProps) {
  return (
    <EditorMedia
      accept={{ "video/*": [] }}
      renderPreview={(url) => (
        <video src={url} controls className="h-full w-full object-cover" />
      )}
      icon={<Film className="text-muted-foreground h-4 w-4" />}
      placeholder="Upload video"
      urlPlaceholder="Video URL"
      {...props}
    />
  );
}
