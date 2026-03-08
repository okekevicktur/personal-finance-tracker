import React from "react";
import { InsightMessage } from "../types/index";
import { EmptyState } from "./EmptyState";
import { TrendingUp, AlertCircle } from "lucide-react";

interface InsightsStripProps {
  insights: InsightMessage[];
}

export const InsightsStrip: React.FC<InsightsStripProps> = ({ insights }) => {
  if (insights.length === 0) {
    return (
      <div className="bg-background-secondary p-6 rounded-card shadow-card">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Insights
        </h3>
        <EmptyState
          title="No insights yet"
          description="Add more transactions to get personalized insights"
        />
      </div>
    );
  }

  return (
    <div className="bg-background-secondary p-6 rounded-card shadow-card">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Insights</h3>

      {/* Scrollable on desktop, stacked on mobile */}
      <div className="flex gap-3 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible">
        {insights.map((insight, idx) => {
          const bgColor =
            insight.type === "positive"
              ? "bg-emerald-50 border-l-2 border-success"
              : insight.type === "warning"
                ? "bg-amber-50 border-l-2 border-warning"
                : "bg-blue-light border-l-2 border-blue-primary";

          const Icon = insight.type === "positive" ? TrendingUp : AlertCircle;
          const iconColor =
            insight.type === "positive"
              ? "text-success"
              : insight.type === "warning"
                ? "text-warning"
                : "text-blue-primary";

          return (
            <div
              key={idx}
              className={`${bgColor} p-4 rounded-card flex-shrink-0 w-72 md:w-auto md:flex-1`}
            >
              <div className="flex gap-3">
                <Icon size={20} className={iconColor} />
                <div className="flex-1">
                  <p className="text-sm text-text-primary">{insight.text}</p>
                  {insight.value && (
                    <p className="text-xs text-text-muted mt-1">
                      Value: {insight.value}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsStrip;
