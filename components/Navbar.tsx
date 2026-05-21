"use client";

import React, { useState } from "react";
import { useSimulation } from "@/context/SimulationContext";
import { Cpu, CircleDot, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { isActive, candidateState } = useSimulation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-md">
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

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-400 items-center">
          <a href="#hero" className="hover:text-white transition-colors">Platform</a>
          <a href="#problem" className="hover:text-white transition-colors">The Problem</a>
          <a href="#workflow" className="hover:text-white transition-colors">How It Works</a>
          <a href="#dashboard" className="hover:text-white transition-colors">Interview Console</a>
          <a href="#usecases" className="hover:text-white transition-colors">Use Cases</a>
          <a href="#report" className="hover:text-white transition-colors">AI Dossier</a>
          <Link href="/workspace" className="text-accent-cyan hover:text-cyan-400 transition-colors font-semibold border-l border-white/10 pl-6">Live Workspace</Link>
        </nav>

        {/* Action Button & Status */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-gray-300">
            <CircleDot size={12} className={isActive ? "text-accent-coral animate-ping" : "text-accent-emerald"} />
            <span className="font-mono uppercase tracking-wider">
              {isActive ? `Zai: Active (${candidateState})` : "Zai: Standby"}
            </span>
          </div>

          <Link
            href="/book-demo"
            className="hidden xs:inline-block relative group overflow-hidden px-4 py-2 rounded-xl text-xs font-semibold bg-accent-blue text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-blue-400/20"
          >
            <span className="relative z-10">Book Demo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-400 hover:text-white md:hidden hover:bg-white/5 rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black/95 backdrop-blur-lg border-b border-white/10 flex flex-col px-6 py-6 space-y-4 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 font-medium text-gray-400 text-sm">
            <a href="#hero" onClick={closeMobileMenu} className="py-2 hover:text-white transition-colors border-b border-white/5">Platform</a>
            <a href="#problem" onClick={closeMobileMenu} className="py-2 hover:text-white transition-colors border-b border-white/5">The Problem</a>
            <a href="#workflow" onClick={closeMobileMenu} className="py-2 hover:text-white transition-colors border-b border-white/5">How It Works</a>
            <a href="#dashboard" onClick={closeMobileMenu} className="py-2 hover:text-white transition-colors border-b border-white/5">Interview Console</a>
            <a href="#usecases" onClick={closeMobileMenu} className="py-2 hover:text-white transition-colors border-b border-white/5">Use Cases</a>
            <a href="#report" onClick={closeMobileMenu} className="py-2 hover:text-white transition-colors border-b border-white/5">AI Dossier</a>
            <Link href="/workspace" onClick={closeMobileMenu} className="py-2 text-accent-cyan hover:text-cyan-400 transition-colors font-semibold border-b border-white/5">
              Live Workspace
            </Link>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300 w-full justify-center">
              <CircleDot size={12} className={isActive ? "text-accent-coral animate-ping" : "text-accent-emerald"} />
              <span className="font-mono uppercase tracking-wider">
                {isActive ? `Zai: Active (${candidateState})` : "Zai: Standby"}
              </span>
            </div>

            <Link
              href="/book-demo"
              onClick={closeMobileMenu}
              className="relative group overflow-hidden px-4 py-2.5 rounded-xl text-xs font-semibold bg-accent-blue text-white shadow-lg shadow-blue-500/20 text-center border border-blue-400/20"
            >
              <span className="relative z-10">Book Demo</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
