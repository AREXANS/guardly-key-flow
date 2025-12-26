import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(142_70%_45%/0.15)]">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative">
        <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_hsl(142_70%_45%/0.3)] transition-all duration-300">
          <div className="text-primary">
            {icon}
          </div>
        </div>
        
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-glow transition-all">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
