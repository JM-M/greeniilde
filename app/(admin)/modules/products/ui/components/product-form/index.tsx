"use client";

import { FormActionsBar } from "@/app/(admin)/dashboard/components/shared/form-actions-bar";
import { usePresignedUpload } from "@/app/(admin)/hooks/use-presigned-upload";
import { useBatchInventoryLevels } from "@/app/(admin)/modules/products/hooks/use-inventory-actions";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/app/(admin)/modules/products/hooks/use-product-actions";
import {
  productFormSchema,
  type ProductFormValues,
} from "@/app/(admin)/modules/products/schemas";
import {
  buildInventoryCreatePayload,
  buildInventoryUpdatePayload,
} from "@/app/(admin)/modules/products/utils/build-inventory-payload";
import { prepareFilesForUpload } from "@/app/(admin)/modules/products/utils/prepare-files-for-upload";
import {
  transformFormToCreateProduct,
  transformFormToUpdateProduct,
} from "@/app/(admin)/modules/products/utils/transform-form-to-api";
import { Form } from "@/app/components/ui/form";
import { cn } from "@/app/lib/utils";
import { useStoreConfig } from "@/app/modules/store/hooks/use-store-queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ContentFields } from "./content-fields";
import { ShippingField } from "./shipping-field";
import { SimpleVariantFields } from "./simple-variant-fields";
import { StatusToggle } from "./status-toggle";
import { TagsField } from "./tags-field";
import { VariantToggle } from "./variant-toggle";
import { VariantsManager } from "./variants-manager";

const DEFAULT_VALUES: ProductFormValues = {
  title: "",
  description: "",
  status: "draft",
  category: "",
  shipping: {
    package: "",
    weight: undefined,
  },
  media: [],
  tags: [],
  defaultVariant: {
    price: undefined,
    inventory: undefined,
  },
  options: [],
  variants: [],
};

type ProductFormProps = {
  /**
   * Product ID for updates. If not provided, form is in create mode.
   */
  productId?: string;
  /**
   * Initial form values. Falls back to defaults if not provided.
   */
  initialValues?: Partial<ProductFormValues>;
  /**
   * Whether variants are initially enabled (e.g., product has multiple variants or options)
   */
  enableVariantsInitially?: boolean;
};

export const ProductForm = ({
  productId,
  initialValues,
  enableVariantsInitially = false,
}: ProductFormProps) => {
  const router = useRouter();
  const isUpdate = Boolean(productId);
  const [enableVariants, setEnableVariants] = useState(enableVariantsInitially);

  // Get store config for default sales channel
  const { data: storeConfig } = useStoreConfig();

  // Track if enableVariants has changed from initial
  const enableVariantsChanged = enableVariants !== enableVariantsInitially;

  // Mutations
  const presignedUploadMutation = usePresignedUpload();
  const batchInventoryMutation = useBatchInventoryLevels();

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
      ...DEFAULT_VALUES,
      ...initialValues,
    },
  });

  const submitProduct = (values: ProductFormValues) => {
    if (isUpdate && productId) {
      // Update existing product
      const updateData = transformFormToUpdateProduct(values);
      updateProductMutation.mutate(
        {
          productId,
          updates: updateData,
        },
        {
          onSuccess: () => {
            form.reset(values); // Reset form with submitted values to clear isDirty

            // Sync inventory levels
            if (storeConfig?.default_location_id) {
              const inventoryPayload = buildInventoryUpdatePayload(
                values,
                storeConfig.default_location_id,
              );
              if (inventoryPayload) {
                batchInventoryMutation.mutate(inventoryPayload);
              }
            }
          },
        },
      );
    } else {
      if (!storeConfig?.default_sales_channel_id) {
        toast.error("Default sales channel not found");
        return;
      }
      // Create new product - include default sales channel
      const createData = transformFormToCreateProduct(
        values,
        storeConfig?.default_sales_channel_id,
      );
      createProductMutation.mutate(
        {
          product: createData,
          query: {
            fields: "*variants,*variants.inventory_items",
          },
        },
        {
          onSuccess: (res) => {
            // Sync inventory levels for created variants
            const createdVariants = res.product.variants || [];
            if (storeConfig?.default_location_id) {
              const inventoryPayload = buildInventoryCreatePayload(
                values,
                createdVariants,
                storeConfig.default_location_id,
              );
              if (inventoryPayload) {
                batchInventoryMutation.mutate(inventoryPayload);
              }
            }
          },
        },
      );
    }
  };

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      const { filesToUpload, blobIndices } = await prepareFilesForUpload(
        values.media || [],
      );

      if (filesToUpload.length > 0) {
        presignedUploadMutation.mutate(
          { files: filesToUpload },
          {
            onSuccess: (uploadResult) => {
              const mediaUrls = [...(values.media || [])];
              uploadResult.files.forEach((file, index) => {
                const originalIndex = blobIndices[index];
                mediaUrls[originalIndex] = file.url;
              });
              submitProduct({ ...values, media: mediaUrls });
            },
            onError: (error) => {
              toast.error(`Failed to upload images: ${error.message}`);
            },
          },
        );
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
    presignedUploadMutation.isPending;

  // Form is dirty if form fields changed or enableVariants toggle changed
  const isFormDirty = form.formState.isDirty || enableVariantsChanged;

  // Handle cancel - reset form and enableVariants
  const handleCancel = () => {
    form.reset();
    setEnableVariants(enableVariantsInitially);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn({ "mt-12": isFormDirty })}
      >
        <FormActionsBar
          visible={isFormDirty}
          onCancel={handleCancel}
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

            {enableVariants ? <VariantsManager /> : <SimpleVariantFields />}
          </div>

          <div className="space-y-8 lg:col-span-3">
            <div className="sticky top-4 space-y-6">
              <StatusToggle />
              <ShippingField />
              <TagsField />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
