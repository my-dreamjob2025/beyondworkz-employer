const CreditsCheckout = () => {
  return (
    <div className="flex flex-col min-h-full -mx-8 -mb-8 bg-slate-50">
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-8 pt-8 pb-12">
          {/* Stepper */}
          <div className="flex items-center justify-center mb-8 text-sm font-medium text-slate-600 gap-8">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs">
                1
              </span>
              <span>Select Credits</span>
            </div>
            <div className="h-px w-10 bg-slate-300" />
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs">
                2
              </span>
              <span className="text-slate-900">Checkout</span>
            </div>
          </div>

          <button
            type="button"
            className="mb-4 text-xs font-medium text-slate-500 hover:text-slate-700"
          >
            ← Back to Plans
          </button>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm max-w-lg mx-auto p-6 md:p-8">
            <h1 className="text-xl font-semibold text-slate-900 mb-1">
              Checkout
            </h1>
            <p className="text-sm text-slate-500 mb-4">
              You are buying the Growth Pack.
            </p>

            <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <p className="font-semibold text-slate-900">Growth Pack</p>
              <p className="mt-1 text-slate-600">50 Credits</p>
              <div className="mt-3 space-y-1 text-slate-600">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Post Jobs
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Unlock Candidate Contacts
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-700 mb-4">
              <div className="flex items-center justify-between">
                <span>Plan Price</span>
                <span>₹4499</span>
              </div>
              <div className="flex items-center justify-between text-emerald-600">
                <span>Plan Discount</span>
                <span>-₹500</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <span>Subtotal</span>
                <span>₹3999</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>GST (18%)</p>
                  <button
                    type="button"
                    className="mt-0.5 text-xs font-medium text-[#2563EB]"
                  >
                    + Add GSTIN number
                  </button>
                </div>
                <span>₹719</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="font-semibold text-slate-900">
                  Total (Inc tax)
                </span>
                <span className="text-xl font-bold text-slate-900">₹4718</span>
              </div>
            </div>

            <div className="mb-4 rounded-lg bg-emerald-50 text-emerald-700 text-xs px-3 py-2">
              You saved ₹500 on this purchase.
            </div>

            <button
              type="button"
              className="w-full mt-2 mb-4 px-4 py-3 rounded-full text-sm font-semibold text-white bg-[#1FC16B] hover:opacity-90 transition-opacity"
            >
              Proceed to Pay ₹4718
            </button>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              Secure checkout powered by encrypted payment providers. By
              proceeding, you agree to BeyondWorkz&apos;s Terms of Service and
              Privacy Policy. All transactions are logged for compliance and
              anti-fraud checks.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CreditsCheckout;

