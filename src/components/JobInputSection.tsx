import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, Zap, Target, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { PrepPlan } from "@/types/prepPlan";

interface JobInputSectionProps {
  onPlanGenerated: (plan: PrepPlan) => void;
}

export const JobInputSection = ({ onPlanGenerated }: JobInputSectionProps) => {
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please paste a job description");
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-prep-plan', {
        body: { jobDescription }
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      if (data.success && data.plan) {
        toast.success("Your personalized prep plan is ready!");
        onPlanGenerated(data.plan);
      } else {
        toast.error("Failed to generate prep plan");
      }
    } catch (error) {
      console.error("Error generating prep plan:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="prepare" className="py-24 px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Start Your Preparation Journey
          </h2>
          <p className="text-muted-foreground text-lg">
            Paste any job description and get a personalized study plan in seconds
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 bg-gradient-card backdrop-blur-sm border-border/50">
            <div className="space-y-6">
              <div>
                <label htmlFor="job-description" className="block text-sm font-medium mb-3 text-foreground">
                  Job Description
                </label>
                <Textarea
                  id="job-description"
                  placeholder="Paste the complete job description here...&#10;&#10;Example:&#10;We are looking for a Frontend Developer with expertise in React, TypeScript, and modern web technologies. The ideal candidate will have experience with..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[300px] bg-background/50 border-border/50 focus:border-primary transition-colors resize-none"
                />
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={handleGenerate}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating Your Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate My Prep Plan
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              icon: Zap,
              title: "AI-Powered Analysis",
              description: "Extract key skills and requirements instantly"
            },
            {
              icon: Target,
              title: "Custom Projects",
              description: "Get role-specific projects to build your portfolio"
            },
            {
              icon: BookOpen,
              title: "Practice Questions",
              description: "Company-specific interview questions and scenarios"
            }
          ].map((feature, idx) => (
            <Card
              key={idx}
              className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-elegant group"
            >
              <feature.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
