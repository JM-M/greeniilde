"use client";

import { Button } from "@/app/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useState } from "react";
import { useCreatePage } from "../../hooks/use-editor-mutations";

type Props = {
  onSuccess: () => void;
};

import { Page } from "@/types/page";

// ...

export function CreatePageForm({ onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [path, setPath] = useState("");
  const [type, setType] = useState<Page["type"]>("landing-page");

  const createPageMutation = useCreatePage();

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    // Auto-generate slug and path from title
    const newSlug = generateSlug(newTitle);
    setSlug(newSlug);
    setPath(`/${newSlug}`);
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value;
    setSlug(newSlug);
    setPath(`/${newSlug}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !path) return;

    createPageMutation.mutate(
      {
        title,
        slug,
        type,
        path,
      },
      {
        onSuccess: () => {
          onSuccess();
          // Optional: Navigate to the new page
          window.location.href = `/editor?path=${path}`;
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Create New Page</DialogTitle>
        <DialogDescription>
          Add a new page to your site. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="col-span-3"
            placeholder="My New Page"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="slug" className="text-right">
            Slug
          </Label>
          <Input
            id="slug"
            value={slug}
            onChange={handleSlugChange}
            className="col-span-3"
            placeholder="my-new-page"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="path" className="text-right">
            Path
          </Label>
          <Input
            id="path"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="col-span-3"
            placeholder="/my-new-page"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Type
          </Label>
          <Select
            value={type}
            onValueChange={(value) => setType(value as Page["type"])}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a page type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="landing-page">Landing Page</SelectItem>
              <SelectItem value="case-study">Case Study</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={createPageMutation.isPending}>
          {createPageMutation.isPending ? "Creating..." : "Create Page"}
        </Button>
      </DialogFooter>
    </form>
  );
}
