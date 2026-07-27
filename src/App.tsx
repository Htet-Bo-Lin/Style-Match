/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { TabType } from "./types";
import { Navbar } from "./components/Navbar";
import { MobileSimulator } from "./components/MobileSimulator";
import { ANNSimulator } from "./components/ANNSimulator";
import { DiagramViewer } from "./components/DiagramViewer";
import { DatasetStudio } from "./components/DatasetStudio";
import { ColorFashionStudio } from "./components/ColorFashionStudio";
import { CodeExplorer } from "./components/CodeExplorer";
import { MathDocs } from "./components/MathDocs";
import { Sparkles, CheckCircle, Github, Heart } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("app_demo");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Fixed Header Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Dynamic View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "app_demo" && <MobileSimulator />}
        {activeTab === "ann_engine" && <ANNSimulator />}
        {activeTab === "diagrams" && <DiagramViewer />}
        {activeTab === "dataset_ml" && <DatasetStudio />}
        {activeTab === "color_fashion" && <ColorFashionStudio />}
        {activeTab === "code_base" && <CodeExplorer />}
        {activeTab === "math_formulas" && <MathDocs />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600/30 text-indigo-400 p-1.5 rounded-lg border border-indigo-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white">STYLE MATCH</span> • AI Outfit Recommendation Engine
              <p className="text-[10px] text-slate-500">
                Final-Year Computer Science Project Platform • Flutter + FastAPI + MongoDB + TensorFlow ANN
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-slate-400">
            <span className="flex items-center space-x-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>ANN Model Verified</span>
            </span>
            <span>•</span>
            <span>18-12-6-1 Vector Net</span>
            <span>•</span>
            <span>Clean Arch & Riverpod</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
