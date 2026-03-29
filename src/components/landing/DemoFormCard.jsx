import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COUNTRY_CODES = ["+1", "+91", "+44", "+61", "+81"];

const DemoFormCard = ({ onSubmit, hideTabs = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    phoneCountryCode: "+1",
    phone: "",
    company: "",
    companySize: "50-200",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData) ?? navigate("/register");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const content = (
    <>
      {!hideTabs && (
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            className="flex-1 py-3 px-4 rounded-lg font-semibold text-sm bg-[#2563EB] text-white"
          >
            Request a Free Demo
          </button>
          <button
            type="button"
            onClick={handleRegisterClick}
            className="flex-1 py-3 px-4 rounded-lg font-semibold text-sm bg-white text-slate-500 border border-slate-300 hover:bg-slate-50 transition-colors"
          >
            Register/Log in
          </button>
        </div>
      )}

      <p className="text-slate-600 text-sm mb-6">
        See how Beyond Workz can transform your hiring process.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-slate-900">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Jane Doe"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-slate-900">
            Work Email
          </label>
          <input
            type="email"
            name="workEmail"
            value={formData.workEmail}
            onChange={handleChange}
            placeholder="jane@company.com"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-slate-900">
            Phone Number
          </label>
          <div className="flex items-center gap-2">
            <select
              name="phoneCountryCode"
              value={formData.phoneCountryCode}
              onChange={handleChange}
              className="w-[78px] px-3 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm font-medium"
            >
              {COUNTRY_CODES.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 000-0000"
              className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-slate-900">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-slate-900">
              Company Size
            </label>
            <select
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent bg-white"
            >
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="50-200">50-200</option>
              <option value="201-500">201-500</option>
              <option value="501+">501+</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl font-semibold text-white bg-[#2563EB] hover:opacity-90 transition-opacity"
        >
          Request Demo
        </button>
      </form>
    </>
  );

  if (hideTabs) {
    // Embedded mode: the hero already has the card container.
    return content;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 lg:p-8">
      {content}
    </div>
  );
};

export default DemoFormCard;
