import React from "react";
import { STATUS_COLORS } from "../utils/constants";

interface ProgressBarProps {
  value: number; // 0-100
  status: "normal" | "warning" | "exceeded";
  label?: string;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  status,
  label,
  animated = true,
}) => {
  const statusColor = STATUS_COLORS[status];
  const displayValue = Math.min(value, 100);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text-muted">{label}</span>
          <span className="text-sm font-semibold text-text-primary">
            {displayValue}%
          </span>
        </div>
      )}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            animated ? "animate-fade-in" : ""
          }`}
          style={{
            width: `${displayValue}%`,
            backgroundColor: statusColor,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
