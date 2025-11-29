import { ReactNode } from "react";

type PageTitleProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
};

export const PageTitle = ({ title, subtitle, className }: PageTitleProps) => {
  return (
    <div className={className ?? ""}>
      <h1 className="text-xl font-extrabold">{title}</h1>
      {subtitle ? (
        <div className="text-muted-foreground mt-1 text-sm">{subtitle}</div>
      ) : null}
    </div>
  );
};
