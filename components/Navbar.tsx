"use client";

import React from "react";
import { useSimulation } from "@/context/SimulationContext";
import { Cpu, CircleDot } from "lucide-react";

export default function Navbar() {
  const { isActive, candidateState } = useSimulation();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-accent-blue/10 rounded-lg border border-accent-blue/30 text-accent-blue shadow-lg shadow-blue-500/5">
            <Cpu size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white flex items-center">
            Hum<span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">AIn</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
          <a href="#hero" className="hover:text-white transition-colors">Platform</a>
          <a href="#problem" className="hover:text-white transition-colors">The Problem</a>
          <a href="#workflow" className="hover:text-white transition-colors">How It Works</a>
          <a href="#dashboard" className="hover:text-white transition-colors">Interview Console</a>
          <a href="#usecases" className="hover:text-white transition-colors">Use Cases</a>
          <a href="#report" className="hover:text-white transition-colors">AI Dossier</a>
        </nav>

        {/* Action Button & Status */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-gray-300">
            <CircleDot size={12} className={isActive ? "text-accent-coral animate-ping" : "text-accent-emerald"} />
            <span className="font-mono uppercase tracking-wider">
              {isActive ? `Zai: Active (${candidateState})` : "Zai: Standby"}
            </span>
          </div>

          <a
            href="#cta"
            className="relative group overflow-hidden px-4 py-2 rounded-xl text-xs font-semibold bg-accent-blue text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-blue-400/20"
          >
            <span className="relative z-10">Book Demo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>
      </div>
    </header>
  );
}
