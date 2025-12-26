import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Code2 } from "lucide-react";
import { toast } from "sonner";

interface ScriptEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  title?: string;
  language?: string;
}

export const ScriptEditor = ({
  value,
  onChange,
  readOnly = false,
  title = "Script",
  language = "lua"
}: ScriptEditorProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Script copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const lineNumbers = value.split('\n').map((_, i) => i + 1);

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-primary" />
          <span className="text-sm font-display text-foreground">{title}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary font-mono">
            {language}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8"
        >
          {copied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Editor */}
      <div className="flex max-h-[500px] overflow-auto">
        {/* Line numbers */}
        <div className="flex-shrink-0 py-4 px-3 bg-muted/30 border-r border-border select-none">
          {lineNumbers.map((num) => (
            <div
              key={num}
              className="text-xs text-muted-foreground leading-6 text-right font-mono"
            >
              {num}
            </div>
          ))}
        </div>

        {/* Code */}
        <div className="flex-1 overflow-auto">
          {readOnly ? (
            <pre className="p-4 text-sm font-mono text-foreground leading-6 whitespace-pre">
              {value}
            </pre>
          ) : (
            <textarea
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              className="w-full h-full min-h-[300px] p-4 bg-transparent text-sm font-mono text-foreground leading-6 resize-none focus:outline-none"
              spellCheck={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};
