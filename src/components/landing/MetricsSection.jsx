import { METRICS } from "../../data/landingPageData";

const MetricsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-12">
          {METRICS.map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-[#1447E6]">{m.value}</p>
              <p className="mt-2 text-slate-600 font-medium">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
