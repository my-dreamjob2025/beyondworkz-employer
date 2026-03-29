import { VALUE_HIGHLIGHTS } from "../../data/landingPageData";

const MetricsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-12">
          {VALUE_HIGHLIGHTS.map((m) => (
            <div key={m.title} className="text-center">
              <p className="text-lg font-semibold text-[#2563EB]">{m.title}</p>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
