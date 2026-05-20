"use client";

import React, { useState, useEffect } from "react";
import { useSimulation } from "@/context/SimulationContext";
import { Award, CheckCircle, ShieldAlert, Cpu, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AIReportCard() {
  const { step } = useSimulation();

  const reportTexts = {
    overview:
      "Alex Chen demonstrated exceptional systems design competence under structured probing. Displays solid architectural familiarity with Postgres connection pooling (PgBouncer) and read-replica distribution. Capillary dilation telemetry registered a brief stress spike during DBMS failure prompts, but candidate maintained a stable, objective narrative throughout recovery discussions.",
    communication:
      "Direct, analytical communication style with a stable average pitch vector. Speaking rate hovered around 134 WPM, within the optimal technical transfer band. Identified 9 filler words across the 3-minute session, peaking during PG Write-Lock explanation. Negligible vocal tremors or deflection indicators.",
    behavioral:
      "High composure recovery index. When confronted with database replication failure scenarios, candidate displayed immediate technical accountability, outlining the failure vector clearly. High aptitude for high-stress infrastructure environments and active incident command structures."
  };

  const [activeReportTab, setActiveReportTab] = useState<"overview" | "communication" | "behavioral">("overview");

  // Typewriter effect states
  const [typedTexts, setTypedTexts] = useState({
    overview: "",
    communication: "",
    behavioral: ""
  });

  const isDossierUnlocked = step === 3;

  useEffect(() => {
    if (!isDossierUnlocked) {
      // Reset text typing when locked
      setTypedTexts({ overview: "", communication: "", behavioral: "" });
      return;
    }

    let isCancelled = false;

    // Fast typewriter simulation
    const typeSection = async (section: "overview" | "communication" | "behavioral") => {
      const fullText = reportTexts[section];
      let currentText = "";
      let index = 0;

      // Type out chunks of 3-4 chars for optimal fast typing feel
      return new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          if (isCancelled) {
            clearInterval(interval);
            resolve();
            return;
          }

          if (index < fullText.length) {
            currentText += fullText.slice(index, index + 4);
            index += 4;
            setTypedTexts((prev) => ({
              ...prev,
              [section]: currentText
            }));
          } else {
            clearInterval(interval);
            resolve();
          }
        }, 15);
      });
    };

    const typeAll = async () => {
      await typeSection("overview");
      if (isCancelled) return;
      await typeSection("communication");
      if (isCancelled) return;
      await typeSection("behavioral");
    };

    typeAll();

    return () => {
      isCancelled = true;
    };
  }, [isDossierUnlocked]);

  // Overall Ring Dial Animation
  const overallScore = 88;

  return (
    <section id="report" className="py-20 border-t border-white/5 bg-[#050505] relative">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-emerald/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            AI Recruit Dossier (Report Card)
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
            Behold the objective candidate dossier. Zai compiles telemetry logs, semantic structure, and biometric stress graphs into a comprehensive profile.
          </p>
        </div>

        {/* Locked State Warning / Call-to-action */}
        {!isDossierUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card rounded-2xl p-8 border-dashed border-accent-blue/20 text-center max-w-4xl mx-auto mb-8 bg-black/30"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 bg-accent-blue/10 border border-accent-blue/20 text-accent-blue rounded-full flex items-center justify-center animate-pulse">
                <Cpu size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
                  Dossier Compiling...
                </h3>
                <p className="text-gray-400 text-xs mt-2 max-w-md mx-auto">
                  Click <strong>Launch Telemetry Simulation</strong> at the bottom of the page or navigate to step 4 ("Compile Dossier") to watch the AI dossier build in real-time.
                </p>
              </div>
              <button
                onClick={() => {
                  const scrollHero = document.getElementById("hero");
                  scrollHero?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-4 py-2 bg-accent-blue/15 border border-accent-blue/30 text-accent-blue rounded-xl text-xs font-semibold hover:bg-accent-blue/25 transition-all cursor-pointer"
              >
                Jump to Simulation Controls
              </button>
            </div>
          </motion.div>
        )}

        {/* Complete Dossier Layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto transition-all duration-500 ${!isDossierUnlocked ? "opacity-30 pointer-events-none blur-[1px]" : "opacity-100"}`}>
          
          {/* Left Column: AI Typewritten Dossier sections */}
          <div className="lg:col-span-7 glass-card rounded-2xl border-white/5 p-6 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-2 border-b border-white/5 pb-4 mb-6">
                <Sparkles size={16} className="text-accent-emerald" />
                <span className="text-xs font-bold font-mono text-gray-300 uppercase tracking-widest">
                  Assessment Breakdowns
                </span>
              </div>

              {/* Sub-tab selection */}
              <div className="flex gap-2 mb-6">
                {(["overview", "communication", "behavioral"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveReportTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono border uppercase tracking-wider transition-all cursor-pointer ${
                      activeReportTab === tab
                        ? "bg-accent-emerald/10 border-accent-emerald/30 text-accent-emerald"
                        : "bg-white/5 border-transparent text-gray-400 hover:bg-white/8"
                    }`}
                  >
                    {tab === "overview" && "Overview"}
                    {tab === "communication" && "Communication"}
                    {tab === "behavioral" && "Behavioral"}
                  </button>
                ))}
              </div>

              {/* Report display with typewriter effect */}
              <div className="bg-black/60 border border-white/5 rounded-xl p-4 min-h-[160px] relative font-mono text-xs text-gray-300 leading-relaxed">
                <span className="absolute top-2 right-2 text-[8px] text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/20 px-1 rounded uppercase tracking-widest font-bold">
                  Autogenerated
                </span>
                
                {activeReportTab === "overview" && (
                  <div>
                    {typedTexts.overview || <span className="text-gray-600 animate-pulse">Compiling overview text...</span>}
                    {typedTexts.overview.length < reportTexts.overview.length && <span className="inline-block w-1.5 h-3.5 bg-accent-emerald ml-0.5 animate-pulse" />}
                  </div>
                )}

                {activeReportTab === "communication" && (
                  <div>
                    {typedTexts.communication || <span className="text-gray-600 animate-pulse">Computing vocabulary trends...</span>}
                    {typedTexts.communication.length < reportTexts.communication.length && <span className="inline-block w-1.5 h-3.5 bg-accent-emerald ml-0.5 animate-pulse" />}
                  </div>
                )}

                {activeReportTab === "behavioral" && (
                  <div>
                    {typedTexts.behavioral || <span className="text-gray-600 animate-pulse">Evaluating composure parameters...</span>}
                    {typedTexts.behavioral.length < reportTexts.behavioral.length && <span className="inline-block w-1.5 h-3.5 bg-accent-emerald ml-0.5 animate-pulse" />}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 p-3 bg-white/[0.01] border border-white/5 rounded-xl text-[10px] text-gray-500 font-mono flex items-center justify-between">
              <span>Candidate ID: Alex Chen (#CAND-8893)</span>
              <span>Dossier Sign: sha256_e9c3e98...</span>
            </div>
          </div>

          {/* Right Column: Score Metrics & Fit Panel */}
          <div className="lg:col-span-5 glass-card rounded-2xl border-white/5 p-6 flex flex-col justify-between bg-gradient-to-br from-black/40 to-emerald-950/5">
            
            {/* Overall Ring Progress */}
            <div className="text-center flex flex-col items-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-4">
                Hiring Fit Summary
              </span>
              
              <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="72" cy="72" r="62" className="stroke-white/5 fill-none" strokeWidth="8" />
                  <motion.circle
                    cx="72"
                    cy="72"
                    r="62"
                    className="stroke-accent-emerald fill-none"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 62}
                    initial={{ strokeDashoffset: 2 * Math.PI * 62 }}
                    animate={{ strokeDashoffset: isDossierUnlocked ? 2 * Math.PI * 62 * (1 - overallScore / 100) : 2 * Math.PI * 62 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-4xl font-extrabold text-white font-mono leading-none">
                    {overallScore}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">/100</span>
                  <p className="text-[9px] text-accent-emerald font-bold tracking-wider font-mono uppercase mt-1">Strong Match</p>
                </div>
              </div>
            </div>

            {/* Score Breakdowns */}
            <div className="space-y-4 my-6 text-left">
              <div>
                <div className="flex justify-between text-xs text-gray-400 font-mono mb-1.5">
                  <span>Technical Composure</span>
                  <span className="text-white font-bold">85%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-accent-emerald h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: isDossierUnlocked ? "85%" : 0 }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-400 font-mono mb-1.5">
                  <span>Communication Clarity</span>
                  <span className="text-white font-bold">79%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-accent-emerald h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: isDossierUnlocked ? "79%" : 0 }}
                    transition={{ duration: 1, delay: 0.1 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-400 font-mono mb-1.5">
                  <span>Problem Solving Composure</span>
                  <span className="text-white font-bold">92%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-accent-emerald h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: isDossierUnlocked ? "92%" : 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            </div>

            {/* Hiring Decision Recommendation */}
            <div className="mt-4 p-3 bg-accent-emerald/10 border border-accent-emerald/20 rounded-xl flex items-center gap-3">
              <Award className="text-accent-emerald shrink-0" size={20} />
              <div className="text-[10px] text-left leading-tight text-white font-mono uppercase">
                <strong>Hiring Decision:</strong> Recommend advancing candidate to architectural deep dive team round.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
