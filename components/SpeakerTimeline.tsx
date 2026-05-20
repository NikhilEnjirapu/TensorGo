"use client";

import React, { useRef } from "react";
import { useSimulation, TimelineEvent } from "@/context/SimulationContext";
import { Clock, Info, ShieldAlert, CheckCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function SpeakerTimeline() {
  const { timelineEvents, activeTimelineIndex, elapsedTime, isActive } = useSimulation();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Status mapping
  const getEventBorderColor = (type?: string, isActive?: boolean) => {
    if (isActive) return "border-accent-blue shadow-lg shadow-blue-500/10";
    if (type === "warning") return "border-accent-coral/30 hover:border-accent-coral";
    if (type === "success") return "border-accent-emerald/30 hover:border-accent-emerald";
    return "border-white/5 hover:border-white/20";
  };

  const getEventIcon = (type?: string) => {
    if (type === "warning") return <ShieldAlert size={14} className="text-accent-coral" />;
    if (type === "success") return <CheckCircle size={14} className="text-accent-emerald" />;
    return <Info size={14} className="text-gray-400" />;
  };

  return (
    <section id="timeline" className="py-20 border-t border-white/5 bg-[#070707] relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-coral/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Diarization Timeline & Telemetry Alerts
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
            Review the audio transcript mapped chronologically. Hover over segments containing alerts to examine biometric snapshots and verbal indicators.
          </p>
        </div>

        {/* Timeline Horizontal Scroll wrapper */}
        <div className="relative">
          {/* Scroll indicators */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#070707] to-transparent pointer-events-none z-10 hidden md:block" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#070707] to-transparent pointer-events-none z-10 hidden md:block" />

          {/* Horizontal Track */}
          <div
            ref={timelineRef}
            className="flex gap-4 overflow-x-auto pb-8 pt-4 px-2 scroll-smooth items-stretch"
          >
            {timelineEvents.map((ev, idx) => {
              const isEventActive = idx === activeTimelineIndex;
              
              return (
                <motion.div
                  key={ev.id}
                  className={`min-w-[280px] sm:min-w-[320px] max-w-[340px] flex flex-col justify-between glass-card rounded-2xl p-5 border transition-all duration-300 relative group select-none ${getEventBorderColor(
                    ev.type,
                    isEventActive
                  )} ${isEventActive ? "bg-accent-blue/[0.03]" : ""}`}
                  animate={isEventActive ? { scale: 1.02 } : { scale: 1 }}
                >
                  {/* Floating active dot */}
                  {isEventActive && (
                    <span className="absolute -top-1.5 left-6 px-2 py-0.5 rounded-full bg-accent-blue text-[8px] font-bold font-mono uppercase tracking-wider text-white flex items-center gap-1 animate-pulse">
                      <span className="w-1 h-1 rounded-full bg-white" /> Speaking
                    </span>
                  )}

                  <div>
                    {/* Header: speaker & time stamp */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                            ev.speaker === "Zai"
                              ? "bg-accent-blue/15 text-accent-blue"
                              : "bg-white/5 text-gray-200"
                          }`}
                        >
                          {ev.speaker === "Zai" ? "🤖 Zai (Interviewer)" : "👤 Alex Chen"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                        <Clock size={10} />
                        <span>{ev.time}</span>
                      </div>
                    </div>

                    {/* Speech Transcript */}
                    <p className="text-xs text-gray-300 leading-relaxed text-left">
                      "{ev.text}"
                    </p>
                  </div>

                  {/* Footer annotation or stats */}
                  {ev.annotation ? (
                    <div className={`mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono justify-between`}>
                      <div className="flex items-center gap-1.5 text-left">
                        {getEventIcon(ev.type)}
                        <span className={ev.type === "warning" ? "text-accent-coral font-bold" : "text-accent-emerald font-bold"}>
                          {ev.annotation}
                        </span>
                      </div>
                      
                      {/* Tooltip Hover Overlay */}
                      <div className="relative group/tooltip">
                        <span className="cursor-help text-gray-500 hover:text-gray-300">
                          <HelpCircle size={12} />
                        </span>
                        
                        {/* Tooltip Content */}
                        <div className="absolute bottom-full right-0 mb-2 w-64 p-3 rounded-xl bg-black border border-white/10 shadow-2xl text-[10px] leading-relaxed text-gray-300 font-sans invisible opacity-0 group-hover/tooltip:visible group-hover/tooltip:opacity-100 transition-all duration-200 z-30 backdrop-blur-md">
                          <div className="font-bold text-white font-mono uppercase tracking-wider mb-1.5 flex items-center justify-between border-b border-white/5 pb-1">
                            <span>Telemetry Snapshot</span>
                            <span className="text-[8px] text-gray-400">{ev.time}</span>
                          </div>
                          {ev.type === "warning" && ev.seconds === 30 && (
                            <p>
                              Candidate hesitated for 2.4s. Vocabulary scan indicates standard filler keyword repetition (\"uh\", \"actually\"). Stress indices within nominal limits.
                            </p>
                          )}
                          {ev.type === "warning" && ev.seconds === 75 && (
                            <p>
                              Discussion of Postgres failure triggered a 28% increase in heart rate. Pupil expansion detected on video stream. Composure recovery index evaluated as \"Moderately Fast\".
                            </p>
                          )}
                          {ev.type === "success" && ev.seconds === 145 && (
                            <p>
                              Speaking rate normalized to 135 WPM. Hand gestures (visible on camera feed) align with constructive description nodes. Sentiment indicator shifted positive.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                      <span>Telemetry Normal</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Instructions banner */}
        <div className="max-w-2xl mx-auto mt-6 bg-white/[0.02] border border-white/5 rounded-xl p-3 text-xs text-gray-500 flex items-center gap-2 justify-center">
          <Info size={14} className="text-gray-400" />
          <span>Swipe or scroll horizontally on track to navigate all turns of the interview.</span>
        </div>
      </div>
    </section>
  );
}
