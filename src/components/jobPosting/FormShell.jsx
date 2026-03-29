const FormShell = ({ title, description, children }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-8 shadow-sm">
    {title && <h2 className="text-lg font-semibold text-slate-900 mb-1">{title}</h2>}
    {description && <p className="text-sm text-slate-500 mb-6">{description}</p>}
    {children}
  </div>
);

export default FormShell;
