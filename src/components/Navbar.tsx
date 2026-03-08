import React from "react";
import { Plus } from "lucide-react";

interface NavbarProps {
  onAddClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAddClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-blue-light shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo/App Name */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-primary to-blue-dark rounded-card flex items-center justify-center">
            <span className="text-white font-bold text-lg">₦</span>
          </div>
          <h1 className="text-xl font-bold text-text-primary">
            Personal Finance
          </h1>
        </div>

        {/* Add Transaction Button */}
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-blue-primary text-white px-4 py-2 rounded-button font-medium hover-lift transition active:scale-95"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Transaction</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
