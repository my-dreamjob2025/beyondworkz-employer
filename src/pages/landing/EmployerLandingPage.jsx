import {
  EmployerLandingHeader,
  EmployerLandingFooter,
  HeroSection,
  TrustedBySection,
  FeaturesSection,
  AnalyticsBannerSection,
  MetricsSection,
  WorkflowSection,
  SkillsSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
} from "../../components/landing";

const EmployerLandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <EmployerLandingHeader />

      <main className="pt-14 sm:pt-16">
        <HeroSection />
        <TrustedBySection />
        <FeaturesSection />
        <AnalyticsBannerSection />
        <MetricsSection />
        <WorkflowSection />
        <SkillsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>

      <EmployerLandingFooter />
    </div>
  );
};

export default EmployerLandingPage;
