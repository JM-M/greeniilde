"use client";

import { ImageIcon } from "lucide-react";
import { EditorMedia, EditorMediaProps } from "./editor-media";

type EditorImageProps = Omit<
  EditorMediaProps,
  "accept" | "renderPreview" | "icon" | "placeholder" | "urlPlaceholder"
>;

export function EditorImage(props: EditorImageProps) {
  return (
    <EditorMedia
      accept={{ "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] }}
      renderPreview={(url) => (
        <img src={url} alt="Preview" className="h-full w-full object-cover" />
      )}
      icon={<ImageIcon className="text-muted-foreground h-4 w-4" />}
      placeholder="Upload image"
      urlPlaceholder="Image URL"
      {...props}
    />
  );
}
