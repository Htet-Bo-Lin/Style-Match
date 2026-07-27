import React from "react";
import { Calculator, CheckCircle2, BookOpen, Layers } from "lucide-react";

export const MathDocs: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-200 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              <span>Academic Thesis Mathematical Formulations</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Mathematical Derivation of the ANN Recommendation Engine
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl mt-1">
              Rigorous mathematical formulations for Feature Vector Encoding, Forward Propagation, ReLU & Sigmoid Activations, Binary Cross-Entropy Loss, Backpropagation Partial Derivatives, and Gradient Descent Weight Updates.
            </p>
          </div>
        </div>
      </div>

      {/* Math Sections Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Section 1: Input Vector Encoding */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 text-slate-200">
          <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm border-b border-slate-800 pb-2">
            <BookOpen className="w-4 h-4" />
            <span>{"1. Feature Vector Construction (x ∈ ℝ¹⁸)"}</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The input vector x transforms categorical event context, environmental parameters, and fashion metadata into an 18-dimensional continuous vector:
          </p>
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 font-mono text-xs text-indigo-300 leading-relaxed whitespace-pre-wrap">
            {`x = [
  e_onehot (8-dim Event Type),
  t_onehot (4-dim Time of Day),
  f_match (Formality Match Score),
  w_temp (Weather & Temperature Score),
  c_harmony (Color Harmony Score),
  u_affinity (User Style Affinity),
  h_weight (Feedback History Weight),
  f_outfit (Outfit Formality Score)
]^T ∈ ℝ¹⁸`}
          </div>
        </div>

        {/* Section 2: Forward Propagation */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 text-slate-200">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm border-b border-slate-800 pb-2">
            <Layers className="w-4 h-4" />
            <span>2. Forward Propagation Mechanics</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Information flows sequentially through 3 neural layers with ReLU non-linearities and a final Sigmoid score node:
          </p>
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 font-mono text-xs text-purple-300 space-y-2">
            <div>
              <span className="text-slate-400">Layer 1 (Dense 12):</span>{" "}
              {"z⁽¹⁾ = W⁽¹⁾ x + b⁽¹⁾,  a⁽¹⁾ = ReLU(z⁽¹⁾) = max(0, z⁽¹⁾)"}
            </div>
            <div>
              <span className="text-slate-400">Layer 2 (Dense 6):</span>{" "}
              {"z⁽²⁾ = W⁽²⁾ a⁽¹⁾ + b⁽²⁾,  a⁽²⁾ = ReLU(z⁽²⁾)"}
            </div>
            <div>
              <span className="text-slate-400">Output Node:</span>{" "}
              {"z⁽³⁾ = W⁽³⁾ a⁽²⁾ + b⁽³⁾,  ŷ = σ(z⁽³⁾) = 1 / (1 + e⁻ᶻ⁽³⁾)"}
            </div>
          </div>
        </div>

        {/* Section 3: Loss Function */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 text-slate-200">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm border-b border-slate-800 pb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{"3. Binary Cross-Entropy Loss Function (ℒ)"}</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Evaluates prediction divergence against ground truth label y ∈ {"{0, 1}"} (1 for Like/Wear, 0 for Skip):
          </p>
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-300">
            {"ℒ(y, ŷ) = - [ y ln(ŷ) + (1 - y) ln(1 - ŷ) ]"}
          </div>
        </div>

        {/* Section 4: Backpropagation & Weight Update */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 text-slate-200">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm border-b border-slate-800 pb-2">
            <Calculator className="w-4 h-4" />
            <span>{"4. Backpropagation & Weight Updates (ΔW)"}</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            By Chain Rule, output error derivative simplifies directly to:
          </p>
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 font-mono text-xs text-amber-300 space-y-2">
            <div>{"δ⁽³⁾ = ∂ℒ / ∂z⁽³⁾ = ŷ - y"}</div>
            <div>{"W⁽ˡ⁾ ← W⁽ˡ⁾ - η · δ⁽ˡ⁾ (a⁽ˡ⁻¹⁾)ᵀ"}</div>
          </div>
        </div>

      </div>
    </div>
  );
};
