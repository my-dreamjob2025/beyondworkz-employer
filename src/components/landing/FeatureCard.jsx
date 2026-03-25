const FeatureCard = ({ title, desc, icon }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
      <span className="inline-flex w-12 h-12 items-center justify-center rounded-lg bg-[#F97316]/20 text-[#F97316] text-2xl">
        {icon}
      </span>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600">{desc}</p>
    </div>
  );
};

export default FeatureCard;
