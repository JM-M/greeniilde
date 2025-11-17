import { CaseStudyGallery } from "@/app/modules/case-studies/ui/components/case-study-gallery";

type CaseStudyHeroProps = {
  imageUrl?: string;
  imageAlt?: string;
};

export const CaseStudyHero = ({
  imageUrl,
  imageAlt = "Case study hero image",
}: CaseStudyHeroProps) => {
  // TODO: Add a carousel of images.
  return (
    <div className="w-full">
      <CaseStudyGallery />
    </div>
  );
};
