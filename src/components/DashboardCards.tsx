import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "../utils/financeCalculations";

interface DashboardCardsProps {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

const CountUpNumber: React.FC<{ value: number; duration?: number }> = ({
  value,
  duration = 1000,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setDisplayValue(Math.floor(value * progress));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [value, duration]);

  return <>{formatCurrency(displayValue)}</>;
};

export const DashboardCards: React.FC<DashboardCardsProps> = ({
  totalBalance,
  monthlyIncome,
  monthlyExpenses,
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Main Balance Card */}
      <div
        className="w-full p-6 rounded-card text-white shadow-card"
        style={{
          background: `linear-gradient(135deg, #0066F5 0%, #0044CC 100%)`,
        }}
      >
        <p className="text-sm font-medium opacity-90 mb-2">Total Balance</p>
        <h2 className="text-4xl font-bold animate-count-up">
          <CountUpNumber value={totalBalance} />
        </h2>
      </div>

      {/* Income and Expenses Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Income Card */}
        <div className="bg-background-secondary p-6 rounded-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-2">Monthly Income</p>
              <h3 className="text-2xl font-bold text-success">
                <CountUpNumber value={monthlyIncome} />
              </h3>
            </div>
            <div className="p-3 bg-emerald-100 rounded-full">
              <TrendingUp size={24} className="text-success" />
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-background-secondary p-6 rounded-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-2">Monthly Expenses</p>
              <h3 className="text-2xl font-bold text-danger">
                <CountUpNumber value={monthlyExpenses} />
              </h3>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <TrendingDown size={24} className="text-danger" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
