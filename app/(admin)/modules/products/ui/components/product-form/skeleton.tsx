import { Card, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

/**
 * A loading skeleton for the ProductForm that mirrors the form layout.
 */
export const ProductFormSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
      {/* Left column - main content */}
      <div className="space-y-8 lg:col-span-4">
        {/* Content Fields Card */}
        <Card>
          <CardContent className="space-y-6 pt-6">
            {/* Media upload area */}
            <Skeleton className="h-48 w-full rounded-lg" />

            {/* Title and Category fields */}
            <div className="grid gap-2 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Description field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Variant Toggle */}
        <div className="rounded-lg border p-4">
          <div className="space-y-0.5">
            <div className="flex flex-row items-center justify-between">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-9 rounded-full" />
            </div>
            <Skeleton className="h-3 w-64" />
          </div>
        </div>
      </div>

      {/* Right column - sidebar */}
      <div className="space-y-8 lg:col-span-3">
        <div className="sticky top-0 space-y-6">
          {/* Shipping Card */}
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Tags Card */}
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-16" />
                </div>
              </div>
              {/* Existing tags */}
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
