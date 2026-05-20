"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSimulation } from "@/context/SimulationContext";
import { Play, Video, Mic, Heart, ShieldAlert, MonitorCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const { isActive, elapsedTime, biometrics, startSimulation, candidateState } = useSimulation();
  
  // Waveform bar count
  const BAR_COUNT = 24;
  const [waveHeights, setWaveHeights] = useState<number[]>(new Array(BAR_COUNT).fill(15));
  
  // Animate waveform based on candidateState and active status
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setWaveHeights((prev) =>
          prev.map(() => {
            if (candidateState === "connecting") {
              return 8 + Math.random() * 8; // Small connecting jitter
            }
            if (candidateState === "listening") {
              return 5 + Math.random() * 5; // Idle background noise
            }
            if (candidateState === "answering") {
              return 10 + Math.random() * 45; // High amplitude speaking waves
            }
            return 4; // Flatline
          })
        );
      }, 100);
    } else {
      interval = setInterval(() => {
        setWaveHeights((prev) => prev.map(() => 6 + Math.sin(Date.now() / 300) * 4));
      }, 200);
    }

    return () => clearInterval(interval);
  }, [isActive, candidateState]);

  // Face landmarks simulation
  const [meshPoints, setMeshPoints] = useState<{ x: number; y: number }[]>([]);
  
  useEffect(() => {
    // Generate static mesh points in facial outline shape
    const points: { x: number; y: number }[] = [
      // Eyebrows
      { x: 35, y: 35 }, { x: 42, y: 33 }, { x: 48, y: 36 },
      { x: 52, y: 36 }, { x: 58, y: 33 }, { x: 65, y: 35 },
      // Nose
      { x: 50, y: 40 }, { x: 50, y: 48 }, { x: 47, y: 55 }, { x: 53, y: 55 },
      // Eyes
      { x: 38, y: 42 }, { x: 44, y: 42 },
      { x: 56, y: 42 }, { x: 62, y: 42 },
      // Mouth
      { x: 40, y: 65 }, { x: 45, y: 62 }, { x: 50, y: 63 }, { x: 55, y: 62 }, { x: 60, y: 65 },
      { x: 55, y: 68 }, { x: 50, y: 69 }, { x: 45, y: 68 },
      // Jawline
      { x: 28, y: 45 }, { x: 30, y: 55 }, { x: 34, y: 68 }, { x: 42, y: 78 },
      { x: 50, y: 81 },
      { x: 58, y: 78 }, { x: 66, y: 68 }, { x: 70, y: 55 }, { x: 72, y: 45 }
    ];
    setMeshPoints(points);
  }, []);

  // Jitter face mesh points slightly during interview to look alive
  const [meshJitter, setMeshJitter] = useState<{ dx: number; dy: number }[]>(new Array(31).fill({ dx: 0, dy: 0 }));
  useEffect(() => {
    if (isActive && candidateState === "answering") {
      const interval = setInterval(() => {
        setMeshJitter(
          meshPoints.map(() => ({
            dx: (Math.random() - 0.5) * 1.5,
            dy: (Math.random() - 0.5) * 1.5
          }))
        );
      }, 150);
      return () => clearInterval(interval);
    } else {
      setMeshJitter(new Array(31).fill({ dx: 0, dy: 0 }));
    }
  }, [isActive, candidateState, meshPoints]);

  return (
    <section id="hero" className="relative pt-10 pb-20 md:py-32 overflow-hidden radial-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Copy & Actions */}
          <div className="lg:col-span-6 flex flex-col text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-xs font-semibold text-accent-blue w-fit mb-6"
            >
              <Video size={12} />
              <span>Zai Interviewer v1.4 Live Preview</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-white"
            >
              Understand Humans. <br />
              <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-emerald bg-clip-text text-transparent">
                Not Just Resumes.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed"
            >
              Meet Zai, the first HumAIn digital agent. An AI interviewer that joins Zoom or Meet video calls, tracks live audio, facial biometrics, and stress levels to generate deep, un-gameable candidate dossiers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={startSimulation}
                className="px-6 py-3.5 bg-accent-blue text-white font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all group"
              >
                <span>Launch Telemetry Simulation</span>
                <Play size={16} className="fill-white group-hover:translate-x-0.5 transition-transform" />
              </button>
              <a
                href="#workflow"
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all border border-white/5 cursor-pointer"
              >
                <span>Explore Features</span>
                <ArrowRight size={16} />
              </a>
            </motion.div>

            {/* Micro stats banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-white/5 pt-8 text-left"
            >
              <div>
                <div className="text-2xl font-bold text-white">40ms</div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Audio Telemetry Lag</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-cyan">30+</div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Facial Vector Nodes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-emerald">100%</div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Liveness Verification</div>
              </div>
            </motion.div>
          </div>

          {/* Right: Interactive Dashboard Mock */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-xl mx-auto glass-card rounded-2xl border border-white/10 shadow-2xl overflow-hidden aspect-[4/3] bg-black/60"
            >
              {/* Camera view background simulator */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-black/90 z-0 flex items-center justify-center overflow-hidden">
                {/* Visualizer silhouette representing the candidate */}
                <div className="relative w-48 h-48 rounded-full bg-blue-500/5 border border-blue-500/10 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-dashed border-blue-400/20 animate-spin" style={{ animationDuration: '60s' }} />
                  
                  {/* Dynamic Mesh Face Overlay */}
                  <svg className="absolute inset-0 w-full h-full text-accent-cyan opacity-40 z-10" viewBox="0 0 100 100">
                    {/* Draw connecting mesh lines */}
                    {meshPoints.length > 0 && (
                      <g stroke="currentColor" strokeWidth="0.15" opacity="0.3">
                        {/* Connecting lines for outer outline and key features */}
                        <line x1={meshPoints[11].x} y1={meshPoints[11].y} x2={meshPoints[12].x} y2={meshPoints[12].y} />
                        <line x1={meshPoints[13].x} y1={meshPoints[13].y} x2={meshPoints[14].x} y2={meshPoints[14].y} />
                        <line x1={meshPoints[6].x} y1={meshPoints[6].y} x2={meshPoints[7].x} y2={meshPoints[7].y} />
                        <line x1={meshPoints[7].x} y1={meshPoints[7].y} x2={meshPoints[8].x} y2={meshPoints[8].y} />
                        <line x1={meshPoints[8].x} y1={meshPoints[8].y} x2={meshPoints[9].x} y2={meshPoints[9].y} />
                        {/* Mouth lines */}
                        <line x1={meshPoints[15].x} y1={meshPoints[15].y} x2={meshPoints[16].x} y2={meshPoints[16].y} />
                        <line x1={meshPoints[16].x} y1={meshPoints[16].y} x2={meshPoints[17].x} y2={meshPoints[17].y} />
                        <line x1={meshPoints[17].x} y1={meshPoints[17].y} x2={meshPoints[18].x} y2={meshPoints[18].y} />
                        {/* Eye-nose connections */}
                        <line x1={meshPoints[11].x} y1={meshPoints[11].y} x2={meshPoints[6].x} y2={meshPoints[6].y} />
                        <line x1={meshPoints[13].x} y1={meshPoints[13].y} x2={meshPoints[6].x} y2={meshPoints[6].y} />
                      </g>
                    )}
                    {/* Render landmarks dots */}
                    {meshPoints.map((pt, i) => {
                      const jitter = meshJitter[i] || { dx: 0, dy: 0 };
                      return (
                        <circle
                          key={i}
                          cx={pt.x + jitter.dx}
                          cy={pt.y + jitter.dy}
                          r={1.2}
                          fill={i === 11 || i === 13 ? "#f43f5e" : "#06b6d4"}
                          className="transition-all duration-300"
                        />
                      );
                    })}
                  </svg>
                  
                  {/* Digital face representation background (SVG) */}
                  <svg className="w-24 h-24 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>

              {/* Top overlay UI */}
              <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-coral animate-ping" />
                  <span className="text-[10px] font-mono tracking-wider uppercase text-white font-medium">
                    REC: {isActive ? "TELEMETRY ACTIVE" : "IDLE"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-accent-emerald/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-accent-emerald/20 text-accent-emerald">
                  <MonitorCheck size={11} />
                  <span className="text-[9px] font-bold tracking-wider font-mono">
                    LIVENESS VERIFIED: {biometrics.livenessScore}%
                  </span>
                </div>
              </div>

              {/* Scanning visual bar overlay */}
              {isActive && candidateState === "answering" && (
                <div className="absolute top-0 left-0 w-full h-[6%] bg-gradient-to-b from-accent-cyan/15 to-transparent border-b border-accent-cyan/40 z-10 animate-scan pointer-events-none" />
              )}

              {/* Floating metrics widgets */}
              <div className="absolute top-16 right-4 z-10 flex flex-col gap-2">
                {/* Heart rate indicator */}
                <div className="bg-black/60 backdrop-blur-md border border-white/10 p-2.5 rounded-xl flex items-center gap-3 w-32 shadow-lg">
                  <div className="p-1.5 bg-accent-coral/10 rounded-lg text-accent-coral">
                    <Heart size={14} className={isActive ? "animate-pulse" : ""} />
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-400 font-mono">HEART RATE</div>
                    <div className="text-sm font-bold text-white font-mono leading-tight">
                      {biometrics.heartRate} <span className="text-[9px] text-gray-500 font-sans">BPM</span>
                    </div>
                  </div>
                </div>

                {/* Stress Index indicator */}
                <div className="bg-black/60 backdrop-blur-md border border-white/10 p-2.5 rounded-xl flex items-center gap-3 w-32 shadow-lg">
                  <div className="p-1.5 bg-accent-amber/10 rounded-lg text-accent-amber">
                    <ShieldAlert size={14} />
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-400 font-mono">STRESS INDEX</div>
                    <div className="text-sm font-bold text-white font-mono leading-tight">
                      {biometrics.stressIndex}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom control simulation and waveforms */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-3">
                
                {/* Waveform Visualization */}
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest min-w-[50px]">
                    AUDIO RX:
                  </span>
                  <div className="flex items-center gap-[3px] h-12 flex-1 justify-center">
                    {waveHeights.map((ht, idx) => (
                      <div
                        key={idx}
                        className="w-[3px] rounded-full transition-all duration-100"
                        style={{
                          height: `${ht}%`,
                          backgroundColor:
                            candidateState === "answering"
                              ? "var(--color-accent-blue)"
                              : candidateState === "listening"
                              ? "var(--color-accent-coral)"
                              : "rgba(255,255,255,0.15)"
                        }}
                      />
                    ))}
                  </div>
                  <Mic size={14} className="text-gray-400 animate-pulse" />
                </div>

                {/* Video controls placeholder */}
                <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-gray-400 font-mono">
                  <span>Candidate: Alex Chen</span>
                  <span>Audio Feed: 48kHz Stereo</span>
                  <span>Resolution: 1080p 60fps</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
