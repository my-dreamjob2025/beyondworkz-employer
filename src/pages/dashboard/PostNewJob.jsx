import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StepHeader from "../../components/jobPosting/StepHeader";
import StepperNav from "../../components/jobPosting/StepperNav";
import BasicInfoStep from "../../components/jobPosting/steps/BasicInfoStep";
import JobDetailsStep from "../../components/jobPosting/steps/JobDetailsStep";
import SalaryStep from "../../components/jobPosting/steps/SalaryStep";
import ScreeningStep from "../../components/jobPosting/steps/ScreeningStep";
import PreviewStep from "../../components/jobPosting/steps/PreviewStep";
import { useJobPostingForm } from "../../hooks/useJobPostingForm";
import useAuth from "../../hooks/useAuth";
import { employerCanPostJobs } from "../../utils/employerVerification";

const PostNewJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const cp = user?.companyProfile;

  useEffect(() => {
    if (cp != null && !employerCanPostJobs(cp)) {
      navigate("/dashboard/company-profile", { replace: true });
    }
  }, [cp, navigate]);

  const {
    job,
    setJob,
    activeStep,
    goBack,
    goNext,
    goToStep,
    saveDraft,
    publish,
    submitting,
    formError,
    setFormError,
    loadError,
    loadingJob,
    jobStatus,
    isLastStep,
    toast,
    companyNameFallback,
    isEditMode,
  } = useJobPostingForm();

  const readOnly = jobStatus === "closed";

  let content = null;
  if (activeStep === 1) {
    content = (
      <BasicInfoStep job={job} setJob={setJob} companyNameFallback={companyNameFallback} />
    );
  } else if (activeStep === 2) {
    content = <JobDetailsStep job={job} setJob={setJob} />;
  } else if (activeStep === 3) {
    content = <SalaryStep job={job} setJob={setJob} />;
  } else if (activeStep === 4) {
    content = <ScreeningStep job={job} setJob={setJob} />;
  } else if (activeStep === 5) {
    content = <PreviewStep job={job} setJob={setJob} />;
  }

  if (loadingJob) {
  return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3 text-slate-600">
        <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm">Loading job…</p>
      </div>
  );
  }

  if (!cp) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3 text-slate-600">
        <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm">Loading profile…</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 pb-24 sm:pb-8">
      <StepHeader />
      <StepperNav activeStep={activeStep} onStepClick={readOnly ? undefined : goToStep} />

      {loadError && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 text-red-800 px-4 py-3 text-sm"
          role="alert"
        >
          {loadError}
        </div>
      )}

      {toast && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            toast.variant === "error"
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-emerald-200 bg-emerald-50 text-emerald-900"
          }`}
          role="status"
        >
          {toast.message}
        </div>
      )}

      {formError && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 text-amber-900 px-4 py-3 text-sm flex justify-between gap-4 items-start">
          <span>{formError}</span>
            <button
              type="button"
            className="text-amber-800 text-xs font-semibold shrink-0"
            onClick={() => setFormError(null)}
          >
            Dismiss
          </button>
        </div>
      )}

      {readOnly ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 text-slate-700 px-4 py-3 text-sm">
          This job is closed. You can review the details below; editing and publishing are disabled.
        </div>
      ) : null}

      <div className={readOnly ? "opacity-95" : ""}>{content}</div>

      {!readOnly && (
        <div className="fixed bottom-0 left-0 right-0 sm:static sm:rounded-none border-t border-slate-200 bg-white/95 backdrop-blur sm:bg-transparent sm:border-0 sm:backdrop-blur-none p-4 sm:p-0 z-20">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {activeStep === 1 ? "Cancel" : "Back"}
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                onClick={() => saveDraft()}
                disabled={submitting}
                className="px-3 sm:px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                {submitting ? "Saving…" : "Save draft"}
                </button>
            <button
              type="button"
                onClick={isLastStep ? () => publish() : goNext}
                disabled={submitting}
                className="px-4 sm:px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1248C1] flex items-center gap-2 disabled:opacity-50"
            >
                {submitting && isLastStep ? "Publishing…" : isLastStep ? "Publish job" : "Continue"}
            </button>
          </div>
          </div>
        </div>
      )}

      {isEditMode && jobStatus && !readOnly && (
            <p className="text-xs text-slate-500">
          Status: <span className="font-medium text-slate-700 capitalize">{jobStatus}</span>
          {jobStatus === "published" ? " — saving will update the live posting." : null}
        </p>
      )}
    </div>
  );
};

export default PostNewJob;
