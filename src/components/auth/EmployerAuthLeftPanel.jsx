import brandLogo from "../../assets/logos/beyond-workz-logo.png";
import { BrandWordmark } from "../brand/BrandMark";
import userIllustration from "../../assets/user-illustration.png";

const EmployerAuthLeftPanel = () => {
  return (
    <div
      className="hidden lg:flex lg:w-1/2 flex-shrink-0 relative min-h-screen overflow-hidden isolate"
      style={{ backgroundColor: "#2563EB" }}
    >
      {/* Concentric glow rings */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ top: "-6%", paddingBottom: "18%" }}
      >
        <div className="w-[420px] h-[420px] rounded-full border border-[#6E97F2]" />
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ top: "-6%", paddingBottom: "18%" }}
      >
        <div className="w-[310px] h-[310px] rounded-full border border-[#B6CBF8]" />
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ top: "-6%", paddingBottom: "18%" }}
      >
        <div className="w-[210px] h-[210px] rounded-full border border-[#6E97F2]" />
      </div>

      <div
        className="absolute -bottom-20 -right-20 w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{ backgroundColor: "#6E97F2" }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen w-full px-10 py-8">
        <header className="flex flex-shrink-0 flex-wrap items-center gap-3">
          <img
            src={brandLogo}
            alt=""
            className="h-11 w-auto max-w-[100px] shrink-0 object-contain object-left brightness-0 invert sm:h-12 sm:max-w-[120px]"
          />
          <BrandWordmark variant="onBlue" />
        </header>

        <div className="flex-1 flex items-center justify-center py-6">
          <img
            src={userIllustration}
            alt=""
            className="w-[60%] max-w-[300px] h-auto object-contain drop-shadow-2xl"
            aria-hidden
          />
        </div>

        <div className="flex-shrink-0 flex flex-col items-center text-center pb-10">
          <h2 className="text-3xl xl:text-4xl font-extrabold text-white mb-3 leading-tight">
            Hire Beyond Limits
          </h2>
          <p
            className="text-base xl:text-lg max-w-xs leading-relaxed mb-6"
            style={{ color: "#E8E8E8" }}
          >
            Post jobs and connect with skilled candidates for blue-collar and
            white-collar roles.
          </p>
          <div
            className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-full font-semibold text-sm shadow-xl"
            style={{ backgroundColor: "#F97316" }}
          >
            <span>★</span>
            <span>Trusted by 1,000+ employers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerAuthLeftPanel;
