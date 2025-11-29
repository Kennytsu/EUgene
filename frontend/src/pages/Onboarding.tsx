import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { availableTopics } from "@/lib/mockData";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisResult {
  companyName: string;
  description: string;
  sector: string;
  keywords: string[];
  suggestedTopics: string[];
}

export default function Onboarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const websiteUrl = location.state?.websiteUrl || "";

  const [step, setStep] = useState<'analyzing' | 'review'>('analyzing');
  const [analysis, setAnalysis] = useState<AnalysisResult>({
    companyName: "",
    description: "",
    sector: "",
    keywords: [],
    suggestedTopics: [],
  });
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalysis({
        companyName: "TechVenture AI",
        description: "AI-powered healthcare diagnostics platform using machine learning for early disease detection.",
        sector: "AI & Healthcare",
        keywords: ["AI", "healthcare", "diagnostics", "machine learning"],
        suggestedTopics: ["ai-act", "gdpr", "health-data"],
      });
      setSelectedTopics(["ai-act", "gdpr", "health-data"]);
      setStep('review');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSubmit = () => {
    navigate("/dashboard");
  };

  if (step === 'analyzing') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="max-w-sm w-full text-center">
          <Loader2 className="w-8 h-8 text-muted-foreground mx-auto mb-4 animate-spin" />
          <h1 className="text-lg font-medium text-foreground mb-2">Analyzing</h1>
          <p className="text-sm text-muted-foreground">{websiteUrl || "your website"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 bg-background">
      <div className="max-w-lg mx-auto">
        <h1 className="text-lg font-semibold text-foreground mb-6">Review your profile</h1>

        <div className="space-y-6">
          {/* Company Info */}
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Company Name</label>
              <Input
                value={analysis.companyName}
                onChange={(e) => setAnalysis(prev => ({ ...prev, companyName: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Sector</label>
              <Input
                value={analysis.sector}
                onChange={(e) => setAnalysis(prev => ({ ...prev, sector: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Description</label>
              <textarea
                value={analysis.description}
                onChange={(e) => setAnalysis(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
                className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
          </div>

          {/* Topics */}
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Topics to follow</label>
            <div className="grid grid-cols-2 gap-2">
              {availableTopics.map((topic) => {
                const isSelected = selectedTopics.includes(topic.id);
                return (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicToggle(topic.id)}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border text-left text-sm transition-colors",
                      isSelected
                        ? "border-foreground bg-secondary"
                        : "border-border hover:border-muted-foreground"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center flex-shrink-0",
                      isSelected ? "bg-foreground border-foreground" : "border-muted-foreground"
                    )}>
                      {isSelected && <Check className="w-3 h-3 text-background" />}
                    </div>
                    <span className="text-foreground">{topic.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full gap-2">
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
