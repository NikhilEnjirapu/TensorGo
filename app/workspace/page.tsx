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

interface LiveCandidate {
  id: string;
  name: string;
  role: string;
  sessionCode: string;
  initials: string;
  avatarColor: string;
  email: string;
}

interface CandidateDossier {
  name: string;
  role: string;
  sessionCode: string;
  date: string;
  systemsCompetence: number;
  composureIndex: number;
  speechProsody: number;
  summaryText: string;
  recommendText: string;
}

const LIVE_CANDIDATES: LiveCandidate[] = [
  {
    id: "alex-chen",
    name: "Alex Chen",
    role: "Systems Engineer",
    sessionCode: "ZAI-9092",
    initials: "AC",
    avatarColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    email: "alex.chen@tensorgo.com"
  },
  {
    id: "sophia-rodriguez",
    name: "Sophia Rodriguez",
    role: "AI Research Lead",
    sessionCode: "ZAI-8831",
    initials: "SR",
    avatarColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    email: "sophia.rod@tensorgo.com"
  },
  {
    id: "david-kim",
    name: "David Kim",
    role: "Fullstack Engineer",
    sessionCode: "ZAI-8199",
    initials: "DK",
    avatarColor: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    email: "david.kim@tensorgo.com"
  }
];

const CANDIDATE_DOSSIERS: Record<string, CandidateDossier> = {
  "alex-chen": {
    name: "Alex Chen",
    role: "Systems Engineer",
    sessionCode: "ZAI-9092",
    date: "21 May 2026",
    systemsCompetence: 9.2,
    composureIndex: 8.5,
    speechProsody: 8.8,
    summaryText: "Alex demonstrated strong system architecture logic under structural probing. Answered connection pooling & PG replica queries perfectly. Composure index stabilized rapidly after temporary cardiac spikes (98 BPM logged during PostgreSQL deadlock prompt injection). Vocal pacing average: 134 WPM. Filler words frequency remained within standard bands (only 2 instances logged).",
    recommendText: "Strong hire. Candidate demonstrates architectural familiarity with high-concurrency connection limitations and recovers well under deadlock stress triggers."
  },
  "marcus-vance": {
    name: "Marcus Vance",
    role: "Backend Engineer",
    sessionCode: "ZAI-8722",
    date: "20 May 2026",
    systemsCompetence: 8.4,
    composureIndex: 7.9,
    speechProsody: 8.2,
    summaryText: "Marcus showed solid API design fundamentals, though database scaling concepts were slightly surface-level. Composure index dipped under edge-case concurrency queries, but recovered. Vocal pace was steady at 120 WPM, with minor filler words.",
    recommendText: "Leaning hire. Strong coder with good implementation speed. Needs minor mentorship on distributed state management."
  },
  "elena-rostova": {
    name: "Elena Rostova",
    role: "Machine Learning Engineer",
    sessionCode: "ZAI-7649",
    date: "19 May 2026",
    systemsCompetence: 9.5,
    composureIndex: 9.1,
    speechProsody: 9.0,
    summaryText: "Elena exhibited masterful grasp of distributed transformer architectures and model parallelism shards. Composure remained exceptionally stable under complex mathematical stress injectors. Speech structure was articulate, pacing 128 WPM.",
    recommendText: "Strong hire. Exceptional technical depth in model deployment and cluster orchestrations under load."
  },
  "jordan-brooks": {
    name: "Jordan Brooks",
    role: "Product Manager",
    sessionCode: "ZAI-6211",
    date: "18 May 2026",
    systemsCompetence: 7.8,
    composureIndex: 8.8,
    speechProsody: 9.5,
    summaryText: "Jordan communicated system prioritization and product-focused constraints flawlessly. Technical depth was sufficient for high-level trade-offs, though hands-on pool optimization logic was skipped. High vocal confidence, 0 filler words, 140 WPM pacing.",
    recommendText: "Hire. Excellent communicator who bridges systems engineering and stakeholder priorities. Good under high cognitive stress."
  },
  "sarah-jenkins": {
    name: "Sarah Jenkins",
    role: "Security Architect",
    sessionCode: "ZAI-5512",
    date: "17 May 2026",
    systemsCompetence: 9.0,
    composureIndex: 9.4,
    speechProsody: 8.7,
    summaryText: "Sarah highlighted robust threat models for pool routing, PostgreSQL permission hierarchies, and replica SSL parameters. Responded to network hijack simulation prompts with highly composed, detailed mitigation steps. Tone remained calm and professional.",
    recommendText: "Strong hire. Deep systems security knowledge, highly calm under emergency response scenarios."
  },
  "hiroshi-tanaka": {
    name: "Hiroshi Tanaka",
    role: "DevOps Engineer",
    sessionCode: "ZAI-4322",
    date: "16 May 2026",
    systemsCompetence: 8.8,
    composureIndex: 8.2,
    speechProsody: 8.1,
    summaryText: "Hiroshi excelled at configuring PgBouncer config limits, Prometheus alert rules, and automated failovers. Stress index increased moderately during disk IOPS exhaustion injection, but recovered. Verbal presentation was brief but highly factual.",
    recommendText: "Hire. Reliable systems automation focus with solid operational execution under node pressure."
  }
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
  const [activeTab, setActiveTab] = useState<"workspace" | "dossier" | "dashboard">("dashboard");

  // selected candidate dossier id
  const [selectedDossierCandidate, setSelectedDossierCandidate] = useState<string>("alex-chen");

  // selected live candidate
  const [selectedLiveCandidate, setSelectedLiveCandidate] = useState<LiveCandidate>(LIVE_CANDIDATES[0]);

  // Search & filter states for completed list
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const completedSessions = [
    { id: "alex-chen", name: "Alex Chen", role: "Systems Engineer", department: "Systems Design", date: "21 May 2026", composure: 8.5, techRating: 9.2, liveness: 99.4, initials: "AC" },
    { id: "marcus-vance", name: "Marcus Vance", role: "Backend Engineer", department: "Software Engineering", date: "20 May 2026", composure: 7.9, techRating: 8.4, liveness: 99.2, initials: "MV" },
    { id: "elena-rostova", name: "Elena Rostova", role: "Machine Learning Engineer", department: "Software Engineering", date: "19 May 2026", composure: 9.1, techRating: 9.5, liveness: 99.8, initials: "ER" },
    { id: "jordan-brooks", name: "Jordan Brooks", role: "Product Manager", department: "Product Management", date: "18 May 2026", composure: 8.8, techRating: 7.8, liveness: 99.1, initials: "JB" },
    { id: "sarah-jenkins", name: "Sarah Jenkins", role: "Security Architect", department: "Systems Design", date: "17 May 2026", composure: 9.4, techRating: 9.0, liveness: 99.6, initials: "SJ" },
    { id: "hiroshi-tanaka", name: "Hiroshi Tanaka", role: "DevOps Engineer", department: "Systems Design", date: "16 May 2026", composure: 8.2, techRating: 8.8, liveness: 99.5, initials: "HT" }
  ];

  const filteredSessions = completedSessions.filter(session => {
    const matchesSearch = session.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          session.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = roleFilter === "All" || session.department === roleFilter;
    return matchesSearch && matchesFilter;
  });


  // Left Column Tabs: video or code sandbox
  const [leftTab, setLeftTab] = useState<"video" | "code">("video");

  // Left Column Diarization / Sub-tabs
  const [leftBottomTab, setLeftBottomTab] = useState<"diarization" | "transcript" | "notes" | "action">("diarization");

  // Right Column Tabs (Health / Biometric / Insights / Audio)
  const [rightTab, setRightTab] = useState<"health" | "biometric" | "insights" | "audio">("health");

  // Email state for candidate biometrics
  const [emailInput, setEmailInput] = useState("alex.chen@tensorgo.com");
  const [isVerified, setIsVerified] = useState(true);

  // Sync email input when selected live candidate changes
  useEffect(() => {
    setEmailInput(selectedLiveCandidate.email);
  }, [selectedLiveCandidate]);

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
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`p-3 rounded-xl transition-all cursor-pointer relative group ${
                activeTab === "dashboard"
                  ? "text-white bg-white/10 border border-white/10 shadow-lg shadow-black/40"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
              title="Interviews Dashboard"
            >
              <BarChart2 size={20} />
              {activeTab === "dashboard" && (
                <span className="absolute right-0 top-1/3 bottom-1/3 w-1 bg-accent-blue rounded-full" />
              )}
              <span className="absolute left-24 bg-black/90 text-white text-[9px] font-mono py-1 px-2 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                Interviews Dashboard
              </span>
            </button>

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
            {activeTab === "dashboard" ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-650/10 border border-indigo-500/30 overflow-hidden flex items-center justify-center text-xs font-bold text-accent-blue shadow-inner">
                  <BarChart2 size={18} className="text-accent-blue animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-bold text-white tracking-tight">Interviews Command Center</h1>
                    <span className="text-[9px] font-mono font-bold text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Recruiter Portal
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[9.5px] text-gray-400 font-mono">
                    <span>Active Live Streams: 3</span>
                    <span className="text-gray-600">|</span>
                    <span>21 May 2026</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse shrink-0" />
                    <span className="text-[8px] text-accent-emerald font-bold tracking-widest uppercase">System Operational</span>
                  </div>
                </div>
              </div>
            ) : activeTab === "workspace" ? (
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${selectedLiveCandidate.avatarColor} border border-white/10 overflow-hidden flex items-center justify-center text-xs font-bold`}>
                  {selectedLiveCandidate.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-bold text-white tracking-tight">{selectedLiveCandidate.name}</h1>
                    <span className="text-[9px] font-mono font-bold text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {selectedLiveCandidate.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[9.5px] text-gray-400 font-mono">
                    <span>Session Code: {selectedLiveCandidate.sessionCode}</span>
                    <span className="text-gray-600">|</span>
                    <span>21 May 2026</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse shrink-0" />
                    <span className="text-[8px] text-accent-emerald font-bold tracking-widest uppercase">Live telemetry active</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-905 border border-white/10 overflow-hidden flex items-center justify-center text-xs font-bold text-gray-300">
                  {CANDIDATE_DOSSIERS[selectedDossierCandidate]?.name.split(" ").map(n => n[0]).join("") || "AC"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-bold text-white tracking-tight">{CANDIDATE_DOSSIERS[selectedDossierCandidate]?.name || "Alex Chen"}</h1>
                    <span className="text-[9px] font-mono font-bold text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {CANDIDATE_DOSSIERS[selectedDossierCandidate]?.role || "Systems Engineer"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[9.5px] text-gray-400 font-mono">
                    <span>Session Code: {CANDIDATE_DOSSIERS[selectedDossierCandidate]?.sessionCode || "ZAI-9092"}</span>
                    <span className="text-gray-600">|</span>
                    <span>Evaluation Compiled</span>
                  </div>
                </div>
              </div>
            )}
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
            {activeTab === "dashboard" ? (
              <motion.div
                key="dashboard-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 w-full space-y-8 text-left"
              >
                {/* 1. KPI cards row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Total Conducted */}
                  <div className="glass-card rounded-2xl border border-white/10 bg-black/40 p-5 shadow-lg flex items-center justify-between hover:scale-[1.02] hover:border-white/20 transition-all duration-300">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Total Conducted</span>
                      <div className="text-3xl font-extrabold text-white font-mono">342</div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[9px] bg-accent-emerald/15 text-accent-emerald font-bold font-mono px-1.5 py-0.5 rounded">▲ 3.6%</span>
                        <span className="text-[9px] text-gray-500 font-mono">vs last week</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-700/5 border border-indigo-500/30 flex items-center justify-center text-accent-blue shadow-lg shadow-indigo-500/5">
                      <Briefcase size={22} />
                    </div>
                  </div>

                  {/* Live Active */}
                  <div className="glass-card rounded-2xl border border-white/10 bg-black/40 p-5 shadow-lg flex items-center justify-between hover:scale-[1.02] hover:border-white/20 transition-all duration-300">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Active Live</span>
                      <div className="text-3xl font-extrabold text-white font-mono flex items-center gap-2">
                        3
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-coral opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-coral"></span>
                        </span>
                      </div>
                      <div className="text-[9.5px] text-gray-500 font-mono mt-1 flex items-center gap-1">
                        <span>Real-time biometric streams</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-700/5 border border-rose-500/30 flex items-center justify-center text-accent-coral shadow-lg shadow-rose-500/5 animate-pulse">
                      <Video size={22} />
                    </div>
                  </div>

                  {/* Completed Done */}
                  <div className="glass-card rounded-2xl border border-white/10 bg-black/40 p-5 shadow-lg flex items-center justify-between hover:scale-[1.02] hover:border-white/20 transition-all duration-300">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Completed Done</span>
                      <div className="text-3xl font-extrabold text-white font-mono">339</div>
                      <div className="flex items-center gap-1 mt-1 text-[9.5px] text-gray-500 font-mono">
                        <CheckCircle2 size={12} className="text-accent-emerald inline" />
                        <span>100% parsed by Zai AI</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-700/5 border border-emerald-500/30 flex items-center justify-center text-accent-emerald shadow-lg shadow-emerald-500/5">
                      <CheckCircle2 size={22} />
                    </div>
                  </div>

                  {/* Average Score */}
                  <div className="glass-card rounded-2xl border border-white/10 bg-black/40 p-5 shadow-lg flex items-center justify-between hover:scale-[1.02] hover:border-white/20 transition-all duration-300">
                    <div className="space-y-1 w-[70%]">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Average Composure</span>
                      <div className="text-3xl font-extrabold text-white font-mono">8.4<span className="text-xs text-gray-500 font-normal"> / 10</span></div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div className="bg-accent-amber h-full w-[84%] rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/5 border border-amber-500/30 flex items-center justify-center text-accent-amber shadow-lg shadow-amber-500/5">
                      <Sparkles size={22} />
                    </div>
                  </div>
                </div>

                {/* 2. Main Columns layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left Column: Live Monitor Cards (lg:col-span-1) */}
                  <div className="space-y-4 lg:col-span-1">
                    <div className="flex items-center justify-between pb-1 select-none">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent-coral animate-ping" />
                        <h2 className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">Live Monitor Feeds</h2>
                      </div>
                      <span className="text-[9.5px] font-mono text-gray-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">3 Active</span>
                    </div>

                    <div className="space-y-4">
                      {LIVE_CANDIDATES.map((candidate) => {
                        const isSelected = selectedLiveCandidate.id === candidate.id;
                        
                        // Real-time ticking indicators
                        const currentHr = candidate.id === "alex-chen" && isActive 
                          ? (isStressInjected && elapsedTime >= 105 && elapsedTime <= 125 ? 98 + Math.floor(Math.sin(elapsedTime) * 3) : biometrics.heartRate)
                          : candidate.id === "sophia-rodriguez"
                            ? 82 + Math.floor(Math.sin(elapsedTime * 0.5) * 2)
                            : 74 + Math.floor(Math.cos(elapsedTime * 0.4) * 2);

                        const currentStress = candidate.id === "alex-chen" && isActive 
                          ? (isStressInjected && elapsedTime >= 105 && elapsedTime <= 125 ? 84 : biometrics.stressIndex)
                          : candidate.id === "sophia-rodriguez"
                            ? 31 + Math.floor(Math.sin(elapsedTime * 0.3) * 3)
                            : 24 + Math.floor(Math.cos(elapsedTime * 0.2) * 2);
                        
                        return (
                          <div 
                            key={candidate.id}
                            className={`glass-card border rounded-2xl bg-[#0c0d12]/40 p-5 space-y-4 transition-all duration-300 ${
                              isSelected 
                                ? "border-accent-blue/40 shadow-[0_0_20px_rgba(59,130,246,0.06)]"
                                : "border-white/10 hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-full ${candidate.avatarColor} border border-white/5 flex items-center justify-center text-xs font-bold font-mono`}>
                                  {candidate.initials}
                                </div>
                                <div>
                                  <h3 className="text-xs font-bold text-white tracking-tight">{candidate.name}</h3>
                                  <p className="text-[9px] text-gray-500 font-mono mt-0.5">{candidate.role}</p>
                                </div>
                              </div>
                              <span className="text-[8px] font-mono font-semibold tracking-wider text-accent-cyan bg-accent-cyan/5 border border-accent-cyan/10 px-2 py-0.5 rounded">
                                {candidate.sessionCode}
                              </span>
                            </div>

                            {/* Biometric spark values */}
                            <div className="grid grid-cols-2 gap-3 pt-1 text-[10px] font-mono border-t border-white/5 text-gray-400">
                              <div className="flex items-center gap-1.5">
                                <Heart size={12} className="text-accent-coral animate-pulse" />
                                <div>
                                  <span className="text-gray-500 block text-[8px] uppercase">Heart Rate</span>
                                  <span className="text-white font-bold text-[11px]">{currentHr} BPM</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Activity size={12} className="text-accent-cyan" />
                                <div>
                                  <span className="text-gray-500 block text-[8px] uppercase">Stress Index</span>
                                  <span className="text-white font-bold text-[11px]">{currentStress}%</span>
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <button
                              onClick={() => {
                                setSelectedLiveCandidate(candidate);
                                setActiveTab("workspace");
                                setLeftTab("video");
                              }}
                              className="w-full py-2 bg-accent-blue/10 hover:bg-accent-blue text-accent-blue hover:text-white rounded-xl text-[10px] font-bold font-mono tracking-widest uppercase border border-accent-blue/20 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-blue-500/5"
                            >
                              <Zap size={11} className="animate-pulse" />
                              <span>Join Telemetry</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Completed Assessments Table (lg:col-span-2) */}
                  <div className="space-y-4 lg:col-span-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 select-none">
                      <h2 className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">Completed Assessments Logs</h2>
                      
                      {/* Search and Filters inside table header */}
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative flex-grow sm:flex-grow-0 sm:w-48">
                          <input
                            type="text"
                            placeholder="Search logs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 focus:border-accent-blue/40 rounded-xl px-3 py-1.5 pl-8 text-[10px] focus:outline-none font-mono text-white placeholder-gray-500 transition-colors"
                          />
                          <Search size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        </div>
                      </div>
                    </div>

                    {/* Department Tabs */}
                    <div className="flex border-b border-white/5 gap-4 overflow-x-auto pb-2 text-[10px] font-bold font-mono scrollbar-none">
                      {["All", "Software Engineering", "Systems Design", "Product Management"].map((dept) => (
                        <button
                          key={dept}
                          onClick={() => setRoleFilter(dept)}
                          className={`pb-1 uppercase tracking-wider transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                            roleFilter === dept
                              ? "text-accent-blue border-accent-blue text-glow-blue"
                              : "border-transparent text-gray-500 hover:text-gray-300"
                          }`}
                        >
                          {dept}
                        </button>
                      ))}
                    </div>

                    {/* Table database logs container */}
                    <div className="glass-card border border-white/10 rounded-2xl bg-[#0c0d12]/40 overflow-hidden shadow-2xl">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/10 bg-black/25 text-[9px] font-mono text-gray-500 tracking-wider uppercase select-none">
                              <th className="py-3 px-4 font-semibold">Candidate</th>
                              <th className="py-3 px-4 font-semibold">Role</th>
                              <th className="py-3 px-4 font-semibold">Date</th>
                              <th className="py-3 px-4 font-semibold text-center">Composure</th>
                              <th className="py-3 px-4 font-semibold text-center">Tech Rating</th>
                              <th className="py-3 px-4 font-semibold text-center">Liveness</th>
                              <th className="py-3 px-4 font-semibold text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-[11px] font-mono text-gray-300">
                            {filteredSessions.length > 0 ? (
                              filteredSessions.map((session) => (
                                <tr key={session.id} className="hover:bg-white/[0.015] transition-colors group">
                                  <td className="py-3.5 px-4">
                                    <div className="flex items-center gap-2.5">
                                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[9px] font-bold text-gray-400">
                                        {session.initials}
                                      </div>
                                      <span className="font-bold text-white group-hover:text-accent-blue transition-colors">{session.name}</span>
                                    </div>
                                  </td>
                                  <td className="py-3.5 px-4 text-gray-400">{session.role}</td>
                                  <td className="py-3.5 px-4 text-[10px] text-gray-500">{session.date}</td>
                                  <td className="py-3.5 px-4 text-center font-bold">
                                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] ${
                                      session.composure >= 9.0 
                                        ? "bg-accent-emerald/10 text-accent-emerald" 
                                        : session.composure >= 8.0 
                                          ? "bg-accent-cyan/10 text-accent-cyan" 
                                          : "bg-accent-amber/10 text-accent-amber"
                                    }`}>
                                      {session.composure.toFixed(1)}/10
                                    </span>
                                  </td>
                                  <td className="py-3.5 px-4 text-center font-bold">
                                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] ${
                                      session.techRating >= 9.0 
                                        ? "bg-accent-emerald/10 text-accent-emerald" 
                                        : session.techRating >= 8.0 
                                          ? "bg-accent-cyan/10 text-accent-cyan" 
                                          : "bg-accent-amber/10 text-accent-amber"
                                    }`}>
                                      {session.techRating.toFixed(1)}/10
                                    </span>
                                  </td>
                                  <td className="py-3.5 px-4 text-center text-accent-emerald text-[9px]">
                                    <span className="flex items-center justify-center gap-1.5 font-bold">
                                      <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse inline-block" />
                                      {session.liveness.toFixed(1)}%
                                    </span>
                                  </td>
                                  <td className="py-3.5 px-4 text-right">
                                    <button
                                      onClick={() => {
                                        setSelectedDossierCandidate(session.id);
                                        setActiveTab("dossier");
                                      }}
                                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl border border-white/10 hover:border-white/20 transition-all text-[9.5px] font-bold cursor-pointer inline-flex items-center gap-1"
                                    >
                                      <span>View Dossier</span>
                                      <ExternalLink size={10} />
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={7} className="py-10 text-center text-gray-500 font-mono text-[10px]">
                                  No finished assessments found matching the filters.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            ) : activeTab === "workspace" ? (
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
                                  <span>{selectedLiveCandidate.name} (Candidate)</span>
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
                                        {selectedLiveCandidate.name} presented clear core knowledge of database deadlocks, showing hands-on pgBouncer connection architectures and primary/replica split middleware logic.
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
                        {CANDIDATE_DOSSIERS[selectedDossierCandidate]?.name || "Alex Chen"} Dossier Profile
                      </h1>
                      <p className="text-[10px] text-gray-500 font-mono mt-1">
                        Compiled dynamically by Zai AI Interviewer node-us-east-eval | Session: {CANDIDATE_DOSSIERS[selectedDossierCandidate]?.sessionCode || "ZAI-9092"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab("dashboard")}
                        className="px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-xs font-bold rounded-xl transition-all cursor-pointer shadow"
                      >
                        Return to Dashboard
                      </button>
                      <button
                        onClick={() => {
                          const liveMatch = LIVE_CANDIDATES.find(lc => lc.id === selectedDossierCandidate);
                          if (liveMatch) {
                            setSelectedLiveCandidate(liveMatch);
                          }
                          setActiveTab("workspace");
                        }}
                        className="px-4 py-2 bg-accent-blue text-white hover:bg-blue-650 text-xs font-bold rounded-xl transition-all border border-blue-400/20 shadow cursor-pointer"
                      >
                        Join Workspace
                      </button>
                    </div>
                  </div>

                  {/* Rating parameters grids */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card rounded-2xl p-6 border-white/10 bg-black/40 text-left space-y-3">
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Systems Competence</span>
                      <div className="text-4xl font-extrabold text-white font-mono">
                        {CANDIDATE_DOSSIERS[selectedDossierCandidate]?.systemsCompetence || 9.2} <span className="text-xs text-gray-500 font-normal">/ 10</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Evaluated under system architectural trade-offs, deadlock simulations, and connection pooling correctness metrics.
                      </p>
                    </div>

                    <div className="glass-card rounded-2xl p-6 border-white/10 bg-black/40 text-left space-y-3">
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Composure index</span>
                      <div className="text-4xl font-extrabold text-accent-cyan font-mono">
                        {CANDIDATE_DOSSIERS[selectedDossierCandidate]?.composureIndex || 8.5} <span className="text-xs text-gray-500 font-normal">/ 10</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        PPG heart-rate latency monitoring and audio stress level stability markers under injection triggers.
                      </p>
                    </div>

                    <div className="glass-card rounded-2xl p-6 border-white/10 bg-black/40 text-left space-y-3">
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Speech & Prosody</span>
                      <div className="text-4xl font-extrabold text-accent-emerald font-mono">
                        {CANDIDATE_DOSSIERS[selectedDossierCandidate]?.speechProsody || 8.8} <span className="text-xs text-gray-500 font-normal">/ 10</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Speech pacing rhythm, confidence signals, grammar alignment, and filler words frequency.
                      </p>
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-6 border-white/5 bg-black/30 text-left space-y-4">
                    <h3 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase">
                      AI Dossier Analysis Summary
                    </h3>
                    <div className="space-y-3 text-xs text-gray-300 leading-relaxed">
                      <p>
                        <strong>1. Summary Diagnostics:</strong> {CANDIDATE_DOSSIERS[selectedDossierCandidate]?.summaryText || "Candidate details..."}
                      </p>
                      <p>
                        <strong>2. Final Recommendation:</strong> {CANDIDATE_DOSSIERS[selectedDossierCandidate]?.recommendText || "Strong recommendation..."}
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. FLOATING SIMULATION CONTROL CAPSULE */}
          {activeTab !== "dashboard" && (
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
                      if (activeTab === "workspace") {
                        setSelectedDossierCandidate(selectedLiveCandidate.id);
                        setActiveTab("dossier");
                      } else {
                        setActiveTab("workspace");
                      }
                    }}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl transition-all border border-white/10 cursor-pointer shadow"
                  >
                    {activeTab === "workspace" ? "COMPILE DOSSIER" : "WORKSPACE"}
                  </button>
                </div>

              </div>
            </div>
          )}

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
