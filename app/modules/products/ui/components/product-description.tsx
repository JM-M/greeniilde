"use client";

type ProductDescriptionProps = {
  className?: string;
  text?: string;
};

export const ProductDescription = ({
  className,
  text = "This product delivers reliable performance with efficient design and streamlined installation. Detailed copy can be added here from your CMS or product data source.",
}: ProductDescriptionProps) => {
  return <div className={className}>{text}</div>;
};


