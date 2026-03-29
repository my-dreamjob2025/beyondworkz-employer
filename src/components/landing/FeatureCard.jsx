const FeatureCard = ({ title, desc, iconSrc }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
      <span className="inline-flex w-12 h-12 items-center justify-center rounded-lg bg-[#F973161A]">
        <img src={iconSrc} alt="" className="w-6 h-6 object-contain" width={24} height={24} />
      </span>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600">{desc}</p>
    </div>
  );
};

export default FeatureCard;
