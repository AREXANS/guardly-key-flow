import { Shield, Github, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary animate-pulse-glow" />
              <div className="absolute inset-0 blur-lg bg-primary/30" />
            </div>
            <span className="font-display text-xl font-bold text-glow tracking-wider">
              SCRIPTSHIELD
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#obfuscate" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Obfuscate
            </a>
            <a href="#docs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Docs
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex">
              Dashboard
            </Button>
            <Button size="sm" className="hidden md:flex">
              Get Started
            </Button>
            
            {/* Mobile Menu */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-3">
              <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors py-2">
                Features
              </a>
              <a href="#obfuscate" className="text-sm text-muted-foreground hover:text-primary transition-colors py-2">
                Obfuscate
              </a>
              <a href="#docs" className="text-sm text-muted-foreground hover:text-primary transition-colors py-2">
                Docs
              </a>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Dashboard
                </Button>
                <Button size="sm" className="flex-1">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
