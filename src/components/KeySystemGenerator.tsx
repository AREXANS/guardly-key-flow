import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, Shield, Clock, Link2, Fingerprint } from "lucide-react";

interface KeyConfig {
  keyLength: number;
  expirationHours: number;
  hwidLock: boolean;
  maxUsages: number;
  linkCheckpoint: string;
  webhookUrl: string;
}

interface KeySystemGeneratorProps {
  onConfigChange: (config: KeyConfig) => void;
}

export const KeySystemGenerator = ({ onConfigChange }: KeySystemGeneratorProps) => {
  const [config, setConfig] = useState<KeyConfig>({
    keyLength: 32,
    expirationHours: 24,
    hwidLock: true,
    maxUsages: 1,
    linkCheckpoint: "",
    webhookUrl: ""
  });

  const handleChange = (key: keyof KeyConfig, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <Card className="border-border bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display text-xl">
          <Key className="h-5 w-5 text-primary" />
          Key System Configuration
        </CardTitle>
        <CardDescription>
          Configure how the key verification works in your obfuscated script
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Length */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Key Length
            </Label>
            <span className="text-sm font-mono text-primary">{config.keyLength} chars</span>
          </div>
          <Slider
            value={[config.keyLength]}
            onValueChange={([value]) => handleChange("keyLength", value)}
            min={16}
            max={64}
            step={4}
            className="w-full"
          />
        </div>

        {/* Expiration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Key Expiration
            </Label>
            <span className="text-sm font-mono text-primary">{config.expirationHours}h</span>
          </div>
          <Slider
            value={[config.expirationHours]}
            onValueChange={([value]) => handleChange("expirationHours", value)}
            min={1}
            max={168}
            step={1}
            className="w-full"
          />
        </div>

        {/* HWID Lock */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
          <div className="space-y-0.5">
            <Label className="flex items-center gap-2 cursor-pointer">
              <Fingerprint className="h-4 w-4 text-accent" />
              HWID Lock
            </Label>
            <p className="text-xs text-muted-foreground">
              Lock key to specific device hardware ID
            </p>
          </div>
          <Switch
            checked={config.hwidLock}
            onCheckedChange={(value) => handleChange("hwidLock", value)}
          />
        </div>

        {/* Max Usages */}
        <div className="space-y-2">
          <Label className="text-sm">Max Key Usages</Label>
          <Input
            type="number"
            value={config.maxUsages}
            onChange={(e) => handleChange("maxUsages", parseInt(e.target.value) || 1)}
            min={1}
            max={100}
            className="font-mono"
          />
        </div>

        {/* Link Checkpoint */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm">
            <Link2 className="h-4 w-4 text-primary" />
            Key Generation Link (Checkpoint)
          </Label>
          <Input
            placeholder="https://your-link-shortener.com/key"
            value={config.linkCheckpoint}
            onChange={(e) => handleChange("linkCheckpoint", e.target.value)}
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            Users will be redirected here to get their key (e.g., Linkvertise, Work.ink)
          </p>
        </div>

        {/* Webhook URL */}
        <div className="space-y-2">
          <Label className="text-sm">Discord Webhook (Optional)</Label>
          <Input
            placeholder="https://discord.com/api/webhooks/..."
            value={config.webhookUrl}
            onChange={(e) => handleChange("webhookUrl", e.target.value)}
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            Get notified when users verify their keys
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
