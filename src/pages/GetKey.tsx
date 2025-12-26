import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  Shield, 
  Key, 
  Fingerprint,
  Copy,
  CheckCircle2,
  Clock,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";

const GetKey = () => {
  const [searchParams] = useSearchParams();
  const hwid = searchParams.get("hwid") || "";
  
  const [generatedKey, setGeneratedKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);
  const [checkpointComplete, setCheckpointComplete] = useState(false);

  // Generate a random key based on HWID
  const generateKey = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let key = "SHIELD-";
    
    // Create a deterministic but unique key based on HWID + timestamp
    const seed = hwid + Date.now().toString();
    for (let i = 0; i < 24; i++) {
      if (i > 0 && i % 6 === 0) key += "-";
      key += chars[Math.floor(Math.random() * chars.length)];
    }
    
    return key;
  };

  const handleGenerateKey = () => {
    if (!hwid) {
      toast.error("HWID tidak ditemukan! Jalankan script dari Roblox terlebih dahulu.");
      return;
    }

    setIsGenerating(true);
    
    // Simulate checkpoint/processing
    setTimeout(() => {
      const key = generateKey();
      setGeneratedKey(key);
      setIsGenerating(false);
      setStep(3);
      toast.success("Key berhasil di-generate!");
    }, 2000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    toast.success("Key disalin ke clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyHWID = () => {
    navigator.clipboard.writeText(hwid);
    toast.success("HWID disalin ke clipboard!");
  };

  const handleCheckpoint = () => {
    // Simulate checkpoint (in real app, this would open Linkvertise/etc)
    setStep(2);
    setCheckpointComplete(true);
    toast.success("Checkpoint selesai!");
  };

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Key className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">Key Generator</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-glow">
              GET YOUR KEY
            </h1>
            <p className="text-muted-foreground">
              Generate key untuk mengakses script yang terproteksi
            </p>
          </div>

          {/* Main Card */}
          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  1
                </div>
                <span className="text-sm hidden sm:block">Verify HWID</span>
              </div>
              <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  2
                </div>
                <span className="text-sm hidden sm:block">Checkpoint</span>
              </div>
              <div className={`w-12 h-0.5 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  3
                </div>
                <span className="text-sm hidden sm:block">Get Key</span>
              </div>
            </div>

            {/* HWID Display */}
            <div className="space-y-4 mb-8">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-display">
                  <Fingerprint className="h-4 w-4 text-primary" />
                  Your HWID
                </Label>
                <div className="relative">
                  <Input
                    value={hwid || "HWID tidak ditemukan - Jalankan script dari Roblox"}
                    readOnly
                    className="font-mono text-sm pr-12 bg-muted/50"
                  />
                  {hwid && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={handleCopyHWID}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {!hwid && (
                  <p className="text-xs text-destructive">
                    ⚠️ Buka halaman ini dari link yang di-copy di Roblox untuk mendapatkan HWID
                  </p>
                )}
              </div>
            </div>

            {/* Step 1: Verify HWID */}
            {step === 1 && hwid && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-display font-semibold mb-1">HWID Terdeteksi</h3>
                      <p className="text-sm text-muted-foreground">
                        HWID Anda telah terverifikasi. Klik tombol di bawah untuk melanjutkan ke checkpoint.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full" 
                  variant="glow"
                  onClick={handleCheckpoint}
                >
                  <ExternalLink className="h-5 w-5" />
                  Continue to Checkpoint
                </Button>
              </div>
            )}

            {/* Step 2: Checkpoint Complete */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-display font-semibold mb-1">Checkpoint Selesai!</h3>
                      <p className="text-sm text-muted-foreground">
                        Anda sekarang dapat generate key untuk HWID Anda.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full" 
                  variant="cyber"
                  onClick={handleGenerateKey}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Generating Key...
                    </>
                  ) : (
                    <>
                      <Key className="h-5 w-5" />
                      Generate Key
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Step 3: Key Generated */}
            {step === 3 && generatedKey && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Key className="h-5 w-5 text-primary" />
                    <Label className="font-display font-semibold">Your Key</Label>
                  </div>
                  <div className="relative">
                    <Input
                      value={generatedKey}
                      readOnly
                      className="font-mono text-sm pr-12 bg-background/50 text-primary"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={handleCopyKey}
                    >
                      {copied ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full" 
                  variant="glow"
                  onClick={handleCopyKey}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Key Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5" />
                      Copy Key
                    </>
                  )}
                </Button>

                <div className="p-4 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <h3 className="font-display font-semibold mb-1">Cara Menggunakan</h3>
                      <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                        <li>Copy key di atas</li>
                        <li>Kembali ke Roblox</li>
                        <li>Paste key di input box</li>
                        <li>Klik Verify Key</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* No HWID State */}
            {!hwid && (
              <div className="text-center py-8">
                <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display font-semibold mb-2">HWID Diperlukan</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Untuk mendapatkan key, Anda harus membuka halaman ini dari script di Roblox.
                </p>
                <ol className="text-sm text-muted-foreground text-left max-w-xs mx-auto space-y-2">
                  <li>1. Jalankan script di Roblox executor</li>
                  <li>2. Klik tombol "Get Key" di UI</li>
                  <li>3. Buka link yang di-copy di browser</li>
                </ol>
              </div>
            )}
          </Card>

          {/* Info */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              Key berlaku selama 24 jam dan hanya bisa digunakan dengan HWID Anda
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetKey;
