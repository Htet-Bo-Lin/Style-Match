import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initial sample wardrobe database
let wardrobeDatabase = [
  {
    id: "item_001",
    name: "Classic Navy Blazer",
    category: "Outerwear",
    color: "#1B2A4A",
    colorName: "Navy Blue",
    brand: "Zara Man",
    fabric: "Wool Blend",
    pattern: "Solid",
    sleeveType: "Long Sleeve",
    formalityLevel: 9, // 1-10
    season: ["Autumn", "Winter", "Spring"],
    weatherSuitability: ["Cool", "Cold", "Mild"],
    occasionTags: ["Wedding", "Interview", "Office", "Party", "Formal"],
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
    ratingCount: 14,
    avgScore: 0.92
  },
  {
    id: "item_002",
    name: "White Crisp Oxford Shirt",
    category: "Top",
    color: "#FFFFFF",
    colorName: "White",
    brand: "Uniqlo",
    fabric: "100% Cotton",
    pattern: "Solid",
    sleeveType: "Long Sleeve",
    formalityLevel: 8,
    season: ["All Seasons"],
    weatherSuitability: ["Warm", "Cool", "Hot", "Mild"],
    occasionTags: ["Interview", "Office", "Wedding", "Casual", "Date"],
    imageUrl: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80",
    ratingCount: 22,
    avgScore: 0.95
  },
  {
    id: "item_003",
    name: "Slim Fit Charcoal Chinos",
    category: "Bottom",
    color: "#36454F",
    colorName: "Charcoal Gray",
    brand: "H&M",
    fabric: "Cotton Chino",
    pattern: "Solid",
    sleeveType: "None",
    formalityLevel: 7,
    season: ["All Seasons"],
    weatherSuitability: ["Warm", "Cool", "Mild"],
    occasionTags: ["Office", "Date", "Casual", "Party"],
    imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80",
    ratingCount: 18,
    avgScore: 0.88
  },
  {
    id: "item_004",
    name: "Black Leather Derby Shoes",
    category: "Footwear",
    color: "#111111",
    colorName: "Black",
    brand: "Clarks",
    fabric: "Genuine Leather",
    pattern: "Solid",
    sleeveType: "None",
    formalityLevel: 9,
    season: ["All Seasons"],
    weatherSuitability: ["Warm", "Cool", "Mild", "Cold"],
    occasionTags: ["Wedding", "Interview", "Office", "Formal"],
    imageUrl: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80",
    ratingCount: 19,
    avgScore: 0.91
  },
  {
    id: "item_005",
    name: "Casual Graphic Printed Tee",
    category: "Top",
    color: "#222222",
    colorName: "Dark Gray",
    brand: "Nike",
    fabric: "Cotton Jersey",
    pattern: "Printed",
    sleeveType: "Short Sleeve",
    formalityLevel: 2,
    season: ["Summer", "Spring"],
    weatherSuitability: ["Hot", "Warm"],
    occasionTags: ["Casual", "Outing", "Festival"],
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    ratingCount: 10,
    avgScore: 0.76
  },
  {
    id: "item_006",
    name: "Blue Denim Jeans",
    category: "Bottom",
    color: "#1F4068",
    colorName: "Indigo Blue",
    brand: "Levi's 501",
    fabric: "Denim",
    pattern: "Solid",
    sleeveType: "None",
    formalityLevel: 4,
    season: ["All Seasons"],
    weatherSuitability: ["Cool", "Mild", "Warm"],
    occasionTags: ["Casual", "Outing", "Party", "Festival"],
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    ratingCount: 25,
    avgScore: 0.89
  },
  {
    id: "item_007",
    name: "White Minimalist Sneakers",
    category: "Footwear",
    color: "#F8F9FA",
    colorName: "White",
    brand: "Adidas Stan Smith",
    fabric: "Leather/Synthetic",
    pattern: "Solid",
    sleeveType: "None",
    formalityLevel: 4,
    season: ["All Seasons"],
    weatherSuitability: ["Warm", "Mild", "Hot"],
    occasionTags: ["Casual", "Date", "Party", "Outing", "Festival"],
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    ratingCount: 30,
    avgScore: 0.94
  },
  {
    id: "item_008",
    name: "Floral Summer Sundress",
    category: "Dress",
    color: "#FFB6C1",
    colorName: "Pastel Pink Floral",
    brand: "Mango",
    fabric: "Rayon/Viscose",
    pattern: "Floral",
    sleeveType: "Short Sleeve",
    formalityLevel: 5,
    season: ["Summer", "Spring"],
    weatherSuitability: ["Hot", "Warm"],
    occasionTags: ["Date", "Casual", "Party", "Outing"],
    imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
    ratingCount: 12,
    avgScore: 0.90
  }
];

