import { useState, useCallback, useEffect } from "react";
import { Transaction, InsightMessage } from "../types/index";
import { generateInsights as generateInsightsUtil } from "../utils/financeCalculations";

export const useInsights = (
  transactions: Transaction[],
  budgets: Record<string, number>,
) => {
  const [insights, setInsights] = useState<InsightMessage[]>([]);

  const generateInsights = useCallback(() => {
    const newInsights = generateInsightsUtil(transactions, budgets);
    setInsights(newInsights);
  }, [transactions, budgets]);

  useEffect(() => {
    generateInsights();
  }, [generateInsights]);

  return {
    insights,
    refresh: generateInsights,
  };
};
