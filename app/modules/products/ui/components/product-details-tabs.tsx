"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { ProductDescription } from "./product-description";
import { ProductFaqs } from "./product-faqs";
import { ProductSpecifications } from "./product-specifications";
import { ProductReviews } from "./reviews";

export const ProductDetailsTabs = () => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="justify-start overflow-x-auto lg:mx-auto lg:w-fit">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specs">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Ratings & Reviews</TabsTrigger>
        <TabsTrigger value="faqs">FAQs</TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        <ProductDescription className="my-4 lg:mx-auto lg:max-w-prose" />
      </TabsContent>
      <TabsContent value="specs">
        <ProductSpecifications className="my-4 rounded-lg border lg:mx-auto lg:max-w-prose" />
      </TabsContent>
      <TabsContent value="reviews">
        <ProductReviews />
      </TabsContent>
      <TabsContent value="faqs">
        <ProductFaqs className="my-4 lg:mx-auto lg:max-w-prose" />
      </TabsContent>
    </Tabs>
  );
};
