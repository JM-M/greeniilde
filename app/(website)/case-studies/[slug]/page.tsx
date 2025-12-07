import { CaseStudyDetailsView } from "@/app/modules/case-studies/ui/views/case-study-details-view";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const CaseStudyDetailsPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  // Construct path for CMS lookup, consistent with landing page pattern
  const path = `/case-studies/${slug}`;

  return <CaseStudyDetailsView path={path} />;
};

export default CaseStudyDetailsPage;
