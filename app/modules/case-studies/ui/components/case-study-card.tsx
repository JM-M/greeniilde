import { cn } from "@/app/lib/utils";
import Image from "next/image";

type CaseStudyCardProps = {
  name: string;
  location: string;
  imageUrl: string;
  className?: string;
};

export const CaseStudyCard = ({
  name,
  location,
  imageUrl,
  className,
}: CaseStudyCardProps) => {
  return (
    <div
      className={cn(
        "bg-card flex h-full cursor-pointer flex-col space-y-3 rounded-xl border p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-md",
        className,
      )}
    >
      <div className="bg-secondary relative aspect-4/3 w-full overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between space-y-2">
        <div>
          <p className="line-clamp-2 text-lg font-semibold">{name}</p>
          <p className="text-muted-foreground line-clamp-1 text-sm">
            {location}
          </p>
        </div>
        {/* <p className="text-sm text-muted-foreground pt-2 border-t mt-auto">
          View Details →
        </p> */}
      </div>
    </div>
  );
};
