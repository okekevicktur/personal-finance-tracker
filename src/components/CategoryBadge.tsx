import React from "react";
import { Category } from "../types/index";
import { CATEGORY_CONFIG } from "../utils/constants";
import * as Icons from "lucide-react";

interface CategoryBadgeProps {
  category: Category;
  variant?: "full" | "minimal";
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  variant = "full",
}) => {
  const config = CATEGORY_CONFIG[category];
  const IconComponent = Icons[
    config.icon as keyof typeof Icons
  ] as React.ComponentType<{ size: number }>;

  if (variant === "minimal") {
    return (
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: config.color + "20" }}
      >
        {IconComponent && (
          <div style={{ color: config.color }}>
            <IconComponent size={20} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-light rounded-button">
      {IconComponent && (
        <div style={{ color: config.color }}>
          <IconComponent size={16} />
        </div>
      )}
      <span className="text-sm font-medium text-text-primary">
        {config.label}
      </span>
    </div>
  );
};

export default CategoryBadge;
