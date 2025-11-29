import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Send, Bot, User } from "lucide-react";

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm your AI regulatory assistant. What would you like to know about EU regulations?",
    timestamp: new Date(),
  },
];

const suggestedPrompts = [
  "What is the AI Act?",
  "Explain health data regulation",
  "What should we prioritize?",
];

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        "ai act": "The AI Act is the EU's regulation on artificial intelligence. For healthcare AI, your system is likely classified as high-risk. Key requirements: risk management system, data quality documentation, human oversight capabilities, and EU database registration. Deadline: August 2026.",
        "health data": "The European Health Data Space (EHDS) regulation affects how health data is accessed and shared. Key points: patients get easier cross-border data access, new framework for research use of health data, and standard data formats (HL7 FHIR) will be required.",
        "prioritize": "This week's priorities:\n\n1. AI Act Implementation Guidelines - Review the new guidelines for high-risk AI systems\n2. Health Data Vote (Feb 20) - Monitor the outcome\n3. AI Liability Directive - Background monitoring only",
      };

      let response = "I can help you understand EU regulations. Could you be more specific about which regulation or topic you'd like to explore?";

      for (const [key, value] of Object.entries(responses)) {
        if (messageText.toLowerCase().includes(key)) {
          response = value;
          break;
        }
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-3.5rem)] flex flex-col max-w-2xl mx-auto">
        {/* Header */}
        <div className="px-4 py-4 border-b border-border">
          <h1 className="text-lg font-semibold text-foreground">AI Assistant</h1>
          <p className="text-xs text-muted-foreground">Ask about EU regulations</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === 'user' && "flex-row-reverse"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  message.role === 'assistant' ? "bg-secondary" : "bg-primary"
                )}>
                  {message.role === 'assistant' ? (
                    <Bot className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <User className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>

                <div className={cn(
                  "max-w-[80%] px-3 py-2 rounded-lg text-sm",
                  message.role === 'assistant'
                    ? "bg-secondary text-foreground"
                    : "bg-primary text-primary-foreground"
                )}>
                  {message.content.split('\n').map((line, i) => (
                    <p key={i} className="mb-1 last:mb-0">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary">
                  <Bot className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="bg-secondary px-3 py-2 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1.5 rounded-md bg-secondary text-xs text-foreground hover:bg-muted transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-3 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about EU regulations..."
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
