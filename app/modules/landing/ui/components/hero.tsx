import { Button } from "@/app/components/ui/button";

const subheadingButtons = [
  {
    label: "Panels",
  },
  {
    label: "Inverters",
  },
  {
    label: "Batteries",
  },
  {
    label: "Solar Pumps",
  },
  {
    label: "Maintainance",
  },
];

export const Hero = () => {
  return (
    <header className="container mx-auto grid h-[calc(100vh-64px)] grid-cols-1 px-4 pb-20">
      <div className="mt-auto space-y-10 text-center">
        <div className="space-y-5">
          <h1 className="text-4xl font-extrabold">
            Save on Electricity with Reliable Solar Power.
          </h1>
          <p>
            Solar System Designed, Supplied and Installed for your Home or
            Business.
          </p>
        </div>
        <div className="space-y-5">
          <div className="flex flex-wrap justify-center gap-2">
            {subheadingButtons.map((button) => (
              <Button key={button.label} variant="outline" size="sm">
                {button.label}
              </Button>
            ))}
          </div>
          <div>
            <Button size="lg" className="w-full">
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
