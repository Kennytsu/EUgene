import { cn } from "@/lib/utils";
import { availableTopics } from "@/lib/mockData";

interface TopicBadgeProps {
  topicId: string;
  className?: string;
}

export function TopicBadge({ topicId, className }: TopicBadgeProps) {
  const topic = availableTopics.find(t => t.id === topicId);
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-muted-foreground",
        className
      )}
    >
      {topic?.name || topicId}
    </span>
  );
}
