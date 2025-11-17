type CaseStudyChallengeProps = {
  challenge?: string;
};

const defaultChallenge =
  "The client faced rising energy costs, unreliable grid power, and increasing pressure to meet sustainability goals. Traditional energy solutions were no longer viable for their growing operations.";

export const CaseStudyChallenge = ({
  challenge = defaultChallenge,
}: CaseStudyChallengeProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">The Challenge</h2>
      <p className="text-muted-foreground leading-relaxed">{challenge}</p>
    </section>
  );
};

