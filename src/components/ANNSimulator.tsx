import React, { useState } from "react";
import { runANNForwardPass, relu, sigmoid, applyFeedbackLearning } from "../utils/annEngine";
import { Cpu, Zap, RefreshCw, Layers, Calculator, Play, Activity } from "lucide-react";

export const ANNSimulator: React.FC = () => {
  // Input feature sliders state (18 inputs mapped intuitively)
  const [formalityMatch, setFormalityMatch] = useState(0.85);
  const [weatherScore, setWeatherScore] = useState(0.90);
  const [colorHarmony, setColorHarmony] = useState(0.95);
  const [userAffinity, setUserAffinity] = useState(0.80);
  const [feedbackHistory, setFeedbackHistory] = useState(0.88);
  const [outfitFormality, setOutfitFormality] = useState(0.70);

  // One-Hot selections
  const [selectedEventIndex, setSelectedEventIndex] = useState(0); // 0-7: Wedding, Interview, Office, etc.
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(2); // 0-3: Morning, Afternoon, Evening, Night

  // Learning Rate for online SGD
  const [learningRate, setLearningRate] = useState(0.05);
  const [targetLabel, setTargetLabel] = useState<number>(1.0); // 1 for Like, 0 for Dislike
  const [updateCount, setUpdateCount] = useState(0);

  // Build full 18-dim vector
  const buildInputVector = (): number[] => {
    const eventOneHot = new Array(8).fill(0);
    eventOneHot[selectedEventIndex] = 1;

    const timeOneHot = new Array(4).fill(0);
    timeOneHot[selectedTimeIndex] = 1;

    return [
      ...eventOneHot,
      ...timeOneHot,
      formalityMatch,
      weatherScore,
      colorHarmony,
      userAffinity,
      feedbackHistory,
      outfitFormality
    ];
  };

  const currentVector = buildInputVector();
  const annOutput = runANNForwardPass(currentVector);

  // Loss Calculation: Binary Cross-Entropy
  const y = targetLabel;
  const yHat = Math.max(0.0001, Math.min(0.9999, annOutput.score));
  const bceLoss = -(y * Math.log(yHat) + (1 - y) * Math.log(1 - yHat));

  // Trigger Online Backprop
  const handleTrainStep = () => {
    applyFeedbackLearning(currentVector, targetLabel, learningRate);
    setUpdateCount(prev => prev + 1);
  };

  const featureLabels = [
    "Evt_Wedding", "Evt_Interview", "Evt_Office", "Evt_Party", "Evt_Festival", "Evt_Date", "Evt_Casual", "Evt_Outing",
    "Time_Morn", "Time_Aft", "Time_Eve", "Time_Night",
    "Formality_Match", "Weather_Score", "Color_Harmony", "User_Affinity", "Feedback_History", "Outfit_Formality"
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-200 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4" />
              <span>Core Machine Learning Workbench</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Artificial Neural Network (ANN) Recommendation Simulator
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl mt-1">
              Live neural forward propagation and stochastic gradient descent backpropagation workbench. Adjust input features below to watch neuron activation states propagate through the hidden layers in real time.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center space-x-4">
            <div>
              <div className="text-[10px] text-slate-400 font-mono uppercase">ANN Score $\hat{y}$</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {annOutput.score.toFixed(4)}
              </div>
            </div>
            <div className="border-l border-slate-800 pl-4">
              <div className="text-[10px] text-slate-400 font-mono uppercase">BCE Loss</div>
              <div className="text-xl font-bold text-amber-400 font-mono">
                {bceLoss.toFixed(4)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls vs Visual Layer Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Input Vector Sliders & Selectors */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 text-slate-200">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>Input Feature Vector Builder (18 Dimensions)</span>
          </h3>

          {/* Event One-Hot Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              1. Event Type One-Hot (8 Dim)
            </label>
            <div className="grid grid-cols-4 gap-1.5 text-[10px]">
              {["Wedding", "Interview", "Office", "Party", "Festival", "Date", "Casual", "Outing"].map((e, idx) => (
                <button
                  key={e}
                  onClick={() => setSelectedEventIndex(idx)}
                  className={`py-1.5 rounded-lg border font-medium transition ${
                    selectedEventIndex === idx
                      ? "bg-indigo-600 border-indigo-400 text-white font-bold"
                      : "bg-slate-800 border-slate-700 text-slate-400"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Continuous Feature Sliders */}
          <div className="space-y-3 pt-1">
            <div className="text-xs font-semibold text-slate-300">
              2. Continuous Contextual Features
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-400">Formality Match Score</span>
                <span className="font-mono text-indigo-400 font-bold">{formalityMatch.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={formalityMatch}
                onChange={(e) => setFormalityMatch(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-400">Weather & Temp Suitability</span>
                <span className="font-mono text-indigo-400 font-bold">{weatherScore.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={weatherScore}
                onChange={(e) => setWeatherScore(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-400">Color Harmony Index</span>
                <span className="font-mono text-indigo-400 font-bold">{colorHarmony.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={colorHarmony}
                onChange={(e) => setColorHarmony(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-400">User Style Affinity</span>
                <span className="font-mono text-indigo-400 font-bold">{userAffinity.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={userAffinity}
                onChange={(e) => setUserAffinity(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
          </div>

          {/* Interactive Backprop Training Block */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 pt-3">
            <div className="text-xs font-bold text-white flex items-center justify-between">
              <span className="flex items-center space-x-1">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Online SGD Feedback Retraining</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Updates: {updateCount}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Target Label ($y$)</label>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => setTargetLabel(1.0)}
                    className={`py-1 rounded-lg text-[10px] font-bold border ${
                      targetLabel === 1.0 ? "bg-emerald-600 border-emerald-400 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    1.0 (Like)
                  </button>
                  <button
                    onClick={() => setTargetLabel(0.0)}
                    className={`py-1 rounded-lg text-[10px] font-bold border ${
                      targetLabel === 0.0 ? "bg-red-600 border-red-400 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    0.0 (Dislike)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Learning Rate ($\eta$)</label>
                <select
                  value={learningRate}
                  onChange={(e) => setLearningRate(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-1 text-xs"
                >
                  <option value={0.01}>0.01</option>
                  <option value={0.05}>0.05</option>
                  <option value={0.1}>0.10</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleTrainStep}
              className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow flex items-center justify-center space-x-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Execute Gradient Descent Step ($\Delta W$)</span>
            </button>
          </div>
        </div>

        {/* Right Column: Visual Layer Node Graph */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 text-slate-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Neuron Layer Activations Graph</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded-lg">
              Architecture: 18 ➔ 12 (ReLU) ➔ 6 (ReLU) ➔ 1 (Sigmoid)
            </span>
          </div>

          {/* Visual Layer Nodes Grid */}
          <div className="grid grid-cols-4 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 min-h-[380px] items-center">
            
            {/* Layer 1: Input Vector (18 Node representations) */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wider mb-2">
                Input (18)
              </div>
              <div className="space-y-1 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
                {currentVector.map((val, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-slate-900 px-2 py-1 rounded border border-slate-800 text-[9px] font-mono"
                  >
                    <span className="text-slate-400 truncate w-16">{featureLabels[idx]}</span>
                    <span className={`font-bold ${val > 0 ? "text-indigo-400" : "text-slate-600"}`}>
                      {val.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Layer 2: Hidden 1 (12 Dense Nodes) */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold text-indigo-400 text-center uppercase tracking-wider mb-2">
                Hidden 1 (12)
              </div>
              <div className="space-y-1">
                {annOutput.hidden1.map((val, idx) => (
                  <div
                    key={idx}
                    className={`p-1 rounded text-center text-[9px] font-mono border transition-all duration-300 ${
                      val > 0
                        ? "bg-indigo-900/40 border-indigo-500/60 text-indigo-200 shadow-sm shadow-indigo-500/20"
                        : "bg-slate-900/60 border-slate-800 text-slate-600"
                    }`}
                  >
                    h1_{idx + 1}: {val.toFixed(2)}
                  </div>
                ))}
              </div>
            </div>

            {/* Layer 3: Hidden 2 (6 Dense Nodes) */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-purple-400 text-center uppercase tracking-wider mb-2">
                Hidden 2 (6)
              </div>
              <div className="space-y-2">
                {annOutput.hidden2.map((val, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-xl text-center text-[10px] font-mono border transition-all duration-300 ${
                      val > 0
                        ? "bg-purple-900/40 border-purple-500/60 text-purple-200 shadow-md shadow-purple-500/20"
                        : "bg-slate-900/60 border-slate-800 text-slate-600"
                    }`}
                  >
                    h2_{idx + 1}: {val.toFixed(2)}
                  </div>
                ))}
              </div>
            </div>

            {/* Layer 4: Output Node (Sigmoid Score) */}
            <div className="space-y-3 text-center">
              <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2">
                Output Node $\hat{y}$
              </div>
              <div className="bg-gradient-to-tr from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/80 rounded-2xl p-4 shadow-xl shadow-emerald-500/10 space-y-2">
                <div className="text-[10px] text-slate-400 font-mono">Raw Logit $z_3$</div>
                <div className="text-lg font-bold font-mono text-white">{annOutput.rawLogit.toFixed(3)}</div>
                <div className="border-t border-slate-800 pt-2">
                  <div className="text-[10px] text-emerald-400 font-mono font-semibold">{"σ(z₃) = 1 / (1 + e⁻ᶻ³)"}</div>
                  <div className="text-2xl font-black font-mono text-emerald-300 mt-1">
                    {annOutput.score.toFixed(4)}
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 leading-tight">
                Ranking probability score for Top-3 sorting algorithm
              </div>
            </div>

          </div>

          {/* Mathematical Equation Callout */}
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
            <div className="text-indigo-400 font-bold flex items-center space-x-1">
              <Calculator className="w-3.5 h-3.5" />
              <span>Forward Propagation Formulation:</span>
            </div>
            <div className="text-slate-400 text-[11px] leading-relaxed">
              {"a⁽¹⁾ = ReLU(W⁽¹⁾ x + b⁽¹⁾),   a⁽²⁾ = ReLU(W⁽²⁾ a⁽¹⁾ + b⁽²⁾),   ŷ = σ(W⁽³⁾ a⁽²⁾ + b⁽³⁾)"}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
