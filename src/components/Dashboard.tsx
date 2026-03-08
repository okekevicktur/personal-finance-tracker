import React, { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useBudget } from "../hooks/useBudget";
import { useInsights } from "../hooks/useInsights";
import {
  calculateTotalBalance,
  calculateMonthlyIncome,
  calculateMonthlyExpenses,
  sortTransactionsByDate,
} from "../utils/financeCalculations";
import { Navbar } from "./Navbar";
import { DashboardCards } from "./DashboardCards";
import { SpendingChart } from "./SpendingChart";
import { BudgetSection } from "./BudgetSection";
import { InsightsStrip } from "./InsightsStrip";
import { TransactionList } from "./TransactionList";
import { TransactionForm } from "./TransactionForm";
import type { Category, Transaction } from "../types/index";

export const Dashboard: React.FC = () => {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const { budgets, setBudgetLimit } = useBudget();
  const { insights } = useInsights(transactions, budgets);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const totalBalance = calculateTotalBalance(transactions);
  const monthlyIncome = calculateMonthlyIncome(transactions);
  const monthlyExpenses = calculateMonthlyExpenses(transactions);
  const sortedTransactions = sortTransactionsByDate(transactions);

  const handleAddTransaction = (
    transaction: Omit<Transaction, "id" | "timestamp">,
  ) => {
    addTransaction(transaction);
  };

  return (
    <div className="bg-background-primary min-h-screen">
      {/* Navbar */}
      <Navbar onAddClick={() => setIsFormOpen(true)} />

      {/* Main Content */}
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Cards */}
          <DashboardCards
            totalBalance={totalBalance}
            monthlyIncome={monthlyIncome}
            monthlyExpenses={monthlyExpenses}
          />

          {/* Two Column Section on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Left: Spending Chart */}
            <SpendingChart transactions={transactions} />

            {/* Right: Budget Section */}
            <BudgetSection
              transactions={transactions}
              budgets={budgets}
              onBudgetChange={(category: Category, newLimit: number) =>
                setBudgetLimit(category, newLimit)
              }
            />
          </div>

          {/* Insights Strip */}
          <div className="mb-8">
            <InsightsStrip insights={insights} />
          </div>

          {/* Transactions List */}
          <div>
            <TransactionList
              transactions={sortedTransactions}
              onDelete={deleteTransaction}
            />
          </div>
        </div>
      </main>

      {/* Transaction Form Modal */}
      <TransactionForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleAddTransaction}
      />
    </div>
  );
};

export default Dashboard;
