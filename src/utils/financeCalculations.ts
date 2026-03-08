import {
  Transaction,
  Category,
  InsightMessage,
  CategorySpending,
  BudgetStatus,
} from "../types/index";
import { CATEGORY_CONFIG } from "./constants";
import { getMonth, getYear, parseISO } from "date-fns";

/**
 * Get all transactions for current month
 */
export const getCurrentMonthTransactions = (
  transactions: Transaction[],
): Transaction[] => {
  const now = new Date();
  const currentMonth = getMonth(now);
  const currentYear = getYear(now);

  return transactions.filter((t) => {
    const txDate = parseISO(t.date);
    return getMonth(txDate) === currentMonth && getYear(txDate) === currentYear;
  });
};

/**
 * Get all transactions for previous month
 */
export const getPreviousMonthTransactions = (
  transactions: Transaction[],
): Transaction[] => {
  const now = new Date();
  const previousDate = new Date(now.getFullYear(), now.getMonth() - 1);
  const prevMonth = getMonth(previousDate);
  const prevYear = getYear(previousDate);

  return transactions.filter((t) => {
    const txDate = parseISO(t.date);
    return getMonth(txDate) === prevMonth && getYear(txDate) === prevYear;
  });
};

/**
 * Calculate total balance (income - expenses)
 */
export const calculateTotalBalance = (transactions: Transaction[]): number => {
  return transactions.reduce((acc, tx) => {
    return tx.type === "Income" ? acc + tx.amount : acc - tx.amount;
  }, 0);
};

/**
 * Calculate income for current month
 */
export const calculateMonthlyIncome = (transactions: Transaction[]): number => {
  const currentMonth = getCurrentMonthTransactions(transactions);
  return currentMonth
    .filter((tx) => tx.type === "Income")
    .reduce((acc, tx) => acc + tx.amount, 0);
};

/**
 * Calculate expenses for current month
 */
export const calculateMonthlyExpenses = (
  transactions: Transaction[],
): number => {
  const currentMonth = getCurrentMonthTransactions(transactions);
  return currentMonth
    .filter((tx) => tx.type === "Expense")
    .reduce((acc, tx) => acc + tx.amount, 0);
};

/**
 * Calculate savings rate (income - expenses) / income
 */
export const calculateSavingsRate = (transactions: Transaction[]): number => {
  const income = calculateMonthlyIncome(transactions);
  const expenses = calculateMonthlyExpenses(transactions);

  if (income === 0) return 0;
  return Math.max(0, Math.round(((income - expenses) / income) * 100));
};

/**
 * Calculate spending by category with percentages
 */
export const calculateCategorySpending = (
  transactions: Transaction[],
): CategorySpending[] => {
  const currentMonth = getCurrentMonthTransactions(transactions);
  const expenses = currentMonth.filter((tx) => tx.type === "Expense");

  const categoryMap = new Map<Category, number>();

  expenses.forEach((tx) => {
    const current = categoryMap.get(tx.category) || 0;
    categoryMap.set(tx.category, current + tx.amount);
  });

  const total = Array.from(categoryMap.values()).reduce((a, b) => a + b, 0);

  return Array.from(categoryMap.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total === 0 ? 0 : Math.round((amount / total) * 100),
      color: CATEGORY_CONFIG[category].color,
      icon: CATEGORY_CONFIG[category].icon,
    }))
    .sort((a, b) => b.amount - a.amount);
};

/**
 * Calculate budget status per category
 */
