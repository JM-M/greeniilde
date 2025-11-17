"use client";

type StarsProps = {
  value: number;
  max?: number;
  className?: string;
};

export const Stars = ({ value, max = 5, className }: StarsProps) => {
  const full = Math.round(value);
  return (
    <div className={className}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={i < full ? "text-amber-500" : "text-muted-foreground"}
        >
          {i < full ? "★" : "☆"}
        </span>
      ))}
      <span className="sr-only">{`${value} out of ${max} stars`}</span>
    </div>
  );
};


