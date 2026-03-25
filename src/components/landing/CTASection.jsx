import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#FFF7ED]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
          Start Hiring Top Talent Today
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Join thousands of companies scaling their teams with Beyond Workz.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 rounded-lg font-semibold text-white bg-[#F97316] hover:bg-[#ea580c] transition-colors"
          >
            Create Employer Account
          </button>
          <button className="px-8 py-4 rounded-lg font-semibold text-slate-900 border border-slate-300 bg-white hover:bg-slate-50 transition-colors">
            Talk to Sales
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
