import { useState } from "react";
import { Hero } from "@/components/Hero";
import { JobInputSection } from "@/components/JobInputSection";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { PrepPlanDisplay } from "@/components/PrepPlanDisplay";
import type { PrepPlan } from "@/types/prepPlan";

const Index = () => {
  const [prepPlan, setPrepPlan] = useState<PrepPlan | null>(null);

  const handlePlanGenerated = (plan: PrepPlan) => {
    setPrepPlan(plan);
    // Scroll to results
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setPrepPlan(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Hero />
      {!prepPlan ? (
        <>
          <JobInputSection onPlanGenerated={handlePlanGenerated} />
          <Features />
        </>
      ) : (
        <PrepPlanDisplay plan={prepPlan} onReset={handleReset} />
      )}
      <Footer />
    </div>
  );
};

export default Index;
