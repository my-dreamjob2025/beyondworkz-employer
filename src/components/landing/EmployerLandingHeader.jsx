import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrandLogoWithWordmark } from "../brand/BrandMark";
import { NAV_LINKS } from "../../data/landingPageData";

const EmployerLandingHeader = () => {
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-3 sm:h-16">
          <BrandLogoWithWordmark
            variant="landing"
            onClick={() => navigate("/")}
            imgClassName="h-9 w-auto max-h-10 shrink-0 object-contain object-left sm:h-10"
          />

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-5"
            >
              Post a job
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-blue-600"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => setMobileNavOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700"
              aria-expanded={mobileNavOpen}
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            >
              {mobileNavOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileNavOpen ? (
          <div className="border-t border-slate-100 py-4 md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile primary">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  onClick={() => setMobileNavOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false);
                  navigate("/register");
                }}
                className="mt-2 rounded-lg bg-blue-600 px-3 py-2.5 text-center text-sm font-semibold text-white"
              >
                Post a job
              </button>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default EmployerLandingHeader;
