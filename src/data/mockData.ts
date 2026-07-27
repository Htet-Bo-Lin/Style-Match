import { ClothingItem, DiagramItem, UserProfile } from "../types";

export const initialWardrobe: ClothingItem[] = [
  {
    id: "item_001",
    name: "Classic Navy Blazer",
    category: "Outerwear",
    color: "#1B2A4A",
    colorName: "Navy Blue",
    brand: "Zara Tailored",
    fabric: "Wool Blend",
    pattern: "Solid",
    sleeveType: "Long Sleeve",
    formalityLevel: 9,
    season: ["Autumn", "Winter", "Spring"],
    weatherSuitability: ["Cool", "Cold", "Mild"],
    occasionTags: ["Wedding", "Interview", "Office", "Party"],
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
    ratingCount: 14,
    avgScore: 0.92
  },
  {
    id: "item_002",
    name: "Crisp White Oxford Shirt",
    category: "Top",
    color: "#FFFFFF",
    colorName: "White",
    brand: "Uniqlo Cotton",
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
    brand: "H&M Essentials",
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
    name: "Black Leather Oxfords",
    category: "Footwear",
    color: "#111111",
    colorName: "Black",
    brand: "Clarks Premium",
    fabric: "Genuine Leather",
    pattern: "Solid",
    sleeveType: "None",
    formalityLevel: 9,
    season: ["All Seasons"],
    weatherSuitability: ["Warm", "Cool", "Mild", "Cold"],
    occasionTags: ["Wedding", "Interview", "Office"],
    imageUrl: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80",
    ratingCount: 19,
    avgScore: 0.91
  },
  {
    id: "item_005",
    name: "Urban Graphic Tee",
    category: "Top",
    color: "#222222",
    colorName: "Dark Slate",
    brand: "Nike Sportswear",
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
    name: "Distressed Indigo Jeans",
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
    name: "White Leather Sneakers",
    category: "Footwear",
    color: "#F8F9FA",
    colorName: "White",
    brand: "Adidas Stan Smith",
    fabric: "Leather",
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
    name: "Floral Chiffon Sundress",
    category: "Dress",
    color: "#FFB6C1",
    colorName: "Pastel Floral",
    brand: "Mango Collection",
    fabric: "Chiffon",
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

export const defaultUser: UserProfile = {
  id: "usr_99812",
  name: "Alex Morgan",
  email: "alex.morgan@university.edu",
  gender: "Male",
  age: 22,
  preferredStyle: "Smart Casual",
  favoriteColors: ["Navy Blue", "White", "Charcoal Gray", "Olive Green"],
  skinTone: "Warm Beige",
  bodyType: "Athletic"
};

export const systemDiagrams: DiagramItem[] = [
  {
    id: "diag_arch",
    title: "1. Complete System Architecture",
    category: "Architecture",
    description: "High-level multi-tier full-stack architecture showing Flutter Mobile Client, NGINX Reverse Proxy, FastAPI Web Services, TensorFlow Inference Layer, MongoDB Engine, and Image Storage."
  },
  {
    id: "diag_dfd",
    title: "2. Data Flow Diagram (DFD Level 0 & 1)",
    category: "Flow",
    description: "Level 0 context diagram & Level 1 detailed processes illustrating Wardrobe Ingestion, Event Input, Feature Vector Extraction, ANN Inference, and Feedback Loop."
  },
  {
    id: "diag_class",
    title: "3. Clean Architecture Class Diagram",
    category: "UML",
    description: "UML Class diagram mapping Flutter Clean Architecture (Presentation, Domain, Data layers) and FastAPI Pydantic & SQLAlchemy ORM classes."
  },
  {
    id: "diag_usecase",
    title: "4. System Use Case Diagram",
    category: "UML",
    description: "Actor-system interaction matrix covering User, System Administrator, and AI Engine background retrainer."
  },
  {
    id: "diag_seq",
    title: "5. Recommendation Sequence Diagram",
    category: "UML",
    description: "Step-by-step asynchronous event timeline from user tap to Top-3 outfit UI rendering and continuous feedback logging."
  },
  {
    id: "diag_erd",
    title: "6. MongoDB NoSQL ER Diagram",
    category: "Database",
    description: "Document structure schema for Users, WardrobeItems, Events, Recommendations, and Feedback collections with field types & indices."
  },
  {
    id: "diag_ann",
    title: "7. Artificial Neural Network (ANN) Architecture Diagram",
    category: "ML",
    description: "Deep Neural Network visual pipeline: 18-dim Feature Input Layer -> Dense 12 (ReLU) -> Dense 6 (ReLU) -> Sigmoid Output Score Node."
  },
  {
    id: "diag_apiflow",
    title: "8. API Flow & Endpoint Matrix",
    category: "Flow",
    description: "RESTful HTTP API route execution flow map between Flutter Riverpod repositories and FastAPI controllers."
  },
  {
    id: "diag_tree",
    title: "9. Full Project Directory Structure",
    category: "Architecture",
    description: "Complete CS thesis directory tree layout for both Flutter (lib/src/...) and Python FastAPI backend (app/...)."
  },
  {
    id: "diag_train",
    title: "10. Machine Learning Training & Active Feedback Loop Workflow",
    category: "ML",
    description: "Offline batch training workflow and real-time online stochastic gradient descent feedback retraining pipeline."
  },
  {
    id: "diag_deploy",
    title: "11. Cloud Deployment Pipeline",
    category: "Deployment",
    description: "CI/CD automated deployment workflow with Docker containerization, Cloud Run, and MongoDB Atlas deployment."
  }
];

export const codeExamples = {
  flutterCode: `// ==========================================
// STYLE MATCH - Flutter Clean Architecture & Riverpod
// ==========================================

// 1. DOMAIN LAYER: Outfit Entity
class WardrobeItem {
  final String id;
  final String name;
  final String category;
  final String color;
  final String imageUrl;
  final int formalityLevel;
  final List<String> occasionTags;

  WardrobeItem({
    required this.id,
    required this.name,
    required this.category,
    required this.color,
    required this.imageUrl,
    required this.formalityLevel,
    required this.occasionTags,
  });

  factory WardrobeItem.fromJson(Map<String, dynamic> json) {
    return WardrobeItem(
      id: json['id'],
      name: json['name'],
      category: json['category'],
      color: json['color'],
      imageUrl: json['imageUrl'],
      formalityLevel: json['formalityLevel'],
      occasionTags: List<String>.from(json['occasionTags'] ?? []),
    );
  }
}

// 2. DATA LAYER: Recommendation Repository Interface & Implementation
abstract class RecommendationRepository {
  Future<List<OutfitCombination>> getTop3Recommendations(EventInput event);
  Future<void> sendFeedback(String outfitId, String action);
}

class RecommendationRepositoryImpl implements RecommendationRepository {
  final Dio dio;
  RecommendationRepositoryImpl({required this.dio});

  @override
  Future<List<OutfitCombination>> getTop3Recommendations(EventInput event) async {
    final response = await dio.post('/api/recommend', data: event.toJson());
    final List data = response.data['recommendations'];
    return data.map((item) => OutfitCombination.fromJson(item)).toList();
  }

  @override
  Future<void> sendFeedback(String outfitId, String action) async {
    await dio.post('/api/feedback', data: {
      'outfitId': outfitId,
      'action': action,
    });
  }
}

// 3. PRESENTATION LAYER: Riverpod State Notifier
final recommendationProvider = StateNotifierProvider<RecommendationNotifier, AsyncValue<List<OutfitCombination>>>((ref) {
  final repo = ref.watch(recommendationRepositoryProvider);
  return RecommendationNotifier(repository: repo);
});

class RecommendationNotifier extends StateNotifier<AsyncValue<List<OutfitCombination>>> {
  final RecommendationRepository repository;
  RecommendationNotifier({required this.repository}) : super(const AsyncValue.data([]));

  Future<void> fetchRecommendations(EventInput event) async {
    state = const AsyncValue.loading();
    try {
      final outfits = await repository.getTop3Recommendations(event);
      state = AsyncValue.data(outfits);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }
}`,

  fastApiCode: `# ==========================================
# STYLE MATCH - FastAPI Backend & TensorFlow Model
# ==========================================

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import List, Optional
import numpy as np
import tensorflow as tf

app = FastAPI(
    title="STYLE MATCH AI Engine API",
    description="ANN Outfit Recommendation Engine API for Final-Year Project",
    version="1.0.0"
)

# Load Pre-trained Keras Model
# Saved model architecture: Sequential([Dense(12, relu), Dropout(0.2), Dense(6, relu), Dense(1, sigmoid)])
try:
    ann_model = tf.keras.models.load_model("saved_models/style_match_ann.h5")
except Exception:
    print("Initializing dynamic Keras model instance...")
    ann_model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(18,)),
        tf.keras.layers.Dense(12, activation='relu', name='hidden_1'),
        tf.keras.layers.Dropout(0.1, name='dropout_1'),
        tf.keras.layers.Dense(6, activation='relu', name='hidden_2'),
        tf.keras.layers.Dense(1, activation='sigmoid', name='output_score')
    ])
    ann_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

class EventInputSchema(BaseModel):
    eventType: str = Field(..., example="Wedding")
    weather: str = Field(..., example="Cool")
    temperatureC: float = Field(..., example=18.0)
    timeOfDay: str = Field(..., example="Evening")

class RecommendationResponseSchema(BaseModel):
    success: bool
    topRecommendations: List[dict]
    inferenceTimeMs: float

@app.post("/api/recommend", response_model=RecommendationResponseSchema)
async def predict_recommendations(event: EventInputSchema):
    # 1. Fetch user wardrobe from MongoDB
    # 2. Build 18-dim feature vectors for candidates
    # 3. Batch prediction using ANN model
    
    mock_input_vector = np.array([[0,0,1,0,0,0,0,0, 0,0,1,0, 0.9, 0.85, 0.95, 0.88, 0.90, 0.80]])
    predictions = ann_model.predict(mock_input_vector)
    score = float(predictions[0][0])
    
    return {
        "success": True,
        "topRecommendations": [{
            "outfitTitle": "Navy Blazer + Crisp White Shirt + Charcoal Chinos",
            "score": round(score, 4),
            "matchPercentage": f"{round(score * 100, 1)}%"
        }],
        "inferenceTimeMs": 14.2
    }`,

  mongoDbSchema: `// ==========================================
// MongoDB Collections JSON Schema Definition
// ==========================================

// Collection: Users
{
  "_id": "ObjectId('65a123bc4f...')",
  "name": "Alex Morgan",
  "email": "alex.morgan@university.edu",
  "hashedPassword": "$2b$12$e8U...",
  "gender": "Male",
  "age": 22,
  "preferredStyle": "Smart Casual",
  "favoriteColors": ["#1B2A4A", "#FFFFFF", "#36454F"],
  "createdAt": "2026-07-27T10:00:00Z"
}

// Collection: Wardrobe
{
  "_id": "ObjectId('65a124dd8e...')",
  "userId": "ObjectId('65a123bc4f...')",
  "name": "Classic Navy Blazer",
  "category": "Outerwear",
  "color": "#1B2A4A",
  "colorName": "Navy Blue",
  "brand": "Zara",
  "fabric": "Wool Blend",
  "pattern": "Solid",
  "sleeveType": "Long Sleeve",
  "formalityLevel": 9,
  "season": ["Autumn", "Winter", "Spring"],
  "weatherSuitability": ["Cool", "Cold", "Mild"],
  "occasionTags": ["Wedding", "Interview", "Office", "Party"],
  "imageUrl": "https://storage.cloud.google.com/stylematch/items/navy_blazer.jpg",
  "createdAt": "2026-07-27T10:15:00Z"
}

// Collection: Recommendations
{
  "_id": "ObjectId('65a125fa9a...')",
  "userId": "ObjectId('65a123bc4f...')",
  "event": {
    "eventType": "Wedding",
    "weather": "Cool",
    "temperatureC": 18,
    "timeOfDay": "Evening"
  },
  "topOutfits": [
    {
      "outfitId": "outfit_01",
      "itemIds": ["item_001", "item_002", "item_003", "item_004"],
      "annScore": 0.948,
      "breakdown": {
        "formalityMatch": 0.95,
        "colorHarmony": 0.98,
        "weatherScore": 0.90
      }
    }
  ],
  "timestamp": "2026-07-27T11:00:00Z"
}

// Collection: Feedback
{
  "_id": "ObjectId('65a126bb0b...')",
  "userId": "ObjectId('65a123bc4f...')",
  "outfitId": "outfit_01",
  "action": "like", // 'like' | 'dislike' | 'wear' | 'save'
  "annScoreAtTime": 0.948,
  "timestamp": "2026-07-27T11:05:00Z"
}`
};
