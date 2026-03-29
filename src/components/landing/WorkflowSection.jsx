import CheckIcon from "./CheckIcon";
import { WORKFLOW_BULLETS, EMPLOYER_BRAND_BULLETS } from "../../data/landingPageData";

const ImageSlot = () => (
  <div
    className="min-h-[260px] w-full rounded-2xl border border-dashed border-slate-200 bg-white sm:min-h-[300px] lg:min-h-[min(22rem,50vw)]"
    aria-hidden
  />
);

const WorkflowSection = () => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Row 1: copy left, image space right */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="w-full max-w-xl lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Streamline your entire recruitment workflow
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Eliminate manual tasks and focus on what matters most—connecting with great
              talent. Our platform automates resume screening, interview scheduling, and
              candidate communication.
            </p>
            <ul className="mt-8 space-y-4">
              {WORKFLOW_BULLETS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckIcon className="mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:pl-2">
            <ImageSlot />
          </div>
        </div>

        {/* Row 2: image space left, copy right */}
        <div className="mt-16 grid grid-cols-1 items-center gap-10 sm:mt-20 lg:mt-28 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="w-full lg:order-1 lg:pr-2">
            <ImageSlot />
          </div>
          <div className="w-full max-w-xl lg:order-2 lg:max-w-none lg:pl-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Build an irresistible employer brand
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Stand out in a competitive talent market. Create beautiful company profiles
              that highlight your culture, benefits, and team testimonials to attract
              top-tier professionals.
            </p>
            <ul className="mt-8 space-y-4">
              {EMPLOYER_BRAND_BULLETS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckIcon className="mt-0.5" />
                  <span className="leading-snug">{item}</span>
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
