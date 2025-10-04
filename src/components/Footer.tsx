import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-primary" />
            <span>for aspiring developers</span>
          </div>
          
          <div className="text-muted-foreground text-sm">
            © 2025 PrepFlow. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
