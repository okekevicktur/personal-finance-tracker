import { useState, useCallback, useEffect } from "react";
import { Category } from "../types/index";
import { saveBudgets, loadBudgets } from "../utils/localStorage";
import { DEFAULT_BUDGETS } from "../utils/constants";

export const useBudget = () => {
  const [budgets, setBudgets] = useState<Record<string, number>>({
    ...DEFAULT_BUDGETS,
  });

  // Initialize budgets on mount
  useEffect(() => {
    const loaded = loadBudgets();
    setBudgets(loaded);
  }, []);

  const setBudgetLimit = useCallback((category: Category, limit: number) => {
    setBudgets((prev) => {
      const updated = { ...prev, [category]: Math.max(0, limit) };
      saveBudgets(updated);
      return updated;
    });
  }, []);

  const getBudgetLimit = useCallback(
    (category: Category): number => {
      return budgets[category] || DEFAULT_BUDGETS[category] || 0;
    },
    [budgets],
  );

  return {
    budgets,
    setBudgetLimit,
    getBudgetLimit,
  };
};
