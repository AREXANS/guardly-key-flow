import { useState } from "react";
import { Header } from "@/components/Header";
import { FeatureCard } from "@/components/FeatureCard";
import { ScriptEditor } from "@/components/ScriptEditor";
import { KeySystemGenerator } from "@/components/KeySystemGenerator";
import { generateObfuscatedScript, generateLuaLoader } from "@/components/GeneratedLuaScript";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Lock, 
  Fingerprint, 
  Zap, 
  Eye, 
  Code2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Terminal
} from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [scriptName, setScriptName] = useState("MyAwesomeScript");
  const [originalScript, setOriginalScript] = useState(`-- Your Roblox Script Here
local Players = game:GetService("Players")
local player = Players.LocalPlayer

print("Hello, " .. player.Name .. "!")

-- Add your script logic here
-- This will be protected by ScriptShield`);

  const [keyConfig, setKeyConfig] = useState({
    keyLength: 32,
    expirationHours: 24,
    hwidLock: true,
    maxUsages: 1,
    linkCheckpoint: "",
    webhookUrl: ""
  });

  const [generatedScript, setGeneratedScript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate processing
    setTimeout(() => {
      const result = generateObfuscatedScript(originalScript, {
        ...keyConfig,
        scriptName
      });
      setGeneratedScript(result);
      setIsGenerating(false);
      toast.success("Script obfuscated successfully!");
    }, 1500);
  };

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Military-Grade Obfuscation",
      description: "Advanced encryption and code transformation to protect your scripts from reverse engineering."
    },
    {
      icon: <Fingerprint className="h-6 w-6" />,
      title: "HWID Locking",
      description: "Lock scripts to specific hardware IDs, preventing unauthorized sharing and redistribution."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Key System",
      description: "Built-in floating UI for key verification with customizable expiration and usage limits."
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Anti-Tamper",
      description: "Detect and prevent script modification attempts with integrity checks."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast Execution",
      description: "Optimized obfuscation that maintains script performance without slowdowns."
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Roblox UI Loader",
      description: "Beautiful in-game verification UI that works with all major executors."
    }
  ];

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Next-Gen Script Protection</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-glow animate-fade-in" style={{ animationDelay: '0.1s' }}>
            SCRIPTSHIELD
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Protect your Roblox scripts with advanced obfuscation, 
            <span className="text-primary"> HWID locking</span>, and 
            <span className="text-accent"> in-game key verification UI</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button size="xl" variant="glow" onClick={() => document.getElementById('obfuscate')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Protecting
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="xl" variant="outline">
              View Documentation
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary text-glow">10K+</div>
              <div className="text-sm text-muted-foreground">Scripts Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary text-glow">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary text-glow">5K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Powerful <span className="text-primary text-glow">Features</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to protect your Roblox scripts and manage access control
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Obfuscate Section */}
      <section id="obfuscate" className="py-20 px-4 border-t border-border bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              <Terminal className="inline-block h-8 w-8 text-primary mr-3" />
              Obfuscate Your Script
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Paste your script, configure the key system, and get a protected version with in-game UI
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Input */}
            <div className="space-y-6">
              {/* Script Name */}
              <div className="space-y-2">
                <Label htmlFor="scriptName" className="text-sm font-display">Script Name</Label>
                <Input
                  id="scriptName"
                  value={scriptName}
                  onChange={(e) => setScriptName(e.target.value)}
                  placeholder="Enter script name..."
                  className="font-mono"
                />
              </div>

              {/* Original Script */}
              <ScriptEditor
                title="Original Script"
                value={originalScript}
                onChange={setOriginalScript}
                language="lua"
              />

              {/* Key System Config */}
              <KeySystemGenerator onConfigChange={setKeyConfig} />

              {/* Generate Button */}
              <Button 
                size="xl" 
                className="w-full" 
                variant="cyber"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    Generate Protected Script
                  </>
                )}
              </Button>
            </div>

            {/* Right Column - Output */}
            <div className="space-y-6">
              <Tabs defaultValue="loader" className="w-full">
                <TabsList className="w-full bg-muted">
                  <TabsTrigger value="loader" className="flex-1">Loader Script</TabsTrigger>
                  <TabsTrigger value="full" className="flex-1">Full Output</TabsTrigger>
                </TabsList>
                
                <TabsContent value="loader" className="mt-4">
                  <ScriptEditor
                    title="Generated Loader with UI"
                    value={generatedScript || generateLuaLoader({ ...keyConfig, scriptName })}
                    readOnly
                    language="lua"
                  />
                </TabsContent>
                
                <TabsContent value="full" className="mt-4">
                  <ScriptEditor
                    title="Complete Protected Script"
                    value={generatedScript || "Click 'Generate Protected Script' to see the full output"}
                    readOnly
                    language="lua"
                  />
                </TabsContent>
              </Tabs>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-display">Features Included</span>
                  </div>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Floating verification UI</li>
                    <li>• HWID detection & lock</li>
                    <li>• Draggable window</li>
                    <li>• Copy link button</li>
                  </ul>
                </div>
                
                <div className="p-4 rounded-lg bg-card border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-accent" />
                    <span className="text-sm font-display">Compatibility</span>
                  </div>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Synapse X</li>
                    <li>• Script-Ware</li>
                    <li>• KRNL</li>
                    <li>• All major executors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-display text-sm">SCRIPTSHIELD</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2024 ScriptShield. All rights reserved. For educational purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
