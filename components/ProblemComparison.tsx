"use client";

import React, { useState } from "react";
import { AlertCircle, TrendingUp, Sparkles, FileText, Ban, Activity, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

interface TimelineMarker {
  time: string;
  percent: number;
  label: string;
  stress: number;
  filler: number;
  engagement: number;
  details: string;
}

export default function ProblemComparison() {
  const [activeIndex, setActiveIndex] = useState(1); // Default to middle spike

  const timelineData: TimelineMarker[] = [
    {
      time: "00:00 - 00:20",
      percent: 10,
      label: "Introduction",
      stress: 25,
      filler: 0,
      engagement: 80,
      details: "Greeting and casual conversation. Baseline established."
    },
    {
      time: "00:30 - 01:00",
      percent: 35,
      label: "Architecture Q",
      stress: 45,
      filler: 2,
      engagement: 88,
      details: "Prompted about Kubernetes/Kafka setup. Verbal hesitation detected."
    },
    {
      time: "01:10 - 01:45",
      percent: 60,
      label: "DB Lockup Crash",
      stress: 85,
      filler: 6,
      engagement: 55,
      details: "Recalling DB outage. Stress spiked 88%, filler words doubled due to performance anxiety."
    },
    {
      time: "02:00 - 02:40",
      percent: 85,
      label: "Resolution Method",
      stress: 35,
      filler: 1,
      engagement: 92,
      details: "Explaining PgBouncer solution. Confident voice match, biometrics stabilized."
    }
  ];

  const currentData = timelineData[activeIndex];

  return (
    <section id="problem" className="py-20 border-t border-white/5 bg-[#070707] relative overflow-hidden">
      {/* Background glowing circle */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent-coral/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            The Blindspot in Modern Recruiting
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            Traditional hiring relies on polished resumes and rehearsed answers. Zai exposes the true cognitive load, confidence markers, and performance signals under stress.
          </p>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          
          {/* Left: What Recruiters See (ATS) */}
          <div className="glass-card rounded-2xl p-6 border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <FileText className="text-gray-400" size={18} />
                  <span className="text-sm font-semibold text-gray-300 uppercase tracking-wider font-mono">
                    Traditional CV / Screen View
                  </span>
                </div>
                <span className="text-xs bg-red-500/10 border border-red-500/20 text-red-400 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                  <Ban size={10} /> OPAQUE TELEMETRY
                </span>
              </div>

              {/* Boring Resume Mock */}
              <div className="space-y-4 text-left">
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-white text-base">Alex Chen</h4>
                      <p className="text-xs text-gray-400">Senior Systems Engineer (5 Yrs Exp)</p>
                    </div>
                    <span className="text-xs font-mono bg-white/5 px-2 py-1 rounded border border-white/5 text-gray-300">
                      Match: 94%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-3">
                    \"Experienced developer specializing in distributed systems, high throughput database operations, and multi-cloud container deployments. Skilled in Kubernetes, PostgreSQL, and Apache Kafka.\"
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-white/5 py-2 text-gray-400">
                    <span>Q1: monolith-to-microservice migration</span>
                    <span className="text-accent-emerald font-semibold">\"PASS\"</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-2 text-gray-400">
                    <span>Q2: resolving pg database lockups</span>
                    <span className="text-accent-emerald font-semibold">\"PASS\"</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-2 text-gray-400 text-gray-500">
                    <span>Stress Level / Mental Fatigue</span>
                    <span>Unknown / Unmeasured</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-2 text-gray-400 text-gray-500">
                    <span>Real-time Confidence Index</span>
                    <span>Self-Reported Only</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-400 flex items-start gap-3 text-left">
              <AlertCircle size={16} className="text-gray-500 shrink-0 mt-0.5" />
              <span>
                <strong>Limitations:</strong> Keyword matching and verbal answers fail to evaluate structural stress thresholds, cognitive dissonance, or actual troubleshooting composure.
              </span>
            </div>
          </div>

          {/* Right: What's Actually Happening (Zai Telemetry) */}
          <div className="glass-card rounded-2xl p-6 border-accent-blue/10 bg-gradient-to-br from-black/40 to-blue-950/10 flex flex-col justify-between relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Activity className="text-accent-blue" size={18} />
                  <span className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                    Zai Multimodal Timeline
                  </span>
                </div>
                <span className="text-xs bg-accent-blue/10 border border-accent-blue/20 text-accent-blue px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono font-bold">
                  <Sparkles size={10} className="animate-spin" style={{ animationDuration: '6s' }} /> MULTI-MODAL ACTIVE
                </span>
              </div>

              {/* Dynamic Telemetry dashboard readout */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-black/50 border border-white/5 rounded-xl p-3 text-left">
                  <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">STRESS INDEX</div>
                  <div className="text-xl font-bold font-mono mt-1 text-white flex items-baseline gap-1">
                    <span className={currentData.stress > 70 ? "text-accent-coral" : "text-white"}>
                      {currentData.stress}%
                    </span>
                    <span className="text-[9px] text-gray-500 font-sans">
                      {currentData.stress > 70 ? "Critical" : "Stable"}
                    </span>
                  </div>
                </div>

                <div className="bg-black/50 border border-white/5 rounded-xl p-3 text-left">
                  <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">FILLER RATE</div>
                  <div className="text-xl font-bold font-mono mt-1 text-white flex items-baseline gap-1">
                    <span className={currentData.filler > 4 ? "text-accent-coral" : "text-white"}>
                      {currentData.filler}
                    </span>
                    <span className="text-[9px] text-gray-500 font-sans">instances</span>
                  </div>
                </div>

                <div className="bg-black/50 border border-white/5 rounded-xl p-3 text-left">
                  <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">ENGAGEMENT</div>
                  <div className="text-xl font-bold font-mono mt-1 text-accent-cyan flex items-baseline gap-1">
                    <span>{currentData.engagement}%</span>
                  </div>
                </div>
              </div>

              {/* Graphical representation of telemetry over timeline */}
              <div className="relative h-28 w-full border-b border-white/10 mt-2 mb-4 bg-black/40 rounded-xl overflow-hidden p-2">
                <svg className="absolute inset-0 w-full h-full text-accent-blue" viewBox="0 0 100 30" preserveAspectRatio="none">
                  {/* Fill background representing stress area */}
                  <path
                    d="M 0 30 L 10 22.5 L 35 16.5 L 60 4.5 L 85 19.5 L 100 20 L 100 30 Z"
                    fill="url(#stressGrad)"
                    className="transition-all duration-500"
                  />
                  {/* Stress curve line */}
                  <path
                    d="M 0 22.5 L 10 22.5 L 35 16.5 L 60 4.5 L 85 19.5 L 100 20"
                    fill="none"
                    stroke="var(--color-accent-coral)"
                    strokeWidth="0.75"
                    className="transition-all duration-500"
                  />
                  {/* Engagement curve line */}
                  <path
                    d="M 0 6 L 10 6 L 35 3.6 L 60 13.5 L 85 2.4 L 100 2"
                    fill="none"
                    stroke="var(--color-accent-cyan)"
                    strokeWidth="0.55"
                    strokeDasharray="1.5 1"
                    className="transition-all duration-500"
                  />

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent-coral)" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="var(--color-accent-coral)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Scrub playhead lines */}
                  {timelineData.map((marker, idx) => (
                    <line
                      key={idx}
                      x1={marker.percent}
                      y1="0"
                      x2={marker.percent}
                      y2="30"
                      stroke={idx === activeIndex ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.05)"}
                      strokeWidth="0.5"
                    />
                  ))}
                </svg>

                {/* Dot markers on curve */}
                {timelineData.map((marker, idx) => {
                  const stressY = 30 - ((100 - marker.stress) / 100) * 30; // approx mapping
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`absolute w-3 h-3 rounded-full border -translate-x-1.5 -translate-y-1.5 focus:outline-none transition-all cursor-pointer ${
                        idx === activeIndex
                          ? "bg-accent-coral border-white scale-125 shadow-lg shadow-rose-500/50"
                          : "bg-black border-white/30 hover:border-white"
                      }`}
                      style={{
                        left: `${marker.percent}%`,
                        top: `${20 - (marker.stress / 5)}px`
                      }}
                      title={marker.label}
                    />
                  );
                })}
              </div>

              {/* Explanatory notes */}
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-left">
                <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mb-1">
                  Timeline Segment: {currentData.label} ({currentData.time})
                </div>
                <p className="text-xs text-white">
                  {currentData.details}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
              {timelineData.map((marker, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[10px] border transition-all cursor-pointer whitespace-nowrap ${
                    idx === activeIndex
                      ? "bg-accent-blue/15 border-accent-blue/30 text-accent-blue font-bold"
                      : "bg-white/5 border-transparent text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {marker.time}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
