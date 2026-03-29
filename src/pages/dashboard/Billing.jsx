import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { EMPLOYER_CREDIT_PACKS } from "../../constants/employerCommerce";

const Billing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const company = user?.companyProfile;
  const companyName = company?.companyDetails?.companyName || "—";
  const billingEmail =
    company?.hiringPreferences?.applicationEmail || user?.email || "—";
  const addr = company?.address;
  const addressLine = [addr?.addressLine1, addr?.city, addr?.country]
    .filter(Boolean)
    .join(", ") || "—";

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Billing</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage credit purchases, invoices, and payment history.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/dashboard/credits/buy")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F97316] text-sm font-semibold text-white hover:bg-[#CC5705]"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 6h14M10 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
          Buy Credits
        </button>
      </header>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Billing Profile</h2>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5h2M5 7h14M5 7l1 12h12l1-12M9 11h6"
              />
            </svg>
            Edit Billing Details
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-slate-600">
          <div>
            <p className="font-medium text-slate-500 uppercase tracking-wide mb-1">
              Company Name
            </p>
            <p className="text-slate-900">{companyName}</p>
          </div>
          <div>
            <p className="font-medium text-slate-500 uppercase tracking-wide mb-1">GSTIN</p>
            <p className="text-slate-400">Not provided</p>
          </div>
          <div>
            <p className="font-medium text-slate-500 uppercase tracking-wide mb-1">
              Billing Email
            </p>
            <p className="text-slate-900">{billingEmail}</p>
          </div>
          <div>
            <p className="font-medium text-slate-500 uppercase tracking-wide mb-1">
              Company Address
            </p>
            <p className="text-slate-900">{addressLine}</p>
          </div>
        </div>

        <div className="mt-2 rounded-xl border border-amber-200 bg-[#FFDB431A] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-500 text-[11px] font-semibold">
              !
            </span>
            <span>Add GSTIN to receive tax invoices.</span>
          </div>
          <button
            type="button"
            className="px-3 py-1.5 rounded-full bg-white text-xs font-semibold text-amber-600 border border-amber-200 hover:bg-amber-50"
          >
            Add GSTIN
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Credit Purchase Plans</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {EMPLOYER_CREDIT_PACKS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border p-6 shadow-sm flex flex-col ${
                plan.highlight ? "border-[#2563EB]" : "border-slate-200"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-3 py-1 rounded-full bg-[#2563EB] text-white shadow">
                  {plan.badge}
                </span>
              )}
              <p className="text-sm font-semibold text-slate-900">{plan.name}</p>
              <p className="mt-1 text-xs text-slate-500">{plan.credits} Credits</p>
              <p className="mt-4 text-3xl font-extrabold text-slate-900">{plan.price}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {plan.posts}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {plan.unlock}
                </li>
                {plan.support && (
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    {plan.support}
                  </li>
                )}
              </ul>
              <button
                type="button"
                onClick={() => navigate("/dashboard/credits/checkout")}
                className={`mt-6 px-4 py-2.5 rounded-full text-sm font-semibold ${
                  plan.highlight
                    ? "bg-[#2563EB] text-white hover:bg-[#1248C1]"
                    : "bg-[#2563EB] text-white hover:bg-[#1248C1]"
                }`}
              >
                Buy Credits
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-2">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">Payment History</h2>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {["All", "Successful", "Pending", "Failed"].map((label, index) => {
              const active = index === 0;
              return (
                <button
                  key={label}
                  type="button"
                  className={`px-3 py-1.5 rounded-full font-medium ${
                    active
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {label}
                </button>
              );
            })}
            <div className="relative">
              <svg
                className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search transaction ID"
                className="pl-8 pr-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent w-52"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-xs font-medium text-slate-500 uppercase tracking-wide bg-slate-50">
                <th className="px-5 py-3 text-left">Date</th>
                <th className="px-5 py-3 text-left">Package</th>
                <th className="px-5 py-3 text-left">Credits</th>
                <th className="px-5 py-3 text-left">Amount</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Invoice</th>
                <th className="px-5 py-3 text-left">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-12 text-center text-sm text-slate-500"
                >
                  No payment history yet. Purchases will appear here after checkout is
                  connected.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Billing;

