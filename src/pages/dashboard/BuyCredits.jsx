import { useNavigate } from "react-router-dom";

const creditPacks = [
  {
    name: "Starter Pack",
    credits: 10,
    price: "₹999",
    posts: "Post 10 Jobs",
    unlock: "Unlock 10 Candidate Contacts",
    support: "Standard Support",
    highlight: false,
  },
  {
    name: "Growth Pack",
    credits: 50,
    price: "₹4499",
    posts: "Post 50 Jobs",
    unlock: "Unlock 50 Candidate Contacts",
    support: "Priority Support",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Business Pack",
    credits: 200,
    price: "₹14999",
    posts: "Post 200 Jobs",
    unlock: "Unlock 200 Candidate Contacts",
    support: "Dedicated Support",
    highlight: false,
  },
];

const BuyCredits = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full -mx-8 -mb-8 bg-slate-50">
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-8 pt-8 pb-10">
          <div className="flex items-center justify-center mb-8 text-sm font-medium text-slate-600 gap-8">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1447E6] text-white flex items-center justify-center text-xs">
                1
              </span>
              <span className="text-slate-900">Select Credits</span>
            </div>
            <div className="h-px w-10 bg-slate-300" />
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs">
                2
              </span>
              <span>Checkout</span>
            </div>
          </div>

          <section className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Hire Faster with BeyondWorkz Credits
            </h1>
            <p className="text-slate-600">
              Post jobs and unlock candidate contacts using credits.
            </p>
            <button
              type="button"
              className="mt-2 text-sm font-semibold text-[#1447E6]"
            >
              View how credits work
            </button>
          </section>

          <section className="mb-8">
            <div className="rounded-2xl bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#F97316] text-white px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between shadow-lg">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide">
                  Up to 50% OFF on Credit Packs
                </p>
                <p className="mt-1 text-sm text-indigo-100">
                  Limited Time Offer
                </p>
              </div>
              <button
                type="button"
                className="mt-4 md:mt-0 px-5 py-2.5 bg-white text-[#F97316] font-semibold rounded-full text-sm shadow-sm"
              >
                Valid for 7 Days
              </button>
            </div>
          </section>

          <div className="flex items-center justify-center gap-4 mb-6 text-sm font-medium">
            <button className="px-4 py-2 rounded-full bg-slate-900 text-white">
              Bundle Packs
            </button>
            <button className="px-4 py-2 rounded-full text-slate-600 hover:bg-slate-100">
              Job Posting Credits
            </button>
            <button className="px-4 py-2 rounded-full text-slate-600 hover:bg-slate-100">
              Candidate Unlock Credits
            </button>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {creditPacks.map((pack) => (
              <div
                key={pack.name}
                className={`relative bg-white rounded-2xl border p-6 shadow-sm flex flex-col ${
                  pack.highlight
                    ? "border-[#1447E6] ring-1 ring-[#1447E6]/20"
                    : "border-slate-200"
                }`}
              >
                {pack.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-3 py-1 rounded-full bg-[#1447E6] text-white shadow">
                    {pack.badge}
                  </span>
                )}
                <p className="text-sm font-semibold text-slate-900">
                  {pack.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">{pack.credits} Credits</p>
                <p className="mt-4 text-3xl font-extrabold text-slate-900">
                  {pack.price}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>• {pack.posts}</li>
                  <li>• {pack.unlock}</li>
                  <li>• {pack.support}</li>
                </ul>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/credits/checkout")}
                  className={`mt-6 px-4 py-2.5 rounded-full text-sm font-semibold ${
                    pack.highlight
                      ? "bg-[#F97316] text-white hover:bg-[#ea580c]"
                      : "border border-slate-300 text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Buy Credits
                </button>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Custom Solution</p>
              <p className="mt-2 text-sm text-slate-600">
                Need bulk hiring credits for large teams?
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-slate-600">
                <span className="px-3 py-1 rounded-full bg-slate-100">
                  Dedicated Account Manager
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100">
                  Enterprise Support
                </span>
              </div>
              <button
                type="button"
                className="mt-5 px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-[#1447E6] hover:bg-[#1237b5]"
              >
                Contact Sales
              </button>
            </div>
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">How Credits Work</p>
              <p className="mt-3 text-sm text-slate-700">1 Job Post = 1 Credit</p>
              <p className="mt-1 text-sm text-slate-700">
                1 Candidate Contact Unlock = 1 Credit
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-2xl mx-auto space-y-2">
              {[
                "What are credits?",
                "How long do credits last?",
                "Can I buy more credits anytime?",
                "Do unused credits expire?",
              ].map((q, index) => (
                <button
                  key={q}
                  type="button"
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 hover:bg-slate-50"
                >
                  <span>{q}</span>
                  <span className="text-slate-400">{index === 0 ? "-" : "+"}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default BuyCredits;

