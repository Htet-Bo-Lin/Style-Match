import React, { useState } from "react";
import { systemDiagrams } from "../data/mockData";
import { DiagramItem } from "../types";
import { GitFork, Layers, ZoomIn, ZoomOut, Maximize2, FileCode, Check } from "lucide-react";

export const DiagramViewer: React.FC = () => {
  const [activeDiagramId, setActiveDiagramId] = useState<string>(systemDiagrams[0].id);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const selectedDiagram = systemDiagrams.find(d => d.id === activeDiagramId) || systemDiagrams[0];

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-200 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <GitFork className="w-4 h-4" />
              <span>Interactive CS Defense Diagrams</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              System Diagrams & Software Architecture Suite (11 Diagrams)
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl mt-1">
              Comprehensive architectural & UML diagrams designed for computer science thesis evaluation. Includes System Architecture, DFD Level 0/1, Clean Architecture Class Diagram, Sequence Diagram, MongoDB ERD, and ANN Pipeline.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.15))}
              className="p-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-xl text-slate-300"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-400 w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(1.5, prev + 0.15))}
              className="p-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-xl text-slate-300"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowCode(!showCode)}
              className={`px-3 py-2 border rounded-xl text-xs font-medium flex items-center space-x-1.5 transition ${
                showCode ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>{showCode ? "Show Visual" : "Show Mermaid Spec"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: List of 11 System Diagrams */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
            System Diagrams Directory
          </div>
          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
            {systemDiagrams.map((diag) => {
              const isActive = diag.id === activeDiagramId;
              return (
                <button
                  key={diag.id}
                  onClick={() => setActiveDiagramId(diag.id)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all text-xs ${
                    isActive
                      ? "bg-indigo-600/20 border-indigo-500/80 text-white font-semibold shadow-md"
                      : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-100">{diag.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-indigo-300 font-mono border border-slate-700/50">
                      {diag.category}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{diag.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Visual Diagram Render & Explanation Box */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 text-slate-200">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>{selectedDiagram.title}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">{selectedDiagram.description}</p>
          </div>

          {/* Render Visual Representation or Mermaid Specification */}
          {!showCode ? (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 overflow-x-auto min-h-[420px] flex items-center justify-center">
              <div
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
                className="transition-transform duration-200 w-full"
              >
                {/* Visual Custom Diagram Renderer per diagram type */}
                {selectedDiagram.id === "diag_arch" && <VisualArchitectureDiagram />}
                {selectedDiagram.id === "diag_dfd" && <VisualDFDDiagram />}
                {selectedDiagram.id === "diag_class" && <VisualClassDiagram />}
                {selectedDiagram.id === "diag_usecase" && <VisualUseCaseDiagram />}
                {selectedDiagram.id === "diag_seq" && <VisualSequenceDiagram />}
                {selectedDiagram.id === "diag_erd" && <VisualERDDiagram />}
                {selectedDiagram.id === "diag_ann" && <VisualANNPipelineDiagram />}
                {selectedDiagram.id === "diag_apiflow" && <VisualAPIFlowDiagram />}
                {selectedDiagram.id === "diag_tree" && <VisualDirectoryTreeDiagram />}
                {selectedDiagram.id === "diag_train" && <VisualTrainingWorkflowDiagram />}
                {selectedDiagram.id === "diag_deploy" && <VisualDeploymentDiagram />}
              </div>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => handleCopyCode(getMermaidCode(selectedDiagram.id))}
                className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg flex items-center space-x-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileCode className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Mermaid Spec"}</span>
              </button>
              <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto max-h-[420px]">
                {getMermaidCode(selectedDiagram.id)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// Visual Diagram Components (Clean SVG / Card Renderers)
// =========================================================================

function VisualArchitectureDiagram() {
  return (
    <div className="space-y-4 text-xs font-mono">
      <div className="text-center font-bold text-indigo-400 uppercase tracking-widest text-sm mb-2">
        STYLE MATCH - Multi-Tier System Architecture
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
        {/* Tier 1: Client */}
        <div className="bg-indigo-950/80 border-2 border-indigo-500/80 p-3 rounded-2xl space-y-1.5">
          <div className="font-bold text-indigo-300">Presentation Layer</div>
          <div className="bg-slate-900 p-2 rounded-xl border border-indigo-800 text-[11px] text-white">
            Flutter Mobile App (iOS / Android)
          </div>
          <div className="text-[10px] text-indigo-200">Riverpod + Clean Arch + Dio HTTP</div>
        </div>

        {/* Tier 2: Ingress Gateway */}
        <div className="bg-slate-900 border-2 border-slate-700 p-3 rounded-2xl space-y-1.5">
          <div className="font-bold text-slate-300">API Gateway</div>
          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-[11px] text-white">
            NGINX Reverse Proxy
          </div>
          <div className="text-[10px] text-slate-400">SSL Termination • CORS • Rate Limit</div>
        </div>

        {/* Tier 3: FastAPI Backend */}
        <div className="bg-purple-950/80 border-2 border-purple-500/80 p-3 rounded-2xl space-y-1.5">
          <div className="font-bold text-purple-300">Application Server</div>
          <div className="bg-slate-900 p-2 rounded-xl border border-purple-800 text-[11px] text-white">
            FastAPI Python Services
          </div>
          <div className="text-[10px] text-purple-200">Uvicorn Async ASGI • Pydantic</div>
        </div>

        {/* Tier 4: TensorFlow ANN Engine */}
        <div className="bg-emerald-950/80 border-2 border-emerald-500/80 p-3 rounded-2xl space-y-1.5">
          <div className="font-bold text-emerald-300">AI Inference Layer</div>
          <div className="bg-slate-900 p-2 rounded-xl border border-emerald-800 text-[11px] text-white">
            TensorFlow / Keras ANN
          </div>
          <div className="text-[10px] text-emerald-200">18-12-6-1 Dense Net • Online SGD</div>
        </div>
      </div>

      {/* Database & Cloud Layer */}
      <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl text-center space-y-2">
        <div className="text-slate-400 font-bold">Persistence & Storage Layer</div>
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-amber-300">
            MongoDB Atlas (NoSQL DB)
          </div>
          <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-cyan-300">
            Google Cloud Storage (Images)
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualDFDDiagram() {
  return (
    <div className="space-y-4 text-xs font-mono text-slate-200">
      <div className="text-center font-bold text-indigo-400 uppercase tracking-widest text-sm">
        Data Flow Diagram (DFD Level 0 & Level 1)
      </div>

      {/* DFD Level 0 */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
        <div className="font-bold text-slate-300">DFD Level 0 (Context Diagram)</div>
        <div className="flex items-center justify-between gap-2 text-center text-[11px]">
          <div className="bg-indigo-900/60 p-3 rounded-xl border border-indigo-700">
            [User Entity]
          </div>
          <div className="text-indigo-400 text-xs">➔ Event Context & Wardrobe ➔</div>
          <div className="bg-purple-900/80 p-4 rounded-full border-2 border-purple-500 font-bold text-white">
            0.0 STYLE MATCH System
          </div>
          <div className="text-emerald-400 text-xs">➔ Top-3 Outfits & Feedback ➔</div>
          <div className="bg-indigo-900/60 p-3 rounded-xl border border-indigo-700">
            [User Entity]
          </div>
        </div>
      </div>

      {/* DFD Level 1 */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
        <div className="font-bold text-slate-300">DFD Level 1 (Detailed Sub-processes)</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-[10px]">
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            1.0 Wardrobe Ingestion
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            2.0 Feature Encoder (18-Dim)
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            3.0 ANN Score Prediction
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            4.0 Feedback SGD Updater
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualClassDiagram() {
  return (
    <div className="space-y-3 text-xs font-mono text-slate-200">
      <div className="text-center font-bold text-indigo-400 uppercase tracking-widest text-sm">
        Flutter Clean Architecture UML Class Diagram
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-slate-900 p-3 rounded-2xl border border-indigo-800 space-y-1">
          <div className="font-bold text-indigo-300 border-b border-indigo-900 pb-1">Domain Layer</div>
          <div className="text-[10px] text-slate-300">class WardrobeItem</div>
          <div className="text-[10px] text-slate-300">class EventInput</div>
          <div className="text-[10px] text-slate-300">class OutfitCombination</div>
          <div className="text-[10px] text-indigo-400 font-semibold pt-1">abstract class RecommendationRepository</div>
        </div>

        <div className="bg-slate-900 p-3 rounded-2xl border border-purple-800 space-y-1">
          <div className="font-bold text-purple-300 border-b border-purple-900 pb-1">Data Layer</div>
          <div className="text-[10px] text-slate-300">class RecommendationRepositoryImpl</div>
          <div className="text-[10px] text-slate-300">class DioHttpClient</div>
          <div className="text-[10px] text-slate-300">class MongoDbDataSource</div>
        </div>

        <div className="bg-slate-900 p-3 rounded-2xl border border-emerald-800 space-y-1">
          <div className="font-bold text-emerald-300 border-b border-emerald-900 pb-1">Presentation Layer</div>
          <div className="text-[10px] text-slate-300">class RecommendationNotifier</div>
          <div className="text-[10px] text-slate-300">class RecommendationScreen</div>
          <div className="text-[10px] text-slate-300">class WardrobeScreen</div>
        </div>
      </div>
    </div>
  );
}

function VisualUseCaseDiagram() {
  return (
    <div className="space-y-4 text-xs font-mono text-slate-200 text-center">
      <div className="font-bold text-indigo-400 uppercase tracking-widest text-sm">
        UML Use Case Diagram
      </div>
      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="bg-indigo-950 p-4 rounded-2xl border border-indigo-700">
          <div className="font-bold text-white">Actor: End User</div>
        </div>

        <div className="space-y-2 text-[11px]">
          <div className="bg-slate-900 p-2 rounded-xl border border-slate-700">UC1: Register & Login</div>
          <div className="bg-slate-900 p-2 rounded-xl border border-slate-700">UC2: Upload Wardrobe Photo</div>
          <div className="bg-slate-900 p-2 rounded-xl border border-slate-700">UC3: Request Top-3 Outfits</div>
          <div className="bg-slate-900 p-2 rounded-xl border border-slate-700">UC4: Provide Feedback (Like/Wear)</div>
        </div>

        <div className="bg-emerald-950 p-4 rounded-2xl border border-emerald-700">
          <div className="font-bold text-white">Actor: AI Engine & Admin</div>
        </div>
      </div>
    </div>
  );
}

function VisualSequenceDiagram() {
  return (
    <div className="space-y-2 text-xs font-mono text-slate-200">
      <div className="text-center font-bold text-indigo-400 uppercase tracking-widest text-sm mb-2">
        Asynchronous Recommendation Sequence Diagram
      </div>
      <div className="space-y-1.5 text-[11px] bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="text-indigo-300">1. User ➔ [Flutter App]: Tap "Get Top-3 Recommendations"</div>
        <div className="text-slate-400">2. [Flutter App] ➔ [FastAPI]: POST /api/recommend (EventInput JSON)</div>
        <div className="text-purple-300">3. [FastAPI] ➔ [MongoDB]: Fetch User Wardrobe Items</div>
        <div className="text-amber-300">4. [FastAPI] ➔ [Feature Encoder]: Construct 18-Dim Vector</div>
        <div className="text-emerald-300">5. [Feature Encoder] ➔ [TensorFlow ANN]: Forward Pass Prediction</div>
        <div className="text-teal-300">6. [TensorFlow ANN] ➔ [FastAPI]: Return Scores & Rank Top-3</div>
        <div className="text-indigo-300">7. [FastAPI] ➔ [Flutter App]: HTTP 200 OK (Top-3 Outfits JSON)</div>
      </div>
    </div>
  );
}

function VisualERDDiagram() {
  return (
    <div className="space-y-3 text-xs font-mono text-slate-200">
      <div className="text-center font-bold text-indigo-400 uppercase tracking-widest text-sm">
        MongoDB NoSQL Document Collections ERD
      </div>
      <div className="grid grid-cols-2 gap-3 text-[10px]">
        <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
          <div className="font-bold text-amber-300 mb-1">Collection: Users</div>
          <div>_id: ObjectId</div>
          <div>email: String (Index Unique)</div>
          <div>preferredStyle: String</div>
          <div>favoriteColors: Array&lt;String&gt;</div>
        </div>
        <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
          <div className="font-bold text-cyan-300 mb-1">Collection: Wardrobe</div>
          <div>_id: ObjectId</div>
          <div>userId: ObjectId (Ref Users)</div>
          <div>category: String</div>
          <div>formalityLevel: Int</div>
          <div>imageUrl: String</div>
        </div>
      </div>
    </div>
  );
}

function VisualANNPipelineDiagram() {
  return (
    <div className="space-y-3 text-xs font-mono text-slate-200 text-center">
      <div className="font-bold text-indigo-400 uppercase tracking-widest text-sm">
        Deep Neural Network Architecture Pipeline
      </div>
      <div className="flex justify-between gap-2 items-center">
        <div className="bg-slate-900 p-3 rounded-xl border border-indigo-700 flex-1">
          <div className="font-bold text-indigo-300">Input Layer</div>
          <div className="text-[10px] text-slate-400">18 Dimensions</div>
        </div>
        <div>➔</div>
        <div className="bg-purple-900 p-3 rounded-xl border border-purple-700 flex-1">
          <div className="font-bold text-purple-300">Dense Layer 1</div>
          <div className="text-[10px] text-slate-400">12 Nodes (ReLU)</div>
        </div>
        <div>➔</div>
        <div className="bg-purple-900 p-3 rounded-xl border border-purple-700 flex-1">
          <div className="font-bold text-purple-300">Dense Layer 2</div>
          <div className="text-[10px] text-slate-400">6 Nodes (ReLU)</div>
        </div>
        <div>➔</div>
        <div className="bg-emerald-900 p-3 rounded-xl border border-emerald-700 flex-1">
          <div className="font-bold text-emerald-300">Output Node</div>
          <div className="text-[10px] text-slate-400">1 Node (Sigmoid Score)</div>
        </div>
      </div>
    </div>
  );
}

function VisualAPIFlowDiagram() {
  return (
    <div className="space-y-2 text-xs font-mono text-slate-200">
      <div className="text-center font-bold text-indigo-400 uppercase tracking-widest text-sm mb-2">
        FastAPI Endpoint REST Specifications
      </div>
      <div className="grid grid-cols-2 gap-2 text-[10px]">
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800"><span className="text-emerald-400 font-bold">POST</span> /api/auth/register</div>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800"><span className="text-emerald-400 font-bold">POST</span> /api/wardrobe/upload</div>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800"><span className="text-indigo-400 font-bold">GET</span> /api/wardrobe</div>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800"><span className="text-emerald-400 font-bold">POST</span> /api/recommend</div>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800"><span className="text-emerald-400 font-bold">POST</span> /api/feedback</div>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800"><span className="text-purple-400 font-bold">POST</span> /api/model/retrain</div>
      </div>
    </div>
  );
}

function VisualDirectoryTreeDiagram() {
  return (
    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-[11px] text-indigo-300 leading-relaxed">
      <div className="text-slate-200 font-bold border-b border-slate-800 pb-1 mb-2">
        📁 Complete Project Repository Tree
      </div>
      <div>style_match/</div>
      <div>├── mobile_flutter/</div>
      <div>│   ├── lib/src/presentation/ (Views & Riverpod Notifiers)</div>
      <div>│   ├── lib/src/domain/ (Entities & Use Cases)</div>
      <div>│   └── lib/src/data/ (Repositories & API Sources)</div>
      <div>├── backend_fastapi/</div>
      <div>│   ├── app/routers/ (Auth, Wardrobe, Predict, Feedback)</div>
      <div>│   ├── app/ml/ (ANN model, Feature encoder, Trainer)</div>
      <div>│   └── app/database/ (MongoDB connection)</div>
      <div>└── datasets/ (Synthetic & real outfit JSONs)</div>
    </div>
  );
}

function VisualTrainingWorkflowDiagram() {
  return (
    <div className="space-y-3 text-xs font-mono text-slate-200 text-center">
      <div className="font-bold text-indigo-400 uppercase tracking-widest text-sm">
        Training & Active Feedback Loop Workflow
      </div>
      <div className="grid grid-cols-2 gap-3 text-[11px]">
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
          <div className="font-bold text-indigo-300">Phase 1: Batch Supervised Training</div>
          <div className="text-slate-400 text-[10px]">Adam Optimizer • BCE Loss • Epochs: 100</div>
        </div>
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
          <div className="font-bold text-emerald-300">Phase 2: Online Active SGD Learning</div>
          <div className="text-slate-400 text-[10px]">Real-time feedback weight updates ($\eta=0.01$)</div>
        </div>
      </div>
    </div>
  );
}

function VisualDeploymentDiagram() {
  return (
    <div className="space-y-3 text-xs font-mono text-slate-200 text-center">
      <div className="font-bold text-indigo-400 uppercase tracking-widest text-sm">
        Cloud Container Deployment Architecture
      </div>
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center text-[11px]">
        <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">GitHub Repository</div>
        <div>➔</div>
        <div className="bg-indigo-900 p-2.5 rounded-xl border border-indigo-700">Docker Build</div>
        <div>➔</div>
        <div className="bg-purple-900 p-2.5 rounded-xl border border-purple-700">Google Cloud Run</div>
        <div>➔</div>
        <div className="bg-emerald-900 p-2.5 rounded-xl border border-emerald-700">MongoDB Atlas</div>
      </div>
    </div>
  );
}

function getMermaidCode(diagramId: string): string {
  switch (diagramId) {
    case "diag_arch":
      return `graph TD
  A[Flutter Mobile Client] -->|HTTPS / REST API| B[NGINX Reverse Proxy]
  B --> C[FastAPI ASGI Web Server]
  C --> D[TensorFlow ANN Inference Engine]
  C --> E[(MongoDB Database)]
  C --> F[Google Cloud Bucket - Outfit Storage]`;

    case "diag_dfd":
      return `graph LR
  User((User)) -->|1. Wardrobe Photos| Process1[1.0 Ingestion]
  Process1 --> DB[(MongoDB Wardrobe)]
  User -->|2. Event Context| Process2[2.0 Feature Encoder]
  DB --> Process2
  Process2 -->|18-Dim Vector| Process3[3.0 ANN Inference]
  Process3 -->|Top-3 Ranked| User
  User -->|4. Like / Dislike| Process4[4.0 Feedback SGD]
  Process4 -->|Update Weights| Process3`;

    case "diag_class":
      return `classDiagram
  class WardrobeItem {
    +String id
    +String category
    +int formalityLevel
  }
  class RecommendationRepository {
    +getTop3(EventInput): List~OutfitCombination~
    +sendFeedback(String, String): void
  }
  RecommendationRepository <|.. RecommendationRepositoryImpl`;

    default:
      return `graph TD
  Start([Start]) --> Input[Event & Wardrobe Context]
  Input --> ANN[ANN Forward Pass]
  ANN --> Output[Top-3 Outfit Recommendations]`;
  }
}
