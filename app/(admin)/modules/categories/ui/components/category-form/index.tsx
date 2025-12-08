"use client";

import { FormActionsBar } from "@/app/(admin)/dashboard/components/shared/form-actions-bar";
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/app/(admin)/modules/categories/hooks/use-category-actions";
import { Form } from "@/app/components/ui/form";
import { cn } from "@/app/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { HttpTypes } from "@medusajs/types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { categoryFormSchema, CategoryFormValues } from "../../../schemas";
import { ContentFields } from "./content-fields";
import { ProductsCard } from "./products-card";

interface CategoryFormProps {
  categoryId?: string;
  initialValues?: Partial<CategoryFormValues>;
  products?: HttpTypes.AdminProduct[];
  isLoadingProducts?: boolean;
}

export const CategoryForm = ({
  categoryId,
  initialValues,
  products = [],
  isLoadingProducts = false,
}: CategoryFormProps) => {
  const router = useRouter();
  const isUpdate = Boolean(categoryId);

  const createCategoryMutation = useCreateCategory({
    onSuccess: (res) => {
      toast.success("Category created successfully");
      router.push(`/dashboard/categories/${res.product_category.id}`);
    },
    onError: (error) => {
      toast.error(`Failed to create category: ${error.message}`);
    },
  });

  const updateCategoryMutation = useUpdateCategory({
    onSuccess: () => {
      toast.success("Category updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update category: ${error.message}`);
    },
  });

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      handle: "",
      isActive: true,
      isInternal: false,
      ...initialValues,
    },
  });

  const handleSubmit = (values: CategoryFormValues) => {
    if (isUpdate && categoryId) {
      updateCategoryMutation.mutate(
        {
          categoryId,
          updates: {
            name: values.name,
            description: values.description || undefined,
            handle: values.handle || undefined,
            is_active: values.isActive,
            is_internal: values.isInternal,
          },
        },
        {
          onSuccess: () => {
            form.reset(values);
          },
        },
      );
    } else {
      createCategoryMutation.mutate({
        name: values.name,
        description: values.description || undefined,
        handle: values.handle || undefined,
        is_active: values.isActive,
        is_internal: values.isInternal,
      });
    }
  };

  const isPending =
    form.formState.isSubmitting ||
    createCategoryMutation.isPending ||
    updateCategoryMutation.isPending;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn({ "mt-12": form.formState.isDirty })}
      >
        <FormActionsBar
          visible={form.formState.isDirty}
          onCancel={() => form.reset()}
          onSave={() => form.handleSubmit(handleSubmit)()}
          isSaving={isPending}
          slideDistance={2.3}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
          <div className="space-y-4 lg:col-span-4">
            <ContentFields />
          </div>
          <div className="lg:col-span-3">
            {isUpdate && categoryId && (
              <ProductsCard
                categoryId={categoryId}
                products={products}
                isLoading={isLoadingProducts}
              />
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};
