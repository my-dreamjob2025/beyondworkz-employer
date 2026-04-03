import api from "./api";

export async function fetchApplicationSummary() {
  const { data } = await api.get("/employer/applications/summary");
  return data;
}

export async function fetchRecentApplications(limit = 10) {
  const { data } = await api.get("/employer/applications/recent", {
    params: { limit },
  });
  return data;
}

export async function fetchEmployerApplications(jobId) {
  const { data } = await api.get("/employer/applications", {
    params: jobId ? { jobId } : {},
  });
  return data;
}

export async function fetchEmployerApplicationById(applicationId) {
  const { data } = await api.get(`/employer/applications/${encodeURIComponent(applicationId)}`);
  return data;
}

export async function updateApplicationStatus(applicationId, status) {
  const { data } = await api.patch(`/employer/applications/${applicationId}/status`, {
    status,
  });
  return data;
}
