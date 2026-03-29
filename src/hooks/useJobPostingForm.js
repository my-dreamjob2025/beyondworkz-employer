import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import {
  JOB_POST_STEPS,
  createInitialJobState,
  mapApiJobToForm,
  buildJobPayload,
} from "../features/jobPosting/constants";
import { validateStep, validatePublish } from "../features/jobPosting/stepValidation";
import {
  createEmployerJob,
  fetchEmployerJob,
  updateEmployerJob,
} from "../services/jobPostingService";

export function useJobPostingForm() {
  const { jobId: routeJobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const companyNameFallback = useMemo(() => {
    const n = user?.companyProfile?.companyDetails?.companyName?.trim();
    return n || "";
  }, [user]);

  const [job, setJob] = useState(() => createInitialJobState());
  const [activeStep, setActiveStep] = useState(1);
  const [serverJobId, setServerJobId] = useState(routeJobId || null);
  const [jobStatus, setJobStatus] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [loadingJob, setLoadingJob] = useState(!!routeJobId);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [toast, setToast] = useState(null);

  const isEditMode = Boolean(routeJobId);

  useEffect(() => {
    if (!routeJobId) {
      setLoadingJob(false);
      setServerJobId(null);
      return undefined;
    }

    let cancelled = false;
    (async () => {
      setLoadingJob(true);
      setLoadError(null);
      try {
        const res = await fetchEmployerJob(routeJobId);
        if (cancelled) return;
        if (res.success && res.job) {
          if (res.job.status === "closed") {
            setLoadError("This job is closed and cannot be edited.");
            setJob(mapApiJobToForm(res.job));
            setJobStatus("closed");
          } else {
            setJob(mapApiJobToForm(res.job));
            setJobStatus(res.job.status);
            setServerJobId(res.job.id);
          }
        } else {
          setLoadError(res.message || "Could not load job.");
        }
      } catch (e) {
        if (!cancelled) {
          setLoadError(e.response?.data?.message || e.message || "Could not load job.");
        }
      } finally {
        if (!cancelled) setLoadingJob(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [routeJobId]);

  useEffect(() => {
    if (isEditMode || companyNameFallback === "") return;
    setJob((prev) => {
      if (prev.hiringFor?.trim()) return prev;
      return { ...prev, hiringFor: companyNameFallback };
    });
  }, [companyNameFallback, isEditMode]);

  const showToast = useCallback((message, variant = "success") => {
    setToast({ message, variant });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const lastStepId = JOB_POST_STEPS.length;
  const isFirstStep = activeStep === 1;
  const isLastStep = activeStep === lastStepId;

  const goBack = useCallback(() => {
    setFormError(null);
    if (isFirstStep) {
      navigate("/dashboard/jobs");
    } else {
      setActiveStep((s) => Math.max(1, s - 1));
    }
  }, [isFirstStep, navigate]);

  const goNext = useCallback(() => {
    setFormError(null);
    const err = validateStep(activeStep, job, { companyNameFallback });
    if (err) {
      setFormError(err);
      return;
    }
    if (!isLastStep) {
      setActiveStep((s) => Math.min(lastStepId, s + 1));
    }
  }, [activeStep, job, companyNameFallback, isLastStep, lastStepId]);

  const persist = useCallback(
    async (status) => {
      const publishErr = status === "published" ? validatePublish(job, { companyNameFallback }) : null;
      if (publishErr) {
        setFormError(publishErr);
        return null;
      }

      const payload = buildJobPayload(job, status, { companyNameFallback });
      setSubmitting(true);
      setFormError(null);
      try {
        if (serverJobId) {
          const res = await updateEmployerJob(serverJobId, payload);
          if (res.success && res.job) {
            setJobStatus(res.job.status);
            showToast(res.message || "Saved.");
            if (status === "published") {
              navigate("/dashboard/jobs");
            }
            return res.job;
          }
          setFormError(res.message || "Save failed.");
          return null;
        }
        const res = await createEmployerJob(payload);
        if (res.success && res.job) {
          setServerJobId(res.job.id);
          setJobStatus(res.job.status);
          showToast(res.message || "Saved.");
          if (status === "published") {
            navigate("/dashboard/jobs", { replace: true });
          } else {
            navigate(`/dashboard/jobs/${res.job.id}/edit`, { replace: true });
          }
          return res.job;
        }
        setFormError(res.message || "Save failed.");
        return null;
      } catch (e) {
        const msg = e.response?.data?.message || e.message || "Request failed.";
        setFormError(msg);
        return null;
      } finally {
        setSubmitting(false);
      }
    },
    [job, companyNameFallback, serverJobId, navigate, showToast]
  );

  const saveDraft = useCallback(async () => {
    await persist("draft");
  }, [persist]);

  const publish = useCallback(async () => {
    const err = validatePublish(job, { companyNameFallback });
    if (err) {
      setFormError(err);
      return;
    }
    await persist("published");
  }, [job, companyNameFallback, persist]);

  const goToStep = useCallback(
    (stepId) => {
      if (stepId < 1 || stepId > lastStepId) return;
      if (stepId <= activeStep) {
        setFormError(null);
        setActiveStep(stepId);
        return;
      }
      for (let s = activeStep; s < stepId; s += 1) {
        const e = validateStep(s, job, { companyNameFallback });
        if (e) {
          setFormError(e);
          setActiveStep(s);
          return;
        }
      }
      setFormError(null);
      setActiveStep(stepId);
    },
    [activeStep, job, companyNameFallback, lastStepId]
  );

  return {
    job,
    setJob,
    activeStep,
    setActiveStep,
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
    isFirstStep,
    toast,
    companyNameFallback,
    serverJobId,
    isEditMode,
  };
}
