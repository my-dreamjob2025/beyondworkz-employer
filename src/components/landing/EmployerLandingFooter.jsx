import { Link } from "react-router-dom";
import brandLogo from "../../assets/logos/beyond-workz-logo.png";
import { BrandWordmark } from "../brand/BrandMark";
import LinkedinIcon from "../../assets/icons/common-icon/linkedin.svg";
import TwitterIcon from "../../assets/icons/common-icon/twitter.svg";
import FacebookIcon from "../../assets/icons/common-icon/facebook.svg";
import { employeePublicUrls, employerAppPaths } from "../../constants/appUrls";

const seekerLinks = [
  { label: "Browse Jobs", href: employeePublicUrls.jobs },
  { label: "Browse Companies", href: employeePublicUrls.companies },
  { label: "Salary Calculator", href: employeePublicUrls.salaryCalculator },
  { label: "Resume Builder", href: employeePublicUrls.resumeBuilder },
];

const employerLinks = [
  { label: "Post a Job", to: employerAppPaths.postJob },
  { label: "Browse Candidates", to: employerAppPaths.browseCandidates },
  { label: "Pricing Plans", to: employerAppPaths.pricing },
  { label: "Employer Dashboard", to: employerAppPaths.dashboard },
];

const companyLinks = [
  { label: "About Us", href: employeePublicUrls.about },
  { label: "Mission", href: employeePublicUrls.mission },
  { label: "Careers", href: employeePublicUrls.careers },
  { label: "Privacy Policy", href: employeePublicUrls.privacy },
  { label: "Terms of Service", href: employeePublicUrls.terms },
];

/**
 * Matches the job seeker (employee) panel footer: dark band, four columns, social icons.
 */
const EmployerLandingFooter = () => {
  return (
    <footer className="bg-[#0B1B33] text-[#9CA3AF]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <img
                src={brandLogo}
                alt=""
                className="h-10 w-auto max-w-[100px] shrink-0 object-contain object-left brightness-0 invert sm:h-11 sm:max-w-[120px]"
              />
              <BrandWordmark variant="footerDark" />
            </div>

            <p className="text-sm leading-relaxed max-w-sm">
              Connecting great talent with great opportunities. Built for the modern workforce, from corporate desks to
              construction sites.
            </p>
          </div>

          <div>
            <p className="text-white font-semibold mb-5">For Job Seekers</p>
            <ul className="space-y-3 text-sm">
              {seekerLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-5">For Employers</p>
            <ul className="space-y-3 text-sm">
              {employerLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="hover:text-white transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-5">Company</p>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[#1F2A44] flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} Beyond Workz. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src={LinkedinIcon} alt="" className="w-5 h-5 cursor-pointer hover:opacity-80" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img src={TwitterIcon} alt="" className="w-5 h-5 cursor-pointer hover:opacity-80" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src={FacebookIcon} alt="" className="w-5 h-5 cursor-pointer hover:opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EmployerLandingFooter;
