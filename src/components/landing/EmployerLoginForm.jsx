import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { authService } from "../../services/authService";
import { employerService } from "../../services/employerService";

const EmployerLoginForm = ({ noCard = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, updateUserFields } = useAuth();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const cooldownRef = useRef(null);

  const startResendCooldown = (seconds) => {
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    setResendCooldown(seconds);
    cooldownRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownRef.current) clearInterval(cooldownRef.current);
          cooldownRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(
    () => () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    },
    []
  );

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authService.sendEmployerLoginOtp(email);
      setStep("otp");
      startResendCooldown(30);
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to send OTP. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await authService.verifyEmployerOtp(email, otpString);
      if (!data?.accessToken || !data?.user || data.user.role !== "employer") {
        throw new Error("Invalid employer session.");
      }
      login(data.accessToken, data.refreshToken ?? null, data.user);
      try {
        const me = await employerService.getMe();
        if (me.success) {
          updateUserFields({ ...me.user, companyProfile: me.companyProfile });
        }
      } catch {
        // basic session still valid
      }
      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "OTP verification failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    setError("");
    try {
      await authService.resendOtp(email, "employer_login");
      startResendCooldown(30);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to resend OTP.";
      const waitSec = err.response?.data?.waitSeconds;
      if (waitSec) startResendCooldown(waitSec);
      setError(msg);
    }
  };

  const handleOTPChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`employer-login-otp-${index + 1}`)?.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`employer-login-otp-${index - 1}`)?.focus();
    }
  };

  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData?.getData("text") || "").replace(/\D/g, "");
    if (pasted.length === 0) return;
    const digits = pasted.slice(0, 6).split("");
    const newOtp = [...otp];
    digits.forEach((d, i) => {
      newOtp[i] = d;
    });
    setOtp(newOtp);
    const nextIndex = Math.min(digits.length, 5);
    document.getElementById(`employer-login-otp-${nextIndex}`)?.focus();
  };

  const content = (
    <>
      {step === "email" && (
        <>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Employer Login</h2>
          <p className="text-sm text-slate-600 mb-6">
            Enter your work email — we&apos;ll send a one-time code to sign you in.
          </p>

          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Work Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full py-4 rounded-lg font-semibold text-white bg-[#2563EB] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending…
                </>
              ) : (
                "Continue with OTP"
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600">
            New to Beyond Workz?{" "}
            <Link to="/register" className="font-semibold text-[#2563EB] hover:underline">
              Create an employer account
            </Link>
          </p>
        </>
      )}

      {step === "otp" && (
        <>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Enter OTP</h2>
          <p className="text-sm text-slate-600 mb-2">
            We sent a 6-digit code to <strong>{email}</strong>
          </p>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setOtp(["", "", "", "", "", ""]);
              setError("");
            }}
            className="text-sm text-[#F97316] font-medium hover:underline mb-6"
          >
            Change email
          </button>

          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`employer-login-otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleOTPKeyDown(index, e)}
                  onPaste={handleOTPPaste}
                  className="w-12 h-12 text-center text-xl font-semibold border-2 border-slate-300 rounded-lg focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] placeholder:text-slate-300"
                  placeholder="0"
                />
              ))}
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || otp.join("").length !== 6}
              className="w-full py-4 rounded-lg font-semibold text-white bg-[#2563EB] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in…
                </>
              ) : (
                "Verify & Continue"
              )}
            </button>
          </form>

          <p className="mt-4 text-xs text-slate-500 text-center">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendCooldown > 0}
              className="text-[#2563EB] font-medium hover:underline disabled:text-slate-400 disabled:no-underline disabled:cursor-not-allowed"
            >
              {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : "Resend OTP"}
            </button>
          </p>
        </>
      )}
    </>
  );

  if (noCard) {
    return content;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 lg:p-8">
      {content}
    </div>
  );
};

export default EmployerLoginForm;
