import React, { useState, useMemo } from "react";
import { Transaction } from "../types/index";
import {
  formatDate,
  filterTransactionsByType,
  sortTransactionsByDate,
} from "../utils/financeCalculations";
import { CATEGORY_CONFIG } from "../utils/constants";
import { EmptyState } from "./EmptyState";
import { Trash2 } from "lucide-react";
import * as Icons from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

type FilterType = "All" | "Income" | "Expense";

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
}) => {
  const [filter, setFilter] = useState<FilterType>("All");

  const filteredAndSorted = useMemo(() => {
    const filtered = filterTransactionsByType(transactions, filter);
    return sortTransactionsByDate(filtered);
  }, [transactions, filter]);

  if (filteredAndSorted.length === 0) {
    return (
      <div className="bg-background-secondary p-6 rounded-card shadow-card">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Transactions
        </h3>
        <EmptyState
          title="No transactions"
          description={
            filter === "All"
              ? "Start by adding your first transaction"
              : `No ${filter.toLowerCase()} transactions yet`
          }
        />
      </div>
    );
  }

  return (
    <div className="bg-background-secondary p-6 rounded-card shadow-card">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Recent Transactions
        </h3>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(["All", "Income", "Expense"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-button text-sm font-medium transition ${
                filter === type
                  ? "bg-blue-primary text-white"
                  : "bg-white text-text-muted hover:bg-blue-light"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-2">
        {filteredAndSorted.map((tx) => {
          const config = CATEGORY_CONFIG[tx.category];
          const IconComponent = Icons[
            config.icon as keyof typeof Icons
          ] as React.ComponentType<{ size: number }>;
          const isIncome = tx.type === "Income";
          const amountColor = isIncome ? "text-success" : "text-danger";
          const amountSign = isIncome ? "+" : "-";

          return (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 bg-white rounded-input hover:shadow-sm transition group"
            >
              {/* Left side - Icon, name, description */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: config.color + "20" }}
                >
                  {IconComponent && (
                    <div style={{ color: config.color }}>
                      <IconComponent size={20} />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {tx.description || tx.category}
                  </p>
                  <p className="text-xs text-text-muted">
                    {formatDate(tx.date)}
                  </p>
                </div>
              </div>

              {/* Right side - Amount and delete button */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={`text-sm font-semibold ${amountColor}`}>
                    {amountSign}₦{Math.abs(tx.amount).toFixed(0)}
                  </p>
                </div>
                <button
                  onClick={() => onDelete(tx.id)}
                  className="p-1.5 text-text-muted hover:bg-red-50 hover:text-danger rounded transition opacity-0 group-hover:opacity-100"
                  title="Delete transaction"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList;
