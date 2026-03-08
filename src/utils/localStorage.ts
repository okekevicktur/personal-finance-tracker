import { Transaction } from "../types/index";
import { DEFAULT_BUDGETS } from "./constants";

const TRANSACTIONS_KEY = "pft_transactions";
const BUDGETS_KEY = "pft_budgets";

export const saveTransactions = (transactions: Transaction[]): void => {
  try {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error("Failed to save transactions to localStorage", error);
  }
};

export const loadTransactions = (): Transaction[] => {
  try {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load transactions from localStorage", error);
    return [];
  }
};

export const saveBudgets = (budgets: Record<string, number>): void => {
  try {
    localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
  } catch (error) {
    console.error("Failed to save budgets to localStorage", error);
  }
};

export const loadBudgets = (): Record<string, number> => {
  try {
    const data = localStorage.getItem(BUDGETS_KEY);
    return data ? JSON.parse(data) : { ...DEFAULT_BUDGETS };
  } catch (error) {
    console.error("Failed to load budgets from localStorage", error);
    return { ...DEFAULT_BUDGETS };
  }
};

export const hasExistingData = (): boolean => {
  try {
    return (
      localStorage.getItem(TRANSACTIONS_KEY) !== null ||
      localStorage.getItem(BUDGETS_KEY) !== null
    );
  } catch (error) {
    return false;
  }
};

export const clearAllData = (): void => {
  try {
    localStorage.removeItem(TRANSACTIONS_KEY);
    localStorage.removeItem(BUDGETS_KEY);
  } catch (error) {
    console.error("Failed to clear localStorage", error);
  }
};
