import { useState, useCallback, useEffect } from "react";
import { Transaction } from "../types/index";
import {
  saveTransactions,
  loadTransactions,
  hasExistingData,
} from "../utils/localStorage";
import { SEED_TRANSACTIONS } from "../utils/constants";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize transactions on mount
  useEffect(() => {
    try {
      const existing = hasExistingData();
      if (existing) {
        const loaded = loadTransactions();
        setTransactions(loaded);
      } else {
        // First load - use seed data
        setTransactions(SEED_TRANSACTIONS);
        saveTransactions(SEED_TRANSACTIONS);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTransaction = useCallback(
    (transaction: Omit<Transaction, "id" | "timestamp">) => {
      setTransactions((prev) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
        };
        const updated = [newTransaction, ...prev];
        saveTransactions(updated);
        return updated;
      });
    },
    [],
  );

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => {
      const updated = prev.filter((tx) => tx.id !== id);
      saveTransactions(updated);
      return updated;
    });
  }, []);

  const getTransactions = useCallback(() => {
    return transactions;
  }, [transactions]);

  return {
    transactions,
    isLoading,
    addTransaction,
    deleteTransaction,
    getTransactions,
  };
};
