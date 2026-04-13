import api from "./api";

export const employerService = {
  getMe: async () => {
    const { data } = await api.get("/employer/me");
    return data;
  },

  updateUserProfile: async (body) => {
    const { data } = await api.patch("/employer/profile", body);
    return data;
  },

  updateCompanyProfile: async (body) => {
    const { data } = await api.patch("/employer/company", body);
    return data;
  },

  submitVerification: async () => {
    const { data } = await api.post("/employer/company/submit-verification");
    return data;
  },
};
