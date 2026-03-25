import { FEATURES } from "../../data/landingPageData";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
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
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} title={f.title} desc={f.desc} icon={f.icon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
