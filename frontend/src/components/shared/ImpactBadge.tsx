import { cn } from "@/lib/utils";

interface ImpactBadgeProps {
  impact: 'high' | 'medium' | 'low';
  className?: string;
}

export function ImpactBadge({ impact, className }: ImpactBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
        impact === 'high' && "bg-red-50 text-red-700",
        impact === 'medium' && "bg-amber-50 text-amber-700",
        impact === 'low' && "bg-emerald-50 text-emerald-700",
        className
      )}
    >
      {impact.charAt(0).toUpperCase() + impact.slice(1)}
    </span>
  );
}
