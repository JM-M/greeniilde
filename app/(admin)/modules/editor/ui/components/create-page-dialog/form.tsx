"use client";

import { Button } from "@/app/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  buildPath,
  getPageTypeOptions,
  PAGE_TYPES,
  type PageType,
} from "../../../configs/page-types";
import { useCreatePage } from "../../../hooks/use-editor-mutations";

type Props = {
  onSuccess: () => void;
};

const pageTypeOptions = getPageTypeOptions();
const pageTypeValues = Object.keys(PAGE_TYPES) as [PageType, ...PageType[]];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  path: z.string().min(1, "Path is required"),
  type: z.enum(pageTypeValues),
});

type FormValues = z.infer<typeof formSchema>;

export function CreatePageForm({ onSuccess }: Props) {
  const createPageMutation = useCreatePage();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      path: "",
      type: pageTypeOptions[0]?.value || "",
    },
  });

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const updatePath = (slug: string, type: PageType) => {
    form.setValue("path", buildPath(slug, type));
  };

  const onSubmit = (values: FormValues) => {
    createPageMutation.mutate(
      {
        title: values.title,
        slug: values.slug,
        type: values.type,
        path: values.path,
      },
      {
        onSuccess: () => {
          onSuccess();
          // Optional: Navigate to the new page
          window.location.href = `/editor?path=${values.path}`;
        },
      },
    );
  };

  console.log(pageTypeOptions);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Create New Page</DialogTitle>
          <DialogDescription>
            Add a new page to your site. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                <FormLabel className="text-right">Type</FormLabel>
                <div className="col-span-3">
                  <Select
                    onValueChange={(value: PageType) => {
                      field.onChange(value);
                      const currentSlug = form.getValues("slug");
                      if (currentSlug) {
                        updatePath(currentSlug, value);
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a page type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {pageTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                <FormLabel className="text-right">Title</FormLabel>
                <div className="col-span-3">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="My New Page"
                      onChange={(e) => {
                        field.onChange(e);
                        // Auto-generate slug and path from title
                        const newSlug = generateSlug(e.target.value);
                        form.setValue("slug", newSlug);
                        updatePath(newSlug, form.getValues("type"));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                <FormLabel className="text-right">Slug</FormLabel>
                <div className="col-span-3">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="my-new-page"
                      onChange={(e) => {
                        field.onChange(e);
                        updatePath(e.target.value, form.getValues("type"));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="path"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                <FormLabel className="text-right">Path</FormLabel>
                <div className="col-span-3">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="/my-new-page"
                      readOnly
                      className="bg-muted"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button type="submit" disabled={createPageMutation.isPending}>
            {createPageMutation.isPending ? "Creating..." : "Create Page"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
