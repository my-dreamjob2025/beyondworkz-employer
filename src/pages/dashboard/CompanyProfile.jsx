import { useState, useEffect, useCallback } from "react";
import useAuth from "../../hooks/useAuth";
import { employerService } from "../../services/employerService";

const COMPANY_SIZES = [
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "201-500", label: "201–500 employees" },
  { value: "501-1000", label: "501–1,000 employees" },
  { value: "1000+", label: "1,000+ employees" },
];

const EMPLOYMENT_TYPES = ["Full Time", "Part Time", "Contract", "Internship"];
const RESPONSE_SLAS = ["Within 24 hours", "Within 3 days", "Within 1 week"];
const emptyRecruiter = () => ({
  firstName: "",
  lastName: "",
  position: "",
  contact: "",
  email: "",
  linkedin: "",
});

const CompanyProfile = () => {
  const { updateUserFields } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [companySize, setCompanySize] = useState("11-50");
  const [headquarters, setHeadquarters] = useState("");
  const [description, setDescription] = useState("");

  const [defaultJobLocation, setDefaultJobLocation] = useState("");
  const [defaultEmploymentType, setDefaultEmploymentType] = useState("Full Time");
  const [applicationEmail, setApplicationEmail] = useState("");
  const [responseSLA, setResponseSLA] = useState("Within 24 hours");
  const [autoArchiveInactiveJobs, setAutoArchiveInactiveJobs] = useState(false);

  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [glassdoor, setGlassdoor] = useState("");
  const [careersPage, setCareersPage] = useState("");
  const [recruiters, setRecruiters] = useState([emptyRecruiter()]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await employerService.getMe();
      if (!res.success) {
        setError("Could not load company profile.");
        return;
      }
      const c = res.companyProfile || {};
      const cd = c.companyDetails || {};
      const hp = c.hiringPreferences || {};
      const sm = c.companySocialMedia || {};
      const team = Array.isArray(c.recruiters) && c.recruiters.length > 0 ? c.recruiters : [emptyRecruiter()];

      setCompanyName(cd.companyName || "");
      setIndustryType(cd.industryType || "");
      setCompanySize(cd.companySize || "11-50");
      setHeadquarters(cd.headquarters || "");
      setDescription(cd.description || "");

      setDefaultJobLocation(hp.defaultJobLocation || "");
      setDefaultEmploymentType(hp.defaultEmploymentType || "Full Time");
      setApplicationEmail(hp.applicationEmail || "");
      setResponseSLA(hp.responseSLA || "Within 24 hours");
      setAutoArchiveInactiveJobs(!!hp.autoArchiveInactiveJobs);

      setWebsite(sm.website || "");
      setLinkedin(sm.linkedin || "");
      setGlassdoor(sm.glassdoor || "");
      setCareersPage(sm.careersPage || "");
      setRecruiters(
        team.map((r) => ({
          firstName: r.firstName || "",
          lastName: r.lastName || "",
          position: r.position || "",
          contact: r.contact || "",
          email: r.email || "",
          linkedin: r.linkedin || "",
        }))
      );
    } catch {
      setError("Could not load company profile.");
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
      const res = await employerService.updateCompanyProfile({
        companyDetails: {
          companyName,
          industryType,
          companySize,
          headquarters,
          description,
        },
        hiringPreferences: {
          defaultJobLocation,
          defaultEmploymentType,
          applicationEmail,
          responseSLA,
          autoArchiveInactiveJobs,
        },
        companySocialMedia: {
          website,
          linkedin,
          glassdoor,
          careersPage,
        },
        recruiters: recruiters
          .map((r) => ({
            firstName: r.firstName?.trim() || "",
            lastName: r.lastName?.trim() || "",
            position: r.position?.trim() || "",
            contact: r.contact?.trim() || "",
            email: r.email?.trim() || "",
            linkedin: r.linkedin?.trim() || "",
          }))
          .filter((r) => r.firstName || r.lastName || r.position || r.contact || r.email || r.linkedin),
      });
      if (res.success) {
        if (Array.isArray(res.invitedTeamMembers) && res.invitedTeamMembers.length > 0) {
          setSuccess(
            `Company profile saved. Invite OTP sent to: ${res.invitedTeamMembers.join(", ")}`
          );
        } else {
          setSuccess("Company profile saved.");
        }
        if (res.profileCompletion != null) {
          updateUserFields({
            profileCompletion: res.profileCompletion,
            companyProfile: res.companyProfile,
          });
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save company profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const updateRecruiter = (idx, field, value) => {
    setRecruiters((prev) => prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r)));
  };

  const addRecruiter = () => {
    setRecruiters((prev) => [...prev, emptyRecruiter()]);
  };

  const removeRecruiter = (idx) => {
    setRecruiters((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      return next.length ? next : [emptyRecruiter()];
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Company Profile</h1>
        <p className="text-slate-600 mt-1">
          Centralize your company details, branding, and hiring preferences for better job postings.
        </p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div>
              <p className="text-sm font-semibold text-slate-900">Company Details</p>
              <p className="text-sm text-slate-500 mt-1">
                These details will appear on your public job listings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  value={industryType}
                  onChange={(e) => setIndustryType(e.target.value)}
                  placeholder="e.g. Technology, Manufacturing"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                  Company Size
                </label>
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                >
                  {COMPANY_SIZES.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                  Headquarters
                </label>
                <input
                  type="text"
                  value={headquarters}
                  onChange={(e) => setHeadquarters(e.target.value)}
                  placeholder="City, Country"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                Company Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your mission, products and what makes your culture unique..."
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
              />
              <p className="mt-1 text-xs text-slate-400">
                A clear description helps candidates understand why they should work with you.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div>
              <p className="text-sm font-semibold text-slate-900">Hiring Preferences</p>
              <p className="text-sm text-slate-500 mt-1">
                Defaults for new job postings (stored with your company profile).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                  Default Job Location
                </label>
                <input
                  type="text"
                  value={defaultJobLocation}
                  onChange={(e) => setDefaultJobLocation(e.target.value)}
                  placeholder="e.g. Pune, India"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                  Default Employment Type
                </label>
                <select
                  value={defaultEmploymentType}
                  onChange={(e) => setDefaultEmploymentType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                >
                  {EMPLOYMENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                  Application email
                </label>
                <input
                  type="email"
                  value={applicationEmail}
                  onChange={(e) => setApplicationEmail(e.target.value)}
                  placeholder="talent@company.com"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                  Response SLA
                </label>
                <select
                  value={responseSLA}
                  onChange={(e) => setResponseSLA(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                >
                  {RESPONSE_SLAS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-500 uppercase">Auto-archive inactive jobs</p>
                <p className="text-xs text-slate-500">
                  Automatically close jobs that have been inactive for 60 days.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={autoArchiveInactiveJobs}
                onClick={() => setAutoArchiveInactiveJobs((v) => !v)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoArchiveInactiveJobs ? "bg-[#1447E6]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    autoArchiveInactiveJobs ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Online Presence</p>
              <p className="text-sm text-slate-500 mt-1">
                Add links so candidates can learn more about your brand.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Website</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">LinkedIn</label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/company/..."
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Glassdoor</label>
                <input
                  type="url"
                  value={glassdoor}
                  onChange={(e) => setGlassdoor(e.target.value)}
                  placeholder="https://www.glassdoor.com/..."
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Careers Page</label>
                <input
                  type="url"
                  value={careersPage}
                  onChange={(e) => setCareersPage(e.target.value)}
                  placeholder="https://company.com/careers"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Hiring Resources</p>
                <p className="text-sm text-slate-500 mt-1">
                  Add multiple hiring team members for this company.
                </p>
              </div>
              <button
                type="button"
                onClick={addRecruiter}
                className="px-3 py-2 text-xs font-semibold text-[#1447E6] border border-[#1447E6] rounded-full hover:bg-blue-50"
              >
                + Add Member
              </button>
            </div>

            <div className="space-y-4">
              {recruiters.map((r, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Team Member {idx + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeRecruiter(idx)}
                      className="text-xs font-medium text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={r.firstName}
                      onChange={(e) => updateRecruiter(idx, "firstName", e.target.value)}
                      placeholder="First name"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={r.lastName}
                      onChange={(e) => updateRecruiter(idx, "lastName", e.target.value)}
                      placeholder="Last name"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={r.position}
                      onChange={(e) => updateRecruiter(idx, "position", e.target.value)}
                      placeholder="Position (e.g. HR Manager)"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={r.contact}
                      onChange={(e) => updateRecruiter(idx, "contact", e.target.value)}
                      placeholder="Contact number"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                    />
                    <input
                      type="email"
                      value={r.email}
                      onChange={(e) => updateRecruiter(idx, "email", e.target.value)}
                      placeholder="Work email"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                    />
                    <input
                      type="url"
                      value={r.linkedin}
                      onChange={(e) => updateRecruiter(idx, "linkedin", e.target.value)}
                      placeholder="LinkedIn URL"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1447E6] rounded-full hover:bg-[#1237b5] disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save Company Profile"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Branding & Logo</p>
            <p className="text-sm text-slate-500 mt-1">
              Logo upload will be available when media storage is enabled for your workspace.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                Logo
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-emerald-100 p-5 shadow-sm">
            <p className="text-sm font-semibold text-emerald-800">Increase candidate trust</p>
            <p className="text-xs text-emerald-700 mt-1">
              Verified and complete company profiles see higher application rates. Keep your information
              updated as your company grows.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyProfile;
