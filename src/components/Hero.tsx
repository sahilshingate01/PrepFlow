import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-glow-pulse delay-1000" />
      </div>

      {/* 3D Spline Element */}
      <div className="absolute inset-0 opacity-40">
        <iframe 
          src='https://my.spline.design/claritystream-he1OtclDae7VA3X5gWi0MHFE/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="pointer-events-none"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-5 h-5 text-primary animate-glow-pulse" />
          <span className="text-muted-foreground text-sm uppercase tracking-wider">
            AI-Powered Interview Preparation
          </span>
          <Sparkles className="w-5 h-5 text-primary animate-glow-pulse" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
        >
          Master Any Interview
          <br />
          <span className="text-primary">With PrepFlow</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Get a personalized interview preparation plan tailored to your dream company. 
          Practice with AI-generated questions, projects, and coding challenges.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <div className="w-full sm:w-auto">
            <a href="#prepare" className="block">
              <button className="w-full sm:w-auto bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 hover:scale-105 h-12 px-8 rounded-lg font-medium inline-flex items-center justify-center">
                Get Started Free
              </button>
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { label: "Companies", value: "500+" },
            { label: "Questions", value: "10K+" },
            { label: "Success Rate", value: "94%" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};
