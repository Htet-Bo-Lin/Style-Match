import React from "react";
import { TabType } from "../types";
import { Smartphone, Cpu, GitFork, Database, Palette, Code2, Calculator, Sparkles } from "lucide-react";

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "app_demo", label: "Flutter App Simulator", icon: Smartphone },
    { id: "ann_engine", label: "ANN Engine & Simulator", icon: Cpu },
    { id: "diagrams", label: "System Diagrams (11)", icon: GitFork },
    { id: "dataset_ml", label: "Dataset & ML Studio", icon: Database },
    { id: "color_fashion", label: "Color & Fashion AI", icon: Palette },
    { id: "code_base", label: "Clean Codebase", icon: Code2 },
    { id: "math_formulas", label: "Math & Formulas", icon: Calculator },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & CS Thesis Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-2 rounded-xl shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                  STYLE MATCH
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                  ANN Engine v1.0
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Final-Year CS Thesis Platform • AI Outfit Recommendation System
              </p>
            </div>
          </div>

          {/* Quick Stats / Environment Badge */}
          <div className="hidden lg:flex items-center space-x-4 text-xs text-slate-300">
            <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium text-slate-200">FastAPI & PyTorch Active</span>
            </div>
            <div className="bg-indigo-900/40 text-indigo-200 px-3 py-1.5 rounded-lg border border-indigo-800/50 font-mono">
              Vector Dim: 18 • Layers: 18-12-6-1
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-1 overflow-x-auto no-scrollbar pb-2 pt-1 border-t border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
