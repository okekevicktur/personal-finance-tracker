import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Transaction } from "../types/index";
import {
  getChartData,
  calculateCategorySpending,
} from "../utils/financeCalculations";
import { EmptyState } from "./EmptyState";
import * as Icons from "lucide-react";

interface SpendingChartProps {
  transactions: Transaction[];
}

export const SpendingChart: React.FC<SpendingChartProps> = ({
  transactions,
}) => {
  const chartData = useMemo(() => getChartData(transactions), [transactions]);
  const categorySpending = useMemo(
    () => calculateCategorySpending(transactions),
    [transactions],
  );

  if (chartData.length === 0) {
    return (
      <div className="bg-background-secondary p-6 rounded-card shadow-card">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Spending Distribution
        </h3>
        <EmptyState
          title="No spending data"
          description="Start adding expenses to see your spending distribution"
        />
      </div>
    );
  }

  return (
    <div className="bg-background-secondary p-6 rounded-card shadow-card">
      <h3 className="text-lg font-semibold text-text-primary mb-6">
        Spending Distribution
      </h3>

      {/* Chart */}
      <div className="w-full h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={600}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {categorySpending.map((cs) => {
          const IconComponent = Icons[
            cs.icon as keyof typeof Icons
          ] as React.ComponentType<{ size: number }>;
          return (
            <div
              key={cs.category}
              className="flex items-center justify-between p-3 bg-white rounded-input"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: cs.color }}
                />
                <div className="flex items-center gap-2">
                  {IconComponent && (
                    <div style={{ color: "#6B7A99" }}>
                      <IconComponent size={16} />
                    </div>
                  )}
                  <span className="text-sm font-medium text-text-primary">
                    {cs.category}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-text-primary">
                  ₦{cs.amount.toFixed(0)}
                </div>
                <div className="text-xs text-text-muted">{cs.percentage}%</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpendingChart;
