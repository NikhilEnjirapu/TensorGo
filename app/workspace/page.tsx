"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SimulationProvider, useSimulation, TimelineEvent } from "@/context/SimulationContext";
import {
  Play,
  Pause,
  RotateCcw,
  Video,
  Mic,
  Activity,
  Heart,
  Shield,
  Smile,
  Home,
  Settings,
  Search,
  ArrowLeft,
  Terminal,
  BarChart2,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Code,
  Layers,
  AlertCircle,
  Cpu,
  User,
  ExternalLink,
  Info,
  Server,
  Zap,
  ActivitySquare,
  Download,
  Share2,
  Folder,
  Briefcase,
  FileText,
  UserCheck
} from "lucide-react";

// Mock Systems Coding prompt
const CODING_PROMPT = `/**
 * TENSORGO SYSTEMS EVALUATION: MULTI-NODE TRANSACTION POOLER
 * 
 * Implement a thread-safe connection pooler (PgBouncer compatible)
 * capable of routing write-traffic to primary nodes and read-queries
 * to read-replicas during lock conditions.
 */
class ConnectionPooler {
  private primaryNode: string = "postgres://primary-db.tensorgo.internal:5432";
  private readReplicas: string[] = [
    "postgres://replica-1.tensorgo.internal:5432",
    "postgres://replica-2.tensorgo.internal:5432"
  ];
  private activeConnections: number = 0;
  private maxConnections: number = 5000;

  constructor() {
    // TODO: Initialize connection pools & mutex locks
  }

  public async acquireConnection(isWrite: boolean): Promise<string> {
    if (this.activeConnections >= this.maxConnections) {
      throw new Error("Connection pool exhausted.");
    }
    // Write routing logic below
    
  }
}`;

// Diarized timeline events including standard + stress events
const STRESS_EVENT_TRANSCRIPT: TimelineEvent = {
  id: "stress-1",
  time: "01:45",
  seconds: 105,
  speaker: "Zai",
  text: "🚨 TELEMETRY INJECT: Zai detects database deadlock pressure. Alex, how would you handle PgBouncer pool lockups when connection thresholds are exceeded during node recovery?",
  type: "warning"
};

const STRESS_REPLY_TRANSCRIPT: TimelineEvent = {
  id: "stress-2",
  time: "01:55",
  seconds: 115,
  speaker: "Candidate",
  text: "Ah, under deadlock, I'd split connections via custom middleware, routing non-blocking operations to local standby replicas, and force immediate transaction timeouts to release the main mutex lock.",
  annotation: "Composure: High stress spike recovery",
  type: "success"
};

