const Settings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">
          Manage your account and notification preferences.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm max-w-2xl">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Account Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="company@example.com"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            />
          </div>
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="accent-[#2563EB]"
              />
              <span className="text-sm text-slate-700">
                Email me when I receive new applications
              </span>
            </label>
          </div>
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="accent-[#2563EB]" />
              <span className="text-sm text-slate-700">
                Weekly digest of job performance
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
