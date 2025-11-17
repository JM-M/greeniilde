"use client";

type EquipmentItem = {
  name: string;
  quantity?: string;
  description?: string;
};

type CaseStudyEquipmentProps = {
  className?: string;
  equipment?: EquipmentItem[];
};

const defaultEquipment: EquipmentItem[] = [
  {
    name: "Solar Panels",
    quantity: "1,200 units",
    description: "High-efficiency monocrystalline panels",
  },
  {
    name: "Battery Storage System",
    quantity: "4 units",
    description: "50 kWh lithium-ion battery modules",
  },
  {
    name: "Smart Inverters",
    quantity: "10 units",
    description: "Hybrid inverters with grid-tie capability",
  },
  {
    name: "Monitoring System",
    quantity: "1 system",
    description: "Cloud-based monitoring and analytics platform",
  },
  {
    name: "Mounting System",
    quantity: "Custom",
    description: "Ground-mounted racking system",
  },
];

export const CaseStudyEquipment = ({
  className,
  equipment = defaultEquipment,
}: CaseStudyEquipmentProps) => {
  return (
    <div className={className}>
      <div className="space-y-4">
        {equipment.map((item, index) => (
          <div key={index} className="space-y-1 border-b pb-4 last:border-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{item.name}</p>
                {item.description && (
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
              {item.quantity && (
                <p className="text-sm text-muted-foreground whitespace-nowrap">
                  {item.quantity}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

