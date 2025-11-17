import Link from "next/link";
import { CaseStudyCard } from "@/app/modules/case-studies/ui/components/case-study-card";

const caseStudies = [
  {
    name: "Desert Ridge Agrisolar",
    id: "desert-ridge-agrisolar",
  },
  {
    name: "Harborview Microgrid",
    id: "harborview-microgrid",
  },
  {
    name: "Mountain Crest Resort",
    id: "mountain-crest-resort",
  },
  {
    name: "Riverside Packaging Plant",
    id: "riverside-packaging-plant",
  },
  {
    name: "Northwind Data Center",
    id: "northwind-data-center",
  },
];

export function CaseStudiesGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {caseStudies.map((study) => (
        <Link key={study.id} href={`/case-studies/${study.id}`}>
          <CaseStudyCard name={study.name} />
        </Link>
      ))}
    </div>
  );
}
