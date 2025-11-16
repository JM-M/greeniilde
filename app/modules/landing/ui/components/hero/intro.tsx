type HeroIntroProps = {
  title: string;
  description: string;
};

export const HeroIntro = ({ title, description }: HeroIntroProps) => (
  <div className="space-y-6">
    <div className="space-y-4 text-left lg:text-center">
      <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="max-w-2xl text-base text-white/80 sm:text-lg">
        {description}
      </p>
    </div>
  </div>
);

