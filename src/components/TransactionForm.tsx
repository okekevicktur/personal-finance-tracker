import React, { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";
import { Category, TransactionType, Transaction } from "../types/index";
import {
  CATEGORY_CONFIG,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../utils/constants";
import { showToast } from "./Toast";
import * as Icons from "lucide-react";

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, "id" | "timestamp">) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("Expense");
  const [category, setCategory] = useState<Category>("Food and Dining");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableCategories =
    type === "Income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  // Reset category when type changes
  useEffect(() => {
    if (!availableCategories.includes(category)) {
      setCategory(availableCategories[0]);
    }
  }, [type, availableCategories, category]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!category) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const transaction: Omit<Transaction, "id" | "timestamp"> = {
      amount: parseFloat(amount),
      type,
      category,
      description: description.trim() || category,
      date,
    };

    onSave(transaction);
    showToast("Transaction added successfully", "success");
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setAmount("");
    setType("Expense");
    setCategory(EXPENSE_CATEGORIES[0]);
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white rounded-t-card sm:rounded-card shadow-lg max-h-96 sm:max-h-auto overflow-y-auto animate-slide-up sm:animate-none">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between p-4 border-b border-blue-light bg-white rounded-t-card">
            <h2 className="text-lg font-bold text-text-primary">
              Add Transaction
            </h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-blue-light rounded transition"
            >
              <X size={24} className="text-text-muted" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-4 sm:space-y-5">
            {/* Amount */}
            <div>
              <input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="0"
                className="w-full text-4xl font-bold text-text-primary placeholder-text-muted focus:outline-none focus:ring-0 border-none bg-transparent"
                autoFocus
              />
              {errors.amount && (
                <p className="text-xs text-danger mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Type Toggle */}
            <div className="flex gap-2 bg-background-secondary p-1 rounded-button">
              {(["Income", "Expense"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex-1 py-2 rounded-input font-medium transition ${
                    type === t
                      ? "bg-blue-primary text-white"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Category Grid */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableCategories.map((cat) => {
                  const config = CATEGORY_CONFIG[cat];
                  const IconComponent = Icons[
                    config.icon as keyof typeof Icons
                  ] as React.ComponentType<{ size: number }>;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`p-3 rounded-input flex flex-col items-center gap-1 transition ${
                        category === cat
                          ? "bg-blue-primary text-white"
                          : "bg-background-secondary text-text-primary hover:shadow-sm"
                      }`}
                    >
                      {IconComponent && <IconComponent size={20} />}
                      <span className="text-xs font-medium text-center">
                        {cat}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.category && (
                <p className="text-xs text-danger mt-1">{errors.category}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Description (Optional)
              </label>
              <input
                type="text"
                placeholder="Add a note..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-blue-light rounded-input focus:outline-none focus:ring-2 focus:ring-blue-primary"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Date
              </label>
              <div className="relative">
                <Calendar
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-blue-light rounded-input focus:outline-none focus:ring-2 focus:ring-blue-primary"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2 border border-blue-light text-text-primary rounded-button font-medium hover:bg-blue-light transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-blue-primary text-white rounded-button font-medium hover:bg-blue-dark transition active:scale-95"
              >
                Save Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TransactionForm;
