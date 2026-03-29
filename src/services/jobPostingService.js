import api from "./api";

export async function fetchEmployerJobs(params = {}) {
  const { data } = await api.get("/employer/jobs", { params });
  return data;
}

export async function fetchEmployerJob(jobId) {
  const { data } = await api.get(`/employer/jobs/${jobId}`);
  return data;
}

export async function createEmployerJob(payload) {
  const { data } = await api.post("/employer/jobs", payload);
  return data;
}

export async function updateEmployerJob(jobId, payload) {
  const { data } = await api.put(`/employer/jobs/${jobId}`, payload);
  return data;
}

export async function patchJobStatus(jobId, status) {
  const { data } = await api.patch(`/employer/jobs/${jobId}/status`, { status });
  return data;
}
