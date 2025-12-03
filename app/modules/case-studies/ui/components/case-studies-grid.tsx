import { CaseStudy } from "@/app/lib/data/case-studies";
import { CaseStudyCard } from "@/app/modules/case-studies/ui/components/case-study-card";
import Link from "next/link";

type CaseStudiesGridProps = {
  caseStudies: CaseStudy[];
};

export function CaseStudiesGrid({ caseStudies }: CaseStudiesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {caseStudies.map((study) => (
        <Link key={study.id} href={`/case-studies/${study.id}`}>
          <CaseStudyCard
            name={study.name}
            location={study.location}
            imageUrl={study.imageUrl}
          />
        </Link>
      ))}
    </div>
  );
}
