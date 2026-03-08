import { Category, Transaction } from "../types/index";

export const CATEGORY_CONFIG: Record<
  Category,
  { color: string; icon: string; label: string }
> = {
  Housing: {
    color: "#0066F5",
    icon: "Home",
    label: "Housing",
  },
  "Food and Dining": {
    color: "#F5A623",
    icon: "UtensilsCrossed",
    label: "Food & Dining",
  },
  Transport: {
    color: "#00C48C",
    icon: "Car",
    label: "Transport",
  },
  Entertainment: {
    color: "#FF4D4F",
    icon: "Music",
    label: "Entertainment",
  },
  Salary: {
    color: "#00C48C",
    icon: "Briefcase",
    label: "Salary",
  },
};

export const EXPENSE_CATEGORIES: Category[] = [
  "Housing",
  "Food and Dining",
  "Transport",
  "Entertainment",
];
export const INCOME_CATEGORIES: Category[] = ["Salary"];

export const DEFAULT_BUDGETS: Record<Category, number> = {
  Housing: 350000,
  "Food and Dining": 80000,
  Transport: 30000,
  Entertainment: 40000,
  Salary: 0,
};

// Seed transactions for initial load
export const SEED_TRANSACTIONS: Transaction[] = [
  {
    id: "seed-1",
    amount: 500000,
    type: "Income",
    category: "Salary",
    description: "Monthly salary",
    date: new Date(new Date().setMonth(new Date().getMonth() - 1))
      .toISOString()
      .split("T")[0],
    timestamp: Date.now() - 30 * 24 * 60 * 60 * 1000,
  },
  {
    id: "seed-2",
    amount: 250000,
    type: "Expense",
    category: "Housing",
    description: "Rent payment",
    date: new Date(new Date().setMonth(new Date().getMonth() - 1))
      .toISOString()
      .split("T")[0],
    timestamp: Date.now() - 29 * 24 * 60 * 60 * 1000,
  },
  {
    id: "seed-3",
    amount: 18000,
    type: "Expense",
    category: "Food and Dining",
    description: "Groceries",
    date: new Date(new Date().setMonth(new Date().getMonth() - 1))
      .toISOString()
      .split("T")[0],
    timestamp: Date.now() - 25 * 24 * 60 * 60 * 1000,
  },
  {
    id: "seed-4",
    amount: 6500,
    type: "Expense",
    category: "Transport",
    description: "Gas",
    date: new Date(new Date().setMonth(new Date().getMonth() - 1))
      .toISOString()
      .split("T")[0],
    timestamp: Date.now() - 24 * 24 * 60 * 60 * 1000,
  },
  {
    id: "seed-5",
    amount: 12000,
    type: "Expense",
    category: "Entertainment",
    description: "Movie tickets",
    date: new Date(new Date().setMonth(new Date().getMonth() - 1))
      .toISOString()
      .split("T")[0],
    timestamp: Date.now() - 20 * 24 * 60 * 60 * 1000,
  },
  {
    id: "seed-6",
    amount: 500000,
    type: "Income",
    category: "Salary",
    description: "Monthly salary",
    date: new Date().toISOString().split("T")[0],
    timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
  },
  {
    id: "seed-7",
    amount: 14500,
    type: "Expense",
    category: "Food and Dining",
    description: "Restaurant",
    date: new Date().toISOString().split("T")[0],
    timestamp: Date.now() - 1 * 60 * 60 * 1000,
  },
  {
    id: "seed-8",
    amount: 7200,
    type: "Expense",
    category: "Transport",
    description: "Uber ride",
    date: new Date().toISOString().split("T")[0],
    timestamp: Date.now() - 30 * 60 * 1000,
  },
];

export const STATUS_COLORS = {
  normal: "#0066F5",
  warning: "#F5A623",
  exceeded: "#FF4D4F",
};

export const TOAST_DURATION = 3000;
