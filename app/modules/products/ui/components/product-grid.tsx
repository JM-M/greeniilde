import Link from "next/link";
import { ProductCard } from "./product-card";

const products = [
  {
    name: "Helios Max Panel Kit",
    price: "$6,499",
    specs: ["6.5 kW output", "25-year warranty", "Wi-Fi monitoring"],
  },
  {
    name: "Aurora Smart Inverter",
    price: "$2,199",
    specs: ["Hybrid ready", "98% efficiency", "Mobile app"],
  },
  {
    name: "Lumen Battery Stack",
    price: "$7,899",
    specs: ["18 kWh storage", "Stackable modules", "Indoor/outdoor"],
  },
  {
    name: "Irriga Solar Pump",
    price: "$3,250",
    specs: ["45m head", "Brushless motor", "Remote monitoring"],
  },
  {
    name: "SolGuard Maintenance Plan",
    price: "$99/mo",
    specs: ["Quarterly checks", "Priority support", "Performance reports"],
  },
  {
    name: "Helios Max Panel Kit",
    price: "$6,499",
    specs: ["6.5 kW output", "25-year warranty", "Wi-Fi monitoring"],
  },
  {
    name: "Aurora Smart Inverter",
    price: "$2,199",
    specs: ["Hybrid ready", "98% efficiency", "Mobile app"],
  },
  {
    name: "Lumen Battery Stack",
    price: "$7,899",
    specs: ["18 kWh storage", "Stackable modules", "Indoor/outdoor"],
  },
  {
    name: "Irriga Solar Pump",
    price: "$3,250",
    specs: ["45m head", "Brushless motor", "Remote monitoring"],
  },
  {
    name: "SolGuard Maintenance Plan",
    price: "$99/mo",
    specs: ["Quarterly checks", "Priority support", "Performance reports"],
  },
  {
    name: "Helios Max Panel Kit",
    price: "$6,499",
    specs: ["6.5 kW output", "25-year warranty", "Wi-Fi monitoring"],
  },
  {
    name: "Aurora Smart Inverter",
    price: "$2,199",
    specs: ["Hybrid ready", "98% efficiency", "Mobile app"],
  },
  {
    name: "Lumen Battery Stack",
    price: "$7,899",
    specs: ["18 kWh storage", "Stackable modules", "Indoor/outdoor"],
  },
  {
    name: "Irriga Solar Pump",
    price: "$3,250",
    specs: ["45m head", "Brushless motor", "Remote monitoring"],
  },
  {
    name: "SolGuard Maintenance Plan",
    price: "$99/mo",
    specs: ["Quarterly checks", "Priority support", "Performance reports"],
  },
  {
    name: "Helios Max Panel Kit",
    price: "$6,499",
    specs: ["6.5 kW output", "25-year warranty", "Wi-Fi monitoring"],
  },
  {
    name: "Aurora Smart Inverter",
    price: "$2,199",
    specs: ["Hybrid ready", "98% efficiency", "Mobile app"],
  },
  {
    name: "Lumen Battery Stack",
    price: "$7,899",
    specs: ["18 kWh storage", "Stackable modules", "Indoor/outdoor"],
  },
  {
    name: "Irriga Solar Pump",
    price: "$3,250",
    specs: ["45m head", "Brushless motor", "Remote monitoring"],
  },
  {
    name: "SolGuard Maintenance Plan",
    price: "$99/mo",
    specs: ["Quarterly checks", "Priority support", "Performance reports"],
  },
];

export const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product, index) => (
        <Link key={index} href={`/products/1`}>
          <ProductCard
            name={product.name}
            price={product.price}
            specs={product.specs}
            className="h-full"
          />
        </Link>
      ))}
    </div>
  );
};
