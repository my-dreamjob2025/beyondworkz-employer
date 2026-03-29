import { JOB_POST_STEPS } from "../../features/jobPosting/constants";

const inputBase =
  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors";

const StepperNav = ({ activeStep, onStepClick }) => (
  <nav aria-label="Job posting steps" className="mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-1">
    <ol className="flex items-center min-w-[640px] sm:min-w-0">
      {JOB_POST_STEPS.map((step, index) => {
        const isActive = step.id === activeStep;
        const isCompleted = step.id < activeStep;

        return (
          <li key={step.id} className="flex-1 flex items-center">
            <button
              type="button"
              onClick={() => onStepClick?.(step.id)}
              className="flex items-center text-left group"
            >
              <span
                className={`${inputBase} ${
                  isCompleted
                    ? "bg-[#2563EB] text-white"
                    : isActive
                      ? "bg-[#2563EB1A] text-[#2563EB] ring-2 ring-[#2563EB]"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                }`}
              >
                {isCompleted ? "✓" : step.id}
              </span>
              <span
                className={`ml-2 text-xs sm:text-sm font-medium max-w-[5.5rem] sm:max-w-none leading-tight ${
                  isActive || isCompleted ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </button>
            {index < JOB_POST_STEPS.length - 1 && (
              <div className="flex-1 h-px mx-2 sm:mx-3 bg-slate-200 min-w-[8px]" />
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default StepperNav;
