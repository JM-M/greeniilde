"use client";

import { cn } from "@/app/lib/utils";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import * as React from "react";
import { useDropzone, type Accept } from "react-dropzone";

export interface MediaItem {
  id: string;
  file?: File;
  url: string;
  preview?: string;
}

interface MediaUploadProps {
  value: MediaItem[];
  onChange: (files: MediaItem[]) => void;
  onRemove?: (id: string) => void;
  maxFiles?: number;
  accept?: Accept;
  maxSize?: number; // in bytes
  disabled?: boolean;
  className?: string;
}

export function MediaUpload({
  value = [],
  onChange,
  onRemove,
  maxFiles = 10,
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
  },
  maxSize = 5 * 1024 * 1024, // 5MB default
  disabled = false,
  className,
}: MediaUploadProps) {
  const [error, setError] = React.useState<string | null>(null);

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === "file-too-large") {
          setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
        } else if (rejection.errors[0]?.code === "file-invalid-type") {
          setError("Invalid file type. Please upload an image.");
        } else {
          setError("Failed to upload file.");
        }
        return;
      }

      if (value.length + acceptedFiles.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const newFiles: MediaItem[] = acceptedFiles.map((file) => ({
        id: `${Date.now()}-${Math.random()}`,
        file,
        url: URL.createObjectURL(file),
        preview: URL.createObjectURL(file),
      }));

      onChange([...value, ...newFiles]);
    },
    [value, onChange, maxFiles, maxSize],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: maxFiles - value.length,
    disabled: disabled || value.length >= maxFiles,
  });

  const handleRemove = React.useCallback(
    (id: string) => {
      const fileToRemove = value.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      const newValue = value.filter((f) => f.id !== id);
      onChange(newValue);
      onRemove?.(id);
    },
    [value, onChange, onRemove],
  );

  React.useEffect(() => {
    return () => {
      // Cleanup object URLs on unmount
      value.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  const canAddMore = value.length < maxFiles && !disabled;

  return (
    <div className={cn("space-y-4", className)}>
      {canAddMore && (
        <div
          {...getRootProps()}
          className={cn(
            "cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <Upload
              className="text-muted-foreground size-8"
              strokeWidth={1.2}
            />
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {isDragActive
                  ? "Drop images here"
                  : "Drag & drop images here, or click to select"}
              </p>
              <p className="text-muted-foreground text-xs">
                {value.length}/{maxFiles} files
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="text-destructive bg-destructive/10 border-destructive/20 rounded-md border p-2 text-sm">
          {error}
        </div>
      )}

      {value.length > 0 && (
        <>
          {/* TODO: Add drag-to-reorder functionality for images using @dnd-kit/core or react-beautiful-dnd */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {value.map((image) => (
              <div
                key={image.id}
                className="group bg-muted relative aspect-square overflow-hidden rounded-lg border"
              >
                <img
                  src={image.preview || image.url}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => handleRemove(image.id)}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Remove image"
                  >
                    <X className="size-6 text-white" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {value.length === 0 && !canAddMore && (
        <div className="rounded-lg border-2 border-dashed p-6 text-center">
          <ImageIcon className="text-muted-foreground mx-auto mb-2 size-8" />
          <p className="text-muted-foreground text-sm">No images uploaded</p>
        </div>
      )}
    </div>
  );
}
