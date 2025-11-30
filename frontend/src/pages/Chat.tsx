import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import {
  Send,
  Bot,
  User,
} from "lucide-react";
import { useRagQuery } from "@/hooks/use-rag-query";
import { ScrollArea } from "@/components/ui/scroll-area";

const suggestedPrompts = [
  "What is the AI Act?",
  "Explain health data regulation",
  "What should we prioritize?",
];

interface Message {
  id: string;
  content: string;
  author: "user" | "assistant";
  timestamp: number;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      content: "Hello! I'm your AI regulatory assistant. What would you like to know about EU regulations?",
      author: "assistant",
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const ragQuery = useRagQuery();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    // Add user message to local state
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: messageText,
      author: "user",
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);

    setInput("");
    setIsLoading(true);

    // Call RAG endpoint to get AI response
    try {
      const result = await ragQuery.mutateAsync({
        query: messageText,
        top_k: 10
      });

      if (result.success) {
        // Add assistant message to local state
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          content: result.llm_answer,
          author: "assistant",
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Add error message
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          content: "I encountered an issue retrieving regulatory information. Please try again.",
          author: "assistant",
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("RAG query error:", error);
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "I encountered an error while processing your query. Please try again later.",
        author: "assistant",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-3.5rem)] flex">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="px-4 py-4 border-b border-border flex items-center gap-3">
            <div>
              <h1 className="text-lg font-semibold text-foreground">AI Assistant</h1>
              <p className="text-xs text-muted-foreground">Ask about EU regulations</p>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-4 py-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.author === 'user' && "flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      message.author === 'assistant' ? "bg-secondary" : "bg-primary"
                    )}
                  >
                    {message.author === 'assistant' ? (
                      <Bot className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <User className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>

                  <div
                    className={cn(
                      "max-w-[80%] px-3 py-2 rounded-lg text-sm",
                      message.author === 'assistant'
                        ? "bg-secondary text-foreground"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    <ReactMarkdown
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2 mt-2" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-base font-bold mb-2 mt-2" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-1 mt-1" {...props} />,
                        p: ({node, ...props}) => <p className="mb-2" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                        em: ({node, ...props}) => <em className="italic" {...props} />,
                        code: ({node, ...props}) => <code className="bg-muted px-1 py-0.5 rounded text-xs" {...props} />,
                      }}
                    >
                      {message.content || ""}
                    </ReactMarkdown>
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
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse"
                        style={{ animationDelay: '0.2s' }}
                      />
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse"
                        style={{ animationDelay: '0.4s' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Suggested Prompts */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="max-w-3xl mx-auto flex flex-wrap gap-2">
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
            <div className="max-w-3xl mx-auto flex gap-2">
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
                <Send className="w-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