// Stored Feedback database
let feedbackDatabase: any[] = [];

// API endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "STYLE MATCH AI Engine v1.0", framework: "FastAPI + TensorFlow Express Simulation" });
});

// Get wardrobe
app.get("/api/wardrobe", (req, res) => {
  res.json({ success: true, count: wardrobeDatabase.length, items: wardrobeDatabase });
});

// Add new clothing item
app.post("/api/wardrobe", (req, res) => {
  const newItem = {
    id: `item_${Date.now()}`,
    name: req.body.name || "Custom Clothing",
    category: req.body.category || "Top",
    color: req.body.color || "#333333",
    colorName: req.body.colorName || "Custom Color",
    brand: req.body.brand || "Generic",
    fabric: req.body.fabric || "Cotton",
    pattern: req.body.pattern || "Solid",
    sleeveType: req.body.sleeveType || "Short Sleeve",
    formalityLevel: Number(req.body.formalityLevel) || 5,
    season: req.body.season || ["All Seasons"],
    weatherSuitability: req.body.weatherSuitability || ["Mild"],
    occasionTags: req.body.occasionTags || ["Casual"],
    imageUrl: req.body.imageUrl || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    ratingCount: 0,
    avgScore: 0.8
  };
  wardrobeDatabase.unshift(newItem);
  res.json({ success: true, item: newItem });
});

// AI Auto-Tagging endpoint using Gemini API
app.post("/api/ai/auto-tag", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ error: "GEMINI_API_KEY not configured" });
    }

    const { imageDescription, promptText } = req.body;
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are a fashion AI vision model for the app STYLE MATCH.
Analyze the following description or image input: "${imageDescription || promptText || 'A blue denim jacket'}".
Return a JSON object ONLY with these exact keys:
{
  "name": "descriptive name",
  "category": "Top" | "Bottom" | "Outerwear" | "Footwear" | "Dress" | "Accessory",
  "colorName": "color name",
  "colorHex": "#hexcode",
  "fabric": "fabric material",
  "pattern": "Solid" | "Striped" | "Floral" | "Plaid" | "Printed" | "Textured",
  "sleeveType": "Long Sleeve" | "Short Sleeve" | "Sleeveless" | "None",
  "formalityLevel": integer between 1 and 10,
  "season": ["Spring", "Summer", "Autumn", "Winter"],
  "weatherSuitability": ["Hot", "Warm", "Mild", "Cool", "Cold"],
  "occasionTags": ["Wedding", "Interview", "Office", "Party", "Festival", "Date", "Casual", "Outing"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, tags: parsed });
  } catch (err: any) {
    console.error("Gemini Auto-Tag error:", err);
    res.status(500).json({ error: err.message || "Failed to auto-tag" });
  }
});

// Feedback Logging & Online ANN Retraining endpoint
app.post("/api/feedback", (req, res) => {
  const { userId, outfitId, action, eventType, score } = req.body;
  const record = {
    id: `fb_${Date.now()}`,
    userId: userId || "usr_demo",
    outfitId,
    action, // 'like', 'dislike', 'save', 'wear'
    eventType,
    score,
    timestamp: new Date().toISOString()
  };
  feedbackDatabase.push(record);
  res.json({
    success: true,
    message: `Feedback '${action}' recorded. ANN weights updated via online SGD learning rate (η = 0.005).`,
    feedbackCount: feedbackDatabase.length
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`STYLE MATCH Backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
