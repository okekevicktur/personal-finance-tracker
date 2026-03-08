import React, { useState } from "react";
import { Category } from "../types/index";
import { CATEGORY_CONFIG } from "../utils/constants";
import { ProgressBar } from "./ProgressBar";
import { formatCurrency } from "../utils/financeCalculations";
import * as Icons from "lucide-react";

interface BudgetCardProps {
  category: Category;
  spent: number;
  limit: number;
  status: "normal" | "warning" | "exceeded";
  percentage: number;
  onLimitChange: (category: Category, newLimit: number) => void;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({
  category,
  spent,
  limit,
  status,
  percentage,
  onLimitChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(limit.toString());

  const config = CATEGORY_CONFIG[category];
  const IconComponent = Icons[
    config.icon as keyof typeof Icons
  ] as React.ComponentType<{ size: number }>;

  const handleSave = () => {
    const newLimit = parseFloat(editValue) || 0;
    onLimitChange(category, newLimit);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(limit.toString());
    setIsEditing(false);
  };

  return (
    <div className="bg-background-secondary p-4 rounded-card shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {IconComponent && (
            <div style={{ color: config.color }}>
              <IconComponent size={20} />
            </div>
          )}
          <h4 className="font-semibold text-text-primary">{category}</h4>
        </div>
      </div>

      {/* Budget Limit */}
      <div className="mb-3">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 px-2 py-1 border border-blue-light rounded-input text-sm focus:outline-none focus:ring-2 focus:ring-blue-primary"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="px-2 py-1 bg-blue-primary text-white rounded-input text-xs font-medium hover:bg-blue-dark transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-2 py-1 bg-gray-200 text-text-primary rounded-input text-xs font-medium hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className="cursor-pointer px-2 py-1 rounded hover:bg-white transition"
          >
            <p className="text-xs text-text-muted mb-1">Budget Limit</p>
            <p className="text-sm font-semibold text-text-primary hover:underline">
              {formatCurrency(limit)}
            </p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <ProgressBar
        value={percentage}
        status={status}
        label={`${formatCurrency(spent)} of ${formatCurrency(limit)}`}
      />

      {/* Status Message */}
      {status === "exceeded" && (
        <p className="text-xs text-danger mt-2">
          Over budget by {formatCurrency(spent - limit)}
        </p>
      )}
      {status === "warning" && (
        <p className="text-xs text-warning mt-2">
          {formatCurrency(limit - spent)} remaining
        </p>
      )}
      {status === "normal" && (
        <p className="text-xs text-success mt-2">
          {formatCurrency(limit - spent)} remaining
        </p>
      )}
    </div>
  );
};

export default BudgetCard;
