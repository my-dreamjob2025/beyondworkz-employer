import { useNavigate } from "react-router-dom";

const AnalyticsBannerSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white pb-20 pt-2 sm:pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#2563EB] px-6 py-14 text-center shadow-lg sm:px-10 sm:py-16 lg:rounded-3xl lg:py-20">
          {/* Bottom-half wave decoration — lighter blue / white overlays */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 top-[42%] overflow-hidden"
            aria-hidden
          >
            <svg
              className="absolute -bottom-px left-1/2 min-h-[85%] w-[140%] -translate-x-1/2 text-white"
              viewBox="0 0 1440 280"
              preserveAspectRatio="none"
            >
              <path
                fill="currentColor"
                fillOpacity="0.12"
                d="M0,120 C320,200 640,40 960,100 C1200,150 1320,80 1440,110 L1440,280 L0,280 Z"
              />
              <path
                fill="currentColor"
                fillOpacity="0.08"
                d="M0,180 C280,140 560,220 880,160 C1100,120 1280,200 1440,170 L1440,280 L0,280 Z"
              />
              <path
                fill="currentColor"
                fillOpacity="0.06"
                d="M0,210 C400,250 800,170 1440,220 L1440,280 L0,280 Z"
              />
            </svg>
          </div>

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
              Hiring Insights &amp; Analytics
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#E8E8E8] sm:text-lg">
              Make data-driven hiring decisions with real-time talent pool analytics, salary
              benchmarks, and competitor analysis.
            </p>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="analytics-cta mt-8 inline-flex items-center justify-center rounded-full bg-[#F97316] px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-200 sm:text-base"
            >
              Explore Analytics
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .analytics-cta {
          box-shadow: 0px 4px 12px 0px #0000001a;
        }
        .analytics-cta:hover {
          background-color: #CC5705;
          box-shadow: 0px 6px 16px 0px #0000001a;
        }
      `}</style>
    </section>
  );
};

export default AnalyticsBannerSection;
