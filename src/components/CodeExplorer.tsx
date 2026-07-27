import React, { useState } from "react";
import { codeExamples } from "../data/mockData";
import { Code2, Copy, Check, Terminal, FolderTree, FileCode } from "lucide-react";

export const CodeExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"flutter" | "fastapi" | "mongodb" | "tree">("flutter");
  const [copied, setCopied] = useState<boolean>(false);

  const getActiveCode = () => {
    switch (activeTab) {
      case "flutter": return codeExamples.flutterCode;
      case "fastapi": return codeExamples.fastApiCode;
      case "mongodb": return codeExamples.mongoDbSchema;
      case "tree": return `style_match_project/
├── mobile_flutter/
│   ├── pubspec.yaml
│   └── lib/
│       ├── main.dart
│       └── src/
│           ├── core/
│           │   ├── network/dio_client.dart
│           │   └── theme/app_colors.dart
│           ├── domain/
│           │   ├── entities/wardrobe_item.dart
│           │   ├── entities/event_input.dart
│           │   └── repositories/recommendation_repository.dart
│           ├── data/
│           │   ├── datasources/mongodb_remote_source.dart
│           │   └── repositories/recommendation_repository_impl.dart
│           └── presentation/
│               ├── providers/recommendation_provider.dart
│               ├── views/event_screen.dart
│               ├── views/recommendations_screen.dart
│               └── views/wardrobe_screen.dart
├── backend_fastapi/
│   ├── main.py
│   ├── requirements.txt
│   └── app/
│       ├── config.py
│       ├── database/mongodb.py
│       ├── schemas/request_schemas.py
│       ├── ml/
│       │   ├── ann_model.py
│       │   ├── feature_encoder.py
│       │   └── feedback_trainer.py
│       └── routers/
│           ├── auth_router.py
│           ├── wardrobe_router.py
│           ├── recommend_router.py
│           └── feedback_router.py
└── dataset_scripts/
    ├── synthetic_generator.py
    └── train_ann_model.py`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
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
              <Code2 className="w-4 h-4" />
              <span>Production Code Repository</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Full Project Codebase & Architecture Implementations
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl mt-1">
              Inspect production code snippets for the Flutter Mobile App (Riverpod + Clean Arch), Python FastAPI Services, TensorFlow ANN Model, and MongoDB JSON Schemas.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow flex items-center space-x-1.5 transition self-start md:self-auto"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied Code!" : "Copy Code Snippet"}</span>
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex space-x-2 mt-4 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveTab("flutter")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === "flutter" ? "bg-indigo-600 text-white shadow" : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span>Flutter Clean Arch (Dart)</span>
          </button>
          <button
            onClick={() => setActiveTab("fastapi")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === "fastapi" ? "bg-indigo-600 text-white shadow" : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>FastAPI & TensorFlow (Python)</span>
          </button>
          <button
            onClick={() => setActiveTab("mongodb")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === "mongodb" ? "bg-indigo-600 text-white shadow" : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>MongoDB Schemas (JSON)</span>
          </button>
          <button
            onClick={() => setActiveTab("tree")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === "tree" ? "bg-indigo-600 text-white shadow" : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <FolderTree className="w-4 h-4 text-purple-400" />
            <span>Project Directory Tree</span>
          </button>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 overflow-x-auto shadow-2xl">
        <pre className="font-mono text-xs text-indigo-200 leading-relaxed max-h-[550px] overflow-y-auto custom-scrollbar">
          {getActiveCode()}
        </pre>
      </div>
    </div>
  );
};
