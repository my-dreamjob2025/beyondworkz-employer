import { TRUSTED_COMPANIES } from "../../data/landingPageData";

const TrustedBySection = () => {
  return (
    <section className="py-12 bg-[#FEF3C7]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-slate-600 font-medium text-sm uppercase tracking-wider mb-8">
          Trusted by innovative companies worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16">
          {TRUSTED_COMPANIES.map((c) => (
            <div key={c.name} className="flex items-center gap-2 text-slate-600">
              <span className="text-2xl text-slate-400">{c.icon}</span>
              <span className="font-medium">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