function WorkspaceContent() {
  const {
    isActive,
    step,
    elapsedTime,
    candidateState,
    biometrics,
    audio,
    timelineEvents,
    activeTimelineIndex,
    startSimulation,
    stopSimulation,
    resetSimulation,
    setStep
  } = useSimulation();

  // Navigation tab for sidebar
  const [activeTab, setActiveTab] = useState<"workspace" | "dossier">("workspace");

  // Left Column Tabs: video or code sandbox
  const [leftTab, setLeftTab] = useState<"video" | "code">("video");

  // Left Column Diarization / Sub-tabs
  const [leftBottomTab, setLeftBottomTab] = useState<"diarization" | "transcript" | "notes" | "action">("diarization");

  // Right Column Tabs (Health / Biometric / Insights / Audio)
  const [rightTab, setRightTab] = useState<"health" | "biometric" | "insights" | "audio">("health");

  // Email state for candidate biometrics
  const [emailInput, setEmailInput] = useState("alex.chen@tensorgo.com");
  const [isVerified, setIsVerified] = useState(true);

  // Code editor states
  const [code, setCode] = useState(CODING_PROMPT);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "TensorGo Node compiler initialized.",
    "Target environment: Node20-x86_64.",
    "Ready to compile connection pooler logic..."
  ]);
  const [isCompiling, setIsCompiling] = useState(false);

  // Stress Prompt state
  const [isStressInjected, setIsStressInjected] = useState(false);

  // Sparkline history buffers
  const [hrHistory, setHrHistory] = useState<number[]>([72, 74, 73, 76, 75, 74, 76, 75, 78, 77, 76, 75, 74]);
  const [hrvHistory, setHrvHistory] = useState<number[]>([42, 44, 45, 43, 46, 45, 45, 44, 46, 45, 44, 45, 45]);
  const [stressHistory, setStressHistory] = useState<number[]>([25, 26, 27, 25, 28, 26, 26, 25, 27, 26, 25, 26, 26]);

  // Sync scroll buffer
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Sync scroll on logs update
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  // Face landmarks simulation jitter
  const [meshJitter, setMeshJitter] = useState<{ dx: number; dy: number }[]>(new Array(31).fill({ dx: 0, dy: 0 }));
  
  useEffect(() => {
    if (isActive && candidateState === "answering") {
      const interval = setInterval(() => {
        setMeshJitter(prev =>
          prev.map(() => ({
            dx: (Math.random() - 0.5) * 1.5,
            dy: (Math.random() - 0.5) * 1.5
          }))
        );
      }, 150);
      return () => clearInterval(interval);
    } else {
      setMeshJitter(new Array(31).fill({ dx: 0, dy: 0 }));
    }
  }, [isActive, candidateState]);

  // Face landmarks mesh coordinates
  const [faceLandmarks] = useState<{ x: number; y: number }[]>(() => {
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i <= 10; i++) {
      points.push({ x: 20 + i * 6, y: 55 + Math.pow(i - 5, 2) * 1.1 });
    }
    points.push({ x: 30, y: 32 }, { x: 37, y: 28 }, { x: 44, y: 30 });
    points.push({ x: 56, y: 30 }, { x: 63, y: 28 }, { x: 70, y: 32 });
    points.push({ x: 34, y: 38 }, { x: 40, y: 38 });
    points.push({ x: 60, y: 38 }, { x: 66, y: 38 });
    points.push({ x: 50, y: 35 }, { x: 50, y: 44 }, { x: 46, y: 48 }, { x: 54, y: 48 });
    points.push({ x: 38, y: 65 }, { x: 44, y: 62 }, { x: 50, y: 64 }, { x: 56, y: 62 }, { x: 62, y: 65 });
    points.push({ x: 56, y: 69 }, { x: 50, y: 70 }, { x: 44, y: 69 });
    return points;
  });

  // Track biometrics sparkline updates
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setHrHistory(prev => {
          let nextHr = biometrics.heartRate;
          if (isStressInjected && elapsedTime >= 105 && elapsedTime <= 125) {
            nextHr = 95 + Math.floor(Math.sin(elapsedTime) * 6) + Math.floor(Math.random() * 4);
          }
          return [...prev.slice(1), nextHr];
        });
        setHrvHistory(prev => {
          let nextHrv = 45 + Math.floor(Math.random() * 4 - 2);
          if (isStressInjected && elapsedTime >= 105 && elapsedTime <= 125) {
            nextHrv = 32 + Math.floor(Math.random() * 4 - 2);
          }
          return [...prev.slice(1), nextHrv];
        });
        setStressHistory(prev => {
          let nextStress = biometrics.stressIndex;
          if (isStressInjected && elapsedTime >= 105 && elapsedTime <= 125) {
            nextStress = 84 + Math.floor(Math.random() * 4 - 2);
          }
          return [...prev.slice(1), nextStress];
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive, biometrics.heartRate, biometrics.stressIndex, isStressInjected, elapsedTime]);

  // Combine default timeline events + stress events if triggered
  const currentEventsList = isStressInjected 
    ? [...timelineEvents.slice(0, 3), STRESS_EVENT_TRANSCRIPT, STRESS_REPLY_TRANSCRIPT, ...timelineEvents.slice(3)]
    : timelineEvents;

  // Format elapsed time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Compile code button action
  const handleCompileCode = () => {
    setIsCompiling(true);
    setTerminalOutput(prev => [...prev, `[${new Date().toLocaleTimeString()}] npm run compile`]);

    setTimeout(() => {
      setTerminalOutput(prev => [
        ...prev,
        "Parsing AST structures... Done.",
        "Executing connection dry-run on postgres-mock-server...",
        "Acquired connection validation check completed in 42ms."
      ]);
    }, 600);

    setTimeout(() => {
      setTerminalOutput(prev => [
        ...prev,
        "✔ Compilation successful. Code base evaluated by Agent Zai.",
        "Telemetry check: logic correctiveness rate is 100%."
      ]);
      setIsCompiling(false);
    }, 1200);
  };

  // Trigger simulated Stress deadlocks
  const handleTriggerStress = () => {
    setIsStressInjected(true);
    setTerminalOutput(prev => [
      ...prev,
      "🚨 SYSTEM DIAGNOSTICS: PostgreSQL network deadlock injection requested.",
      "Primary database port [5432] latency spike: > 2400ms.",
      "AcquireConnection mutex lock threshold exceeded! Exposing failover state to Candidate..."
    ]);
  };

  // Convert sparkline data to SVG path points
  const getSparklinePath = (data: number[], width: number, height: number, minVal: number, maxVal: number, isFill: boolean = false) => {
    if (data.length === 0) return "";
    const stepX = width / (data.length - 1);
    const range = maxVal - minVal || 1;
    const points = data.map((val, idx) => {
      const x = idx * stepX;
      const y = height - ((val - minVal) / range) * height;
      return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");

    if (isFill) {
      return `${points} L ${width} ${height} L 0 ${height} Z`;
    }
    return points;
  };

  return (
    <div className="min-h-screen w-screen bg-[#030303] text-[#f5f5f7] flex overflow-x-hidden relative font-sans mesh-grid">
      
      {/* Background spotlights */}
      <div className="absolute inset-0 pointer-events-none radial-bg opacity-45 z-0" />
      <div className="absolute inset-0 pointer-events-none radial-bg-coral opacity-15 z-0" />
      
      {/* 1. FLOATING SIDEBAR */}
      <aside className="fixed left-4 top-4 bottom-4 w-20 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col justify-between py-8 items-center z-50 shadow-2xl">
        <div className="flex flex-col items-center gap-10 w-full">
          {/* Logo Go.x */}
          <div className="flex flex-col items-center relative select-none">
            <span className="text-[9px] font-mono tracking-wider text-gray-500 mb-0.5">Go.x</span>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-accent-blue flex items-center justify-center text-[15px] font-black text-white shadow-lg shadow-indigo-600/30 border border-white/15">
              X
            </div>
          </div>

          {/* Navigation Icons */}
          <nav className="flex flex-col items-center gap-5 w-full px-2">
            <Link 
              href="/"
              className="p-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer relative group"
              title="Home landing page"
            >
              <Home size={20} />
              <span className="absolute left-24 bg-black/90 text-white text-[9px] font-mono py-1 px-2 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                Home Page
              </span>
            </Link>

            <button 
              onClick={() => {
                setActiveTab("workspace");
                setLeftTab("video");
              }}
              className={`p-3 rounded-xl transition-all cursor-pointer relative group ${
                activeTab === "workspace" && leftTab === "video"
                  ? "text-white bg-white/10 border border-white/10 shadow-lg shadow-black/40"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
              title="Live Telemetry Feed"
            >
              <Folder size={20} />
              {activeTab === "workspace" && leftTab === "video" && (
                <span className="absolute right-0 top-1/3 bottom-1/3 w-1 bg-accent-blue rounded-full" />
              )}
              <span className="absolute left-24 bg-black/90 text-white text-[9px] font-mono py-1 px-2 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                Telemetry Feed
              </span>
            </button>

            <button 
              onClick={() => {
                setActiveTab("workspace");
                setLeftTab("code");
              }}
              className={`p-3 rounded-xl transition-all cursor-pointer relative group ${
                activeTab === "workspace" && leftTab === "code"
                  ? "text-white bg-white/10 border border-white/10 shadow-lg shadow-black/40"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
              title="Interactive IDE Sandbox"
            >
              <Code size={20} />
              {activeTab === "workspace" && leftTab === "code" && (
                <span className="absolute right-0 top-1/3 bottom-1/3 w-1 bg-accent-blue rounded-full" />
              )}
              <span className="absolute left-24 bg-black/90 text-white text-[9px] font-mono py-1 px-2 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                IDE Sandbox
              </span>
            </button>

            <button 
              onClick={() => setActiveTab("dossier")}
              className={`p-3 rounded-xl transition-all cursor-pointer relative group ${
                activeTab === "dossier"
                  ? "text-white bg-white/10 border border-white/10 shadow-lg shadow-black/40"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
              title="Evaluation Dossier"
            >
              <User size={20} />
              {activeTab === "dossier" && (
                <span className="absolute right-0 top-1/3 bottom-1/3 w-1 bg-accent-blue rounded-full" />
              )}
              <span className="absolute left-24 bg-black/90 text-white text-[9px] font-mono py-1 px-2 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                AI Dossier
              </span>
            </button>
          </nav>
        </div>

        <div className="flex flex-col items-center gap-5 w-full">
          <button className="p-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer">
            <Settings size={20} />
          </button>
          <div className="w-10 h-10 rounded-full bg-accent-blue/10 border border-accent-blue/35 overflow-hidden flex items-center justify-center text-accent-blue text-xs font-bold font-mono shadow shadow-accent-blue/10">
            AC
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTAINER SHELL */}
      <div className="flex-grow flex flex-col min-w-0 pl-28 pr-4 pt-24 pb-28 min-h-screen relative z-10">
        
        {/* Floating Top Header Bar */}
        <header className="fixed top-4 left-28 right-4 h-18 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between px-6 z-40 shadow-xl">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl text-gray-400 hover:text-white transition-all shadow"
              title="Back to home"
            >
              <ArrowLeft size={16} />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 overflow-hidden flex items-center justify-center text-xs font-bold text-gray-300">
                AC
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-bold text-white tracking-tight">Alex Chen</h1>
                  <span className="text-[9px] font-mono font-bold text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Systems Engineer
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-[9.5px] text-gray-400 font-mono">
                  <span>Session Code: ZAI-9092</span>
                  <span className="text-gray-600">|</span>
                  <span>21 May 2026</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse shrink-0" />
                  <span className="text-[8px] text-accent-emerald font-bold tracking-widest uppercase">Live telemetry active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="px-4 py-2 border border-white/5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow cursor-pointer">
              <Download size={14} />
              <span>Download Report</span>
            </button>
            <button className="px-4 py-2 bg-accent-blue hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-blue-500/20 cursor-pointer border border-blue-400/25">
              <Share2 size={14} />
              <span>Share Dashboard</span>
            </button>
          </div>
        </header>

        {/* WORKSPACE VIEW CONTENT */}
        <div className="flex-grow flex flex-col min-h-0 relative">
          
          <AnimatePresence mode="wait">
            {activeTab === "workspace" ? (
              <motion.div
                key="workspace-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 w-full"
              >
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                  
                  {/* LEFT COLUMN (xl:col-span-7) */}
                  <div className="xl:col-span-7 flex flex-col gap-6 min-w-0">
                    
                    {/* VIDEO FEED / IDE SANDBOX CONSOLE CARD */}
                    <div className="glass-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col relative h-[500px]">
                      
                      {/* Tabs selector */}
                      <div className="h-14 bg-black/50 border-b border-white/5 flex items-center justify-between px-4 shrink-0 select-none z-20">
                        <div className="flex gap-2 text-xs font-mono">
                          <button
                            onClick={() => setLeftTab("video")}
                            className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                              leftTab === "video"
                                ? "bg-accent-blue/10 border-accent-blue/35 text-white font-bold shadow-inner shadow-accent-blue/5"
                                : "border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
                            }`}
                          >
                            Video Telemetry Feed
                          </button>
                          <button
                            onClick={() => setLeftTab("code")}
                            className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                              leftTab === "code"
                                ? "bg-accent-blue/10 border-accent-blue/35 text-white font-bold shadow-inner shadow-accent-blue/5"
                                : "border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
                            }`}
                          >
                            Interactive IDE Sandbox
                          </button>
                        </div>

                        {leftTab === "code" && (
                          <button
                            onClick={handleCompileCode}
                            disabled={isCompiling}
                            className="px-4 py-2 bg-accent-blue hover:bg-blue-600 disabled:opacity-50 text-white text-[10px] font-bold font-mono rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/10 border border-blue-400/20"
                          >
                            <Zap size={12} className={isCompiling ? "animate-spin" : ""} />
                            <span>{isCompiling ? "COMPILING..." : "COMPILE & RUN"}</span>
                          </button>
                        )}
                      </div>

                      {/* Display Window */}
                      <div className="flex-grow overflow-hidden relative bg-black/40">
                        <AnimatePresence mode="wait">
                          
                          {/* Live Video layout */}
                          {leftTab === "video" && (
                            <motion.div
                              key="left-video-pane"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="w-full h-full relative overflow-hidden flex items-center justify-center"
                            >
                              {/* Zai AI Interviewer stream */}
                              <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-[#02040a]">
                                {step === 0 && candidateState === "connecting" ? (
                                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 font-mono gap-3 p-4 text-center bg-[#02040a]">
                                    <span className="w-2 h-2 rounded-full bg-accent-blue animate-ping" />
                                    <p className="text-[10px] tracking-widest text-accent-blue font-bold uppercase">ZAI CONNECTING SECURE STREAM...</p>
                                    <div className="w-36 bg-white/5 h-1 rounded-full overflow-hidden">
                                      <div className="bg-accent-blue h-full w-[45%] animate-pulse" />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                                    {/* High-tech orbital circles */}
                                    <div className="relative w-48 h-48 flex items-center justify-center">
                                      {/* Outer Orbiting ticks */}
                                      <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 rounded-full border border-dashed border-accent-blue/15"
                                      />
                                      {/* Middle ring with indicator notch */}
                                      <motion.div 
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-3 rounded-full border border-accent-cyan/25 border-t-transparent border-b-transparent"
                                      />
                                      {/* Inner ring */}
                                      <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-6 rounded-full border border-dotted border-indigo-500/30"
                                      />
                                      
                                      {/* Central Glowing Orb */}
                                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-950/40 to-slate-900/60 border border-accent-blue/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.15)] relative group overflow-hidden">
                                        <Cpu size={32} className="text-accent-blue animate-pulse relative z-10" />
                                        <div className="absolute inset-0 bg-accent-blue/5 opacity-50 blur-sm animate-pulse" />
                                      </div>
                                    </div>

                                    {/* Voice dynamic spectrum wave */}
                                    <div className="flex items-center gap-1.5 h-8 select-none">
                                      {[...Array(12)].map((_, i) => (
                                        <motion.div
                                          key={i}
                                          animate={{ 
                                            height: isActive && candidateState === "listening" 
                                              ? [6, Math.max(8, Math.sin(i * 0.8) * 28), 6] 
                                              : 6 
                                          }}
                                          transition={{ 
                                            duration: 0.55 + (i % 3) * 0.1, 
                                            repeat: Infinity, 
                                            ease: "easeInOut" 
                                          }}
                                          className="w-[3px] bg-accent-blue rounded-full shadow-[0_0_6px_rgba(59,130,246,0.5)]"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Zai floating speaker tag */}
                                <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl text-[9px] text-white font-mono font-semibold flex items-center gap-2 border border-white/10 shadow-lg shadow-black/80">
                                  <span className={`w-2 h-2 rounded-full ${candidateState === "listening" ? "bg-accent-blue animate-pulse" : "bg-gray-500"}`} />
                                  <span>Zai (AI Interviewer)</span>
                                </div>
                              </div>

                              {/* Candidate Webcam Inset (Floating Bottom Right) */}
                              <div className="absolute bottom-6 right-6 w-[160px] md:w-[200px] aspect-video rounded-xl border border-white/15 shadow-2xl shadow-black/90 overflow-hidden bg-[#03060f] z-10 transition-all hover:scale-105 hover:border-accent-cyan/40">
                                {step === 0 && candidateState === "connecting" ? (
                                  <div className="w-full h-full flex items-center justify-center bg-black text-gray-600 font-mono text-[9px]">
                                    No Feed Connected
                                  </div>
                                ) : (
                                  <div className="absolute inset-0 bg-[#060913] flex items-center justify-center overflow-hidden">
                                    
                                    {/* High-tech scanner frame */}
                                    <div className="absolute inset-0 border border-accent-cyan/15 pointer-events-none">
                                      {/* Corner Brackets */}
                                      <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent-cyan/70" />
                                      <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-accent-cyan/70" />
                                      <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-accent-cyan/70" />
                                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-accent-cyan/70" />
                                    </div>

                                    {/* Grid background */}
                                    <div className="absolute inset-0 mesh-grid opacity-10" />

                                    {/* Scanning laser sweep */}
                                    {isActive && candidateState === "answering" && (
                                      <div className="absolute top-0 left-0 w-full h-[6%] bg-gradient-to-b from-accent-cyan/20 to-transparent border-b border-accent-cyan/50 animate-scan pointer-events-none" />
                                    )}

                                    {/* Face scanning dots & wires overlay */}
                                    <div className="relative w-24 h-24 rounded-full border border-white/5 flex items-center justify-center">
                                      <div className="absolute inset-0 rounded-full border border-dashed border-accent-cyan/20 animate-spin" style={{ animationDuration: '30s' }} />
                                      
                                      {/* Face contour lines */}
                                      <svg className="absolute inset-0 w-full h-full text-accent-cyan opacity-40" viewBox="0 0 100 100">
                                        <path d="M 20,55 Q 50,75 80,55" fill="none" stroke="currentColor" strokeWidth="0.2" />
                                        <path d="M 30,32 Q 50,42 70,32" fill="none" stroke="currentColor" strokeWidth="0.2" />
                                        {faceLandmarks.map((pt, i) => {
                                          const jitter = meshJitter[i] || { dx: 0, dy: 0 };
                                          return (
                                            <circle
                                              key={i}
                                              cx={pt.x + jitter.dx}
                                              cy={pt.y + jitter.dy}
                                              r={1.2}
                                              fill={i === 12 || i === 13 ? "#f43f5e" : "#06b6d4"}
                                            />
                                          );
                                        })}
                                      </svg>
                                      <User size={16} className="text-white/10" />
                                    </div>
                                  </div>
                                )}

                                <div className="absolute bottom-2 left-2 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded-lg text-[7.5px] text-white font-mono flex items-center gap-1.5 border border-white/5 shadow shadow-black/80">
                                  <span className={`w-1 h-1 rounded-full ${candidateState === "answering" ? "bg-accent-coral animate-ping" : "bg-gray-500"}`} />
                                  <span>Alex Chen (Candidate)</span>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* IDE Sandbox code editor layout */}
                          {leftTab === "code" && (
                            <motion.div
                              key="left-code-pane"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="w-full h-full flex flex-col overflow-hidden"
                            >
                              {/* VSCode Layout Shell */}
                              <div className="flex-grow flex overflow-hidden">
                                
                                {/* VSCode Mini Sidebar */}
                                <div className="w-12 bg-black/60 border-r border-white/5 flex flex-col items-center py-4 justify-between select-none">
                                  <div className="flex flex-col gap-4">
                                    <div className="p-2.5 bg-white/5 text-accent-blue rounded-xl cursor-pointer">
                                      <Folder size={16} />
                                    </div>
                                    <div className="p-2.5 text-gray-500 hover:text-gray-300 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                                      <Search size={16} />
                                    </div>
                                    <div className="p-2.5 text-gray-500 hover:text-gray-300 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                                      <Terminal size={16} />
                                    </div>
                                  </div>
                                  <div className="p-2.5 text-gray-500 hover:text-gray-300 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                                    <Settings size={16} />
                                  </div>
                                </div>

                                {/* Explorer Drawer pane */}
                                <div className="w-40 bg-black/40 border-r border-white/5 hidden md:flex flex-col py-3 select-none text-[10px] font-mono text-gray-400">
                                  <div className="px-3 mb-2 font-bold uppercase tracking-wider text-gray-500 text-[8.5px]">Workspace Explorer</div>
                                  <div className="flex items-center gap-2 px-3 py-2 bg-white/5 text-white border-l-2 border-accent-blue cursor-pointer">
                                    <Code size={12} className="text-[#3b82f6]" />
                                    <span>ConnectionPooler.ts</span>
                                  </div>
                                  <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.02] cursor-pointer transition-colors">
                                    <Code size={12} className="text-[#10b981]" />
                                    <span>PgBouncer.mock.ts</span>
                                  </div>
                                  <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.02] cursor-pointer transition-colors">
                                    <Settings size={12} className="text-accent-amber" />
                                    <span>config.yaml</span>
                                  </div>
                                  <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.02] cursor-pointer transition-colors">
                                    <FileText size={12} className="text-gray-500" />
                                    <span>package.json</span>
                                  </div>
                                </div>

                                {/* Editor Main Text Area */}
                                <div className="flex-grow flex flex-col overflow-hidden relative bg-black/25">
                                  
                                  {/* Editor Tab bar */}
                                  <div className="h-9 bg-black/50 border-b border-white/5 flex items-center px-2 select-none text-[10px] font-mono">
                                    <div className="h-full px-4 bg-black/40 border-r border-white/5 border-t-2 border-accent-blue text-white flex items-center gap-1.5 font-semibold">
                                      <Code size={10} className="text-[#3b82f6]" />
                                      <span>ConnectionPooler.ts</span>
                                    </div>
                                    <div className="h-full px-4 hover:bg-white/[0.02] border-r border-white/5 text-gray-500 flex items-center gap-1.5 cursor-pointer transition-colors">
                                      <span>PgBouncer.mock.ts</span>
                                    </div>
                                  </div>

                                  <div className="flex-grow overflow-auto p-4 font-mono text-xs text-gray-300 relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-10 bg-black/10 border-r border-white/5 select-none text-right pr-3 pt-4 text-gray-600 space-y-[4px]">
                                      {Array.from({ length: 32 }).map((_, idx) => (
                                        <div key={idx}>{idx + 1}</div>
                                      ))}
                                    </div>
                                    <textarea
                                      value={code}
                                      onChange={(e) => setCode(e.target.value)}
                                      className="w-full h-full pl-10 pr-4 bg-transparent text-gray-300 focus:outline-none resize-none font-mono text-xs leading-relaxed space-y-[4px] border-none"
                                      spellCheck={false}
                                    />
                                  </div>
                                </div>

                              </div>

                              {/* Terminal compiler logs */}
                              <div className="h-36 border-t border-white/5 bg-[#030303] flex flex-col overflow-hidden font-mono text-[10px]">
                                <div className="h-8 bg-black/60 border-b border-white/5 px-4 flex items-center justify-between text-gray-500 select-none">
                                  <span className="flex items-center gap-1.5 font-bold">
                                    <Terminal size={12} />
                                    TERMINAL (node-sandbox)
                                  </span>
                                  <span className="text-[9px]">node v20.10.0</span>
                                </div>
                                <div ref={logContainerRef} className="flex-1 p-3 overflow-y-auto space-y-1 text-gray-400">
                                  {terminalOutput.map((out, idx) => (
                                    <div key={idx} className="flex gap-2 text-left">
                                      <span className="text-accent-cyan font-bold select-none">tensorgo@sandbox:~$</span>
                                      <span className={out.includes("✔") ? "text-accent-emerald font-bold" : out.includes("🚨") ? "text-accent-coral" : out.includes("SYSTEM") ? "text-accent-amber" : ""}>
                                        {out}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* DIARIZATION & TIMELINE CARD */}
                    <div className="glass-card border border-white/10 p-5 rounded-2xl shadow-2xl text-left">
                      {/* Sub-tab headers */}
                      <div className="flex border-b border-white/5 gap-5 mb-4 text-xs font-bold font-mono">
                        <button
                          onClick={() => setLeftBottomTab("diarization")}
                          className={`pb-3 uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                            leftBottomTab === "diarization"
                              ? "text-accent-blue border-accent-blue text-glow-blue"
                              : "border-transparent text-gray-500 hover:text-gray-300"
                          }`}
                        >
                          Speaker Diarization
                        </button>
                        <button
                          onClick={() => setLeftBottomTab("transcript")}
                          className={`pb-3 uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                            leftBottomTab === "transcript"
                              ? "text-accent-blue border-accent-blue text-glow-blue"
                              : "border-transparent text-gray-500 hover:text-gray-300"
                          }`}
                        >
                          Live Transcript
                        </button>
                        <button
                          onClick={() => setLeftBottomTab("notes")}
                          className={`pb-3 uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                            leftBottomTab === "notes"
                              ? "text-accent-blue border-accent-blue text-glow-blue"
                              : "border-transparent text-gray-500 hover:text-gray-300"
                          }`}
                        >
                          Notes
                        </button>
                        <button
                          onClick={() => setLeftBottomTab("action")}
                          className={`pb-3 uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                            leftBottomTab === "action"
                              ? "text-accent-blue border-accent-blue text-glow-blue"
                              : "border-transparent text-gray-500 hover:text-gray-300"
                          }`}
                        >
                          Action Items
                        </button>
                      </div>

                      {/* Display sub-tab window content */}
                      <div className="min-h-[140px] max-h-[220px] overflow-y-auto pr-1">
                        <AnimatePresence mode="wait">
                          
                          {/* Tab Option 1: Speaker Diarization Horizontal blocks */}
                          {leftBottomTab === "diarization" && (
                            <motion.div
                              key="diarization-sub"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="space-y-4 pt-2"
                            >
                              {/* Zai Track */}
                              <div className="flex items-center justify-between text-xs font-mono">
                                <div className="w-16 font-bold text-accent-blue flex items-center gap-1">
                                  <Cpu size={11} />
                                  <span>Zai (AI)</span>
                                </div>
                                <div className="flex-1 mx-4 h-8 bg-black/40 rounded-lg overflow-hidden relative border border-white/5 shadow-inner">
                                  <div className="absolute left-[5%] w-[12%] h-full bg-gradient-to-r from-accent-blue/15 to-accent-blue/25 border-r border-accent-blue/30 flex items-center justify-center">
                                    <span className="w-full h-1/2 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#3b82f6_2px,#3b82f6_4px)] opacity-40" />
                                  </div>
                                  <div className="absolute left-[30%] w-[18%] h-full bg-gradient-to-r from-accent-blue/15 to-accent-blue/25 border-l border-r border-accent-blue/30 flex items-center justify-center">
                                    <span className="w-full h-1/2 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#3b82f6_2px,#3b82f6_4px)] opacity-40" />
                                  </div>
                                  <div className="absolute left-[65%] w-[15%] h-full bg-gradient-to-r from-accent-blue/15 to-accent-blue/25 border-l border-r border-accent-blue/30 flex items-center justify-center">
                                    <span className="w-full h-1/2 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#3b82f6_2px,#3b82f6_4px)] opacity-40" />
                                  </div>
                                </div>
                                <div className="w-12 text-right text-gray-500">42.70%</div>
                              </div>

                              {/* Candidate Track */}
                              <div className="flex items-center justify-between text-xs font-mono">
                                <div className="w-16 font-bold text-gray-300 flex items-center gap-1">
                                  <User size={11} className="text-gray-400" />
                                  <span>Alex</span>
                                </div>
                                <div className="flex-1 mx-4 h-8 bg-black/40 rounded-lg overflow-hidden relative border border-white/5 shadow-inner">
                                  <div className="absolute left-[17%] w-[13%] h-full bg-gradient-to-r from-accent-coral/15 to-accent-coral/25 border-l border-r border-accent-coral/30 flex items-center justify-center">
                                    <span className="w-full h-1/2 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#f43f5e_2px,#f43f5e_4px)] opacity-40" />
                                  </div>
                                  <div className="absolute left-[48%] w-[17%] h-full bg-gradient-to-r from-accent-coral/15 to-accent-coral/25 border-l border-r border-accent-coral/30 flex items-center justify-center">
                                    <span className="w-full h-1/2 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#f43f5e_2px,#f43f5e_4px)] opacity-40" />
                                  </div>
                                  <div className="absolute left-[80%] w-[18%] h-full bg-gradient-to-r from-accent-coral/15 to-accent-coral/25 border-l border-accent-coral/30 flex items-center justify-center">
                                    <span className="w-full h-1/2 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#f43f5e_2px,#f43f5e_4px)] opacity-40" />
                                  </div>

                                  {/* Scrubbing playhead bar with glowing top node */}
                                  {isActive && (
                                    <motion.div 
                                      className="absolute top-0 bottom-0 w-[2px] bg-accent-blue shadow-[0_0_8px_#3b82f6] z-10"
                                      style={{ left: `${Math.min(100, (elapsedTime / 180) * 100)}%` }}
                                    >
                                      <span className="absolute -top-0.5 -left-1 w-2.5 h-2.5 rounded-full bg-accent-blue border border-white" />
                                    </motion.div>
                                  )}
                                </div>
                                <div className="w-12 text-right text-gray-500">57.30%</div>
                              </div>
                            </motion.div>
                          )}

                          {/* Tab Option 2: Live Scrolling dialog transcripts */}
                          {leftBottomTab === "transcript" && (
                            <motion.div
                              key="transcript-sub"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="space-y-3 pt-1 text-left font-mono text-[11px]"
                            >
                              {currentEventsList.map((ev, idx) => {
                                const isActiveSpeaker = activeTimelineIndex === idx;
                                return (
                                  <div
                                    key={ev.id}
                                    className={`p-3 rounded-xl border transition-all ${
                                      isActiveSpeaker
                                        ? "bg-white/5 border-white/10 shadow-lg shadow-black/35"
                                        : "border-transparent bg-transparent opacity-70"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between text-[9px] text-gray-500 mb-1.5">
                                      <span className={ev.speaker === "Zai" ? "text-accent-blue font-bold" : "text-white font-bold"}>
                                        {ev.speaker.toUpperCase()}
                                      </span>
                                      <span>{ev.time}</span>
                                    </div>
                                    <p className="text-[11px] text-gray-300 leading-relaxed font-sans">
                                      {ev.text}
                                    </p>
                                    {ev.annotation && (
                                      <div className="mt-2 text-[8px] font-mono text-accent-coral flex items-center gap-1 bg-accent-coral/5 border border-accent-coral/15 py-1 px-2.5 rounded-lg w-max">
                                        <AlertCircle size={10} />
                                        <span>{ev.annotation}</span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </motion.div>
                          )}

                          {/* Tab Option 3: Helper Notes */}
                          {leftBottomTab === "notes" && (
                            <motion.div
                              key="notes-sub"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="pt-2 text-left text-xs text-gray-400 leading-relaxed"
                            >
                              <ul className="list-disc pl-5 space-y-2">
                                <li>Focusing on high concurrency synchronization, PG locking structures.</li>
                                <li>Candidate explains PG pool timeouts quickly, showing good hands-on experience.</li>
                                <li>Note stress spike during simulated database deadlock recovery trigger.</li>
                              </ul>
                            </motion.div>
                          )}

                          {/* Tab Option 4: Action Items list */}
                          {leftBottomTab === "action" && (
                            <motion.div
                              key="action-sub"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="pt-2 text-left text-xs text-gray-400 space-y-2"
                            >
                              <div className="flex items-center gap-2.5 bg-white/[0.01] border border-white/5 p-2.5 rounded-xl">
                                <span className="h-2 w-2 bg-accent-emerald rounded-full shrink-0" />
                                <span>Verify database shard replication delays manually on staging environment.</span>
                              </div>
                              <div className="flex items-center gap-2.5 bg-white/[0.01] border border-white/5 p-2.5 rounded-xl">
                                <span className="h-2 w-2 bg-accent-emerald rounded-full shrink-0" />
                                <span>Schedule Systems architecture round 2 call.</span>
                              </div>
                            </motion.div>
                          )}

                        </AnimatePresence>
                      </div>
                    </div>

                  </div>

                  {/* RIGHT COLUMN (xl:col-span-5) */}
                  <div className="xl:col-span-5 flex flex-col gap-6 min-w-0">
                    
                    <div className="glass-card border border-white/10 p-5 rounded-2xl shadow-2xl flex flex-col h-[570px] overflow-hidden">
                      
                      {/* Tab Selection */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4 shrink-0 overflow-x-auto no-scrollbar">
                        <div className="flex gap-4 text-[10px] font-bold font-mono uppercase tracking-wider">
                          <button
                            onClick={() => setRightTab("health")}
                            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                              rightTab === "health" ? "border-accent-blue text-accent-blue" : "border-transparent text-gray-500 hover:text-gray-300"
                            }`}
                          >
                            Health Metrics
                          </button>
                          <button
                            onClick={() => setRightTab("biometric")}
                            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                              rightTab === "biometric" ? "border-accent-blue text-accent-blue" : "border-transparent text-gray-500 hover:text-gray-300"
                            }`}
                          >
                            Biometric
                          </button>
                          <button
                            onClick={() => setRightTab("insights")}
                            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                              rightTab === "insights" ? "border-accent-blue text-accent-blue" : "border-transparent text-gray-500 hover:text-gray-300"
                            }`}
                          >
                            Zai Insights
                          </button>
                          <button
                            onClick={() => setRightTab("audio")}
                            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                              rightTab === "audio" ? "border-accent-blue text-accent-blue" : "border-transparent text-gray-500 hover:text-gray-300"
                            }`}
                          >
                            Audio
                          </button>
                        </div>
                        <Search size={14} className="text-gray-500 cursor-pointer hover:text-gray-300 shrink-0 ml-2" />
                      </div>

                      {/* Tab Contents */}
                      <div className="flex-1 overflow-y-auto min-w-0">
                        <AnimatePresence mode="wait">
                          
                          {/* 1. HEALTH METRICS TAB */}
                          {rightTab === "health" && (
                            <motion.div
                              key="health-tab"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="space-y-4 text-gray-300 text-left"
                            >
                              <div className="flex justify-between items-center">
                                <h3 className="text-[10px] font-bold font-mono uppercase text-white tracking-widest">
                                  Physiological Analytics
                                </h3>
                                <div className="flex items-center gap-2">
                                  <span className="text-[8.5px] font-mono font-bold bg-accent-blue/10 border border-accent-blue/20 text-accent-blue px-2 py-0.5 rounded">
                                    {isActive ? "LIVE STREAM" : "STANDBY"}
                                  </span>
                                  <button className="px-2 py-0.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded text-[8.5px] font-bold font-mono transition-colors cursor-pointer">
                                    Stop
                                  </button>
                                </div>
                              </div>

                              {/* Warning Info box */}
                              <div className="bg-white/[0.02] border border-white/5 text-gray-400 rounded-xl p-3 text-[10px] flex items-start gap-2.5 leading-relaxed">
                                <Info size={14} className="text-accent-blue shrink-0 mt-0.5" />
                                <span>
                                  Estimated with high accuracy via camera photoplethysmography (PPG) scan node vectors.
                                </span>
                              </div>

                              {/* physiological cards grid */}
                              <div className="grid grid-cols-2 gap-4 pt-1">
                                
                                {/* Heart Rate (HR) */}
                                <div className="border border-white/5 rounded-xl p-3 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03] transition-all shadow-inner flex flex-col justify-between h-[100px]">
                                  <div className="flex justify-between items-start">
                                    <span className="text-[9px] font-bold text-accent-coral uppercase font-mono tracking-wider">Heart Rate</span>
                                    <Heart size={14} className="text-accent-coral animate-pulse" />
                                  </div>
                                  <div className="text-xl font-extrabold text-white font-mono mt-1">
                                    {isStressInjected && elapsedTime >= 105 && elapsedTime <= 125 
                                      ? "104" 
                                      : biometrics.heartRate} <span className="text-[10px] font-normal text-gray-500">bpm</span>
                                  </div>
                                  <svg className="w-full h-6 overflow-visible" viewBox="0 0 100 20">
                                    <defs>
                                      <linearGradient id="hr-grad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                                      </linearGradient>
                                    </defs>
                                    <path
                                      fill="url(#hr-grad)"
                                      d={getSparklinePath(hrHistory, 100, 20, 60, 120, true)}
                                    />
                                    <path
                                      fill="none"
                                      stroke="#f43f5e"
                                      strokeWidth="1.5"
                                      d={getSparklinePath(hrHistory, 100, 20, 60, 120, false)}
                                    />
                                  </svg>
                                </div>

                                {/* HRV */}
                                <div className="border border-white/5 rounded-xl p-3 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03] transition-all shadow-inner flex flex-col justify-between h-[100px]">
                                  <div className="flex justify-between items-start">
                                    <span className="text-[9px] font-bold text-accent-cyan uppercase font-mono tracking-wider">Heart Rate Var.</span>
                                    <Activity size={14} className="text-accent-cyan" />
                                  </div>
                                  <div className="text-xl font-extrabold text-white font-mono mt-1">
                                    {isStressInjected && elapsedTime >= 105 && elapsedTime <= 125 ? "32" : 45 + (elapsedTime % 3)} <span className="text-[10px] font-normal text-gray-500">ms</span>
                                  </div>
                                  <svg className="w-full h-6 overflow-visible" viewBox="0 0 100 20">
                                    <defs>
                                      <linearGradient id="hrv-grad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                                      </linearGradient>
                                    </defs>
                                    <path
                                      fill="url(#hrv-grad)"
                                      d={getSparklinePath(hrvHistory, 100, 20, 30, 50, true)}
                                    />
                                    <path
                                      fill="none"
                                      stroke="#06b6d4"
                                      strokeWidth="1.5"
                                      d={getSparklinePath(hrvHistory, 100, 20, 30, 50, false)}
                                    />
                                  </svg>
                                </div>

                                {/* Blood Pressure */}
                                <div className="border border-white/5 rounded-xl p-3 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03] transition-all shadow-inner flex flex-col justify-between h-[100px]">
                                  <div className="flex justify-between items-start">
                                    <span className="text-[9px] font-bold text-accent-amber uppercase font-mono tracking-wider">Blood Pressure</span>
                                    <Shield size={14} className="text-accent-amber" />
                                  </div>
                                  <div className="text-base font-extrabold text-white font-mono mt-1">
                                    118 / {79 + (elapsedTime % 2)} <span className="text-[10px] font-normal text-gray-500">mmHg</span>
                                  </div>
                                  <div className="w-full mt-2">
                                    <div className="flex justify-between text-[7px] font-mono text-gray-500 mb-0.5">
                                      <span>SYS (118)</span>
                                      <span>DIA ({79 + (elapsedTime % 2)})</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden flex">
                                      <div className="bg-accent-amber h-full rounded-l-full" style={{ width: "60%" }} />
                                      <div className="bg-accent-emerald h-full rounded-r-full" style={{ width: "35%" }} />
                                    </div>
                                  </div>
                                </div>

                                {/* SpO2 */}
                                <div className="border border-white/5 rounded-xl p-3 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03] transition-all shadow-inner flex flex-col justify-between h-[100px]">
                                  <div className="flex justify-between items-start">
                                    <span className="text-[9px] font-bold text-accent-blue uppercase font-mono tracking-wider">Blood Oxygen</span>
                                    <Smile size={14} className="text-accent-blue" />
                                  </div>
                                  <div className="flex items-center gap-3 mt-1">
                                    <div className="text-xl font-extrabold text-white font-mono">
                                      {biometrics.oxygenLevel}%
                                    </div>
                                    <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                                      <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="16" cy="16" r="12" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" fill="transparent" />
                                        <circle cx="16" cy="16" r="12" stroke="#3b82f6" strokeWidth="2.5" fill="transparent" strokeDasharray={75} strokeDashoffset={75 - (75 * biometrics.oxygenLevel) / 100} className="transition-all duration-500" />
                                      </svg>
                                      <span className="absolute text-[6px] font-mono text-accent-blue font-bold">O2</span>
                                    </div>
                                  </div>
                                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-1">
                                    <div className="bg-accent-blue h-full rounded-full" style={{ width: `${biometrics.oxygenLevel}%` }} />
                                  </div>
                                </div>

                                {/* Stress Index */}
                                <div className="border border-white/5 rounded-xl p-3 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03] transition-all shadow-inner flex flex-col justify-between h-[100px]">
                                  <div className="flex justify-between items-start">
                                    <span className="text-[9px] font-bold text-accent-coral uppercase font-mono tracking-wider">Stress Index</span>
                                    <AlertCircle size={14} className="text-accent-coral animate-pulse" />
                                  </div>
                                  <div className="text-xl font-extrabold text-white font-mono mt-1">
                                    {isStressInjected && elapsedTime >= 105 && elapsedTime <= 125 ? "84" : biometrics.stressIndex} <span className="text-[9px] text-gray-500 font-normal">/100</span>
                                  </div>
                                  <svg className="w-full h-6 overflow-visible" viewBox="0 0 100 20">
                                    <defs>
                                      <linearGradient id="stress-grad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                                      </linearGradient>
                                    </defs>
                                    <path
                                      fill="url(#stress-grad)"
                                      d={getSparklinePath(stressHistory, 100, 20, 20, 100, true)}
                                    />
                                    <path
                                      fill="none"
                                      stroke="#f43f5e"
                                      strokeWidth="1.5"
                                      d={getSparklinePath(stressHistory, 100, 20, 20, 100, false)}
                                    />
                                  </svg>
                                </div>

                                {/* Respiration */}
                                <div className="border border-white/5 rounded-xl p-3 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03] transition-all shadow-inner flex flex-col justify-between h-[100px]">
                                  <div className="flex justify-between items-start">
                                    <span className="text-[9px] font-bold text-accent-emerald uppercase font-mono tracking-wider">Respiration</span>
                                    <Sparkles size={14} className="text-accent-emerald animate-pulse" />
                                  </div>
                                  <div className="text-xl font-extrabold text-white font-mono mt-1">
                                    {isStressInjected && elapsedTime >= 105 && elapsedTime <= 125 ? 22 : 14 + (elapsedTime % 3)} <span className="text-[10px] font-normal text-gray-500">BrPm</span>
                                  </div>
                                  <div className="flex gap-[3px] mt-2 select-none">
                                    {[...Array(6)].map((_, i) => (
                                      <div 
                                        key={i} 
                                        className={`h-2 flex-1 rounded-sm transition-all duration-300 ${
                                          i < (isStressInjected && elapsedTime >= 105 && elapsedTime <= 125 ? 5 : 3 + (elapsedTime % 2))
                                            ? "bg-accent-emerald animate-pulse"
                                            : "bg-white/5"
                                        }`} 
                                      />
                                    ))}
                                  </div>
                                </div>

                              </div>
                            </motion.div>
                          )}

                          {/* 2. BIOMETRIC VERIFICATION TAB */}
                          {rightTab === "biometric" && (
                            <motion.div
                              key="biometric-tab"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="space-y-4 text-left text-xs text-gray-300"
                            >
                              <h3 className="text-[10px] font-bold font-mono uppercase text-white tracking-widest">
                                Biometrics & Liveness
                              </h3>

                              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl space-y-2.5">
                                <label className="text-[9px] font-mono text-gray-400 font-bold block uppercase tracking-wider">
                                  Verify Candidate Email
                                </label>
                                <div className="flex gap-2">
                                  <input 
                                    type="text" 
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent-blue"
                                  />
                                  <button 
                                    onClick={() => setIsVerified(true)}
                                    className="bg-accent-blue hover:bg-blue-600 text-white rounded-xl px-4 py-2 font-bold text-xs transition-colors shrink-0 cursor-pointer border border-blue-400/10"
                                  >
                                    Verify
                                  </button>
                                </div>
                              </div>

                              {isVerified && (
                                <div className="space-y-4">
                                  <div className="bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald rounded-xl p-3 text-[10px] flex items-center gap-2.5 font-mono shadow-inner">
                                    <CheckCircle2 size={15} className="text-accent-emerald shrink-0" />
                                    <span>Face/Voice authentication matched.</span>
                                  </div>

                                  <div className="flex items-center gap-3 bg-white/[0.01] border border-white/5 p-3 rounded-xl shadow-inner">
                                    <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center border border-white/15 text-accent-blue font-bold font-mono">
                                      AC
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                      <div className="font-bold text-white text-[11px] truncate">{emailInput}</div>
                                      <div className="text-[9px] text-gray-500 font-mono truncate">Device ID: WebRTC-Stream_009x</div>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                                    <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 p-2.5 rounded-lg shadow-inner">
                                      <CheckCircle2 size={12} className="text-accent-emerald shrink-0" />
                                      <span className="font-medium text-gray-300">Liveness Checked</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 p-2.5 rounded-lg shadow-inner">
                                      <CheckCircle2 size={12} className="text-accent-emerald shrink-0" />
                                      <span className="font-medium text-gray-300">Voice Pattern Match</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 p-2.5 rounded-lg shadow-inner">
                                      <CheckCircle2 size={12} className="text-accent-emerald shrink-0" />
                                      <span className="font-medium text-gray-300">Expression Analysis</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 p-2.5 rounded-lg shadow-inner">
                                      <CheckCircle2 size={12} className="text-accent-emerald shrink-0" />
                                      <span className="font-medium text-gray-300">Speech Patterns</span>
                                    </div>
                                  </div>

                                  {/* High-tech liveness radar scanner */}
                                  <div className="mt-3 flex flex-col items-center justify-center p-4 border border-white/5 rounded-xl bg-black/40 relative overflow-hidden">
                                    <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest mb-2">Live WebRTC Radar Feed</span>
                                    <div className="relative w-24 h-24 border border-accent-blue/20 rounded-full flex items-center justify-center">
                                      {/* Rotating Radar Line */}
                                      <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue/10 via-transparent to-transparent pointer-events-none"
                                        style={{ transformOrigin: 'center' }}
                                      />
                                      {/* Dynamic Grid Circles */}
                                      <div className="absolute inset-4 rounded-full border border-dashed border-white/5" />
                                      <div className="absolute inset-8 rounded-full border border-dotted border-white/5" />
                                      {/* Target dots */}
                                      <span className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
                                      <span className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-accent-coral animate-pulse" />
                                      <UserCheck size={20} className="text-accent-blue animate-pulse" />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}

                          {/* 3. ZAI INSIGHTS REPORT */}
                          {rightTab === "insights" && (
                            <motion.div
                              key="insights-tab"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="space-y-4 text-gray-300 text-left"
                            >
                              <div className="flex justify-between items-center">
                                <h3 className="text-[10px] font-bold font-mono uppercase text-white tracking-widest">
                                  Reports Dashboard
                                </h3>
                                <button className="text-[9px] text-gray-500 hover:text-gray-300 font-mono flex items-center gap-1.5 py-1.5 px-2.5 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/5 transition-all cursor-pointer">
                                  <Copy size={11} />
                                  <span>Copy MD</span>
                                </button>
                              </div>

                              <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3 h-[420px] overflow-y-auto text-[10px] font-sans leading-relaxed space-y-3 shadow-inner">
                                {step < 3 ? (
                                  <div className="flex flex-col items-center justify-center h-full text-gray-500 font-mono text-center gap-2">
                                    <FileText size={28} className="text-gray-600 animate-pulse" />
                                    <span className="max-w-[200px]">Zai is compiling live insights. Compile dossier dynamically via Step 4.</span>
                                  </div>
                                ) : (
                                  <div className="space-y-4">
                                    <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                                      <h4 className="font-bold text-white text-[11px] mb-1 flex items-center gap-1">
                                        <Code size={11} className="text-accent-blue" />
                                        <span>1. Systems Engineering Assessment</span>
                                      </h4>
                                      <p className="text-gray-400">
                                        Alex Chen presented clear core knowledge of database deadlocks, showing hands-on pgBouncer connection architectures and primary/replica split middleware logic.
                                      </p>
                                    </div>
                                    <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                                      <h4 className="font-bold text-white text-[11px] mb-1 flex items-center gap-1">
                                        <Activity size={11} className="text-accent-coral" />
                                        <span>2. Composure Diagnostics</span>
                                      </h4>
                                      <p className="text-gray-400">
                                        The candidate registered normal composure indexes until the database stress injection. Composure stabilized rapidly (recovery in 20 seconds).
                                      </p>
                                    </div>
                                    <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                                      <h4 className="font-bold text-white text-[11px] mb-1 flex items-center gap-1">
                                        <Mic size={11} className="text-accent-emerald" />
                                        <span>3. Communication Pacing</span>
                                      </h4>
                                      <p className="text-gray-400">
                                        Speech velocity averaged 134 words per minute. Zero excessive hesitations logged during deadlock response recovery intervals.
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}

                          {/* 4. AUDIO METRICS TAB */}
                          {rightTab === "audio" && (
                            <motion.div
                              key="audio-tab"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="space-y-4 text-gray-300 text-left text-xs"
                            >
                              <h3 className="text-[10px] font-bold font-mono uppercase text-white tracking-widest">
                                Vocal Diagnostics
                              </h3>
                              
                              <div className="space-y-4 pt-2">
                                <div className="space-y-1.5 p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                                  <div className="flex justify-between font-mono text-[10px]">
                                    <span>Filler Words count</span>
                                    <span className="font-bold text-accent-blue">{audio.fillerWords} instances</span>
                                  </div>
                                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                    <div 
                                      className="bg-accent-blue h-full rounded-full transition-all duration-300"
                                      style={{ width: `${Math.min(100, (audio.fillerWords / 12) * 100)}%` }}
                                    />
                                  </div>
                                </div>

                                <div className="space-y-1.5 p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                                  <div className="flex justify-between font-mono text-[10px]">
                                    <span>Speech velocity (WPM)</span>
                                    <span className="font-bold text-gray-300">{isActive ? `${audio.speakingRate} WPM` : "0 WPM"}</span>
                                  </div>
                                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                    <div className="bg-accent-emerald h-full rounded-full" style={{ width: isActive ? `${(audio.speakingRate / 220) * 100}%` : "0%" }} />
                                  </div>
                                </div>

                                <div className="space-y-1.5 p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                                  <div className="flex justify-between font-mono text-[10px]">
                                    <span>Vocal Tension (Tone variation)</span>
                                    <span className="font-bold text-gray-300">{isActive ? "Low (12%)" : "Standby"}</span>
                                  </div>
                                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                    <div className="bg-accent-blue/80 h-full rounded-full" style={{ width: isActive ? "15%" : "0%" }} />
                                  </div>
                                </div>
                              </div>

                              {/* Interactive Audio Frequency Equalizer */}
                              <div className="mt-4 border border-white/5 rounded-xl p-4 bg-black/40 flex flex-col items-center">
                                <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest mb-3">Vocal Frequency Spectrum</span>
                                <div className="flex gap-[3px] h-12 items-end justify-center w-full max-w-[200px]">
                                  {[...Array(14)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      animate={{ 
                                        height: isActive && candidateState === "answering" 
                                          ? [6, Math.max(8, Math.sin(i * 0.9) * 44), 6] 
                                          : 6 
                                      }}
                                      transition={{ 
                                        duration: 0.4 + (i % 4) * 0.08, 
                                        repeat: Infinity, 
                                        ease: "easeInOut" 
                                      }}
                                      className="w-1 bg-accent-blue/80 rounded-full"
                                    />
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}

                        </AnimatePresence>
                      </div>

                    </div>
                  </div>

                </div>
              </motion.div>
            ) : (
              /* TAB 2: EVALUATION DOSSIER SUMMARY VIEW */
              <motion.div
                key="dossier-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <div className="max-w-4xl mx-auto w-full space-y-8 py-4 text-left">
                  
                  <div className="flex justify-between items-start border-b border-white/5 pb-6">
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-accent-blue bg-accent-blue/10 border border-accent-blue/20 px-3 py-1.5 rounded-xl uppercase">
                        Evaluation Dossier
                      </span>
                      <h1 className="text-2xl font-black tracking-tight text-white mt-4">
                        Alex Chen Dossier Profile
                      </h1>
                      <p className="text-[10px] text-gray-500 font-mono mt-1">
                        Compiled dynamically by Zai AI Interviewer node-us-east-eval
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab("workspace")}
                      className="px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-xs font-bold rounded-xl transition-all cursor-pointer shadow"
                    >
                      Return to Workspace
                    </button>
                  </div>

                  {/* Rating parameters grids */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card rounded-2xl p-6 border-white/10 bg-black/40 text-left space-y-3">
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Systems Competence</span>
                      <div className="text-4xl font-extrabold text-white font-mono">
                        9.2 <span className="text-xs text-gray-500 font-normal">/ 10</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Alex demonstrated strong system architecture logic under structural probing. Answered connection pooling & PG replica queries perfectly.
                      </p>
                    </div>

                    <div className="glass-card rounded-2xl p-6 border-white/10 bg-black/40 text-left space-y-3">
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Composure index</span>
                      <div className="text-4xl font-extrabold text-accent-cyan font-mono">
                        8.5 <span className="text-xs text-gray-500 font-normal">/ 10</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Composure index stabilized rapidly after temporary cardiac spikes (98 BPM logged during PostgreSQL deadlock prompt injection).
                      </p>
                    </div>

                    <div className="glass-card rounded-2xl p-6 border-white/10 bg-black/40 text-left space-y-3">
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Speech & Prosody</span>
                      <div className="text-4xl font-extrabold text-accent-emerald font-mono">
                        8.8 <span className="text-xs text-gray-500 font-normal">/ 10</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Vocal pacing average: 134 WPM. Filler words frequency remained within standard bands (only 2 instances logged).
                      </p>
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-6 border-white/5 bg-black/30 text-left space-y-4">
                    <h3 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase">
                      AI Dossier Analysis Summary
                    </h3>
                    <div className="space-y-3 text-xs text-gray-300 leading-relaxed">
                      <p>
                        <strong>1. Systems Engineering Assessment:</strong> Candidate presented an optimal approach to transactional scale-out constraints. Answer structures show high objective thinking patterns. Mutex locks constraints were successfully evaluated.
                      </p>
                      <p>
                        <strong>2. Biological composure telemetry:</strong> PPG face coordinate scanning registered zero cognitive load deviation or micro-expression hesitation marks. Voice tension metrics logged optimal levels.
                      </p>
                      <p>
                        <strong>3. Final Recommendation:</strong> Strong hire. Candidate demonstrates architectural familiarity with high-concurrency connection limitations and recovers well under deadlock stress triggers.
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. FLOATING SIMULATION CONTROL CAPSULE */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[85%] max-w-4xl select-none">
            <div className="glass-card shadow-2xl rounded-3xl border border-white/15 p-4 flex flex-col md:flex-row gap-4 items-center justify-between backdrop-blur-2xl bg-black/75">
              
              {/* Left Playback controls */}
              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start shrink-0">
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={isActive ? stopSimulation : startSimulation}
                    className={`p-3.5 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-accent-coral hover:bg-rose-600 shadow-rose-500/20"
                        : "bg-accent-blue hover:bg-blue-600 shadow-blue-500/20"
                    } shadow-lg cursor-pointer shrink-0 border border-white/10`}
                    title={isActive ? "Pause Interview" : "Simulate Live Interview"}
                  >
                    {isActive ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                  </button>
                  <button
                    onClick={() => {
                      resetSimulation();
                      setTerminalOutput([
                        "TensorGo Node compiler initialized.",
                        "Target environment: Node20-x86_64.",
                        "Ready to compile connection pooler logic..."
                      ]);
                      setIsStressInjected(false);
                      setCode(CODING_PROMPT);
                    }}
                    className="p-3.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-full transition-all border border-white/5 cursor-pointer shrink-0 shadow"
                    title="Reset Simulation"
                  >
                    <RotateCcw size={18} />
                  </button>
                </div>

                <div className="h-8 w-px bg-white/10 hidden md:block shrink-0" />

                {/* Time & State display */}
                <div className="text-left shrink-0">
                  <div className="text-[10px] text-gray-400 font-mono tracking-wider uppercase flex items-center gap-1.5 font-semibold">
                    <span className={`inline-block w-2 h-2 rounded-full ${isActive ? "bg-accent-emerald animate-pulse" : "bg-gray-500"}`} />
                    {candidateState === "connecting" && "Establishing Stream..."}
                    {candidateState === "listening" && "Capturing Audio..."}
                    {candidateState === "answering" && "Analyzing Telemetry"}
                    {candidateState === "complete" && "Finished"}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold font-mono tracking-tight text-white leading-none">
                      {formatTime(elapsedTime)}
                    </span>
                    {isActive && candidateState === "answering" && (
                      <span className="text-[10px] text-accent-coral font-mono animate-pulse font-semibold">
                        {isStressInjected && elapsedTime >= 105 && elapsedTime <= 125 
                          ? "104" 
                          : biometrics.heartRate} BPM | Stress: {isStressInjected && elapsedTime >= 105 && elapsedTime <= 125 ? "84" : biometrics.stressIndex}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right simulation actions */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end shrink-0">
                <button
                  onClick={handleTriggerStress}
                  disabled={!isActive || isStressInjected}
                  className={`px-4 py-2.5 border border-accent-coral/20 hover:border-accent-coral/45 text-accent-coral disabled:opacity-40 text-xs font-bold font-mono rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow ${
                    isStressInjected ? "bg-accent-coral/10" : "bg-accent-coral/5 hover:bg-accent-coral/10"
                  }`}
                  title="Simulates PostgreSQL node deadlock failover."
                >
                  <ShieldAlert size={15} className={isStressInjected ? "animate-pulse text-[#f43f5e]" : ""} />
                  <span>INJECT STRESS PROMPT</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab(activeTab === "workspace" ? "dossier" : "workspace");
                  }}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl transition-all border border-white/10 cursor-pointer shadow"
                >
                  {activeTab === "workspace" ? "COMPILE DOSSIER" : "WORKSPACE"}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function WorkspacePage() {
  return (
    <SimulationProvider>
      <WorkspaceContent />
    </SimulationProvider>
  );
}
