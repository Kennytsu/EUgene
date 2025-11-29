import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { RegulatoryCard } from "@/components/shared/RegulatoryCard";
import { TopicBadge } from "@/components/shared/TopicBadge";
import { useMeetings, useLegislativeFiles } from "@/hooks/useMeetings";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Loader2 } from "lucide-react";

export default function Dashboard() {
  const { data: meetings = [], isLoading: loadingMeetings } = useMeetings(10);
  const { data: legislation = [], isLoading: loadingLegislation } = useLegislativeFiles(10);

  const allItems = [...meetings, ...legislation].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const recentUpdates = allItems.slice(0, 4);
  const highImpactCount = allItems.filter(item => item.impact === 'high').length;
  const isLoading = loadingMeetings || loadingLegislation;

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground mb-1">
                Regulatory Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">EU Meetings & Legislation</p>
            </div>
            <Link to="/chat">
              <Button size="sm" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Ask Assistant
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-lg border border-border">
            <p className="text-2xl font-semibold text-foreground">
              {isLoading ? "..." : meetings.length}
            </p>
            <p className="text-xs text-muted-foreground">Meetings</p>
          </div>
          <div className="p-4 rounded-lg border border-border">
            <p className="text-2xl font-semibold text-foreground">
              {isLoading ? "..." : legislation.length}
            </p>
            <p className="text-xs text-muted-foreground">Legislation</p>
          </div>
          <div className="p-4 rounded-lg border border-border">
            <p className="text-2xl font-semibold text-red-600">
              {isLoading ? "..." : highImpactCount}
            </p>
            <p className="text-xs text-muted-foreground">High Impact</p>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-foreground">Recent Updates</h2>
            <Link to="/board">
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                View All
                <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : recentUpdates.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {recentUpdates.map((item) => (
                <RegulatoryCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No recent updates found
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
