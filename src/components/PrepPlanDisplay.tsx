import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  Lightbulb, 
  Target, 
  Clock, 
  Award,
  Download,
  RefreshCw
} from "lucide-react";
import type { PrepPlan } from "@/types/prepPlan";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface PrepPlanDisplayProps {
  plan: PrepPlan;
  onReset: () => void;
}

export const PrepPlanDisplay = ({ plan, onReset }: PrepPlanDisplayProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
      case "beginner":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "medium":
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "hard":
      case "advanced":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      default:
        return "bg-primary/20 text-primary border-primary/50";
    }
  };

  const handleDownloadPDF = async () => {
    try {
      // Get the element to convert to PDF
      const element = document.getElementById('prep-plan-content');
      if (!element) {
        console.error('Element not found');
        return;
      }

      // Create canvas from HTML element
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download the PDF
      const fileName = `${plan.role}_at_${plan.company}_Prep_Plan.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      
      <div id="prep-plan-content" className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Your Personalized Plan</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {plan.role}
            <span className="block text-primary mt-2">at {plan.company}</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {plan.keySkills.map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <Button variant="glass" onClick={onReset}>
              <RefreshCw className="w-4 h-4" />
              New Plan
            </Button>
            <Button variant="hero" onClick={handleDownloadPDF}>
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </motion.div>

        {/* Study Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="p-8 bg-gradient-card backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">Study Timeline</h3>
              <Badge variant="secondary">{plan.studyTimeline.duration}</Badge>
            </div>
            
            <div className="space-y-4">
              {plan.studyTimeline.phases.map((phase, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </div>
                    {idx < plan.studyTimeline.phases.length - 1 && (
                      <div className="w-0.5 h-full bg-border my-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <h4 className="font-semibold text-lg mb-1">{phase.phase}</h4>
                    <p className="text-muted-foreground text-sm mb-2">{phase.duration}</p>
                    <div className="flex flex-wrap gap-2">
                      {phase.focus.map((item, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold">Portfolio Projects</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {plan.projects.map((project, idx) => (
              <Card
                key={idx}
                className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-lg">{project.title}</h4>
                  <Badge className={getDifficultyColor(project.difficulty)}>
                    {project.difficulty}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Coding Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold">Coding Challenges</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {plan.codingChallenges.map((challenge, idx) => (
              <Card
                key={idx}
                className="p-5 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{challenge.title}</h4>
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                <div className="flex flex-wrap gap-1">
                  {challenge.topics.map((topic, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Behavioral Questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold">Behavioral Questions</h3>
          </div>
          
          <div className="space-y-4">
            {plan.behavioralQuestions.map((q, idx) => (
              <Card
                key={idx}
                className="p-6 bg-gradient-card backdrop-blur-sm border-border/50"
              >
                <h4 className="font-semibold text-lg mb-3">{q.question}</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-primary font-medium">Focus:</span>
                    <span className="text-muted-foreground ml-2">{q.focus}</span>
                  </div>
                  <div>
                    <span className="text-primary font-medium">Strategy:</span>
                    <span className="text-muted-foreground ml-2">{q.tips}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
