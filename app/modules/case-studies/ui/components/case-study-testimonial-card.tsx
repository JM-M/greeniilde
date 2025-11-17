import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

type CaseStudyTestimonialCardProps = {
  quote?: string;
  author?: string;
  role?: string;
  company?: string;
};

export const CaseStudyTestimonialCard = ({
  quote = "The implementation exceeded our expectations. We've seen immediate cost savings and improved energy reliability.",
  author = "John Smith",
  role = "Facilities Manager",
  company = "Desert Ridge Agrisolar",
}: CaseStudyTestimonialCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Testimonial</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <blockquote className="text-sm italic text-muted-foreground leading-relaxed">
          "{quote}"
        </blockquote>
        <div className="space-y-1">
          <p className="text-sm font-semibold">{author}</p>
          <p className="text-xs text-muted-foreground">
            {role}
            {company && ` • ${company}`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

