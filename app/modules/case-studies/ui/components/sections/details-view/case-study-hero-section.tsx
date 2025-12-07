import { CaseStudyGallery } from "../../case-study-gallery";
import { CaseStudyProjectDetailsCard } from "../../case-study-project-details-card";

type CaseStudyHeroSectionProps = {
  images: string[];
  location: string;
  projectType: string;
  dateCompleted: string;
  technologies: string[];
};

export const CaseStudyHeroSection = ({
  images,
  location,
  projectType,
  dateCompleted,
  technologies,
}: CaseStudyHeroSectionProps) => {
  return (
    <section className="container mx-auto grid grid-cols-1 gap-6 px-4 py-4 lg:grid-cols-2 lg:gap-10">
      <div>
        <CaseStudyGallery images={images} />
      </div>
      <div>
        <CaseStudyProjectDetailsCard
          location={location}
          projectType={projectType}
          dateCompleted={dateCompleted}
          technologies={technologies}
        />
      </div>
    </section>
  );
};
