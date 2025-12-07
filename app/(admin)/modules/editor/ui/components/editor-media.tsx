"use client";

import { Button } from "@/app/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/app/components/ui/input-group";
import { useFileUpload } from "@/app/hooks/use-file-upload";
import { usePayloadUpload } from "@/app/hooks/use-payload-upload";
import { cn } from "@/app/lib/utils";
import { Check, Loader2, Pencil, Trash2, Upload } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Accept } from "react-dropzone";
import { UploadProgress } from "./upload-progress";

export interface EditorMediaProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  accept: Accept;
  renderPreview: (url: string) => ReactNode;
  icon: ReactNode;
  placeholder: string;
  urlPlaceholder?: string;
  field?: { label?: string };
  className?: string;
}

export function EditorMedia({
  value,
  onChange,
  accept,
  renderPreview,
  icon,
  placeholder,
  urlPlaceholder = "URL",
  field,
  className,
}: EditorMediaProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const { files, errors, isDragging, getRootProps, getInputProps, clearFiles } =
    useFileUpload({
      accept,
      maxFiles: 1,
    });

  const {
    upload,
    isUploading,
    progress,
    error: uploadError,
  } = usePayloadUpload({
    onSuccess: (url) => {
      onChange?.(url);
      setPreviewUrl(null);
      clearFiles();
    },
    onError: () => {
      setPreviewUrl(null);
      clearFiles();
    },
  });

  // Show local preview and start upload when file is selected
  useEffect(() => {
    if (files.length > 0 && !isUploading) {
      setPreviewUrl(files[0].preview);
      upload(files[0]);
    }
  }, [files, upload, isUploading]);

  const handleRemove = () => {
    setPreviewUrl(null);
    clearFiles();
    onChange?.(null);
  };

  const displayUrl = previewUrl || value;
  const hasMedia = !!displayUrl;

  return (
    <div className={cn("space-y-2", className)}>
      {field?.label && (
        <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {field.label}
        </label>
      )}

      {hasMedia ? (
        <div className="group bg-muted relative overflow-hidden rounded-md border">
          <div className="relative aspect-video w-full">
            {renderPreview(displayUrl)}
          </div>

          {/* Upload progress overlay */}
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <UploadProgress progress={progress} />
            </div>
          )}

          {/* Hover controls (only when not uploading) */}
          {!isUploading && (
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
          )}
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
            isUploading && "pointer-events-none opacity-50",
          )}
        >
          <input {...getInputProps()} disabled={isUploading} />
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="bg-background rounded-full border p-2 shadow-sm">
              {isUploading ? (
                <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
              ) : (
                icon
              )}
            </div>
            <p className="text-muted-foreground mt-1 text-xs font-medium">
              {isUploading
                ? "Uploading..."
                : isDragging
                  ? `Drop ${placeholder.toLowerCase().replace("upload ", "")} here`
                  : placeholder}
            </p>
          </div>
        </div>
      )}

      <InputGroup>
        <InputGroupInput
          placeholder={urlPlaceholder}
          value={isEditing ? editValue : value || ""}
          disabled={!isEditing}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEditValue(e.target.value)
          }
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-sm"
            onClick={() => {
              if (isEditing) {
                onChange?.(editValue);
                setIsEditing(false);
              } else {
                setEditValue(value || "");
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? (
              <Check className="h-4 w-4" />
            ) : (
              <Pencil className="h-4 w-4" />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      {(errors.length > 0 || uploadError) && (
        <div className="text-destructive text-[0.8rem] font-medium">
          {errors.map((error, i) => (
            <div key={i}>{error}</div>
          ))}
          {uploadError && <div>{uploadError.message}</div>}
        </div>
      )}
    </div>
  );
}
