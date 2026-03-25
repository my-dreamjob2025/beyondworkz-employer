const AnalyticsBannerSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="waves" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M0 10 Q5 5 10 10 T20 10"
                stroke="white"
                fill="none"
                strokeWidth="0.5"
                opacity="0.5"
              />
              <path
                d="M0 15 Q5 10 10 15 T20 15"
                stroke="white"
                fill="none"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves)" />
        </svg>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white">
          Hiring Insights & Analytics
        </h2>
        <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
          Make data-driven hiring decisions with real-time talent pool analytics, salary
          benchmarks, and competitor analysis.
        </p>
        <button className="mt-8 px-8 py-4 rounded-lg font-semibold text-white bg-[#F97316] hover:bg-[#ea580c] transition-colors">
          Explore Analytics
        </button>
      </div>
    </section>
  );
};

export default AnalyticsBannerSection;
