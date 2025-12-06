"use client";

import { useCallback, useEffect, useState } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";

export interface FileWithPreview extends File {
  id: string;
  preview: string;
}

export interface UseFileUploadOptions {
  accept?: Accept;
  maxSize?: number; // in bytes
  maxFiles?: number;
  onUpload?: (files: File[]) => Promise<void>; // Placeholder for future server integration
}

export interface UseFileUploadReturn {
  files: FileWithPreview[];
  errors: string[];
  isDragging: boolean;
  getRootProps: ReturnType<typeof useDropzone>["getRootProps"];
  getInputProps: ReturnType<typeof useDropzone>["getInputProps"];
  removeFile: (id: string) => void;
  clearFiles: () => void;
}

export function useFileUpload({
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
  },
  maxSize = 5 * 1024 * 1024, // 5MB default
  maxFiles = 1,
  onUpload,
}: UseFileUploadOptions = {}): UseFileUploadReturn {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setErrors([]);

      // Handle rejections
      if (rejectedFiles.length > 0) {
        const newErrors = rejectedFiles.map((rejection) => {
          const error = rejection.errors[0];
          if (error.code === "file-too-large") {
            return `File ${rejection.file.name} is too large. Max size is ${maxSize / 1024 / 1024}MB`;
          } else if (error.code === "file-invalid-type") {
            return `File ${rejection.file.name} has an invalid type.`;
          } else if (error.code === "too-many-files") {
            return `Too many files. Maximum is ${maxFiles}.`;
          }
          return error.message;
        });
        setErrors((prev) => [...prev, ...newErrors]);
      }

      // Handle accepted files
      if (acceptedFiles.length > 0) {
        // Check if adding these files would exceed maxFiles
        if (files.length + acceptedFiles.length > maxFiles) {
          setErrors((prev) => [
            ...prev,
            `Cannot add ${acceptedFiles.length} files. Maximum allowed is ${maxFiles}.`,
          ]);
          return;
        }

        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            preview: URL.createObjectURL(file),
          }),
        );

        setFiles((prev) => [...prev, ...newFiles]);

        // Trigger optional upload callback
        if (onUpload) {
          onUpload(acceptedFiles).catch((err) => {
            console.error("Upload failed", err);
            setErrors((prev) => [...prev, "Upload failed"]);
          });
        }
      }
    },
    [maxSize, maxFiles, files.length, onUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: maxFiles - files.length, // Adjust maxFiles based on current count for dropzone logic
    disabled: files.length >= maxFiles,
  });

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearFiles = useCallback(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    setFiles([]);
    setErrors([]);
  }, [files]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return {
    files,
    errors,
    isDragging: isDragActive,
    getRootProps,
    getInputProps,
    removeFile,
    clearFiles,
  };
}
