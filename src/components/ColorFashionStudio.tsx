import React, { useState } from "react";
import { hexToHsl, calculateColorHarmony } from "../utils/annEngine";
import { ClothingItem } from "../types";
import { Palette, Sparkles, Sun, Flame, Shirt, ShieldCheck, Compass } from "lucide-react";

export const ColorFashionStudio: React.FC = () => {
  const [color1, setColor1] = useState("#1B2A4A"); // Navy
  const [color2, setColor2] = useState("#FFFFFF"); // White
  const [color3, setColor3] = useState("#36454F"); // Charcoal

  const [pattern1, setPattern1] = useState("Solid");
  const [pattern2, setPattern2] = useState("Solid");

  const [fabric1, setFabric1] = useState("Wool");
  const [fabric2, setFabric2] = useState("Cotton");

  const mockItems: ClothingItem[] = [
    { id: "c1", name: "Top Item", category: "Top", color: color1, colorName: "Primary Color", brand: "", fabric: fabric1, pattern: pattern1, sleeveType: "", formalityLevel: 8, season: [], weatherSuitability: [], occasionTags: [], imageUrl: "" },
    { id: "c2", name: "Bottom Item", category: "Bottom", color: color2, colorName: "Secondary Color", brand: "", fabric: fabric2, pattern: pattern2, sleeveType: "", formalityLevel: 8, season: [], weatherSuitability: [], occasionTags: [], imageUrl: "" },
    { id: "c3", name: "Outerwear Item", category: "Outerwear", color: color3, colorName: "Tertiary Color", brand: "", fabric: "Leather", pattern: "Solid", sleeveType: "", formalityLevel: 8, season: [], weatherSuitability: [], occasionTags: [], imageUrl: "" }
  ];

  const harmonyResult = calculateColorHarmony(mockItems);

  // Pattern Compatibility
  let patternCompatibility = "High Balance (100%)";
  let patternExplanation = "Solid + Solid creates a timeless, minimal aesthetic.";
  if (pattern1 !== "Solid" && pattern2 !== "Solid") {
    patternCompatibility = "Medium/Risky Balance (60%)";
    patternExplanation = "Mixing two distinct patterns requires careful scale contrast to avoid visual clutter.";
  } else if (pattern1 !== "Solid" || pattern2 !== "Solid") {
    patternCompatibility = "Ideal Focal Balance (95%)";
    patternExplanation = "Pairing a statement pattern with a solid foundational item directs focus gracefully.";
  }

  // Fabric Compatibility
  let fabricCompatibility = "Excellent Texture Contrast (92%)";
  let fabricExplanation = `${fabric1} and ${fabric2} provide rich tactile depth and structure.`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-200 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Palette className="w-4 h-4" />
              <span>Fashion Intelligence & Color Theory Subsystem</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Color Harmony, Texture Compatibility & Weather Rules
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl mt-1">
              Evaluates HSL color wheel angles (Complementary, Analogous, Triadic, Monochromatic), fabric texture pairings, pattern scale balance, and weather-aware thermal rules.
            </p>
          </div>

          <div className="bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800 flex items-center space-x-3">
            <span className="text-xs text-slate-400 font-mono">Harmony Score:</span>
            <span className="text-xl font-black text-emerald-400 font-mono">
              {Math.round(harmonyResult.score * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Grid 1: Color Picker & HSL Wheel Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Color Selector */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 text-slate-200">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-2">
            <Palette className="w-4 h-4 text-indigo-400" />
            <span>Interactive Outfit Color Palette</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Top / Jacket Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-10 h-10 rounded-xl bg-transparent border border-slate-700 cursor-pointer"
                />
                <span className="font-mono text-xs text-white">{color1}</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  (H: {hexToHsl(color1).h}°, S: {hexToHsl(color1).s}%, L: {hexToHsl(color1).l}%)
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Bottom Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-10 h-10 rounded-xl bg-transparent border border-slate-700 cursor-pointer"
                />
                <span className="font-mono text-xs text-white">{color2}</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  (H: {hexToHsl(color2).h}°, S: {hexToHsl(color2).s}%, L: {hexToHsl(color2).l}%)
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Footwear / Accessory Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={color3}
                  onChange={(e) => setColor3(e.target.value)}
                  className="w-10 h-10 rounded-xl bg-transparent border border-slate-700 cursor-pointer"
                />
                <span className="font-mono text-xs text-white">{color3}</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  (H: {hexToHsl(color3).h}°, S: {hexToHsl(color3).s}%, L: {hexToHsl(color3).l}%)
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-indigo-300">Detected Color Scheme:</div>
            <div className="text-lg font-bold text-white font-mono">{harmonyResult.scheme}</div>
            <p className="text-xs text-slate-400 leading-relaxed">{harmonyResult.explanation}</p>
          </div>
        </div>

        {/* Right Column: Pattern & Texture Compatibility Matrix */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 text-slate-200">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-2">
            <Shirt className="w-4 h-4 text-indigo-400" />
            <span>Pattern & Texture Compatibility Matrix</span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Top Item Pattern</label>
              <select
                value={pattern1}
                onChange={(e) => setPattern1(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2 text-xs"
              >
                <option value="Solid">Solid</option>
                <option value="Striped">Striped</option>
                <option value="Plaid">Plaid</option>
                <option value="Floral">Floral</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Bottom Item Pattern</label>
              <select
                value={pattern2}
                onChange={(e) => setPattern2(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2 text-xs"
              >
                <option value="Solid">Solid</option>
                <option value="Striped">Striped</option>
                <option value="Plaid">Plaid</option>
                <option value="Floral">Floral</option>
              </select>
            </div>
          </div>

          {/* Pattern Result Card */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400 font-semibold">Pattern Synergy Rating:</div>
            <div className="text-sm font-bold text-emerald-400 font-mono">{patternCompatibility}</div>
            <div className="text-xs text-slate-300 leading-relaxed">{patternExplanation}</div>
          </div>

          {/* Weather Rules Engine Box */}
          <div className="bg-indigo-950/40 border border-indigo-800/60 p-4 rounded-2xl space-y-2">
            <div className="flex items-center space-x-2 text-indigo-300 font-bold text-xs">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Weather-Aware Thermal Layer Rules</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When ambient temperature drops below 15°C, the rule engine enforces mandatory Outerwear layering (Blazer, Coat, Jacket) and penalizes open footwear. Above 28°C, heavy fabrics (wool, leather) receive a negative bias penalty.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
