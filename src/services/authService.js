import api from "./api";

export const authService = {
  /**
   * Employer Registration
   */
  registerEmployer: async ({ email, agreeTerms, agreeWhatsapp = false }) => {
    const { data } = await api.post("/auth/employer/register", {
      email,
      agreeTerms,
      agreeWhatsapp,
    });
    return data;
  },

  /**
   * Employer Login - sends OTP
   */
  sendEmployerLoginOtp: async (email) => {
    const { data } = await api.post("/auth/employer/login", { email });
    return data;
  },

  /**
   * Verify Employer OTP - returns { accessToken, refreshToken, user }
   */
  verifyEmployerOtp: async (email, otp) => {
    const { data } = await api.post("/auth/employer/verify-otp", { email, otp });
    return data;
  },

  /**
   * Resend OTP
   * @param {string} email
   * @param {string} [type] - "login" | "signup" (default: "login")
   */
  resendOtp: async (email, type = "login") => {
    const { data } = await api.post("/auth/resend-otp", { email, type });
    return data;
  },
};
