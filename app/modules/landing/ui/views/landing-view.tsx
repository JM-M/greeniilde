import { Hero } from "../components/hero";
import { ValueProp } from "../components/value-prop";
import { Products } from "../components/products";
import { Process } from "../components/process";
import { CaseStudies } from "../components/case-studies";
import { FAQs } from "../components/faqs";

export const LandingView = () => {
  return (
    <div>
      <Hero />
      <ValueProp />
      <Products />
      <Process />
      <CaseStudies />
      <FAQs />s
    </div>
  );
};
