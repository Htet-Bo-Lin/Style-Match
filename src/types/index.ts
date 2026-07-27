export type CategoryType = "Top" | "Bottom" | "Outerwear" | "Footwear" | "Dress" | "Accessory";

export type EventType = "Wedding" | "Interview" | "Office" | "Party" | "Festival" | "Date" | "Casual" | "Outing";

export type WeatherType = "Hot" | "Warm" | "Mild" | "Cool" | "Cold" | "Rainy";

export type TimeOfDay = "Morning" | "Afternoon" | "Evening" | "Night";

export interface ClothingItem {
  id: string;
  name: string;
  category: CategoryType;
  color: string;
  colorName: string;
  brand: string;
  fabric: string;
  pattern: string;
  sleeveType: string;
  formalityLevel: number; // 1-10
  season: string[];
  weatherSuitability: WeatherType[];
  occasionTags: EventType[];
  imageUrl: string;
  ratingCount?: number;
  avgScore?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  gender: "Male" | "Female" | "Non-Binary" | "Unspecified";
  age: number;
  preferredStyle: "Casual" | "Formal" | "Streetwear" | "Smart Casual" | "Bohemian" | "Minimalist";
  favoriteColors: string[];
  skinTone?: string;
  bodyType?: string;
}

export interface EventInput {
  eventType: EventType;
  location: string;
  date: string;
  timeOfDay: TimeOfDay;
  weather: WeatherType;
  temperatureC: number;
  dressCode?: string;
}

export interface OutfitCombination {
  id: string;
  title: string;
  items: ClothingItem[];
  score: number; // 0.0 to 1.0 (ANN output probability)
  breakdown: {
    eventFormalityMatch: number;
    weatherTemperatureScore: number;
    colorHarmonyScore: number;
    userStyleAffinity: number;
    feedbackHistoryWeight: number;
  };
  annDetails: {
    inputVector: number[];
    hiddenLayer1: number[];
    hiddenLayer2: number[];
    rawLogit: number;
    finalSigmoidScore: number;
  };
}

export interface FeedbackRecord {
  id: string;
  userId: string;
  outfitId: string;
  action: "like" | "dislike" | "save" | "wear";
  eventType: EventType;
  score: number;
  timestamp: string;
}

export interface DiagramItem {
  id: string;
  title: string;
  category: "Architecture" | "Flow" | "UML" | "Database" | "ML" | "Deployment";
  description: string;
  svgContent?: string;
  mermaidCode?: string;
}

export type TabType = 
  | "app_demo"
  | "ann_engine"
  | "diagrams"
  | "dataset_ml"
  | "color_fashion"
  | "code_base"
  | "math_formulas";
