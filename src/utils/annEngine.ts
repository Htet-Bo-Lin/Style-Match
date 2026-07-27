import { ClothingItem, EventInput, EventType, OutfitCombination, UserProfile, WeatherType } from "../types";

// Helper to convert hex color to HSL
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c.split("").map(x => x + x).join("");
  }
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// Calculate Color Harmony between items
export function calculateColorHarmony(items: ClothingItem[]): { score: number; scheme: string; explanation: string } {
  if (items.length <= 1) return { score: 0.9, scheme: "Monochromatic", explanation: "Single item tone baseline." };

  const hsls = items.map(i => hexToHsl(i.color || "#000000"));
  const hues = hsls.map(i => i.h);

  // Neutral color check (black, white, gray, navy, khaki usually go with anything)
  const isNeutral = (hsl: { s: number; l: number }) => hsl.s < 15 || hsl.l < 15 || hsl.l > 85;
  const nonNeutrals = hsls.filter(i => !isNeutral(i));

  if (nonNeutrals.length <= 1) {
    return {
      score: 0.96,
      scheme: "Neutral Versatile",
      explanation: "Classic timeless combination of neutral foundational colors."
    };
  }

  // Calculate hue difference between non-neutral items
  const h1 = nonNeutrals[0].h;
  const h2 = nonNeutrals[1].h;
  let diff = Math.abs(h1 - h2);
  if (diff > 180) diff = 360 - diff;

  if (diff <= 30) {
    return {
      score: 0.92,
      scheme: "Analogous",
      explanation: "Harmonious neighboring colors on the color wheel creating a cohesive palette."
    };
  } else if (Math.abs(diff - 180) <= 30) {
    return {
      score: 0.98,
      scheme: "Complementary High Contrast",
      explanation: "Vibrant high-contrast dynamic pairing across opposite ends of the color wheel."
    };
  } else if (Math.abs(diff - 120) <= 30) {
    return {
      score: 0.94,
      scheme: "Triadic Balance",
      explanation: "Balanced 120-degree distribution delivering energetic visual harmony."
    };
  } else {
    return {
      score: 0.78,
      scheme: "Complex Accent",
      explanation: "Eclectic custom color arrangement with high contrast."
    };
  }
}

// Event Formality Target Mapping (1-10)
export const EVENT_FORMALITY_MAP: Record<EventType, number> = {
  Wedding: 9,
  Interview: 9,
  Office: 7,
  Party: 6,
  Date: 6,
  Festival: 3,
  Casual: 2,
  Outing: 3
};

// Weather suitability rating
export function getWeatherScore(weather: WeatherType, items: ClothingItem[], tempC: number): number {
  let scoreSum = 0;
  items.forEach(item => {
    if (item.weatherSuitability.includes(weather)) {
      scoreSum += 1.0;
    } else {
      scoreSum += 0.5;
    }
  });
  let baseScore = scoreSum / items.length;

  // Temperature logic
  const hasOuterwear = items.some(i => i.category === "Outerwear");
  if (tempC < 15 && !hasOuterwear) {
    baseScore *= 0.6; // Penalty for missing warm layer in cold
  } else if (tempC > 28 && hasOuterwear) {
    baseScore *= 0.5; // Penalty for heavy outerwear in heat
  }

  return Math.min(1.0, Math.max(0.1, baseScore));
}

// One-Hot Encoders
export function encodeEventType(event: EventType): number[] {
  const events: EventType[] = ["Wedding", "Interview", "Office", "Party", "Festival", "Date", "Casual", "Outing"];
  return events.map(e => (e === event ? 1 : 0));
}

export function encodeTimeOfDay(time: string): number[] {
  const times = ["Morning", "Afternoon", "Evening", "Night"];
  return times.map(t => (t === time ? 1 : 0));
}

// ANN Model Simulation Weights Matrix
let W1: number[][] = [];
let b1: number[] = [];
let W2: number[][] = [];
let b2: number[] = [];
let W3: number[][] = [];
let b3: number[] = [];

// Initialize deterministic weight matrix for reproducible academic demonstration
function initializeWeights() {
  if (W1.length > 0) return;

  // Input dim = 18, Hidden1 = 12
  for (let i = 0; i < 18; i++) {
    const row: number[] = [];
    for (let j = 0; j < 12; j++) {
      row.push(((i * 7 + j * 13) % 21 - 10) / 20.0);
    }
    W1.push(row);
  }
  b1 = new Array(12).fill(0.05);

  // Hidden1 = 12, Hidden2 = 6
  for (let i = 0; i < 12; i++) {
    const row: number[] = [];
    for (let j = 0; j < 6; j++) {
      row.push(((i * 3 + j * 11) % 17 - 8) / 15.0);
    }
    W2.push(row);
  }
  b2 = new Array(6).fill(0.02);

  // Hidden2 = 6, Output = 1
  for (let i = 0; i < 6; i++) {
    W3.push([0.35 + i * 0.08]);
  }
  b3 = [-0.1];
}

