import { FEATURES } from "../../data/landingPageData";
import FeatureCard from "./FeatureCard";
import briefcaseIcon from "../../assets/icons/landing-page/briefcase.svg";
import searchIcon from "../../assets/icons/landing-page/search.svg";
import assistantIcon from "../../assets/icons/landing-page/assistant.svg";
import employerIcon from "../../assets/icons/landing-page/employer.svg";
import verifyIcon from "../../assets/icons/landing-page/verify.svg";
import atsIcon from "../../assets/icons/landing-page/ats.svg";

/** Same order as FEATURES in landingPageData */
const FEATURE_ICONS = [
  briefcaseIcon,
  searchIcon,
  assistantIcon,
  employerIcon,
  verifyIcon,
  atsIcon,
];

const FeaturesSection = () => {
  return (
    <section className="bg-white pt-20 pb-10 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Everything you need to hire top talent
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Our end-to-end recruitment platform provides all the tools you need to source,
            evaluate, and hire the best candidates.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => (
            <FeatureCard
              key={f.title}
              title={f.title}
              desc={f.desc}
              iconSrc={FEATURE_ICONS[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
