import { useState, useEffect, useCallback } from "react";
import useAuth from "../../hooks/useAuth";
import { employerService } from "../../services/employerService";

const TIMEZONES = [
  { value: "Asia/Kolkata", label: "(UTC+05:30) India Standard Time" },
  { value: "UTC", label: "(UTC+00:00) GMT" },
  { value: "America/New_York", label: "(UTC-05:00) Eastern Time" },
  { value: "Europe/London", label: "(UTC+00:00) London" },
  { value: "Asia/Singapore", label: "(UTC+08:00) Singapore" },
];

const UserProfile = () => {
  const { updateUserFields } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await employerService.getMe();
      if (!res.success || !res.user) {
        setError("Could not load profile.");
        return;
      }
      const u = res.user;
      setFirstName(u.firstName || "");
      setLastName(u.lastName || "");
      setJobTitle(u.jobTitle || "");
      setDepartment(u.department || "");
      setEmail(u.email || "");
      setPhone(u.phone || "");
      setCity(u.city || "");
      setTimezone(u.timezone || "Asia/Kolkata");
    } catch {
      setError("Could not load profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await employerService.updateUserProfile({
        firstName,
        lastName,
        jobTitle,
        department,
        phone,
        city,
        timezone,
      });
      if (res.success) {
        setSuccess("Profile saved.");
        updateUserFields({
          firstName,
          lastName,
          jobTitle,
          department,
          phone,
          city,
          timezone,
          profileCompletion: res.profileCompletion,
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const initials =
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "U";

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
        <p className="text-slate-600 mt-1">
          Manage your personal information, contact details, and account preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800">
              {success}
            </div>
          )}

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-[#1447E6] flex items-center justify-center text-white font-semibold text-xl">
                {initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                  Personal Information
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {[firstName, lastName].filter(Boolean).join(" ") || "Your name"}
                </p>
                <p className="text-sm text-slate-500 mt-0.5">
                  This information is visible to candidates on your job posts.
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. HR Manager, Talent Lead"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Human Resources"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2.5 text-sm font-semibold text-white bg-[#1447E6] rounded-full hover:bg-[#1237b5] disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div>
              <p className="text-sm font-semibold text-slate-900">Contact Details</p>
              <p className="text-sm text-slate-500 mt-1">
                Keep your contact information up to date so candidates and our team can reach you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50 text-slate-500"
                />
                <p className="mt-1 text-xs text-slate-400">
                  Email is used for login and important account updates.
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 or international format"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                  Time Zone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div>
              <p className="text-sm font-semibold text-slate-900">Notification Preferences</p>
              <p className="text-sm text-slate-500 mt-1">
                Choose how you want to be notified about important activity. (Coming soon)
              </p>
            </div>
            <p className="text-xs text-slate-400">
              Notification channels will be connected in a future update.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Account Security</p>
            <p className="text-sm text-slate-500 mt-1">
              You sign in with a one-time code sent to your email — no password to remember.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-amber-100 p-5 shadow-sm">
            <p className="text-sm font-semibold text-amber-700">Tip for better responses</p>
            <p className="text-xs text-amber-700 mt-1">
              Complete your profile and use your real name so candidates feel confident when applying
              to your jobs.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
