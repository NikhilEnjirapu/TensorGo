"use client";

import React, { useState, useEffect } from "react";
import { useSimulation } from "@/context/SimulationContext";
import { Mic, Heart, Shield, Activity, Smile, BarChart2, CheckCircle2, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveDashboard() {
  const [activeTab, setActiveTab] = useState<"audio" | "health" | "biometrics">("audio");
  const { biometrics, audio, isActive } = useSimulation();

  // Scrolling heart rate history
  const [hrHistory, setHrHistory] = useState<number[]>([72, 73, 72, 75, 74, 76, 73, 72, 75, 74, 73, 72]);
  
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setHrHistory((prev) => {
          const next = [...prev.slice(1), biometrics.heartRate];
          return next;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive, biometrics.heartRate]);

  // Generate SVG path for Heart Rate scrolling chart
  const getHrPath = () => {
    const width = 300;
    const height = 60;
    const padding = 5;
    const maxVal = 110;
    const minVal = 65;

    const points = hrHistory.map((val, idx) => {
      const x = (idx / (hrHistory.length - 1)) * (width - padding * 2) + padding;
      // invert scale so higher values are higher up (smaller Y)
      const ratio = (val - minVal) / (maxVal - minVal);
      const y = height - ratio * (height - padding * 2) - padding;
      return `${x},${y}`;
    });

    return `M ${points.join(" L ")}`;
  };

  // Face mesh mouse reaction
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHoverPos({ x, y });
  };

  return (
    <section id="dashboard" className="py-20 border-t border-white/5 bg-[#050505] relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Living Analytics Dashboard
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
            Click play on the controller below to watch telemetry metrics stream dynamically during this candidate evaluation session.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-white/5 border border-white/5 p-1 rounded-xl relative">
            {(["audio", "health", "biometrics"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-mono transition-colors cursor-pointer z-10 ${
                  activeTab === tab ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabOutline"
                    className="absolute inset-0 bg-accent-blue/20 border border-accent-blue/30 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="flex items-center gap-2">
                  {tab === "audio" && <Mic size={14} />}
                  {tab === "health" && <Heart size={14} />}
                  {tab === "biometrics" && <Shield size={14} />}
                  {tab}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Grid Panel Container */}
        <div className="min-h-[380px]">
          <AnimatePresence mode="wait">
            {activeTab === "audio" && (
              <motion.div
                key="audio"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Filler Words Gauge */}
                <div className="glass-card rounded-2xl p-6 border-white/5 text-left flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                        Filler Words Frequency
                      </h4>
                      <BarChart2 size={16} className="text-accent-blue" />
                    </div>
                    <div className="flex flex-col items-center justify-center my-6">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                          {/* Background Circle */}
                          <circle cx="64" cy="64" r="54" className="stroke-white/5 fill-none" strokeWidth="8" />
                          {/* Foreground Arc */}
                          <motion.circle
                            cx="64"
                            cy="64"
                            r="54"
                            className="stroke-accent-blue fill-none"
                            strokeWidth="8"
                            strokeDasharray={2 * Math.PI * 54}
                            strokeDashoffset={2 * Math.PI * 54 * (1 - Math.min(audio.fillerWords / 12, 1))}
                            transition={{ type: "spring", stiffness: 60 }}
                          />
                        </svg>
                        <div className="absolute text-center">
                          <span className="text-3xl font-bold font-mono text-white">
                            {audio.fillerWords}
                          </span>
                          <p className="text-[10px] text-gray-500 font-mono uppercase mt-0.5">Spoken</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-4 text-xs text-gray-500">
                    Industry benchmark limits filler occurrences below 5 in technical responses.
                  </div>
                </div>

                {/* Speaking Rate bar */}
                <div className="glass-card rounded-2xl p-6 border-white/5 text-left flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                        Pace & Delivery Speed
                      </h4>
                      <Activity size={16} className="text-accent-blue" />
                    </div>
                    
                    <div className="space-y-6 my-6">
                      <div>
                        <div className="flex justify-between text-xs text-gray-400 font-mono mb-2">
                          <span>Speaking Speed</span>
                          <span className="font-bold text-white">{audio.speakingRate} WPM</span>
                        </div>
                        <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden relative">
                          <motion.div
                            className="bg-accent-blue h-full rounded-full"
                            animate={{ width: `${(audio.speakingRate / 220) * 100}%` }}
                            transition={{ type: "spring", damping: 15 }}
                          />
                          {/* Highlight normal speech band: 110 - 150 WPM */}
                          <div className="absolute left-[50%] right-[30%] top-0 bottom-0 border-l border-r border-dashed border-white/20 pointer-events-none" />
                        </div>
                        <div className="flex justify-between text-[9px] text-gray-500 font-mono mt-1">
                          <span>Slow</span>
                          <span>Ideal Speech Band (110-150)</span>
                          <span>Fast</span>
                        </div>
                      </div>

                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs text-gray-400">
                        Average delivery rate during technical explanation: <strong>135 WPM</strong>.
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-4 text-xs text-gray-500">
                    High speaking rates can point to technical anxiety or rehearsal triggers.
                  </div>
                </div>

                {/* Sentiment Analyzer */}
                <div className="glass-card rounded-2xl p-6 border-white/5 text-left flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                        Sentiment Calibration
                      </h4>
                      <Smile size={16} className="text-accent-blue" />
                    </div>
                    
                    <div className="flex flex-col items-center justify-center my-6">
                      <div className="text-2xl font-bold font-mono tracking-tight text-white mb-2 flex items-center gap-1.5 text-glow-blue">
                        {audio.sentiment}
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono uppercase mb-4">
                        Confidence Index: {audio.sentimentScore}%
                      </div>

                      {/* Sentiment needle dial indicator */}
                      <div className="w-full max-w-[200px] h-12 relative overflow-hidden flex items-end justify-center border-b border-white/10">
                        <svg className="w-full h-16 absolute bottom-0 translate-y-4">
                          <path d="M 10 70 A 90 90 0 0 1 190 70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                          {/* Accent Arc */}
                          <path d="M 10 70 A 90 90 0 0 1 190 70" fill="none" stroke="var(--color-accent-blue)" strokeWidth="6" strokeDasharray={Math.PI * 90} strokeDashoffset={Math.PI * 90 * (1 - audio.sentimentScore / 100)} />
                        </svg>
                        <motion.div
                          className="w-1.5 h-14 bg-accent-coral origin-bottom rounded-full"
                          style={{ y: 7 }}
                          animate={{ rotate: (audio.sentimentScore / 100) * 180 - 90 }}
                          transition={{ type: "spring", stiffness: 80 }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-4 text-xs text-gray-500">
                    Determined via real-time speech prosody (pitch variations and stress levels).
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "health" && (
              <motion.div
                key="health"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Heart Rate line chart */}
                <div className="glass-card rounded-2xl p-6 border-white/5 text-left flex flex-col justify-between md:col-span-2">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                        Heart Rate Variation (PPG Telemetry)
                      </h4>
                      <span className="text-xs bg-accent-coral/10 border border-accent-coral/20 px-2 py-0.5 rounded text-accent-coral font-mono flex items-center gap-1.5 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-coral animate-ping" />
                        {biometrics.heartRate} BPM
                      </span>
                    </div>

                    {/* Shifting SVG path line chart */}
                    <div className="my-6 w-full flex items-center justify-center">
                      <svg className="w-full h-36 border border-white/5 rounded-xl bg-black/60 p-4 overflow-visible" viewBox="0 0 300 60" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <line x1="0" y1="15" x2="300" y2="15" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                        <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                        <line x1="0" y1="45" x2="300" y2="45" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

                        {/* Real-time scroll path */}
                        <motion.path
                          d={getHrPath()}
                          fill="none"
                          stroke="var(--color-accent-coral)"
                          strokeWidth="2.5"
                          className="transition-all duration-300"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-4 text-xs text-gray-500">
                    HRV values are calculated via micro-fluctuations in facial skin capillaries.
                  </div>
                </div>

                {/* Stress Index & Oxygen */}
                <div className="space-y-6 flex flex-col justify-between">
                  {/* Stress Index */}
                  <div className="glass-card rounded-2xl p-6 border-white/5 text-left flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                        Biometric Stress Index
                      </h4>
                      <span className="text-xs font-mono font-bold text-white">{biometrics.stressIndex}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <motion.div
                        className="bg-accent-coral h-full rounded-full"
                        animate={{ width: `${biometrics.stressIndex}%` }}
                        transition={{ type: "spring", damping: 15 }}
                      />
                    </div>
                    <p className="text-[10px] text-gray-500 font-mono mt-2 uppercase">
                      Baseline Deviation: {biometrics.stressIndex > 60 ? "Critical Stress Shift" : "Within Baseline Limits"}
                    </p>
                  </div>

                  {/* Oxygen Level */}
                  <div className="glass-card rounded-2xl p-6 border-white/5 text-left flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                        Pulse Oximetry (SpO2)
                      </h4>
                      <span className="text-xs font-mono font-bold text-accent-cyan">{biometrics.oxygenLevel}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <motion.div
                        className="bg-accent-cyan h-full rounded-full"
                        animate={{ width: `${biometrics.oxygenLevel}%` }}
                        transition={{ type: "spring", damping: 15 }}
                      />
                    </div>
                    <p className="text-[10px] text-gray-500 font-mono mt-2 uppercase">
                      Telemetry Status: Optimal Oxygenation
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "biometrics" && (
              <motion.div
                key="biometrics"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Face Mesh Placeholder */}
                <div className="glass-card rounded-2xl p-6 border-white/5 text-left flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono mb-4">
                      AI Vision Mesh (Interaction Enabled)
                    </h4>
                    
                    <div className="relative h-44 bg-black/60 border border-white/5 rounded-xl flex items-center justify-center overflow-hidden">
                      {/* Responsive Interactive SVG Grid */}
                      <svg
                        className="w-full h-full text-accent-cyan opacity-50 cursor-crosshair"
                        onMouseMove={handleMouseMove}
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        {/* Horizontal and Vertical lines that warp towards the hover position */}
                        {[15, 30, 45, 60, 75, 90].map((line, i) => {
                          const distHorizontal = hoverPos.y - line;
                          const warpHorizontal = Math.exp(-Math.pow(distHorizontal / 25, 2)) * (hoverPos.x - 50) * 0.15;
                          
                          const distVertical = hoverPos.x - line;
                          const warpVertical = Math.exp(-Math.pow(distVertical / 25, 2)) * (hoverPos.y - 50) * 0.15;

                          return (
                            <g key={i}>
                              {/* Horizontal mesh curves */}
                              <path
                                d={`M 0,${line} Q ${50 + warpHorizontal},${line + warpHorizontal} 100,${line}`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.25"
                                opacity="0.3"
                              />
                              {/* Vertical mesh curves */}
                              <path
                                d={`M ${line},0 Q ${line + warpVertical},${50 + warpVertical} ${line},100`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.25"
                                opacity="0.3"
                              />
                            </g>
                          );
                        })}
                        {/* Scanning cursor tracker circle */}
                        <circle cx={hoverPos.x || 50} cy={hoverPos.y || 50} r="4" fill="var(--color-accent-coral)" opacity="0.6" />
                        <line x1={hoverPos.x || 50} y1="0" x2={hoverPos.x || 50} y2="100" stroke="var(--color-accent-coral)" strokeWidth="0.1" opacity="0.4" />
                        <line x1="0" y1={hoverPos.y || 50} x2="100" y2={hoverPos.y || 50} stroke="var(--color-accent-coral)" strokeWidth="0.1" opacity="0.4" />
                      </svg>
                      <div className="absolute bottom-2 left-2 text-[8px] font-mono text-gray-500 uppercase bg-black/40 px-1 rounded pointer-events-none">
                        Scrub cursor to simulate facial distortion scans
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-4 text-xs text-gray-500">
                    Traces 68 coordinates to evaluate eye saccades and micro-expressions.
                  </div>
                </div>

                {/* Voice match signature */}
                <div className="glass-card rounded-2xl p-6 border-white/5 text-left flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono mb-4">
                      Vocal Signature Match
                    </h4>
                    
                    <div className="my-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-mono">Reference Database Match</span>
                        <span className="text-xs font-mono font-bold text-white">98.6%</span>
                      </div>
                      
                      {/* Animated voice footprint vector */}
                      <div className="h-16 flex items-center justify-center bg-black/60 border border-white/5 rounded-xl overflow-hidden p-2">
                        <svg className="w-full h-full text-accent-blue" viewBox="0 0 100 20" preserveAspectRatio="none">
                          <path
                            d="M 5,10 Q 15,2 25,12 T 45,8 T 65,15 T 85,3 T 95,10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="opacity-40"
                          />
                          <path
                            d="M 5,10 Q 15,3 25,10 T 45,10 T 65,12 T 85,5 T 95,10"
                            fill="none"
                            stroke="var(--color-accent-cyan)"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/20 px-2.5 py-1 rounded w-fit font-mono font-medium">
                        <CheckCircle2 size={12} /> Confirmed Biometric Match
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-4 text-xs text-gray-500">
                    Assures identity integrity against synthetic voice or pre-recorded deepfakes.
                  </div>
                </div>

                {/* Verification shield */}
                <div className="glass-card rounded-2xl p-6 border-white/5 text-left flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono mb-4">
                      Assessment Audits
                    </h4>
                    
                    <div className="space-y-3 font-mono text-[10px]">
                      <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                        <span className="text-gray-400 uppercase">Multi-device Feed Check</span>
                        <span className="text-accent-emerald font-bold">STABLE</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                        <span className="text-gray-400 uppercase">Room Noise Spectrum</span>
                        <span className="text-white font-bold">-54dB (EXCELLENT)</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                        <span className="text-gray-400 uppercase">Network Telemetry Lag</span>
                        <span className="text-white font-bold">38ms</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-gray-400 uppercase">Privacy Mask Compliance</span>
                        <span className="text-accent-emerald font-bold">SECURED</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-accent-blue/10 border border-accent-blue/20 rounded-xl flex items-center gap-3">
                    <UserCheck size={20} className="text-accent-blue" />
                    <div className="text-[10px] text-left leading-tight text-white font-mono uppercase">
                      <strong>Security Status:</strong> candidate verified via dynamic passport key comparison.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
