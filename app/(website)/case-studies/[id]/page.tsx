import { CaseStudyDetailsView } from "@/app/modules/case-studies/ui/views/case-study-details-view";

type PageProps = {
  params: Promise<{ id: string }>;
};

const CaseStudyDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  return <CaseStudyDetailsView id={id} />;
};

export default CaseStudyDetailsPage;
