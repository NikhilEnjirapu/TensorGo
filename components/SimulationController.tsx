"use client";

import React from "react";
import { useSimulation } from "@/context/SimulationContext";
import { Play, Pause, RotateCcw, Activity, ShieldCheck, FileText, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SimulationController() {
  const {
    isActive,
    step,
    elapsedTime,
    candidateState,
    biometrics,
    startSimulation,
    stopSimulation,
    resetSimulation,
    setStep
  } = useSimulation();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const stepsList = [
    { label: "Join Call", icon: Video },
    { label: "Capture Stream", icon: Activity },
    { label: "Analyze Biometrics", icon: ShieldCheck },
    { label: "Compile Dossier", icon: FileText }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="glass-card shadow-2xl rounded-2xl border border-white/10 p-4 flex flex-col lg:flex-row gap-4 items-center justify-between backdrop-blur-xl bg-black/80"
      >
        {/* Left: Playback Controls */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start shrink-0">
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={isActive ? stopSimulation : startSimulation}
              className={`p-3 rounded-full flex items-center justify-center transition-all ${
                isActive
                  ? "bg-accent-coral hover:bg-rose-600 text-white"
                  : "bg-accent-blue hover:bg-blue-600 text-white"
              } shadow-lg shadow-blue-500/10 cursor-pointer shrink-0`}
              title={isActive ? "Pause Interview" : "Simulate Live Interview"}
            >
              {isActive ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>
            <button
              onClick={resetSimulation}
              className="p-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-full transition-all border border-white/5 cursor-pointer shrink-0"
              title="Reset Simulation"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          <div className="h-8 w-px bg-white/10 hidden lg:block shrink-0" />

          {/* Time & State display */}
          <div className="text-left shrink-0">
            <div className="text-xs text-gray-400 font-mono tracking-wider uppercase flex items-center gap-1.5">
              <span className={`inline-block w-2 h-2 rounded-full ${isActive ? "bg-accent-emerald animate-pulse" : "bg-gray-500"}`} />
              {candidateState === "connecting" && "Zai Establishing Stream..."}
              {candidateState === "listening" && "Capturing Audio/Video..."}
              {candidateState === "answering" && "Telemetry Analysis Active"}
              {candidateState === "complete" && "Assessment Finished"}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono tracking-tight text-white">
                {formatTime(elapsedTime)}
              </span>
              {isActive && candidateState === "answering" && (
                <span className="text-xs text-accent-coral font-mono animate-pulse">
                  {biometrics.heartRate} BPM | Stress: {biometrics.stressIndex}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Stepper Selector */}
        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto justify-between lg:justify-start lg:ml-auto py-1 min-w-0">
          {stepsList.map((s, idx) => {
            const Icon = s.icon;
            const isCompleted = step > idx;
            const isCurrent = step === idx;

            return (
              <button
                key={idx}
                onClick={() => setStep(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isCurrent
                    ? "bg-accent-blue/15 border-accent-blue/40 text-accent-blue"
                    : isCompleted
                    ? "bg-accent-emerald/10 border-accent-emerald/20 text-accent-emerald"
                    : "bg-white/5 border-transparent text-gray-400 hover:bg-white/8"
                }`}
              >
                <Icon size={13} />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
