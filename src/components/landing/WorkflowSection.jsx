import CheckIcon from "./CheckIcon";
import {
  WORKFLOW_STEPS,
  WORKFLOW_BULLETS,
  EMPLOYER_BRAND_BULLETS,
} from "../../data/landingPageData";

const WorkflowSection = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Streamline workflow */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Streamline your entire recruitment workflow
            </h2>
            <p className="mt-4 text-slate-600">
              Eliminate manual tasks and focus on what matters most—connecting with great
              talent. Our platform automates resume screening, interview scheduling, and
              candidate communication.
            </p>
            <ul className="mt-6 space-y-3">
              {WORKFLOW_BULLETS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl p-8 border border-slate-200 flex items-center justify-center">
            <div className="flex gap-4 items-center">
              {WORKFLOW_STEPS.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="w-24 h-16 rounded-lg bg-[#1447E6]/10 border border-[#1447E6]/30 flex items-center justify-center">
                    <span className="text-xs font-semibold text-[#1447E6] text-center px-2">
                      {step}
                    </span>
                  </div>
                  {i < WORKFLOW_STEPS.length - 1 && (
                    <span className="text-slate-300">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Employer Brand */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mt-24">
          <div className="order-2 lg:order-1 bg-white rounded-xl p-8 border border-slate-200 flex items-center justify-center min-h-[280px]">
            <div className="text-center text-slate-400">
              <div className="w-48 h-32 mx-auto mb-4 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                <span className="text-sm">Employer Branding & Company Profile</span>
              </div>
              <p className="text-xs">
                Company Info • Our Culture • Benefits • Team Testimonials
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-slate-900">
              Build an irresistible employer brand
            </h2>
            <p className="mt-4 text-slate-600">
              Stand out in a competitive talent market. Create beautiful company profiles
              that highlight your culture, benefits, and team testimonials to attract
              top-tier professionals.
            </p>
            <ul className="mt-6 space-y-3">
              {EMPLOYER_BRAND_BULLETS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
