type PageTitleProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export const PageTitle = ({ title, subtitle, className }: PageTitleProps) => {
  return (
    <div className={className ?? ""}>
      <h1 className="text-xl font-extrabold">{title}</h1>
      {subtitle ? (
        <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>
      ) : null}
    </div>
  );
};