initializeWeights();

// Activation functions
export function relu(x: number): number {
  return Math.max(0, x);
}

export function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-Math.max(-15, Math.min(15, x))));
}

// Forward Propagation Engine
export function runANNForwardPass(inputVector: number[]): {
  hidden1: number[];
  hidden2: number[];
  rawLogit: number;
  score: number;
} {
  initializeWeights();

  // Hidden Layer 1 (18 -> 12)
  const h1Raw: number[] = [];
  const h1Activated: number[] = [];
  for (let j = 0; j < 12; j++) {
    let sum = b1[j];
    for (let i = 0; i < inputVector.length; i++) {
      sum += inputVector[i] * W1[i][j];
    }
    h1Raw.push(sum);
    h1Activated.push(relu(sum));
  }

  // Hidden Layer 2 (12 -> 6)
  const h2Raw: number[] = [];
  const h2Activated: number[] = [];
  for (let j = 0; j < 6; j++) {
    let sum = b2[j];
    for (let i = 0; i < h1Activated.length; i++) {
      sum += h1Activated[i] * W2[i][j];
    }
    h2Raw.push(sum);
    h2Activated.push(relu(sum));
  }

  // Output Layer (6 -> 1)
  let rawLogit = b3[0];
  for (let i = 0; i < h2Activated.length; i++) {
    rawLogit += h2Activated[i] * W3[i][0];
  }

  const score = sigmoid(rawLogit);

  return {
    hidden1: h1Activated,
    hidden2: h2Activated,
    rawLogit,
    score
  };
}

// Online Stochastic Gradient Descent Weight Update (Feedback Learning)
export function applyFeedbackLearning(inputVector: number[], targetScore: number, learningRate = 0.02) {
  initializeWeights();
  const forward = runANNForwardPass(inputVector);
  const prediction = forward.score;
  const error = prediction - targetScore; // gradient of BCE with Sigmoid

  // Update output layer weights W3 & b3
  for (let i = 0; i < 6; i++) {
    const grad = error * forward.hidden2[i];
    W3[i][0] -= learningRate * grad;
  }
  b3[0] -= learningRate * error;
}

// Build combinations from items
export function generateOutfitCombinations(wardrobe: ClothingItem[]): ClothingItem[][] {
  const tops = wardrobe.filter(i => i.category === "Top" || i.category === "Dress");
  const bottoms = wardrobe.filter(i => i.category === "Bottom");
  const outerwears = wardrobe.filter(i => i.category === "Outerwear");
  const footwears = wardrobe.filter(i => i.category === "Footwear");

  const combinations: ClothingItem[][] = [];

  // Dresses standalone or with outerwear/shoes
  tops.filter(t => t.category === "Dress").forEach(dress => {
    const shoes = footwears.length > 0 ? footwears : [undefined];
    shoes.forEach(shoe => {
      const combo = [dress];
      if (shoe) combo.push(shoe);
      combinations.push(combo);

      outerwears.forEach(outer => {
        const comboWithOuter = [dress, outer];
        if (shoe) comboWithOuter.push(shoe);
        combinations.push(comboWithOuter);
      });
    });
  });

  // Top + Bottom
  tops.filter(t => t.category === "Top").forEach(top => {
    bottoms.forEach(bottom => {
      const shoes = footwears.length > 0 ? footwears : [undefined];
      shoes.forEach(shoe => {
        const baseCombo = [top, bottom];
        if (shoe) baseCombo.push(shoe);
        combinations.push(baseCombo);

        outerwears.forEach(outer => {
          const comboWithOuter = [top, bottom, outer];
          if (shoe) comboWithOuter.push(shoe);
          combinations.push(comboWithOuter);
        });
      });
    });
  });

  if (combinations.length === 0 && wardrobe.length > 0) {
    combinations.push(wardrobe.slice(0, 3));
  }

  return combinations;
}

