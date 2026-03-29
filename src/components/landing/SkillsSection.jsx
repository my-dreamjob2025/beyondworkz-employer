import { useState } from "react";
import { SKILLS } from "../../data/landingPageData";

const SkillsSection = () => {
  const [selectedSkill, setSelectedSkill] = useState("React");

  return (
    <section className="py-20 bg-[#F973161A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Access talent across in-demand skills
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Our specialized talent pools cover the most critical technical and
            business roles in the industry.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {SKILLS.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => setSelectedSkill(skill)}
              style={selectedSkill === skill ? {} : undefined}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 skill-btn ${
                selectedSkill === skill
                  ? "border border-[#F97316] text-[#F97316] bg-white"
                  : "bg-white border border-slate-200 text-slate-700"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .skill-btn:hover {
          background: #FFFFFF;
          border: 1px solid #F97316;
          color: #F97316;
          box-shadow: 0px 4px 7.8px 0px #F9731699;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
