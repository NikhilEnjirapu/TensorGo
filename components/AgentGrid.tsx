"use client";

import React, { useState, useEffect } from "react";
import { useSimulation } from "@/context/SimulationContext";
import { Sparkles, Terminal, Activity, Eye, Zap, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function AgentGrid() {
  const { isActive } = useSimulation();

  // Powering up simulator for lexus
  const [lexisPower, setLexisPower] = useState(0);
  const [isHoveredLexis, setIsHoveredLexis] = useState(false);
  const [lexisLog, setLexisLog] = useState("Awaiting boot trigger...");

  // Powering up simulator for vesper
  const [vesperPower, setVesperPower] = useState(0);
  const [isHoveredVesper, setIsHoveredVesper] = useState(false);
  const [vesperLog, setVesperLog] = useState("Core offline");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHoveredLexis) {
      interval = setInterval(() => {
        setLexisPower((prev) => {
          const next = Math.min(100, prev + 4);
          if (next < 25) setLexisLog("Compiling semantic parser...");
          else if (next < 60) setLexisLog("Mapping workspace vectors...");
          else if (next < 90) setLexisLog("Binding context protocols...");
          else setLexisLog("Lexis Core Online (Testing)");
          return next;
        });
      }, 80);
    } else {
      setLexisPower(0);
      setLexisLog("Awaiting boot trigger...");
    }
    return () => clearInterval(interval);
  }, [isHoveredLexis]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHoveredVesper) {
      interval = setInterval(() => {
        setVesperPower((prev) => {
          const next = Math.min(100, prev + 3);
          if (next < 30) setVesperLog("Indexing CRM pipeline data...");
          else if (next < 70) setVesperLog("Synthesizing market trend vectors...");
          else if (next < 95) setVesperLog("Resolving ledger sync checks...");
          else setVesperLog("Vesper Core Online (Testing)");
          return next;
        });
      }, 90);
    } else {
      setVesperPower(0);
      setVesperLog("Core offline");
    }
    return () => clearInterval(interval);
  }, [isHoveredVesper]);

  return (
    <section id="ecosystem" className="py-20 border-t border-white/5 bg-[#070707] relative overflow-hidden">
      {/* Dynamic background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/2 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            The HumAIn Ecosystem
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
            Zai is only the beginning. Discover our roadmap of specialized digital agents engineered to join your teams and manage complex workloads.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Zai (Active) */}
          <div className="glass-card rounded-2xl p-6 border-accent-blue/30 bg-gradient-to-b from-black/40 to-blue-950/10 flex flex-col justify-between text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-blue/10 rounded-full blur-2xl" />
            
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-accent-blue/15 border border-accent-blue/30 rounded-xl text-accent-blue">
                  <Cpu size={22} className="animate-pulse" />
                </div>
                <span className="text-[9px] font-mono font-bold text-accent-blue bg-accent-blue/10 border border-accent-blue/20 px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-ping" /> Active Now
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                Zai <span className="text-xs text-accent-blue font-mono font-normal">v1.4</span>
              </h3>
              <span className="text-xs text-accent-blue font-mono uppercase tracking-wider block mb-4">
                Recruiter & Biometric Assessor
              </span>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Specialized in conversational parsing, vocal stress calibration, capillary oximetry tracking, and automated dossier synthesis.
              </p>
            </div>

            <div className="p-3 bg-black/60 border border-white/5 rounded-xl text-[10px] text-gray-400 font-mono space-y-1.5">
              <div className="flex justify-between">
                <span>Active Channels</span>
                <span className="text-white">Audio + Video (SIP)</span>
              </div>
              <div className="flex justify-between">
                <span>Inference Lag</span>
                <span className="text-accent-emerald">~40ms</span>
              </div>
            </div>
          </div>

          {/* Lexis (Assistant - Coming Soon) */}
          <div
            className={`glass-card rounded-2xl p-6 border-white/5 flex flex-col justify-between text-left transition-all duration-300 relative overflow-hidden group`}
            onMouseEnter={() => setIsHoveredLexis(true)}
            onMouseLeave={() => setIsHoveredLexis(false)}
          >
            {isHoveredLexis && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-coral/5 rounded-full blur-2xl" />
            )}

            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-gray-500 group-hover:text-accent-coral group-hover:bg-accent-coral/10 group-hover:border-accent-coral/30 transition-all">
                  <Zap size={22} className={isHoveredLexis ? "animate-bounce" : ""} />
                </div>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border transition-all ${
                  isHoveredLexis 
                    ? "text-accent-coral bg-accent-coral/10 border-accent-coral/20 animate-pulse" 
                    : "text-gray-500 bg-white/5 border-white/5"
                }`}>
                  {isHoveredLexis ? "Powering Up" : "Hover to boot"}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-coral transition-colors">
                Lexis
              </h3>
              <span className="text-xs text-gray-500 font-mono uppercase tracking-wider block mb-4 group-hover:text-accent-coral/80 transition-colors">
                Personal Executive Assistant
              </span>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Specialized in calendar context stitching, autonomous inbox response sequencing, and multi-user meeting resolution logistics.
              </p>
            </div>

            {/* Powering up visual console */}
            <div className="p-3 bg-black/60 border border-white/5 rounded-xl text-[10px] text-gray-400 font-mono space-y-2">
              <div className="flex justify-between">
                <span>Boot Status</span>
                <span className={isHoveredLexis ? "text-accent-coral font-bold" : "text-gray-500"}>
                  {isHoveredLexis ? `${lexisPower}%` : "OFFLINE"}
                </span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-accent-coral h-full rounded-full transition-all duration-100"
                  style={{ width: `${lexisPower}%` }}
                />
              </div>
              <div className="text-[9px] text-gray-600 truncate flex items-center gap-1">
                <Terminal size={10} className="shrink-0" />
                <span className={isHoveredLexis ? "text-gray-400" : ""}>{lexisLog}</span>
              </div>
            </div>
          </div>

          {/* Vesper (Sales Analyst - Coming Soon) */}
          <div
            className="glass-card rounded-2xl p-6 border-white/5 flex flex-col justify-between text-left transition-all duration-300 relative overflow-hidden group"
            onMouseEnter={() => setIsHoveredVesper(true)}
            onMouseLeave={() => setIsHoveredVesper(false)}
          >
            {isHoveredVesper && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan/5 rounded-full blur-2xl" />
            )}

            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-gray-500 group-hover:text-accent-cyan group-hover:bg-accent-cyan/10 group-hover:border-accent-cyan/30 transition-all">
                  <Eye size={22} className={isHoveredVesper ? "animate-pulse" : ""} />
                </div>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border transition-all ${
                  isHoveredVesper 
                    ? "text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20 animate-pulse" 
                    : "text-gray-500 bg-white/5 border-white/5"
                }`}>
                  {isHoveredVesper ? "Syncing Grid" : "Hover to boot"}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
                Vesper
              </h3>
              <span className="text-xs text-gray-500 font-mono uppercase tracking-wider block mb-4 group-hover:text-accent-cyan/80 transition-colors">
                Enterprise Sales Analyst
              </span>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Specialized in live pitch telemetry parsing, contract risk classification, and enterprise pipeline prediction logic.
              </p>
            </div>

            {/* Powering up visual console */}
            <div className="p-3 bg-black/60 border border-white/5 rounded-xl text-[10px] text-gray-400 font-mono space-y-2">
              <div className="flex justify-between">
                <span>Grid Sync Status</span>
                <span className={isHoveredVesper ? "text-accent-cyan font-bold" : "text-gray-500"}>
                  {isHoveredVesper ? `${vesperPower}%` : "OFFLINE"}
                </span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-accent-cyan h-full rounded-full transition-all duration-100"
                  style={{ width: `${vesperPower}%` }}
                />
              </div>
              <div className="text-[9px] text-gray-600 truncate flex items-center gap-1">
                <Terminal size={10} className="shrink-0" />
                <span className={isHoveredVesper ? "text-gray-400" : ""}>{vesperLog}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
