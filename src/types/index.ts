export type Category =
  | "Housing"
  | "Food and Dining"
  | "Transport"
  | "Entertainment"
  | "Salary";

export type TransactionType = "Income" | "Expense";

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: Category;
  description: string;
  date: string; // ISO string (YYYY-MM-DD)
  timestamp: number; // for sorting
}

export interface Budget {
  category: Category;
  limit: number;
}

export interface InsightMessage {
  type: "positive" | "warning" | "neutral";
  text: string;
  value?: string | number;
}

export interface DashboardMetrics {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
}

export interface CategorySpending {
  category: Category;
  amount: number;
  percentage: number;
  color: string;
  icon: string;
}

export interface BudgetStatus {
  category: Category;
  spent: number;
  limit: number;
  remaining: number;
  percentage: number;
  status: "normal" | "warning" | "exceeded";
}
