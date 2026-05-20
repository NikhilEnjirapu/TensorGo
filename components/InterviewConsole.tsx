"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSimulation } from "@/context/SimulationContext";
import { 
  Play, Pause, RotateCcw, Video, Activity, ShieldCheck, 
  FileText, Download, Share2, ArrowLeft, Search, User, 
  Home, Folder, Briefcase, Settings, AlertCircle, Copy, CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InterviewConsole() {
  const {
    step,
    setStep,
    isActive,
    elapsedTime,
    biometrics,
    candidateState,
    audio
  } = useSimulation();

  const [activeTab, setActiveTab] = useState<"audio" | "video" | "health" | "biometric" | "insights">("health");
  const [emailInput, setEmailInput] = useState("himajakolavennu@gmail.com");
  const [isVerified, setIsVerified] = useState(true);

  // Generate randomized historical buffer for small sparklines
  const [hrHistory, setHrHistory] = useState<number[]>([90, 92, 94, 91, 95, 93, 95]);
  const [hrvHistory, setHrvHistory] = useState<number[]>([42, 44, 45, 43, 46, 45, 45]);
  const [stressHistory, setStressHistory] = useState<number[]>([5, 6, 7, 5, 8, 6, 6]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setHrHistory((prev) => [...prev.slice(1), biometrics.heartRate]);
        setHrvHistory((prev) => [...prev.slice(1), 45 + Math.floor(Math.random() * 4 - 2)]);
        setStressHistory((prev) => [...prev.slice(1), biometrics.stressIndex]);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive, biometrics.heartRate, biometrics.stressIndex]);

  // Format time for timeline
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Convert sparkline data to SVG path points
  const getSparklinePath = (data: number[], width: number, height: number, minVal: number, maxVal: number) => {
    if (data.length === 0) return "";
    const stepX = width / (data.length - 1);
    const range = maxVal - minVal || 1;
    return data
      .map((val, idx) => {
        const x = idx * stepX;
        const y = height - ((val - minVal) / range) * height;
        return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  return (
    <section id="dashboard" className="py-20 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-coral/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-accent-blue bg-accent-blue/10 border border-accent-blue/20 px-3 py-1 rounded-full uppercase">
            Product Demo Room
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-4">
            Experience the Go-x Interview Workspace
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            Interact with our light-themed video assessment dashboard directly. Hit play below to see Zai join the call and parse candidate telemetry.
          </p>
        </div>

        {/* Browser Mockup Wrapper */}
        <div className="max-w-6xl mx-auto bg-[#1e293b] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Browser Header Bar */}
          <div className="bg-[#0f172a] px-4 py-3 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            </div>
            <div className="bg-[#1e293b] rounded-lg px-4 py-1 text-[11px] font-mono text-gray-400 w-1/2 max-w-sm text-center truncate">
              https://app.humain.ai/interview/hemaja-consultancy
            </div>
            <div className="w-16" />
          </div>

          {/* Go-x Desktop App Interface */}
          <div className="flex h-[680px] bg-slate-50 text-slate-800 font-sans relative overflow-hidden">
            
            {/* Left Sidebar (Dark Indigo) */}
            <aside className="w-[64px] bg-[#0a0e1a] shrink-0 flex flex-col items-center justify-between py-6 border-r border-slate-900 z-10">
              <div className="flex flex-col items-center gap-8 w-full">
                {/* Logo Go.x */}
                <div className="flex flex-col items-center">
                  <span className="text-white font-extrabold text-sm tracking-tighter">Go</span>
                  <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-extrabold text-white -mt-1 shadow-lg shadow-indigo-600/30">
                    x
                  </div>
                </div>

                {/* Navigation Icons */}
                <nav className="flex flex-col items-center gap-4 w-full">
                  <button className="p-2.5 rounded-xl text-slate-500 hover:text-white transition-colors cursor-pointer">
                    <Home size={18} />
                  </button>
                  <button className="p-2.5 rounded-xl text-white bg-slate-800/80 border border-slate-700/50 transition-all cursor-pointer shadow-md">
                    <Folder size={18} />
                  </button>
                  <button className="p-2.5 rounded-xl text-slate-500 hover:text-white transition-colors cursor-pointer">
                    <Briefcase size={18} />
                  </button>
                  <button className="p-2.5 rounded-xl text-slate-500 hover:text-white transition-colors cursor-pointer">
                    <User size={18} />
                  </button>
                </nav>
              </div>

              <div className="flex flex-col items-center gap-4">
                <button className="p-2 text-slate-500 hover:text-white transition-colors cursor-pointer">
                  <Settings size={18} />
                </button>
                <div className="w-8 h-8 rounded-full bg-indigo-900 border border-indigo-600/30 overflow-hidden flex items-center justify-center text-white text-xs font-bold font-mono">
                  KW
                </div>
              </div>
            </aside>

            {/* Inner Page Layout */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
              
              {/* Internal Header Bar */}
              <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                    <ArrowLeft size={16} />
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-base font-bold text-slate-900">Hemaja Consultancy</h1>
                      <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                        20 min
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      12 May 2025 | 7:15 PM | Session Code: ZAI-9092
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                    <Download size={13} />
                    <span>Download</span>
                  </button>
                  <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-indigo-600/10">
                    <Share2 size={13} />
                    <span>Share</span>
                  </button>
                </div>
              </header>

              {/* Main Workspace Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 lg:p-6 min-w-0">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Video & Diarization */}
                  <div className="xl:col-span-7 flex flex-col gap-6 min-w-0">
                    
                    {/* Video Console Frame */}
                    <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm relative aspect-video overflow-hidden group">
                      
                      {/* AI Interviewer Video (Main screen) */}
                      <div className="w-full h-full rounded-lg bg-slate-900 relative overflow-hidden flex items-center justify-center border border-slate-200">
                        {step === 0 && candidateState === "connecting" ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 font-mono gap-3 p-4 text-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                            <p className="text-xs">ZAI CONNECTING SECURE STREAM...</p>
                            <div className="w-24 bg-slate-800 h-1 rounded-full overflow-hidden">
                              <div className="bg-indigo-500 h-full w-[45%] animate-pulse" />
                            </div>
                          </div>
                        ) : (
                          <img 
                            src="/zai_avatar.png" 
                            alt="Zai AI Interviewer" 
                            className="w-full h-full object-cover"
                          />
                        )}

                        {/* Floating Speaker Tag */}
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-white font-mono font-semibold flex items-center gap-1.5 border border-white/10">
                          <span className={`w-1.5 h-1.5 rounded-full ${candidateState === "listening" ? "bg-indigo-500 animate-pulse" : "bg-slate-400"}`} />
                          <span>Zai</span>
                        </div>
                      </div>

                      {/* Candidate Webcam Inset (Floating Bottom Right) */}
                      <div className="absolute bottom-6 right-6 w-[140px] md:w-[170px] aspect-video rounded-lg border-2 border-white shadow-xl overflow-hidden bg-slate-800 z-10 transition-transform group-hover:scale-105">
                        {step === 0 && candidateState === "connecting" ? (
                          <div className="w-full h-full flex items-center justify-center bg-slate-950 text-slate-500 font-mono text-[9px]">
                            No Feed
                          </div>
                        ) : (
                          <img 
                            src="/candidate_hemaja.png" 
                            alt="Candidate Hemaja" 
                            className="w-full h-full object-cover"
                          />
                        )}

                        <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[8px] text-white font-mono flex items-center gap-1 border border-white/5">
                          <span className={`w-1 h-1 rounded-full ${candidateState === "answering" ? "bg-rose-500 animate-ping" : "bg-slate-400"}`} />
                          <span>Hemaja</span>
                        </div>
                      </div>
                    </div>

                    {/* Left Bottom Section: Tabs & Timeline */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                      
                      {/* Sub-tab headers */}
                      <div className="flex border-b border-slate-200 gap-4 mb-4 text-xs font-bold font-mono">
                        <span className="text-indigo-600 border-b-2 border-indigo-600 pb-2 cursor-pointer uppercase tracking-wider">
                          Speaker Diarization
                        </span>
                        <span className="text-slate-400 hover:text-slate-600 pb-2 cursor-pointer uppercase tracking-wider">
                          Notes
                        </span>
                        <span className="text-slate-400 hover:text-slate-600 pb-2 cursor-pointer uppercase tracking-wider">
                          Clips
                        </span>
                        <span className="text-slate-400 hover:text-slate-600 pb-2 cursor-pointer uppercase tracking-wider">
                          Action Items
                        </span>
                      </div>

                      {/* Speaker Diarization Track Layout */}
                      <div className="space-y-4 pt-2">
                        {/* Zai Track */}
                        <div className="flex items-center justify-between text-xs font-mono">
                          <div className="w-12 font-bold text-slate-600">Zai</div>
                          <div className="flex-1 mx-4 h-6 bg-slate-100 rounded-md overflow-hidden relative border border-slate-200/50">
                            {/* Diarization Blocks for Zai */}
                            <div className="absolute left-[5%] w-[12%] h-full bg-emerald-500/20 border-r border-emerald-500/30" />
                            <div className="absolute left-[30%] w-[18%] h-full bg-emerald-500/20 border-l border-r border-emerald-500/30" />
                            <div className="absolute left-[65%] w-[15%] h-full bg-emerald-500/20 border-l border-r border-emerald-500/30" />
                          </div>
                          <div className="w-12 text-right text-slate-400">42.70%</div>
                        </div>

                        {/* Hemaja Track */}
                        <div className="flex items-center justify-between text-xs font-mono">
                          <div className="w-12 font-bold text-slate-600">Hemaja</div>
                          <div className="flex-1 mx-4 h-6 bg-slate-100 rounded-md overflow-hidden relative border border-slate-200/50">
                            {/* Diarization Blocks for Hemaja */}
                            <div className="absolute left-[17%] w-[13%] h-full bg-rose-500/20 border-l border-r border-rose-500/30" />
                            <div className="absolute left-[48%] w-[17%] h-full bg-rose-500/20 border-l border-r border-rose-500/30" />
                            <div className="absolute left-[80%] w-[18%] h-full bg-rose-500/20 border-l border-rose-500/30" />

                            {/* Dynamic Scrubbing Playhead Indicator */}
                            {isActive && (
                              <motion.div 
                                className="absolute top-0 bottom-0 w-0.5 bg-indigo-600 shadow shadow-indigo-600/30 z-10"
                                style={{ left: `${(elapsedTime / 180) * 100}%` }}
                              />
                            )}
                          </div>
                          <div className="w-12 text-right text-slate-400">57.30%</div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Right Column: Dynamic Diagnostics */}
                  <div className="xl:col-span-5 flex flex-col gap-6 min-w-0">
                    
                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col h-[525px] overflow-hidden">
                      
                      {/* Tab Selection */}
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4 shrink-0 overflow-x-auto no-scrollbar">
                        <div className="flex gap-3 text-[10px] font-bold font-mono uppercase tracking-wider">
                          <button
                            onClick={() => setActiveTab("health")}
                            className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === "health" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                          >
                            Health Metrics
                          </button>
                          <button
                            onClick={() => setActiveTab("biometric")}
                            className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === "biometric" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                          >
                            Biometric
                          </button>
                          <button
                            onClick={() => setActiveTab("insights")}
                            className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === "insights" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                          >
                            Zai Insights
                          </button>
                          <button
                            onClick={() => setActiveTab("audio")}
                            className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === "audio" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                          >
                            Audio
                          </button>
                        </div>
                        <Search size={14} className="text-slate-400 cursor-pointer hover:text-slate-600 shrink-0 ml-2" />
                      </div>

                      {/* Tab Contents */}
                      <div className="flex-1 overflow-y-auto min-w-0">
                        <AnimatePresence mode="wait">
                          
                          {/* 1. HEALTH METRICS TAB */}
                          {activeTab === "health" && (
                            <motion.div
                              key="health"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="space-y-4 text-slate-600 text-left"
                            >
                              <div className="flex justify-between items-center">
                                <h3 className="text-xs font-bold font-mono uppercase text-slate-800 tracking-wider">
                                  Physiological Analytics
                                </h3>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[9px] font-mono font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 px-2 py-0.5 rounded">
                                    {isActive ? "Analyzing..." : "Standby"}
                                  </span>
                                  <button className="px-2 py-0.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[9px] font-bold font-mono transition-colors">
                                    Stop
                                  </button>
                                </div>
                              </div>

                              {/* Alert Box */}
                              <div className="bg-indigo-50 border border-indigo-100 text-indigo-800 rounded-lg p-3 text-[10px] flex items-start gap-2 leading-relaxed">
                                <AlertCircle size={14} className="text-indigo-600 shrink-0 mt-0.5" />
                                <span>
                                  The results below are estimated with up to 90% accuracy but may vary. Please consult a medical professional for validation.
                                </span>
                              </div>

                              {/* Analytics Cards Grid */}
                              <div className="grid grid-cols-2 gap-3 pt-2">
                                
                                {/* Heart Rate */}
                                <div className="border border-slate-200/80 rounded-xl p-3 bg-white hover:border-slate-300 transition-colors shadow-sm flex flex-col justify-between h-[80px]">
                                  <div>
                                    <span className="text-[9px] font-bold text-rose-600 uppercase font-mono tracking-wider">Heart Rate (HR)</span>
                                    <div className="text-lg font-extrabold text-slate-800 font-mono mt-0.5">
                                      {biometrics.heartRate} <span className="text-[10px] font-normal text-slate-400">bpm</span>
                                    </div>
                                  </div>
                                  <svg className="w-full h-4 text-rose-500 overflow-visible mt-1" viewBox="0 0 100 20">
                                    <path
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      d={getSparklinePath(hrHistory, 100, 20, 80, 110)}
                                    />
                                  </svg>
                                </div>

                                {/* HRV */}
                                <div className="border border-slate-200/80 rounded-xl p-3 bg-white hover:border-slate-300 transition-colors shadow-sm flex flex-col justify-between h-[80px]">
                                  <div>
                                    <span className="text-[9px] font-bold text-indigo-600 uppercase font-mono tracking-wider">Heart Rate Var. (HRV)</span>
                                    <div className="text-lg font-extrabold text-slate-800 font-mono mt-0.5">
                                      {45 + (elapsedTime % 3)} <span className="text-[10px] font-normal text-slate-400">ms</span>
                                    </div>
                                  </div>
                                  <svg className="w-full h-4 text-indigo-500 overflow-visible mt-1" viewBox="0 0 100 20">
                                    <path
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      d={getSparklinePath(hrvHistory, 100, 20, 40, 50)}
                                    />
                                  </svg>
                                </div>

                                {/* Blood Pressure */}
                                <div className="border border-slate-200/80 rounded-xl p-3 bg-white hover:border-slate-300 transition-colors shadow-sm flex flex-col justify-between h-[80px]">
                                  <div>
                                    <span className="text-[9px] font-bold text-rose-600 uppercase font-mono tracking-wider">Blood Pressure</span>
                                    <div className="text-sm font-extrabold text-slate-800 font-mono mt-0.5">
                                      118 / {79 + (elapsedTime % 2)} <span className="text-[10px] font-normal text-slate-400">mmHg</span>
                                    </div>
                                  </div>
                                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-2">
                                    <div className="bg-rose-500 h-full rounded-full" style={{ width: "70%" }} />
                                  </div>
                                </div>

                                {/* SpO2 */}
                                <div className="border border-slate-200/80 rounded-xl p-3 bg-white hover:border-slate-300 transition-colors shadow-sm flex flex-col justify-between h-[80px]">
                                  <div>
                                    <span className="text-[9px] font-bold text-indigo-600 uppercase font-mono tracking-wider">Blood Oxygen (SpO2)</span>
                                    <div className="text-lg font-extrabold text-slate-800 font-mono mt-0.5">
                                      {biometrics.oxygenLevel}%
                                    </div>
                                  </div>
                                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-2">
                                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: "98%" }} />
                                  </div>
                                </div>

                                {/* Stress Index */}
                                <div className="border border-slate-200/80 rounded-xl p-3 bg-white hover:border-slate-300 transition-colors shadow-sm flex flex-col justify-between h-[80px]">
                                  <div>
                                    <span className="text-[9px] font-bold text-amber-600 uppercase font-mono tracking-wider">Stress Index</span>
                                    <div className="text-lg font-extrabold text-slate-800 font-mono mt-0.5">
                                      {biometrics.stressIndex} <span className="text-[9px] text-slate-400 font-normal">/10</span>
                                    </div>
                                  </div>
                                  <svg className="w-full h-4 text-amber-500 overflow-visible mt-1" viewBox="0 0 100 20">
                                    <path
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      d={getSparklinePath(stressHistory, 100, 20, 2, 10)}
                                    />
                                  </svg>
                                </div>

                                {/* Respiration */}
                                <div className="border border-slate-200/80 rounded-xl p-3 bg-white hover:border-slate-300 transition-colors shadow-sm flex flex-col justify-between h-[80px]">
                                  <div>
                                    <span className="text-[9px] font-bold text-emerald-600 uppercase font-mono tracking-wider">Respiration</span>
                                    <div className="text-lg font-extrabold text-slate-800 font-mono mt-0.5">
                                      {14 + (elapsedTime % 3)} <span className="text-[10px] font-normal text-slate-400">BrPm</span>
                                    </div>
                                  </div>
                                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-2">
                                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "65%" }} />
                                  </div>
                                </div>

                              </div>
                            </motion.div>
                          )}

                          {/* 2. BIOMETRIC TAB */}
                          {activeTab === "biometric" && (
                            <motion.div
                              key="biometric"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="space-y-4 text-left text-xs text-slate-600"
                            >
                              <h3 className="text-xs font-bold font-mono uppercase text-slate-800 tracking-wider">
                                Biometrics Verification
                              </h3>

                              {/* Input block */}
                              <div className="bg-slate-100 border border-slate-200 p-3 rounded-lg space-y-2">
                                <label className="text-[10px] font-mono text-slate-500 font-bold block uppercase">
                                  Verify Candidate Email
                                </label>
                                <div className="flex gap-2">
                                  <input 
                                    type="text" 
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    className="bg-white border border-slate-300 rounded px-2.5 py-1 w-full text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                  />
                                  <button 
                                    onClick={() => setIsVerified(true)}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded px-3 py-1 font-semibold text-xs transition-colors shrink-0"
                                  >
                                    Verify
                                  </button>
                                </div>
                              </div>

                              {isVerified && (
                                <div className="space-y-3">
                                  {/* Verified Banner */}
                                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-lg p-2.5 text-[10px] flex items-center gap-2 font-mono">
                                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                                    <span>Candidate facial & voice biometrics are verified!</span>
                                  </div>

                                  {/* Profile & Audio track */}
                                  <div className="flex items-center gap-3 bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm">
                                    <img 
                                      src="/candidate_hemaja.png" 
                                      alt="Hemaja" 
                                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="font-bold text-slate-800 text-[11px] truncate">himajakolavennu@gmail.com</div>
                                      <div className="text-[9px] text-slate-400 font-mono truncate">Device ID: WebRTC-Stream_009x</div>
                                    </div>
                                  </div>

                                  {/* Checklist parameters */}
                                  <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 p-2 rounded">
                                      <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                                      <span className="font-medium text-slate-700">Liveness Checked</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 p-2 rounded">
                                      <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                                      <span className="font-medium text-slate-700">Voice Pattern Match</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 p-2 rounded">
                                      <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                                      <span className="font-medium text-slate-700">Expression Analysis</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 p-2 rounded">
                                      <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                                      <span className="font-medium text-slate-700">Speech Patterns</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}

                          {/* 3. ZAI INSIGHTS TAB */}
                          {activeTab === "insights" && (
                            <motion.div
                              key="insights"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="space-y-4 text-slate-600 text-left"
                            >
                              <div className="flex justify-between items-center">
                                <h3 className="text-xs font-bold font-mono uppercase text-slate-800 tracking-wider flex items-center gap-1">
                                  <span>Reports Dashboard</span>
                                </h3>
                                <button className="text-[10px] text-slate-400 hover:text-slate-600 font-mono flex items-center gap-1 py-1 px-1.5 hover:bg-slate-100 rounded">
                                  <Copy size={10} />
                                  <span>Copy</span>
                                </button>
                              </div>

                              {/* Report text body */}
                              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 h-[380px] overflow-y-auto text-[10px] font-sans leading-relaxed space-y-3">
                                
                                {step < 3 ? (
                                  <div className="flex flex-col items-center justify-center h-full text-slate-400 font-mono text-center gap-2">
                                    <FileText size={24} className="text-slate-300 animate-pulse" />
                                    <span>Zai is listening to live responses. Dossier compiles automatically at Step 4.</span>
                                  </div>
                                ) : (
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-bold text-slate-800 text-[11px] mb-1">1. Candidate Overview</h4>
                                      <p className="text-slate-600">
                                        Hemaja presented with 4.5 years of experience in embedded systems and software architecture, detailing specific projects around custom kernels, system calls, and synchronization protocols. The candidate's response alignment matched expectations.
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-slate-800 text-[11px] mb-1">2. Communication Style</h4>
                                      <p className="text-slate-600">
                                        The candidate's vocabulary was highly technical, utilizing exact kernel terms rather than generic placeholders. Tone dynamics remained generally polite, clear, and cooperative throughout.
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-slate-800 text-[11px] mb-1">3. Storytelling & Technical Competency</h4>
                                      <p className="text-slate-600">
                                        Responses to OS deadlock questions were structured logically using STAR parameters. The explanation of TCP/UDP networking differences proved standard, with zero hesitation maps logged.
                                      </p>
                                    </div>
                                  </div>
                                )}
                                
                              </div>
                            </motion.div>
                          )}

                          {/* 4. AUDIO METRICS TAB */}
                          {activeTab === "audio" && (
                            <motion.div
                              key="audio"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="space-y-4 text-slate-600 text-left text-xs"
                            >
                              <h3 className="text-xs font-bold font-mono uppercase text-slate-800 tracking-wider">
                                Vocal Diagnostics
                              </h3>
                              
                              <div className="space-y-3 pt-2">
                                {/* Filler words progress */}
                                <div className="space-y-1">
                                  <div className="flex justify-between font-mono text-[10px]">
                                    <span>Filler Words count</span>
                                    <span className="font-bold text-indigo-600">{audio.fillerWords} instances</span>
                                  </div>
                                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div 
                                      className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                                      style={{ width: `${Math.min(100, (audio.fillerWords / 12) * 100)}%` }}
                                    />
                                  </div>
                                </div>

                                {/* Words per minute */}
                                <div className="space-y-1">
                                  <div className="flex justify-between font-mono text-[10px]">
                                    <span>Speech velocity (WPM)</span>
                                    <span className="font-bold text-slate-700">{isActive ? "134 WPM" : "0 WPM"}</span>
                                  </div>
                                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "68%" }} />
                                  </div>
                                </div>

                                {/* Positive sentiment */}
                                <div className="space-y-1">
                                  <div className="flex justify-between font-mono text-[10px]">
                                    <span>Vocal Tension (Tone variation)</span>
                                    <span className="font-bold text-slate-700">{isActive ? "Low (12%)" : "Standby"}</span>
                                  </div>
                                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-indigo-400 h-full rounded-full" style={{ width: "15%" }} />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}

                        </AnimatePresence>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
