import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

type ProjectDetail = {
  label: string;
  value: string;
};

type CaseStudyProjectDetailsCardProps = {
  location: string;
  projectType: string;
  dateCompleted: string;
  technologies: string[];
};

export const CaseStudyProjectDetailsCard = ({
  location,
  projectType,
  dateCompleted,
  technologies,
}: CaseStudyProjectDetailsCardProps) => {
  const details: ProjectDetail[] = [
    { label: "Location", value: location },
    { label: "Project Type", value: projectType },
    { label: "Date Completed", value: dateCompleted },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {details.map((detail) => (
          <div key={detail.label} className="space-y-1">
            <p className="text-muted-foreground text-sm font-medium">
              {detail.label}
            </p>
            <p className="text-sm">{detail.value}</p>
          </div>
        ))}
        {technologies.length > 0 && (
          <div className="space-y-2 border-t pt-2">
            <p className="text-muted-foreground text-sm font-medium">
              Technologies
            </p>
            <ul className="space-y-1">
              {technologies.map((tech, index) => (
                <li key={index} className="text-sm">
                  • {tech}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
