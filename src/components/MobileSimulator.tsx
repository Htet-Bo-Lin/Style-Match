import React, { useState } from "react";
import { ClothingItem, EventInput, EventType, OutfitCombination, UserProfile, WeatherType } from "../types";
import { defaultUser, initialWardrobe } from "../data/mockData";
import { recommendTopOutfits } from "../utils/annEngine";
import { 
  Shirt, 
  Sparkles, 
  Plus, 
  Camera, 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle2, 
  Heart, 
  Calendar, 
  Thermometer, 
  Clock, 
  Info, 
  User, 
  Layers, 
  ArrowRight,
  RotateCcw,
  Bot
} from "lucide-react";
import confetti from "canvas-confetti";

export const MobileSimulator: React.FC = () => {
  const [screen, setScreen] = useState<"auth" | "wardrobe" | "event" | "recommendations" | "add_item">("event");
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>(initialWardrobe);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUser);

  // Event Input Form State
  const [eventInput, setEventInput] = useState<EventInput>({
    eventType: "Wedding",
    location: "Grand Ballroom, City Center",
    date: new Date().toISOString().split("T")[0],
    timeOfDay: "Evening",
    weather: "Cool",
    temperatureC: 18,
    dressCode: "Formal Suits & Elegant Dresses"
  });

  // Recommendations State
  const [recommendations, setRecommendations] = useState<OutfitCombination[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);
  const [selectedOutfitDetail, setSelectedOutfitDetail] = useState<OutfitCombination | null>(null);

  // New Item State for Add Item Screen
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState<any>("Top");
  const [newItemColor, setNewItemColor] = useState("#2A4B7C");
  const [newItemColorName, setNewItemColorName] = useState("Royal Blue");
  const [newItemFormality, setNewItemFormality] = useState(7);
  const [newItemImage, setNewItemImage] = useState("https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80");
  const [isAutoTagging, setIsAutoTagging] = useState(false);

  // Run ANN Recommendation
  const handleGenerateRecommendation = () => {
    setIsLoading(true);
    setRecommendations([]);
    setTimeout(() => {
      const top3 = recommendTopOutfits(wardrobe, eventInput, userProfile);
      setRecommendations(top3);
      setIsLoading(false);
      setScreen("recommendations");
    }, 700);
  };

  // Handle Feedback Button Click
  const handleFeedback = (outfitId: string, action: "like" | "dislike" | "wear" | "save") => {
    if (action === "wear" || action === "like" || action === "save") {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }

    // Call backend API in background
    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userProfile.id,
        outfitId,
        action,
        eventType: eventInput.eventType,
        score: 0.95
      })
    }).catch(() => {});

    const actionText = 
      action === "like" ? "Liked! ANN weight reinforced for similar styles." :
      action === "wear" ? "Selected as Outfit of the Day! History saved." :
      action === "save" ? "Saved to Favorites Collection!" : "Feedback recorded. Model weights adjusted.";

    setFeedbackSuccess(actionText);
    setTimeout(() => setFeedbackSuccess(null), 3500);
  };

  // Auto Tag Item using Gemini
  const handleAiAutoTag = async () => {
    setIsAutoTagging(true);
    try {
      const res = await fetch("/api/ai/auto-tag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageDescription: `${newItemName || "Formal Jacket"} in ${newItemColorName}`
        })
      });
      const data = await res.json();
      if (data.tags) {
        setNewItemName(data.tags.name || newItemName);
        setNewItemCategory(data.tags.category || newItemCategory);
        setNewItemFormality(data.tags.formalityLevel || newItemFormality);
        setNewItemColorName(data.tags.colorName || newItemColorName);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAutoTagging(false);
    }
  };

  // Add Item to Wardrobe
  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const item: ClothingItem = {
      id: `item_${Date.now()}`,
      name: newItemName || "Custom Clothing Item",
      category: newItemCategory,
      color: newItemColor,
      colorName: newItemColorName,
      brand: "Personal Wardrobe",
      fabric: "Cotton Blend",
      pattern: "Solid",
      sleeveType: newItemCategory === "Top" ? "Long Sleeve" : "None",
      formalityLevel: Number(newItemFormality),
      season: ["All Seasons"],
      weatherSuitability: [eventInput.weather],
      occasionTags: [eventInput.eventType],
      imageUrl: newItemImage
    };
    setWardrobe([item, ...wardrobe]);
    setScreen("wardrobe");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Control Panel / Information Box */}
      <div className="lg:col-span-5 space-y-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-200">
          <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-sm mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Mobile App Emulator</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            STYLE MATCH Flutter App Preview
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Test the live mobile interface built with Clean Architecture, MVVM & Riverpod. Choose an event, configure weather, and trigger the ANN recommendation engine to see the Top-3 outfits ranked in real time!
          </p>

          {/* Quick Navigation Buttons for Phone Screen */}
          <div className="grid grid-cols-3 gap-2 text-xs font-medium">
            <button
              onClick={() => setScreen("event")}
              className={`p-2.5 rounded-xl border flex items-center justify-center space-x-1.5 transition ${
                screen === "event" ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Event Entry</span>
            </button>
            <button
              onClick={() => setScreen("wardrobe")}
              className={`p-2.5 rounded-xl border flex items-center justify-center space-x-1.5 transition ${
                screen === "wardrobe" ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"
              }`}
            >
              <Shirt className="w-3.5 h-3.5" />
              <span>Wardrobe ({wardrobe.length})</span>
            </button>
            <button
              onClick={() => setScreen("auth")}
              className={`p-2.5 rounded-xl border flex items-center justify-center space-x-1.5 transition ${
                screen === "auth" ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile</span>
            </button>
          </div>
        </div>

        {/* User Profile Summary Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-white flex items-center space-x-2">
              <User className="w-4 h-4 text-indigo-400" />
              <span>Active User Context</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] border border-indigo-500/30 font-mono">
              {userProfile.preferredStyle}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-slate-400">
            <div><span className="text-slate-500">Name:</span> {userProfile.name}</div>
            <div><span className="text-slate-500">Age/Gender:</span> {userProfile.age}, {userProfile.gender}</div>
            <div className="col-span-2">
              <span className="text-slate-500">Favorite Colors:</span>{" "}
              {userProfile.favoriteColors.join(", ")}
            </div>
          </div>
        </div>

        {/* Active Feedback Notification Toast */}
        {feedbackSuccess && (
          <div className="bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 text-xs p-3.5 rounded-xl flex items-center space-x-2.5 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{feedbackSuccess}</span>
          </div>
        )}
      </div>

      {/* Right Column: Realistic iPhone Frame Simulator */}
      <div className="lg:col-span-7 flex justify-center">
        <div className="relative w-[340px] sm:w-[380px] h-[720px] bg-slate-950 rounded-[44px] p-3 shadow-2xl border-[5px] border-slate-800 ring-1 ring-slate-700 flex flex-col overflow-hidden">
          {/* Phone Dynamic Island / Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-800"></div>
          </div>

          {/* Screen Display Container */}
          <div className="w-full h-full bg-slate-900 rounded-[34px] overflow-y-auto flex flex-col pt-8 pb-4 px-4 text-white custom-scrollbar relative">
            
            {/* Screen 1: Event Entry Form */}
            {screen === "event" && (
              <div className="space-y-4 my-auto">
                <div className="text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                    Step 1 of 2 • Event Context
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">What is your occasion?</h3>
                  <p className="text-xs text-slate-400">Select event and weather for AI recommendation</p>
                </div>

                {/* Event Type Grid */}
                <div>
                  <label className="text-[11px] font-medium text-slate-300 block mb-1.5">Event Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["Wedding", "Interview", "Office", "Party", "Festival", "Date", "Casual", "Outing"] as EventType[]).map((e) => (
                      <button
                        key={e}
                        type="button"
                        onClick={() => setEventInput({ ...eventInput, eventType: e })}
                        className={`p-2 rounded-xl text-xs text-left font-medium border transition ${
                          eventInput.eventType === e
                            ? "bg-indigo-600 border-indigo-400 text-white shadow"
                            : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weather Selector */}
                <div>
                  <label className="text-[11px] font-medium text-slate-300 block mb-1.5 flex items-center justify-between">
                    <span>Weather & Temperature</span>
                    <span className="text-indigo-400 font-bold">{eventInput.temperatureC}°C ({eventInput.weather})</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["Hot", "Warm", "Mild", "Cool", "Cold", "Rainy"] as WeatherType[]).map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setEventInput({ ...eventInput, weather: w })}
                        className={`p-1.5 text-[11px] rounded-lg border text-center transition ${
                          eventInput.weather === w
                            ? "bg-indigo-600 border-indigo-400 text-white"
                            : "bg-slate-800/60 border-slate-700/80 text-slate-300"
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    value={eventInput.temperatureC}
                    onChange={(e) => setEventInput({ ...eventInput, temperatureC: Number(e.target.value) })}
                    className="w-full mt-2 accent-indigo-500"
                  />
                </div>

                {/* Time of Day */}
                <div>
                  <label className="text-[11px] font-medium text-slate-300 block mb-1.5">Time of Day</label>
                  <div className="grid grid-cols-4 gap-1">
                    {["Morning", "Afternoon", "Evening", "Night"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setEventInput({ ...eventInput, timeOfDay: t as any })}
                        className={`p-1.5 text-[10px] rounded-lg border text-center transition ${
                          eventInput.timeOfDay === t
                            ? "bg-indigo-600 border-indigo-400 text-white"
                            : "bg-slate-800/60 border-slate-700 text-slate-400"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary CTA Button */}
                <button
                  onClick={handleGenerateRecommendation}
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold text-xs rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2 transition"
                >
                  {isLoading ? (
                    <span>Running ANN Feedforward...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Get Top-3 ANN Recommendations</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Screen 2: Top-3 Recommendations Output */}
            {screen === "recommendations" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span>Top-3 AI Recommendations</span>
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      {eventInput.eventType} • {eventInput.weather} ({eventInput.temperatureC}°C)
                    </p>
                  </div>
                  <button
                    onClick={() => setScreen("event")}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {recommendations.map((outfit, index) => {
                  const matchPct = Math.round(outfit.score * 100);
                  const rankColors = [
                    "from-amber-500 to-orange-500",
                    "from-slate-400 to-slate-500",
                    "from-amber-700 to-amber-800"
                  ];

                  return (
                    <div
                      key={outfit.id}
                      className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3 shadow-md relative overflow-hidden"
                    >
                      {/* Rank Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black text-white bg-gradient-to-r ${rankColors[index] || "from-indigo-500 to-purple-500"}`}>
                            Rank #{index + 1}
                          </span>
                          <span className="text-[11px] font-extrabold text-emerald-400 font-mono">
                            {matchPct}% Match
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedOutfitDetail(outfit)}
                          className="text-[10px] text-indigo-300 underline hover:text-indigo-200"
                        >
                          ANN Vector Break
                        </button>
                      </div>

                      {/* Items Grid Thumbnails */}
                      <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                        {outfit.items.map((item) => (
                          <div key={item.id} className="relative group">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-16 object-cover rounded-xl border border-slate-700/60"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 text-[9px] text-slate-200 px-1 py-0.5 truncate text-center rounded-b-xl">
                              {item.name}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Title & Features */}
                      <div className="text-[11px] font-semibold text-slate-200 truncate mb-2">
                        {outfit.title}
                      </div>

                      {/* Feedback Action Buttons */}
                      <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-700/60">
                        <button
                          onClick={() => handleFeedback(outfit.id, "like")}
                          className="py-1 px-2 rounded-lg bg-slate-700/50 hover:bg-emerald-900/50 text-slate-300 hover:text-emerald-300 text-[10px] font-medium flex items-center justify-center space-x-1 transition"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>Like</span>
                        </button>
                        <button
                          onClick={() => handleFeedback(outfit.id, "wear")}
                          className="py-1 px-2 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center space-x-1 transition"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Wear</span>
                        </button>
                        <button
                          onClick={() => handleFeedback(outfit.id, "save")}
                          className="py-1 px-2 rounded-lg bg-slate-700/50 hover:bg-pink-900/50 text-slate-300 hover:text-pink-300 text-[10px] font-medium flex items-center justify-center space-x-1 transition"
                        >
                          <Heart className="w-3 h-3" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => handleFeedback(outfit.id, "dislike")}
                          className="py-1 px-2 rounded-lg bg-slate-700/50 hover:bg-red-900/50 text-slate-300 hover:text-red-300 text-[10px] font-medium flex items-center justify-center space-x-1 transition"
                        >
                          <ThumbsDown className="w-3 h-3" />
                          <span>Skip</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Screen 3: Wardrobe Items Grid */}
            {screen === "wardrobe" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-bold text-white flex items-center space-x-1">
                    <Shirt className="w-4 h-4 text-indigo-400" />
                    <span>Wardrobe ({wardrobe.length})</span>
                  </h3>
                  <button
                    onClick={() => setScreen("add_item")}
                    className="px-2.5 py-1 bg-indigo-600 text-white rounded-xl text-[10px] font-bold flex items-center space-x-1 hover:bg-indigo-500"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {wardrobe.map((item) => (
                    <div key={item.id} className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-2 flex flex-col">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-24 object-cover rounded-xl mb-1.5" />
                      <div className="text-[11px] font-bold text-white truncate">{item.name}</div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                        <span className="bg-slate-900 px-1.5 py-0.5 rounded text-slate-300">{item.category}</span>
                        <span className="text-amber-400 font-semibold">Formality: {item.formalityLevel}/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Screen 4: Add Wardrobe Item with Gemini Auto-Tag */}
            {screen === "add_item" && (
              <form onSubmit={handleAddItemSubmit} className="space-y-3 my-auto">
                <div className="text-center">
                  <h3 className="text-sm font-bold text-white">Add Clothes to Wardrobe</h3>
                  <p className="text-[10px] text-slate-400">Upload or capture clothes with auto AI tagging</p>
                </div>

                <div>
                  <label className="text-[10px] text-slate-300 block mb-1">Item Title</label>
                  <input
                    type="text"
                    required
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="e.g. Italian Silk Navy Suit"
                    className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-300 block mb-1">Category</label>
                    <select
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value)}
                      className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                    >
                      <option value="Top">Top</option>
                      <option value="Bottom">Bottom</option>
                      <option value="Outerwear">Outerwear</option>
                      <option value="Footwear">Footwear</option>
                      <option value="Dress">Dress</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-300 block mb-1">Formality Level ({newItemFormality})</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={newItemFormality}
                      onChange={(e) => setNewItemFormality(Number(e.target.value))}
                      className="w-full mt-1 accent-indigo-500"
                    />
                  </div>
                </div>

                {/* AI Gemini Auto-Tag Button */}
                <button
                  type="button"
                  onClick={handleAiAutoTag}
                  disabled={isAutoTagging}
                  className="w-full py-2 bg-indigo-900/60 border border-indigo-500/50 hover:bg-indigo-800 text-indigo-200 text-[11px] font-semibold rounded-xl flex items-center justify-center space-x-1.5"
                >
                  <Bot className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{isAutoTagging ? "Analyzing with Gemini AI..." : "Auto-Extract Metadata via Gemini"}</span>
                </button>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Save Wardrobe Item
                </button>
              </form>
            )}

            {/* Screen 5: User Profile Screen */}
            {screen === "auth" && (
              <div className="space-y-3 my-auto">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 mx-auto flex items-center justify-center text-xl font-bold text-white mb-2 shadow-lg">
                    AM
                  </div>
                  <h3 className="text-sm font-bold text-white">{userProfile.name}</h3>
                  <p className="text-[10px] text-slate-400">{userProfile.email}</p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-2.5 space-y-1.5 text-[11px]">
                  <div className="flex justify-between"><span className="text-slate-400">Style Preference:</span> <span className="font-semibold text-indigo-300">{userProfile.preferredStyle}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Gender / Age:</span> <span>{userProfile.gender}, {userProfile.age} yrs</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Wardrobe Count:</span> <span>{wardrobe.length} Items</span></div>
                </div>

                <button
                  onClick={() => setScreen("event")}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl"
                >
                  Back to Event Input
                </button>
              </div>
            )}

          </div>

          {/* Bottom Mobile Frame Navigation Dots */}
          <div className="pt-2 flex justify-center space-x-4 border-t border-slate-900/60 text-slate-500">
            <button onClick={() => setScreen("event")} className={screen === "event" ? "text-indigo-400" : ""}>
              <Calendar className="w-4 h-4" />
            </button>
            <button onClick={() => setScreen("wardrobe")} className={screen === "wardrobe" ? "text-indigo-400" : ""}>
              <Shirt className="w-4 h-4" />
            </button>
            <button onClick={() => setScreen("auth")} className={screen === "auth" ? "text-indigo-400" : ""}>
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Popover: Detailed ANN Feature Vector Breakdown */}
      {selectedOutfitDetail && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-indigo-400 font-bold">
                <Layers className="w-5 h-5" />
                <span>ANN Feature Vector Inspection</span>
              </div>
              <button
                onClick={() => setSelectedOutfitDetail(null)}
                className="text-slate-400 hover:text-white text-sm font-bold px-2 py-1 bg-slate-800 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-2">
              <div className="font-semibold text-white">{selectedOutfitDetail.title}</div>
              <div className="text-emerald-400 font-mono font-bold">
                ANN Output Score: {selectedOutfitDetail.score.toFixed(4)} ({Math.round(selectedOutfitDetail.score * 100)}% Match)
              </div>
            </div>

            {/* Breakdown Subscores */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                <div className="text-slate-400 text-[10px]">Formality Match</div>
                <div className="text-indigo-300 font-bold font-mono">
                  {selectedOutfitDetail.breakdown.eventFormalityMatch * 100}%
                </div>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                <div className="text-slate-400 text-[10px]">Weather Suitability</div>
                <div className="text-indigo-300 font-bold font-mono">
                  {selectedOutfitDetail.breakdown.weatherTemperatureScore * 100}%
                </div>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                <div className="text-slate-400 text-[10px]">Color Harmony</div>
                <div className="text-indigo-300 font-bold font-mono">
                  {selectedOutfitDetail.breakdown.colorHarmonyScore * 100}%
                </div>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                <div className="text-slate-400 text-[10px]">User Style Affinity</div>
                <div className="text-indigo-300 font-bold font-mono">
                  {selectedOutfitDetail.breakdown.userStyleAffinity * 100}%
                </div>
              </div>
            </div>

            {/* Raw Vector Display */}
            <div className="bg-slate-950 p-3 rounded-xl font-mono text-[10px] text-slate-300 border border-slate-800 space-y-1">
              <div className="text-indigo-400 font-semibold">18-Dim Input Vector:</div>
              <div className="break-all text-slate-400">
                [{selectedOutfitDetail.annDetails.inputVector.map(v => v.toFixed(2)).join(", ")}]
              </div>
              <div className="text-indigo-400 font-semibold pt-1">Hidden Layer 1 (ReLU 12 Nodes):</div>
              <div className="break-all text-slate-400">
                [{selectedOutfitDetail.annDetails.hiddenLayer1.join(", ")}]
              </div>
              <div className="text-indigo-400 font-semibold pt-1">Sigmoid Output Logit:</div>
              <div className="text-emerald-400 font-bold">
                z3 = {selectedOutfitDetail.annDetails.rawLogit} ➔ σ(z3) = {selectedOutfitDetail.annDetails.finalSigmoidScore}
              </div>
            </div>

            <button
              onClick={() => setSelectedOutfitDetail(null)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
            >
              Close Vector Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