// Main Recommendation Pipeline
export function recommendTopOutfits(
  wardrobe: ClothingItem[],
  event: EventInput,
  user: UserProfile
): OutfitCombination[] {
  const combinations = generateOutfitCombinations(wardrobe);

  const targetFormality = EVENT_FORMALITY_MAP[event.eventType] || 5;

  const scoredOutfits: OutfitCombination[] = combinations.map((items, idx) => {
    // Calculate component feature scores
    const avgItemFormality = items.reduce((acc, i) => acc + i.formalityLevel, 0) / items.length;
    const formalityDiff = Math.abs(avgItemFormality - targetFormality);
    const eventFormalityMatch = Math.max(0.1, 1 - formalityDiff / 10);

    const weatherTempScore = getWeatherScore(event.weather, items, event.temperatureC);

    const colorHarmony = calculateColorHarmony(items);
    const colorHarmonyScore = colorHarmony.score;

    // User style affinity
    const styleMatchCount = items.filter(i => i.occasionTags.includes(event.eventType)).length;
    const userStyleAffinity = Math.min(1.0, 0.4 + (styleMatchCount / items.length) * 0.6);

    const feedbackHistoryWeight = 0.85; // Simulated baseline

    // Construct 18-Dimensional ANN Input Vector:
    // [0-7]: Event One-Hot (8)
    // [8-11]: TimeOfDay One-Hot (4)
    // [12]: Event Formality Match (0-1)
    // [13]: Weather Temp Score (0-1)
    // [14]: Color Harmony Score (0-1)
    // [15]: User Style Affinity (0-1)
    // [16]: Feedback Weight (0-1)
    // [17]: Average Outfit Formality (0-1 normalized)
    const eventVector = encodeEventType(event.eventType);
    const timeVector = encodeTimeOfDay(event.timeOfDay);

    const inputVector = [
      ...eventVector,
      ...timeVector,
      eventFormalityMatch,
      weatherTempScore,
      colorHarmonyScore,
      userStyleAffinity,
      feedbackHistoryWeight,
      avgItemFormality / 10.0
    ];

    // Pass through Artificial Neural Network
    const annResult = runANNForwardPass(inputVector);

    const outfitTitle = items.map(i => i.name).join(" + ");

    return {
      id: `outfit_${idx + 1}_${Date.now()}`,
      title: outfitTitle,
      items,
      score: annResult.score,
      breakdown: {
        eventFormalityMatch: Number(eventFormalityMatch.toFixed(2)),
        weatherTemperatureScore: Number(weatherTempScore.toFixed(2)),
        colorHarmonyScore: Number(colorHarmonyScore.toFixed(2)),
        userStyleAffinity: Number(userStyleAffinity.toFixed(2)),
        feedbackHistoryWeight: Number(feedbackHistoryWeight.toFixed(2))
      },
      annDetails: {
        inputVector,
        hiddenLayer1: annResult.hidden1.map(v => Number(v.toFixed(3))),
        hiddenLayer2: annResult.hidden2.map(v => Number(v.toFixed(3))),
        rawLogit: Number(annResult.rawLogit.toFixed(3)),
        finalSigmoidScore: Number(annResult.score.toFixed(4))
      }
    };
  });

  // Sort descending by ANN Recommendation Score
  scoredOutfits.sort((a, b) => b.score - a.score);

  // Return Top-3 or all if < 3
  return scoredOutfits.slice(0, 3);
}

// Generate Synthetic Dataset for ML Training
export function generateSyntheticDataset(count = 100) {
  const eventTypes: EventType[] = ["Wedding", "Interview", "Office", "Party", "Festival", "Date", "Casual", "Outing"];
  const weathers: WeatherType[] = ["Hot", "Warm", "Mild", "Cool", "Cold", "Rainy"];
  const times = ["Morning", "Afternoon", "Evening", "Night"];

  const dataset: any[] = [];

  for (let i = 1; i <= count; i++) {
    const evt = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const wth = weathers[Math.floor(Math.random() * weathers.length)];
    const time = times[Math.floor(Math.random() * times.length)];
    const temp = Math.floor(Math.random() * 30) + 5; // 5C to 35C

    const formalityMatch = Math.random() * 0.8 + 0.2;
    const weatherScore = Math.random() * 0.8 + 0.2;
    const colorScore = Math.random() * 0.7 + 0.3;
    const userAffinity = Math.random() * 0.9 + 0.1;

    // Linear combination + noise for ground truth label
    const groundTruthScore = 0.35 * formalityMatch + 0.25 * weatherScore + 0.20 * colorScore + 0.20 * userAffinity;
    const binaryLabel = groundTruthScore > 0.62 ? 1 : 0;

    dataset.push({
      sample_id: `SMP_${1000 + i}`,
      event_type: evt,
      weather: wth,
      time_of_day: time,
      temperature_c: temp,
      formality_match: Number(formalityMatch.toFixed(2)),
      weather_score: Number(weatherScore.toFixed(2)),
      color_harmony: Number(colorScore.toFixed(2)),
      user_affinity: Number(userAffinity.toFixed(2)),
      ground_truth_score: Number(groundTruthScore.toFixed(3)),
      label: binaryLabel
    });
  }

  return dataset;
}
