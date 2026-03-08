import React, { useMemo } from "react";
import { Category } from "../types/index";
import { Transaction } from "../types/index";
import {
  calculateBudgetStatus,
} from "../utils/financeCalculations";
import { BudgetCard } from "./BudgetCard";
import { EmptyState } from "./EmptyState";

interface BudgetSectionProps {
  transactions: Transaction[];
  budgets: Record<string, number>;
  onBudgetChange: (category: Category, newLimit: number) => void;
}

export const BudgetSection: React.FC<BudgetSectionProps> = ({
  transactions,
  budgets,
  onBudgetChange,
}) => {
  const budgetStatuses = useMemo(
    () => calculateBudgetStatus(transactions, budgets),
    [transactions, budgets],
  );

  const onTrackCount = useMemo(
    () => budgetStatuses.filter((bs) => bs.status !== "exceeded").length,
    [budgetStatuses],
  );

  const allBudgetsEmpty = useMemo(
    () => budgetStatuses.every((bs) => bs.limit === 0),
    [budgetStatuses],
  );

  if (allBudgetsEmpty) {
    return (
      <div className="bg-background-secondary p-6 rounded-card shadow-card">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Budget Tracker
        </h3>
        <EmptyState
          title="Set your budget"
          description="Click on any budget limit to set your spending targets"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Budget Tracker
        </h3>
        <p className="text-sm text-text-muted">
          {onTrackCount} of {budgetStatuses.length} budgets on track
        </p>
      </div>

      {/* Budget Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgetStatuses.map((status) => (
          <BudgetCard
            key={status.category}
            category={status.category}
            spent={status.spent}
            limit={status.limit}
            status={status.status}
            percentage={status.percentage}
            onLimitChange={onBudgetChange}
          />
        ))}
      </div>
    </div>
  );
};

export default BudgetSection;
