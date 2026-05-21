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
  ActivitySquare
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
  const [activeTab, setActiveTab] = useState<"workspace" | "insights" | "dossier">("workspace");

  // Pane A (Left Column Tabs): video or code
  const [leftTab, setLeftTab] = useState<"video" | "code">("video");

  // Pane B (Right Column Tabs): biometrics or transcript
  const [rightTab, setRightTab] = useState<"biometrics" | "transcript">("biometrics");

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
  const [customEvents, setCustomEvents] = useState<typeof timelineEvents>([]);

  // Local heart rate scrolling history
  const [hrHistory, setHrHistory] = useState<number[]>([72, 74, 73, 76, 75, 74, 76, 75, 78, 77, 76, 75, 74]);

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
    // Outline face contour (jawline)
    for (let i = 0; i <= 10; i++) {
      points.push({ x: 20 + i * 6, y: 55 + Math.pow(i - 5, 2) * 1.1 });
    }
    // Eyebrows
    points.push({ x: 30, y: 32 }, { x: 37, y: 28 }, { x: 44, y: 30 });
    points.push({ x: 56, y: 30 }, { x: 63, y: 28 }, { x: 70, y: 32 });
    // Eyes
    points.push({ x: 34, y: 38 }, { x: 40, y: 38 });
    points.push({ x: 60, y: 38 }, { x: 66, y: 38 });
    // Nose bridge and base
    points.push({ x: 50, y: 35 }, { x: 50, y: 44 }, { x: 46, y: 48 }, { x: 54, y: 48 });
    // Mouth
    points.push({ x: 38, y: 65 }, { x: 44, y: 62 }, { x: 50, y: 64 }, { x: 56, y: 62 }, { x: 62, y: 65 });
    points.push({ x: 56, y: 69 }, { x: 50, y: 70 }, { x: 44, y: 69 });
    return points;
  });

  // Track HR history scroll
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
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive, biometrics.heartRate, isStressInjected, elapsedTime]);

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
        "Executing connection dry-run on sandbox postgres-mock-server...",
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
    // Push terminal logs of connection failure
    setTerminalOutput(prev => [
      ...prev,
      "🚨 SYSTEM DIAGNOSTICS: PostgreSQL network deadlock injection requested.",
      "Primary database port [5432] latency spike: > 2400ms.",
      "AcquireConnection mutex lock threshold exceeded! Exposing failover state to Candidate..."
    ]);
  };

  // SVG PPG Heart Rate line chart path
  const getHrGraphPath = () => {
    const width = 340;
    const height = 90;
    const padding = 10;
    const maxVal = isStressInjected ? 120 : 100;
    const minVal = 60;

    const points = hrHistory.map((val, idx) => {
      const x = (idx / (hrHistory.length - 1)) * (width - padding * 2) + padding;
      const ratio = (val - minVal) / (maxVal - minVal);
      const y = height - ratio * (height - padding * 2) - padding;
      return `${x},${y}`;
    });

    return `M ${points.join(" L ")}`;
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-[#f5f5f7] flex overflow-hidden relative">
      
      {/* Background spotlights */}
      <div className="absolute inset-0 pointer-events-none radial-bg opacity-30 z-0" />
      
      {/* 1. SIDEBAR (Collapsible UI representation) */}
      <aside className="w-16 bg-black border-r border-white/5 flex flex-col items-center justify-between py-6 z-10 shrink-0 select-none">
        <div className="flex flex-col items-center gap-8 w-full">
          {/* Brand Logo */}
          <div className="flex flex-col items-center">
            <span className="text-white font-extrabold text-[13px] tracking-tight">Hum</span>
            <div className="w-6 h-6 rounded-lg bg-accent-blue flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-blue-500/20">
              A
            </div>
          </div>

          {/* Sidebar icons */}
          <nav className="flex flex-col items-center gap-4 w-full">
            <button
              onClick={() => setActiveTab("workspace")}
              className={`p-3 rounded-xl transition-all cursor-pointer relative ${
                activeTab === "workspace"
                  ? "bg-white/5 border border-white/10 text-accent-blue shadow"
                  : "text-gray-500 hover:text-white"
              }`}
              title="Interview Assessment Dashboard"
            >
              <Activity size={18} />
              {activeTab === "workspace" && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-accent-blue rounded-r" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("insights")}
              className={`p-3 rounded-xl transition-all cursor-pointer relative ${
                activeTab === "insights"
                  ? "bg-white/5 border border-white/10 text-accent-cyan shadow"
                  : "text-gray-500 hover:text-white"
              }`}
              title="IDE Code Sandbox compiler"
            >
              <Code size={18} />
              {activeTab === "insights" && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-accent-cyan rounded-r" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("dossier")}
              className={`p-3 rounded-xl transition-all cursor-pointer relative ${
                activeTab === "dossier"
                  ? "bg-white/5 border border-white/10 text-accent-emerald shadow"
                  : "text-gray-500 hover:text-white"
              }`}
              title="Dossier Evaluation summary"
            >
              <BarChart2 size={18} />
              {activeTab === "dossier" && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-accent-emerald rounded-r" />
              )}
            </button>
          </nav>
        </div>

        {/* Bottom avatar */}
        <div className="flex flex-col items-center gap-4">
          <button className="p-2.5 rounded-xl text-gray-500 hover:text-white transition-colors cursor-pointer">
            <Settings size={18} />
          </button>
          <div className="w-8 h-8 rounded-full bg-accent-blue/15 border border-accent-blue/30 flex items-center justify-center text-accent-blue text-xs font-bold font-mono">
            AC
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTAINER SHELL */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        
        {/* Workspace top header */}
        <header className="h-16 bg-black/40 border-b border-white/5 px-6 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-lg border border-white/5 bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer hover:scale-105"
              title="Return to Landing Page"
            >
              <Home size={14} />
            </Link>
            <div className="h-4 w-[1px] bg-white/10" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white">Alex Chen</span>
                <span className="text-[10px] font-mono font-bold bg-accent-blue/10 border border-accent-blue/20 text-accent-blue px-2 py-0.5 rounded-full">
                  Systems Engineer
                </span>
                <span className="text-[10px] font-mono text-gray-500">ID: zai-eval-9092</span>
              </div>
            </div>
          </div>

          {/* Connection metrics & controller summary */}
          <div className="flex items-center gap-4">
            {/* Connection state */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-gray-400 font-mono">
              <span className={`h-1.5 w-1.5 rounded-full bg-accent-emerald ${isActive ? "animate-pulse" : ""}`} />
              <span>Zai Status: {isActive ? `ACTIVE (${candidateState})` : "STANDBY"}</span>
            </div>

            {/* Time ticking */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-gray-300">
              <span>Time:</span>
              <span className="font-bold text-white bg-white/5 border border-white/15 px-2.5 py-1 rounded-lg">
                {formatTime(elapsedTime)}
              </span>
            </div>
          </div>
        </header>

        {/* TAB 1: WORKSPACE TAB (Double Pane console grid) */}
        <div className="flex-grow flex overflow-hidden min-w-0">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
            
            {/* PANE A: Left-hand Side - Video Feed or IDE Sandbox (7 cols) */}
            <div className="lg:col-span-7 border-r border-white/5 flex flex-col overflow-hidden bg-black/20">
              
              {/* Left Pane tab selectors */}
              <div className="h-12 bg-black/40 border-b border-white/5 flex items-center justify-between px-4 shrink-0 select-none">
                <div className="flex gap-2 text-xs font-mono">
                  <button
                    onClick={() => setLeftTab("video")}
                    className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      leftTab === "video"
                        ? "bg-accent-blue/10 border-accent-blue/30 text-white font-bold"
                        : "border-transparent text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    Video Telemetry Feed
                  </button>
                  <button
                    onClick={() => setLeftTab("code")}
                    className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      leftTab === "code"
                        ? "bg-accent-blue/10 border-accent-blue/30 text-white font-bold"
                        : "border-transparent text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    Interactive IDE Sandbox
                  </button>
                </div>

                {leftTab === "code" && (
                  <button
                    onClick={handleCompileCode}
                    disabled={isCompiling}
                    className="px-3 py-1 bg-accent-blue hover:bg-blue-600 disabled:opacity-50 text-white text-[10px] font-bold font-mono rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow"
                  >
                    <Zap size={11} className={isCompiling ? "animate-spin" : ""} />
                    <span>{isCompiling ? "COMPILING..." : "COMPILE & RUN"}</span>
                  </button>
                )}
              </div>

              {/* Left Pane Content display */}
              <div className="flex-1 overflow-hidden min-h-0 relative">
                <AnimatePresence mode="wait">
                  
                  {/* Left Option 1: Live Video feed mockup */}
                  {leftTab === "video" && (
                    <motion.div
                      key="left-video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-full p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
                    >
                      {/* Video Feed 1: Zai Interviewer */}
                      <div className="border border-white/5 rounded-2xl bg-black/60 relative aspect-video md:aspect-auto md:h-full overflow-hidden flex flex-col justify-end p-4 group shadow-lg">
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
                          {isActive && candidateState !== "connecting" ? (
                            <div className="absolute inset-0 bg-[#020617] flex flex-col items-center justify-center gap-4">
                              {/* Robot/Agent visual placeholder */}
                              <div className="w-24 h-24 rounded-full border border-accent-blue/20 bg-accent-blue/5 flex items-center justify-center relative shadow-inner">
                                <Cpu size={36} className="text-accent-blue animate-pulse" />
                                <div className="absolute inset-0 rounded-full border border-dashed border-accent-blue/30 animate-spin" style={{ animationDuration: '40s' }} />
                              </div>
                              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                Telemetry Active
                              </span>
                            </div>
                          ) : (
                            <div className="text-gray-600 font-mono text-xs flex flex-col items-center gap-2">
                              <Cpu size={24} className="text-gray-500" />
                              <span>ZAI STREAM STANDBY</span>
                            </div>
                          )}
                        </div>

                        {/* Floating tag */}
                        <div className="absolute bottom-4 left-4 z-10 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white flex items-center gap-1.5">
                          <span className={`h-1.5 w-1.5 rounded-full ${candidateState === "listening" ? "bg-accent-blue animate-pulse" : "bg-gray-500"}`} />
                          <span>ZAI (Digital Agent)</span>
                        </div>
                      </div>

                      {/* Video Feed 2: Candidate Webcam */}
                      <div className="border border-white/5 rounded-2xl bg-black/60 relative aspect-video md:aspect-auto md:h-full overflow-hidden flex flex-col justify-end p-4 group shadow-lg">
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
                          {isActive && candidateState !== "connecting" ? (
                            <div className="absolute inset-0 bg-[#090d16] flex items-center justify-center overflow-hidden">
                              
                              {/* Face vector scanning overlay */}
                              <div className="relative w-44 h-44 rounded-full border border-white/5 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border border-dashed border-accent-cyan/20 animate-spin" style={{ animationDuration: '30s' }} />
                                
                                {/* Dynamic SVG Mesh dots */}
                                <svg className="absolute inset-0 w-full h-full text-accent-cyan opacity-40" viewBox="0 0 100 100">
                                  {/* Face contours */}
                                  <path
                                    d={`M 20,55 Q 50,75 80,55`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="0.2"
                                  />
                                  <path
                                    d={`M 30,32 Q 50,42 70,32`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="0.2"
                                  />
                                  
                                  {faceLandmarks.map((pt, i) => {
                                    const jitter = meshJitter[i] || { dx: 0, dy: 0 };
                                    return (
                                      <circle
                                        key={i}
                                        cx={pt.x + jitter.dx}
                                        cy={pt.y + jitter.dy}
                                        r={1.2}
                                        fill={i === 12 || i === 13 ? "#f43f5e" : "#06b6d4"}
                                        className="transition-all duration-300"
                                      />
                                    );
                                  })}
                                </svg>
                                <svg className="w-16 h-16 text-white/5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                              </div>

                              {/* Scanning lines */}
                              {candidateState === "answering" && (
                                <div className="absolute top-0 left-0 w-full h-[8%] bg-gradient-to-b from-accent-cyan/15 to-transparent border-b border-accent-cyan/30 animate-scan pointer-events-none" />
                              )}
                            </div>
                          ) : (
                            <div className="text-gray-600 font-mono text-xs flex flex-col items-center gap-2">
                              <User size={24} className="text-gray-500" />
                              <span>CANDIDATE WEBCAM STANDBY</span>
                            </div>
                          )}
                        </div>

                        {/* Floating webcam tag */}
                        <div className="absolute bottom-4 left-4 z-10 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white flex items-center gap-1.5">
                          <span className={`h-1.5 w-1.5 rounded-full ${candidateState === "answering" ? "bg-accent-coral animate-ping" : "bg-gray-500"}`} />
                          <span>ALEX CHEN (Candidate)</span>
                        </div>
                      </div>

                    </motion.div>
                  )}

                  {/* Left Option 2: Live typeable Code IDE Editor */}
                  {leftTab === "code" && (
                    <motion.div
                      key="left-code"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-full flex flex-col overflow-hidden"
                    >
                      {/* Code Area */}
                      <div className="flex-1 overflow-auto p-4 font-mono text-xs text-gray-300 relative bg-black/40">
                        {/* Editor Lines layout */}
                        <div className="absolute left-0 top-0 bottom-0 w-10 bg-black/20 border-r border-white/5 select-none text-right pr-3 pt-4 text-gray-600 space-y-[4px]">
                          {Array.from({ length: 32 }).map((_, idx) => (
                            <div key={idx}>{idx + 1}</div>
                          ))}
                        </div>

                        {/* Textarea code inputs */}
                        <textarea
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          className="w-full h-full pl-10 pr-4 bg-transparent text-gray-300 focus:outline-none resize-none font-mono text-xs leading-relaxed space-y-[4px]"
                          spellCheck={false}
                        />
                      </div>

                      {/* Integrated Terminal Console */}
                      <div className="h-44 border-t border-white/5 bg-[#030303] flex flex-col overflow-hidden font-mono text-[10px]">
                        <div className="h-8 bg-black/60 border-b border-white/5 px-4 flex items-center justify-between text-gray-500 select-none">
                          <span className="flex items-center gap-1.5">
                            <Terminal size={12} />
                            COMPILER CONSOLE
                          </span>
                          <span>Line Check: 200/5000 W</span>
                        </div>

                        {/* Logs streams */}
                        <div ref={logContainerRef} className="flex-1 p-3 overflow-y-auto space-y-1 text-gray-400">
                          {terminalOutput.map((out, idx) => (
                            <div key={idx} className="flex gap-2">
                              <span className="text-accent-blue select-none">&gt;</span>
                              <span className={out.includes("✔") ? "text-accent-emerald font-bold" : out.includes("🚨") ? "text-accent-coral" : ""}>{out}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>

            {/* PANE B: Right-hand Side - Biometrics or Transcripts (5 cols) */}
            <div className="lg:col-span-5 flex flex-col overflow-hidden bg-black/40">
              
              {/* Right Pane Tab selectors */}
              <div className="h-12 bg-black/40 border-b border-white/5 flex items-center px-4 gap-2 shrink-0 select-none">
                <div className="flex gap-2 text-xs font-mono">
                  <button
                    onClick={() => setRightTab("biometrics")}
                    className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      rightTab === "biometrics"
                        ? "bg-accent-blue/10 border-accent-blue/30 text-white font-bold"
                        : "border-transparent text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    Vocal & Biometrics
                  </button>
                  <button
                    onClick={() => setRightTab("transcript")}
                    className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      rightTab === "transcript"
                        ? "bg-accent-blue/10 border-accent-blue/30 text-white font-bold"
                        : "border-transparent text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    Live Diarized Transcript
                  </button>
                </div>
              </div>

              {/* Right Pane Content area */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 min-w-0">
                <AnimatePresence mode="wait">
                  
                  {/* Right Option 1: Telemetry biometrics */}
                  {rightTab === "biometrics" && (
                    <motion.div
                      key="right-biometrics"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6 text-left"
                    >
                      {/* Heart rate monitor line graph */}
                      <div className="glass-card rounded-2xl p-5 border-white/5 bg-black/30">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-[10px] font-bold font-mono tracking-widest text-gray-400 uppercase">
                            PPG Heart Rate Graph (Facial Sensor)
                          </h4>
                          <span className={`text-[10px] font-mono bg-accent-coral/10 border border-accent-coral/20 px-2 py-0.5 rounded text-accent-coral font-bold flex items-center gap-1`}>
                            <Heart size={10} className={isActive ? "animate-pulse text-accent-coral" : ""} />
                            {isStressInjected && elapsedTime >= 105 && elapsedTime <= 125 
                              ? "104 BPM (DEADLOCK SPIKE)" 
                              : `${biometrics.heartRate} BPM`}
                          </span>
                        </div>

                        {/* SVG cardiac flow graph */}
                        <div className="h-24 bg-black border border-white/5 rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
                          <svg className="w-full h-full text-accent-coral" viewBox="0 0 340 90" preserveAspectRatio="none">
                            {/* Grid markers */}
                            <line x1="0" y1="22" x2="340" y2="22" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            <line x1="0" y1="45" x2="340" y2="45" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            <line x1="0" y1="67" x2="340" y2="67" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            <motion.path
                              d={getHrGraphPath()}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Analytics details grid */}
                      <div className="grid grid-cols-2 gap-4">
                        
                        {/* Stress levels */}
                        <div className="glass-card rounded-2xl p-4 border-white/5 bg-black/20 flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] font-bold text-gray-500 font-mono uppercase tracking-wider block">Stress Load Index</span>
                            <div className="text-lg font-extrabold text-white font-mono mt-1">
                              {isStressInjected && elapsedTime >= 105 && elapsedTime <= 125 ? 84 : biometrics.stressIndex}%
                            </div>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-3">
                            <motion.div
                              className="bg-accent-coral h-full rounded-full"
                              animate={{ width: `${isStressInjected && elapsedTime >= 105 && elapsedTime <= 125 ? 84 : biometrics.stressIndex}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </div>

                        {/* Speaking velocity */}
                        <div className="glass-card rounded-2xl p-4 border-white/5 bg-black/20 flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] font-bold text-gray-500 font-mono uppercase tracking-wider block">Speech Velocity</span>
                            <div className="text-lg font-extrabold text-white font-mono mt-1">
                              {audio.speakingRate} <span className="text-xs font-normal text-gray-500">WPM</span>
                            </div>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-3">
                            <motion.div
                              className="bg-accent-blue h-full rounded-full"
                              animate={{ width: `${(audio.speakingRate / 220) * 100}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </div>

                        {/* Filler word counts */}
                        <div className="glass-card rounded-2xl p-4 border-white/5 bg-black/20 flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] font-bold text-gray-500 font-mono uppercase tracking-wider block">Filler Words count</span>
                            <div className="text-lg font-extrabold text-white font-mono mt-1">
                              {audio.fillerWords} <span className="text-[10px] font-normal text-gray-500">instances</span>
                            </div>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-3">
                            <motion.div
                              className="bg-accent-cyan h-full rounded-full"
                              animate={{ width: `${Math.min(100, (audio.fillerWords / 12) * 100)}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </div>

                        {/* Respiration index */}
                        <div className="glass-card rounded-2xl p-4 border-white/5 bg-black/20 flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] font-bold text-gray-500 font-mono uppercase tracking-wider block">Respiration Rate</span>
                            <div className="text-lg font-extrabold text-white font-mono mt-1">
                              {isStressInjected && elapsedTime >= 105 && elapsedTime <= 125 ? 22 : 14 + (elapsedTime % 3)} <span className="text-xs font-normal text-gray-500">brpm</span>
                            </div>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-3">
                            <motion.div
                              className="bg-accent-emerald h-full rounded-full"
                              animate={{ width: `${((isStressInjected && elapsedTime >= 105 && elapsedTime <= 125 ? 22 : 14 + (elapsedTime % 3)) / 30) * 100}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </div>

                      </div>

                      {/* Signal diagnostics */}
                      <div className="glass-card rounded-2xl p-5 border-white/5 bg-black/20 space-y-3 font-mono text-[10px] text-gray-400">
                        <h4 className="font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Server size={12} className="text-accent-cyan" />
                          WebRTC stream channels
                        </h4>
                        
                        <div className="flex justify-between py-1.5 border-b border-white/5">
                          <span>Video latency (Network):</span>
                          <span className="text-white font-bold">38ms</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-white/5">
                          <span>Vocal amplitude spectrum:</span>
                          <span className="text-accent-emerald font-bold">CLEAN (60Hz cutoff)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>SOC-2 telemetry proxy:</span>
                          <span className="text-accent-emerald font-bold">SECURED</span>
                        </div>
                      </div>

                    </motion.div>
                  )}

                  {/* Right Option 2: Live Transcript timeline */}
                  {rightTab === "transcript" && (
                    <motion.div
                      key="right-transcript"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4 text-left font-mono text-xs"
                    >
                      <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                        <ActivitySquare size={12} />
                        Speaker Diarization stream
                      </h4>

                      <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                        {currentEventsList.map((ev, idx) => {
                          const isActiveSpeaker = activeTimelineIndex === idx;
                          return (
                            <div
                              key={ev.id}
                              className={`p-3 rounded-xl border transition-all ${
                                isActiveSpeaker
                                  ? "bg-white/5 border-white/15 shadow-md"
                                  : "border-transparent bg-transparent opacity-75"
                              }`}
                            >
                              <div className="flex items-center justify-between text-[9px] text-gray-500 mb-1">
                                <span className={ev.speaker === "Zai" ? "text-accent-blue font-bold" : "text-white font-bold"}>
                                  {ev.speaker.toUpperCase()}
                                </span>
                                <span>{ev.time}</span>
                              </div>
                              <p className="text-[11px] text-gray-300 leading-relaxed font-sans">
                                {ev.text}
                              </p>
                              
                              {/* Annotations loops */}
                              {ev.annotation && (
                                <div className="mt-2 text-[9px] font-mono text-accent-coral flex items-center gap-1 bg-accent-coral/5 border border-accent-coral/10 py-1 px-2 rounded-lg">
                                  <AlertCircle size={10} />
                                  <span>{ev.annotation}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>

        {/* TAB 2: DOSSIER TABS (Compiling candidate ratings) */}
        {activeTab === "dossier" && (
          <div className="absolute inset-0 bg-[#050505] z-20 flex flex-col p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full space-y-8 py-6">
              
              {/* Dossier top header */}
              <div className="flex justify-between items-start border-b border-white/5 pb-6">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-accent-blue bg-accent-blue/10 border border-accent-blue/20 px-3 py-1 rounded-full uppercase">
                    Evaluation Dossier
                  </span>
                  <h1 className="text-3xl font-extrabold tracking-tight text-white mt-4">
                    Alex Chen Dossier Profile
                  </h1>
                  <p className="text-xs text-gray-500 font-mono mt-1">
                    Compiled dynamically by Zai AI Interviewer node-us-east-eval
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("workspace")}
                  className="px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Return to Workspace
                </button>
              </div>

              {/* Cognitive evaluation grids */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Tech Core grade */}
                <div className="glass-card rounded-2xl p-6 border-white/10 bg-black/40 text-left space-y-3">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Systems Competence</span>
                  <div className="text-4xl font-extrabold text-white font-mono">
                    9.2 <span className="text-xs text-gray-500 font-normal">/ 10</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Alex demonstrated strong system architecture logic under structural probing. Answered connection pooling & PG replica queries perfectly.
                  </p>
                </div>

                {/* Composure grade */}
                <div className="glass-card rounded-2xl p-6 border-white/10 bg-black/40 text-left space-y-3">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Composure index</span>
                  <div className="text-4xl font-extrabold text-accent-cyan font-mono">
                    8.5 <span className="text-xs text-gray-500 font-normal">/ 10</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Composure index stabilized rapidly after temporary cardiac spikes (98 BPM logged during PostgreSQL deadlock prompt injection).
                  </p>
                </div>

                {/* Communication index */}
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

              {/* Deep Telemetry findings */}
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
          </div>
        )}

        {/* 3. WORKSPACE CONTROLLER BOTTOM BAR */}
        <footer className="h-20 bg-black border-t border-white/5 px-6 flex items-center justify-between shrink-0 z-10 select-none">
          {/* Play/Pause controls */}
          <div className="flex items-center gap-2">
            {!isActive ? (
              <button
                onClick={startSimulation}
                className="px-4 py-2 bg-accent-blue hover:bg-blue-600 text-white font-semibold rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all shadow cursor-pointer border border-blue-400/20"
              >
                <Play size={12} className="fill-white" />
                <span>Start Assessment</span>
              </button>
            ) : (
              <button
                onClick={stopSimulation}
                className="px-4 py-2 bg-accent-coral hover:bg-rose-600 text-white font-semibold rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all shadow cursor-pointer border border-rose-400/20"
              >
                <Pause size={12} className="fill-white" />
                <span>Pause Assessment</span>
              </button>
            )}

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
              className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl text-xs font-semibold text-gray-300 hover:text-white transition-all cursor-pointer"
              title="Reset Assessment"
            >
              <RotateCcw size={12} />
            </button>
          </div>

          {/* Interactive product thinking trigger: Inject DB Deadlocks */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerStress}
              disabled={!isActive || isStressInjected}
              className="px-4 py-2 border border-accent-coral/30 hover:border-accent-coral/50 bg-accent-coral/5 hover:bg-accent-coral/10 text-accent-coral disabled:opacity-40 text-xs font-bold font-mono rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow"
              title="Simulates PostgreSQL node deadlock failover to analyze composure recovery."
            >
              <ShieldAlert size={14} className={isStressInjected ? "animate-pulse" : ""} />
              <span>INJECT STRESS PROMPT</span>
            </button>

            <button
              onClick={() => setActiveTab("dossier")}
              className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl transition-all border border-white/10 cursor-pointer"
            >
              COMPILE DOSSIER
            </button>
          </div>
        </footer>

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
