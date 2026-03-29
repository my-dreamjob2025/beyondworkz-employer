import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DemoFormCard from "./DemoFormCard";
import EmployerLoginForm from "./EmployerLoginForm";

const HeroSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("demo");

  return (
    <section
      className="min-h-screen flex items-center py-16 px-4 sm:px-6 lg:px-20"
      style={{
        background:
          "linear-gradient(135deg, #B6CBF8 0%, #E8E8E8 50%, #FFFFFF 100%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* LEFT SIDE */}
        <div className="w-full lg:flex-1 lg:max-w-[520px]">
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#F97316",
              color: "#FFFFFF",
              borderRadius: "999px",
              padding: "8px 20px",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "32px",
            }}
          >
            #1 Hiring Platform in 2025
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(40px, 5vw, 58px)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#0F172A",
              margin: "0 0 20px 0",
              letterSpacing: "-1px",
            }}
          >
            Hire the Right Talent with Beyond Workz
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: "16px",
              color: "#8E8E8E",
              lineHeight: 1.7,
              margin: "0 0 36px 0",
              maxWidth: "420px",
            }}
          >
            Access thousands of skilled professionals and hire faster with smart
            recruitment tools designed for modern employers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-7">
            <button
              style={{
                backgroundColor: "#2563EB",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "999px",
                padding: "14px 28px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#1248C1")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#2563EB")}
              onClick={() => navigate("/register")}
            >
              Start Hiring
            </button>

            <button
              onClick={() => navigate("/register")}
              style={{
                backgroundColor: "transparent",
                color: "#0F172A",
                border: "2px solid #2563EB",
                borderRadius: "999px",
                padding: "13px 28px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#2563EB";
                e.target.style.backgroundColor = "#2563EB1A";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#2563EB";
                e.target.style.backgroundColor = "transparent";
              }}
            >
              Post a Job
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row items-center gap-5">
            {["No credit card required", "14-day free trial"].map((text) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#8E8E8E",
                  fontSize: "13px",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8E8E8E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE — Form Card */}
        <div className="w-full mx-auto lg:mx-0 lg:flex-1 lg:max-w-[500px] bg-white rounded-[20px] p-8 shadow-[0_8px_40px_#0000001a]">
          {/* Tab Toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#E8E8E8",
              borderRadius: "999px",
              padding: "4px",
              marginBottom: "24px",
            }}
          >
            {[
              { id: "demo", label: "Request a Free Demo" },
              { id: "login", label: "Register/Log In" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                  transition: "all 0.2s",
                  backgroundColor:
                    activeTab === tab.id ? "#2563EB" : "transparent",
                  color: activeTab === tab.id ? "#FFFFFF" : "#8E8E8E",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "demo" ? (
            <>
              <DemoFormCard hideTabs />
            </>
          ) : (
            <EmployerLoginForm noCard />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
