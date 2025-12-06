"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useFileUpload } from "@/app/hooks/use-file-upload";
import { cn } from "@/app/lib/utils";
import { Film, Trash2, Upload } from "lucide-react";
import { useEffect } from "react";

interface EditorVideoProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  field?: {
    label?: string;
  };
  className?: string;
}

export function EditorVideo({
  value,
  onChange,
  field,
  className,
}: EditorVideoProps) {
  const {
    files,
    errors,
    isDragging,
    getRootProps,
    getInputProps,
    removeFile,
    clearFiles,
  } = useFileUpload({
    accept: {
      "video/*": [],
    },
    maxFiles: 1,
  });

  // Sync file upload with parent value
  useEffect(() => {
    if (files.length > 0) {
      onChange?.(files[0].preview);
    }
  }, [files, onChange]);

  const handleRemove = () => {
    clearFiles();
    onChange?.(null);
  };

  const hasVideo = !!value;

  return (
    <div className={cn("space-y-2", className)}>
      {field?.label && (
        <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {field.label}
        </label>
      )}

      {hasVideo ? (
        <div className="group bg-muted relative overflow-hidden rounded-md border">
          <div className="relative aspect-video w-full">
            <video
              src={value}
              controls
              className="h-full w-full object-cover"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-start justify-end gap-2 bg-black/40 p-2 opacity-0 transition-opacity group-hover:opacity-100">
            <div
              {...getRootProps()}
              className="pointer-events-auto cursor-pointer"
            >
              <input {...getInputProps()} />
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8"
                type="button"
              >
                <Upload className="h-4 w-4" />
                <span className="sr-only">Replace</span>
              </Button>
            </div>
            <Button
              size="icon"
              variant="destructive"
              className="pointer-events-auto h-8 w-8"
              type="button"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "hover:bg-muted/50 relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25",
            errors.length > 0 && "border-destructive/50 bg-destructive/5",
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="bg-background rounded-full border p-2 shadow-sm">
              <Film className="text-muted-foreground h-4 w-4" />
            </div>
            <p className="text-muted-foreground mt-1 text-xs font-medium">
              {isDragging ? "Drop video here" : "Upload video"}
            </p>
          </div>
        </div>
      )}

      <Input
        placeholder="Video URL"
        value={value || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange?.(e.target.value)
        }
      />

      {errors.length > 0 && (
        <div className="text-destructive text-[0.8rem] font-medium">
          {errors.map((error, i) => (
            <div key={i}>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
}
