import { useNavigate } from "react-router-dom";
import logo from "../../assets/logos/beyondworkzlogo.png";
import { NAV_LINKS } from "../../data/landingPageData";

const EmployerLandingHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Beyond Workz" className="h-9 w-auto" />
            <span className="text-xl font-bold text-[#1e3a8a]">Beyond Workz</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-600 hover:text-slate-900 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-[#1447E6] font-semibold hover:underline"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-5 py-2.5 rounded-lg font-semibold text-white bg-[#60a5fa] hover:bg-[#3b82f6] transition-colors"
            >
              Post a Job
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EmployerLandingHeader;
