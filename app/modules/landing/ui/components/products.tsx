import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/app/components/ui/scroll-area";
import { ProductCard } from "@/app/modules/products/ui/components/product-card";
import { ProductCarousel } from "@/app/modules/products/ui/components/product-carousel";

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
  {
    value: "maintenance",
    label: "Maintenance",
    title: "Full-service maintenance",
    description:
      "Keep your system running at peak output with routine inspections and tune-ups.",
  },
];

const featuredProduct = {
  name: "Helios Max Panel Kit",
  price: "$6,499",
  specs: ["6.5 kW output", "25-year warranty", "Wi-Fi monitoring"],
};

export const Products = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <Tabs defaultValue={productTabs[0].value}>
        <ScrollArea className="-mx-4 mb-2 px-4">
          <TabsList className="flex w-max gap-2">
            {productTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="mt-6 space-y-4">
          {productTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <ProductCarousel />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </section>
  );
};
