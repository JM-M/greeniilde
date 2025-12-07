import { PageTitle } from "@/app/components/shared/page-title";
import type { ReactNode } from "react";

type CaseStudyHeaderSectionProps = {
  name: string;
  location: string;
  date: string;
  type: string;
};

export const CaseStudyHeaderSection = ({
  name,
  location,
  date,
  type,
}: CaseStudyHeaderSectionProps) => {
  const subtitle: ReactNode = (
    <>
      {type} • {date} • {location}
    </>
  );

  return (
    <section className="container mx-auto px-4 py-4">
      <PageTitle title={name} subtitle={subtitle} />
    </section>
  );
};
