import { SectionHeader } from "@/app/components/shared/section-header";
import { Button } from "@/app/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { ProductCarousel } from "@/app/modules/products/ui/components/product-carousel";
import Link from "next/link";

const productTabs = [
  {
    value: "panels",
    label: "Panels",
    title: "High-efficiency solar panels",
    description:
      "Capture more sunlight with monocrystalline modules engineered for modern rooftops.",
  },
  {
    value: "inverters",
    label: "Inverters",
    title: "Reliable inverters",
    description:
      "Streamline energy conversion with smart monitoring for every installation.",
  },
  {
    value: "batteries",
    label: "Batteries",
    title: "Energy storage",
    description:
      "Store surplus power safely for overnight usage and cloudy days.",
  },
  {
    value: "solar-pumps",
    label: "Solar Pumps",
    title: "Agricultural pumps",
    description:
      "Deliver consistent irrigation with minimal maintenance and zero fuel costs.",
  },
];

const featuredProduct = {
  name: "Helios Max Panel Kit",
  price: "$6,499",
  specs: ["6.5 kW output", "25-year warranty", "Wi-Fi monitoring"],
};

export const Products = () => {
  return (
    <section id="products" className="container mx-auto space-y-6 px-4 py-16">
      <SectionHeader
        title="Products"
        description="We offer a wide range of products to suit your needs."
      />
      <Tabs defaultValue={productTabs[0].value}>
        <TabsList className="mx-auto flex h-fit flex-wrap justify-center gap-2 bg-transparent">
          {productTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-[unset] cursor-pointer"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-2 space-y-4">
          {productTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <ProductCarousel />
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <div>
        <Button
          variant="link"
          className="text-primary mx-auto flex w-fit"
          asChild
        >
          <Link href="/products" prefetch>
            View All Products
          </Link>
        </Button>
      </div>
    </section>
  );
};