export const calculateBudgetStatus = (
  transactions: Transaction[],
  budgets: Record<string, number>,
): BudgetStatus[] => {
  const currentMonth = getCurrentMonthTransactions(transactions);

  return Object.entries(budgets)
    .filter(([category]) => category !== "Salary")
    .map(([categoryName, limit]) => {
      const category = categoryName as Category;
      const spent = currentMonth
        .filter((tx) => tx.type === "Expense" && tx.category === category)
        .reduce((acc, tx) => acc + tx.amount, 0);

      const percentage = limit === 0 ? 0 : Math.round((spent / limit) * 100);
      let status: "normal" | "warning" | "exceeded" = "normal";

      if (percentage >= 100) {
        status = "exceeded";
      } else if (percentage >= 80) {
        status = "warning";
      }

      return {
        category,
        spent,
        limit,
        remaining: Math.max(0, limit - spent),
        percentage: Math.min(percentage, 100),
        status,
      };
    });
};

/**
 * Get month-over-month change for a category
 */
export const getMonthOverMonthChange = (
  transactions: Transaction[],
  category: Category,
): number => {
  const currentMonth = getCurrentMonthTransactions(transactions);
  const previousMonth = getPreviousMonthTransactions(transactions);

  const currentSpending = currentMonth
    .filter((tx) => tx.type === "Expense" && tx.category === category)
    .reduce((acc, tx) => acc + tx.amount, 0);

  const previousSpending = previousMonth
    .filter((tx) => tx.type === "Expense" && tx.category === category)
    .reduce((acc, tx) => acc + tx.amount, 0);

  if (previousSpending === 0) return 0;
  return Math.round(
    ((currentSpending - previousSpending) / previousSpending) * 100,
  );
};

/**
 * Generate insights based on transaction data
 */
export const generateInsights = (
  transactions: Transaction[],
  budgets: Record<string, number>,
): InsightMessage[] => {
  const insights: InsightMessage[] = [];

  // Savings rate insight
  const savingsRate = calculateSavingsRate(transactions);
  if (savingsRate > 0) {
    insights.push({
      type: "positive",
      text: `You have saved ${savingsRate}% of your income this month`,
      value: `${savingsRate}%`,
    });
  }

  // Budget warnings
  const budgetStatuses = calculateBudgetStatus(transactions, budgets);
  for (const status of budgetStatuses) {
    if (status.status === "warning") {
      insights.push({
        type: "warning",
        text: `You are close to exceeding your ${status.category} budget (${status.spent}/${status.limit})`,
        value: `${status.percentage}%`,
      });
    } else if (status.status === "exceeded") {
      insights.push({
        type: "warning",
        text: `You have exceeded your ${status.category} budget by ${status.spent - status.limit}`,
        value: `${status.spent}/${status.limit}`,
      });
    }
  }

  // Month-over-month comparisons
  const categorySpending = calculateCategorySpending(transactions);
  for (const category of categorySpending) {
    const change = getMonthOverMonthChange(transactions, category.category);
    if (change > 15) {
      insights.push({
        type: "warning",
        text: `${category.category} spending is up ${change}% compared to last month`,
        value: `+${change}%`,
      });
    } else if (change < -15) {
      insights.push({
        type: "positive",
        text: `${category.category} spending is down ${Math.abs(change)}% compared to last month`,
        value: `-${Math.abs(change)}%`,
      });
    }
  }

  return insights;
};

/**
 * Format data for Recharts donut chart
 */
export const getChartData = (transactions: Transaction[]) => {
  const categorySpending = calculateCategorySpending(transactions);
  return categorySpending.map((cs) => ({
    name: cs.category,
    value: cs.amount,
    fill: cs.color,
    icon: cs.icon,
    percentage: cs.percentage,
  }));
};

/**
 * Filter transactions by type
 */
export const filterTransactionsByType = (
  transactions: Transaction[],
  type: "All" | "Income" | "Expense",
): Transaction[] => {
  if (type === "All") return transactions;
  return transactions.filter((tx) => tx.type === type);
};

/**
 * Sort transactions by date (newest first)
 */
export const sortTransactionsByDate = (
  transactions: Transaction[],
): Transaction[] => {
  return [...transactions].sort((a, b) => b.timestamp - a.timestamp);
};

/**
 * Format currency amount
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  const date = parseISO(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};
