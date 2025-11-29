import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

function getStatusStyle(status: string): { bg: string; text: string; label: string } {
  const lower = status.toLowerCase();
  
  if (lower.includes("completed") || lower.includes("enters into force")) {
    return { bg: "bg-green-50", text: "text-green-700", label: "Completed" };
  }
  if (lower.includes("signature")) {
    return { bg: "bg-emerald-50", text: "text-emerald-700", label: "Awaiting Signature" };
  }
  if (lower.includes("vote") || lower.includes("plenary")) {
    return { bg: "bg-red-50", text: "text-red-700", label: "Vote Pending" };
  }
  if (lower.includes("1st reading")) {
    return { bg: "bg-amber-50", text: "text-amber-700", label: "1st Reading" };
  }
  if (lower.includes("2nd reading")) {
    return { bg: "bg-orange-50", text: "text-orange-700", label: "2nd Reading" };
  }
  if (lower.includes("preparatory")) {
    return { bg: "bg-blue-50", text: "text-blue-700", label: "Preparatory" };
  }
  if (lower.includes("committee")) {
    return { bg: "bg-purple-50", text: "text-purple-700", label: "In Committee" };
  }
  if (lower.includes("council")) {
    return { bg: "bg-indigo-50", text: "text-indigo-700", label: "At Council" };
  }
  if (lower.includes("lapsed") || lower.includes("withdrawn") || lower.includes("rejected")) {
    return { bg: "bg-gray-100", text: "text-gray-500", label: "Closed" };
  }
  
  return { bg: "bg-gray-50", text: "text-gray-600", label: status };
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = getStatusStyle(status);
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium",
        style.bg,
        style.text,
        className
      )}
      title={status}
    >
      {style.label}
    </span>
  );
}
