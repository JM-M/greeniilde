"use client";

import { FormActionsBar } from "@/app/(admin)/dashboard/components/shared/form-actions-bar";
import { useUploadFiles } from "@/app/(admin)/hooks/use-upload-files";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/app/(admin)/modules/products/hooks/use-product-actions";
import {
  productFormSchema,
  type ProductFormValues,
} from "@/app/(admin)/modules/products/schemas";
import {
  transformFormToCreateProduct,
  transformFormToUpdateProduct,
} from "@/app/(admin)/modules/products/utils/transform-form-to-api";
import { Form } from "@/app/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HttpTypes } from "@medusajs/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { VariantToggle } from "./variant-toggle";

import { cn } from "@/app/lib/utils";
import { ContentFields } from "./content-fields";
import { ShippingField } from "./shipping-field";
import { TagsField } from "./tags-field";
import { VariantsManager } from "./variants-manager";

type ProductFormProps = {
  product?: HttpTypes.AdminProduct;
};

const prepareFilesForUpload = async (mediaUrls: string[]) => {
  const filesToUpload: File[] = [];
  const blobIndices: number[] = [];

  for (let i = 0; i < mediaUrls.length; i++) {
    const url = mediaUrls[i];
    if (url.startsWith("blob:")) {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File(
        [blob],
        `image-${Date.now()}-${i}.${blob.type.split("/")[1]}`,
        {
          type: blob.type,
        },
      );
      filesToUpload.push(file);
      blobIndices.push(i);
    }
  }

  return { filesToUpload, blobIndices };
};

export const ProductForm = ({ product }: ProductFormProps) => {
  const router = useRouter();
  const isUpdate = Boolean(product);
  const [enableVariants, setEnableVariants] = useState(
    (product?.variants?.length || 0) > 1 || (product?.options?.length || 0) > 0,
  );

  // Mutations
  const uploadFilesMutation = useUploadFiles();

  const createProductMutation = useCreateProduct({
    onSuccess: (res) => {
      router.push(`/dashboard/products/${res.product.id}`);
      toast.success("Product created successfully");
    },
    onError: (error) => {
      toast.error(`Failed to create product: ${error.message}`);
    },
  });

  const updateProductMutation = useUpdateProduct({
    onSuccess: () => {
      toast.success("Product updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update product: ${error.message}`);
    },
  });

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      status: product?.status || "draft",
      category: product?.categories?.[0]?.id || "",
      shipping: {
        package: "", // TODO: Map from product
        weight: product?.weight || undefined,
      },
      media: product?.images?.map((img) => img.url) || [],
      tags: product?.tags?.map((tag) => tag.value) || [],
      options:
        product?.options?.map((opt) => ({
          name: opt.title,
          values: opt.values?.map((v) => v.value) || [],
        })) || [],
      variants: [], // TODO: Map variants
    },
  });

  const submitProduct = (values: ProductFormValues) => {
    if (isUpdate && product) {
      // Update existing product
      const updateData = transformFormToUpdateProduct(values);
      updateProductMutation.mutate({
        productId: product.id,
        updates: updateData,
      });
    } else {
      // Create new product
      const createData = transformFormToCreateProduct(values);
      createProductMutation.mutate({
        product: createData,
      });
    }
  };

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      const { filesToUpload, blobIndices } = await prepareFilesForUpload(
        values.media || [],
      );

      if (filesToUpload.length > 0) {
        const formData = new FormData();
        filesToUpload.forEach((file) => {
          formData.append("files", file);
        });

        uploadFilesMutation.mutate(formData, {
          onSuccess: (uploadResult) => {
            const mediaUrls = [...(values.media || [])];
            uploadResult.files.forEach(
              (file: HttpTypes.AdminFile, index: number) => {
                const originalIndex = blobIndices[index];
                mediaUrls[originalIndex] = file.url;
              },
            );
            submitProduct({ ...values, media: mediaUrls });
          },
          onError: (error) => {
            toast.error(`Failed to upload images: ${error.message}`);
          },
        });
      } else {
        submitProduct(values);
      }
    } catch (error) {
      console.error("Failed to prepare images:", error);
      toast.error("Failed to prepare images for upload.");
    }
  };

  const isPending =
    form.formState.isSubmitting ||
    createProductMutation.isPending ||
    updateProductMutation.isPending ||
    uploadFilesMutation.isPending;

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
          <div className="space-y-8 lg:col-span-4">
            <ContentFields />

            <VariantToggle
              checked={enableVariants}
              onCheckedChange={setEnableVariants}
            />

            {enableVariants && <VariantsManager />}
          </div>

          <div className="space-y-8 lg:col-span-3">
            <div className="sticky top-0 space-y-6">
              <ShippingField />
              <TagsField />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
