const PlaceholderPage = ({ title = "Coming Soon", description = "This page is coming soon." }) => (
  <div className="text-center py-16">
    <h1 className="text-2xl font-bold text-slate-900 mb-2">{title}</h1>
    <p className="text-slate-600">{description}</p>
  </div>
);

export default PlaceholderPage;
