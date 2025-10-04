import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Code2, Brain, Trophy, Users, GitBranch, Rocket } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Smart Skill Extraction",
    description: "AI analyzes job descriptions to identify crucial technical and soft skills",
    gradient: "from-primary/20 to-secondary/20"
  },
  {
    icon: Code2,
    title: "Coding Challenges",
    description: "Get relevant LeetCode-style problems matched to the role requirements",
    gradient: "from-secondary/20 to-accent/20"
  },
  {
    icon: GitBranch,
    title: "Portfolio Projects",
    description: "Build impressive projects that demonstrate your skills to employers",
    gradient: "from-accent/20 to-primary/20"
  },
  {
    icon: Users,
    title: "Behavioral Prep",
    description: "Company-specific behavioral questions and STAR method guidance",
    gradient: "from-primary/20 to-secondary/20"
  },
  {
    icon: Trophy,
    title: "Mock Interviews",
    description: "Practice with AI-powered mock interviews tailored to your target role",
    gradient: "from-secondary/20 to-accent/20"
  },
  {
    icon: Rocket,
    title: "Career Roadmap",
    description: "Get a personalized timeline with daily goals and milestones",
    gradient: "from-accent/20 to-primary/20"
  }
];

export const Features = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive preparation tools powered by AI to help you land your dream job
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-elegant group">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
