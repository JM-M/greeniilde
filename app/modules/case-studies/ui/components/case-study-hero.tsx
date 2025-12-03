import { cn } from "@/app/lib/utils";
import Image from "next/image";

type CaseStudyHeroProps = {
  imageUrl: string;
  imageAlt: string;
  className?: string;
};

export const CaseStudyHero = ({
  imageUrl,
  imageAlt,
  className,
}: CaseStudyHeroProps) => {
  return (
    <div
      className={cn(
        "bg-secondary relative aspect-video w-full overflow-hidden rounded-xl",
        className,
      )}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
};
