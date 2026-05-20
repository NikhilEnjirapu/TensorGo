"use client";

import React from "react";
import { useSimulation } from "@/context/SimulationContext";
import { Video, ShieldCheck, Activity, FileSpreadsheet, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkflowStepper() {
  const { step, setStep } = useSimulation();

  const steps = [
    {
      title: "Establish Connection",
      subtitle: "Zai joins call",
      description: "Zai connects directly as a silent co-host to Zoom, Google Meet, or Teams. It uses WebRTC streams to capture clean audio and video feeds with minimal latency.",
      icon: Video,
      color: "var(--color-accent-blue)",
      graphicType: "connect"
    },
    {
      title: "Dual Stream Capture",
      subtitle: "Captures A/V telemetry",
      description: "Extracts individual audio channels for diarization and processes video frames locally to map key tracking vectors. No candidate data is stored after analysis.",
      icon: Activity,
      color: "var(--color-accent-coral)",
      graphicType: "capture"
    },
    {
      title: "Biometric Telemetry",
      subtitle: "Analyzes behavior",
      description: "Monitors micro-changes in heart rate variation (via skin coloration shift analysis), stress frequency in vocal cords, response hesitation, and filler word density.",
      icon: ShieldCheck,
      color: "var(--color-accent-cyan)",
      graphicType: "analyze"
    },
    {
      title: "Dossier Synthesis",
      subtitle: "Generates insights",
      description: "Compiles all technical ratings, communications speed, sentiment trends, and verification compliance reports into a structured recruiter dashboard dossier.",
      icon: FileSpreadsheet,
      color: "var(--color-accent-emerald)",
      graphicType: "dossier"
    }
  ];

  const currentStep = steps[step];

  return (
    <section id="workflow" className="py-20 border-t border-white/5 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How Zai Evaluates Talent
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            From dial-in to dossier. Watch how our digital agent processes live conversation streams and transforms telemetry into objective hiring signals.
          </p>
        </div>

        {/* Stepper Header */}
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 max-w-5xl mx-auto mb-12">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-white/5 hidden md:block -translate-y-1/2 z-0" />
          
          {/* Active Connector Progress */}
          <div
            className="absolute top-1/2 left-[10%] h-0.5 bg-gradient-to-r from-accent-blue to-accent-emerald hidden md:block -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${(step / 3) * 80}%` }}
          />

          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCompleted = step > idx;
            const isCurrent = step === idx;

            return (
              <button
                key={idx}
                onClick={() => setStep(idx)}
                className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isCurrent
                      ? "bg-black border-accent-blue text-accent-blue shadow-lg shadow-blue-500/20 scale-110"
                      : isCompleted
                      ? "bg-accent-emerald/10 border-accent-emerald text-accent-emerald"
                      : "bg-black border-white/10 text-gray-500 group-hover:border-white/30 group-hover:text-gray-300"
                  }`}
                >
                  <Icon size={20} />
                </div>
                <div className="text-center">
                  <div className={`text-xs font-semibold uppercase tracking-wider font-mono ${isCurrent ? "text-white" : "text-gray-500"}`}>
                    {s.title}
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium">
                    {s.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Preview Panel Card */}
        <div className="max-w-4xl mx-auto glass-card rounded-2xl p-6 md:p-8 border-white/5 relative overflow-hidden bg-black/40 min-h-[300px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Info */}
            <div className="md:col-span-7 text-left">
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-accent-blue bg-accent-blue/10 px-2.5 py-1 rounded">
                STAGE 0{step + 1}
              </span>
              <h3 className="text-2xl font-bold text-white mt-4">
                {currentStep.title}
              </h3>
              <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                {currentStep.description}
              </p>
              
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-gray-500">
                <span>Active Node:</span>
                <span className="text-white px-2 py-0.5 bg-white/5 rounded border border-white/5">
                  {step === 0 && "sip_gateway_us_east.bin"}
                  {step === 1 && "rtsp_multiplexer_node"}
                  {step === 2 && "telemetry_neural_engine_v3"}
                  {step === 3 && "dossier_generator_v2.1"}
                </span>
              </div>
            </div>

            {/* Right: Graphic Simulation */}
            <div className="md:col-span-5 flex justify-center items-center h-48 bg-white/[0.01] border border-white/5 rounded-xl p-4 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                        <Video size={24} />
                      </div>
                      <div className="h-0.5 w-8 bg-blue-500/40 border-t border-dashed animate-pulse" />
                      <div className="w-10 h-10 rounded-full bg-accent-coral/10 border border-accent-coral/30 flex items-center justify-center text-accent-coral">
                        <span className="text-[10px] font-bold">ZAI</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">ESTABLISHING WebRTC BRIDGE...</span>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-gray-500">
                        <span>AUDIO STREAM RX</span>
                        <span className="text-accent-coral">48KB/S PACKETS</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                          className="bg-accent-coral w-1/3 h-full rounded-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-gray-500">
                        <span>VIDEO STREAM RX</span>
                        <span className="text-accent-blue">60FPS DECODED</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          className="bg-accent-blue w-1/2 h-full rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full grid grid-cols-2 gap-4"
                  >
                    <div className="border border-white/5 bg-black/60 p-3 rounded-lg text-left">
                      <div className="text-[9px] text-gray-500 font-mono">PITCH DYNAMICS</div>
                      <div className="text-xs font-bold text-white mt-1">210Hz - Stable</div>
                    </div>
                    <div className="border border-white/5 bg-black/60 p-3 rounded-lg text-left">
                      <div className="text-[9px] text-gray-500 font-mono">BLINK FREQUENCY</div>
                      <div className="text-xs font-bold text-accent-cyan mt-1">14/min - Relaxed</div>
                    </div>
                    <div className="border border-white/5 bg-black/60 p-3 rounded-lg text-left">
                      <div className="text-[9px] text-gray-500 font-mono">MICRO-SWEAT INDEX</div>
                      <div className="text-xs font-bold text-accent-coral mt-1">0.12 - Normal</div>
                    </div>
                    <div className="border border-white/5 bg-black/60 p-3 rounded-lg text-left">
                      <div className="text-[9px] text-gray-500 font-mono">COGNITIVE LOAD</div>
                      <div className="text-xs font-bold text-accent-blue mt-1">34% - Low</div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <div className="w-12 h-12 bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald rounded-full flex items-center justify-center animate-bounce">
                      <FileSpreadsheet size={22} />
                    </div>
                    <div className="text-[10px] text-accent-emerald font-mono uppercase tracking-wider">
                      DOSSIER ready to compile
                    </div>
                    <a
                      href="#report"
                      className="text-xs text-white/80 hover:text-white underline underline-offset-4 flex items-center gap-1 cursor-pointer"
                    >
                      Jump to candidate card <ArrowRight size={12} />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
