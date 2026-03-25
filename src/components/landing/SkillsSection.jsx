import { useState } from "react";
import { SKILLS } from "../../data/landingPageData";

const SkillsSection = () => {
  const [selectedSkill, setSelectedSkill] = useState("React");

  return (
    <section className="py-20 bg-[#FFF7ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Access talent across in-demand skills
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Our specialized platform connects you with the most critical technical and
            professional talent in the industry.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {SKILLS.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => setSelectedSkill(skill)}
              className={`px-5 py-2.5 rounded-full font-medium transition-colors ${
                selectedSkill === skill
                  ? "bg-[#F97316] text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-[#1447E6] hover:text-[#1447E6]"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
