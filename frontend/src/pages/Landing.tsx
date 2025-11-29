import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Shield, Zap, Bell, Bot } from "lucide-react";
import euStars from "@/assets/eu-stars.png";

export default function Landing() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsLoading(true);
    setTimeout(() => {
      navigate("/onboarding", { state: { websiteUrl: url } });
    }, 1000);
  };

  const features = [
    { icon: Shield, title: "Stay Compliant", description: "Never miss a regulation" },
    { icon: Zap, title: "AI Insights", description: "Smart summaries for you" },
    { icon: Bell, title: "Real-time Alerts", description: "Email, SMS, or calls" },
    { icon: Bot, title: "AI Assistant", description: "Ask anything" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border">
        <nav className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={euStars} alt="EUgene" className="w-5 h-5" />
            <span className="font-semibold text-foreground">EUgene</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            Sign In
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <main className="px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-4">EU Regulatory Intelligence</p>
          
          <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4 tracking-tight">
            We watch the EU so you don't have to
          </h1>

          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            AI-powered alerts on regulations that matter to your business.
          </p>

          {/* URL Input */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="Enter your company website..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "..." : <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              We'll analyze your site and suggest relevant regulations
            </p>
          </form>

          {/* Features */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="text-sm font-medium text-foreground mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-6">
        <div className="max-w-4xl mx-auto text-center text-xs text-muted-foreground">
          © 2024 EUgene
        </div>
      </footer>
    </div>
  );
}
