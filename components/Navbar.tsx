"use client";

import React, { useState } from "react";
import { useSimulation } from "@/context/SimulationContext";
import { Cpu, Menu, X } from "lucide-react";
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
          <a href="#workflow" className="hover:text-white transition-colors">How It Works</a>
          <a href="#dashboard" className="hover:text-white transition-colors">Interview Console</a>
          <a href="#report" className="hover:text-white transition-colors">AI Dossier</a>
          <Link href="/workspace" className="text-accent-cyan hover:text-cyan-400 transition-colors font-semibold border-l border-white/10 pl-6">Live Workspace</Link>
          <Link href="/book-demo" className="hover:text-white transition-colors">Book Demo</Link>
        </nav>

        {/* Action Button & Status */}
        <div className="flex items-center gap-4">
          <Link
            href="/workspace"
            className="hidden xs:inline-block relative group overflow-hidden px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-cyan-400/30"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Enter Workspace</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-cyan opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
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
            <a href="#workflow" onClick={closeMobileMenu} className="py-2 hover:text-white transition-colors border-b border-white/5">How It Works</a>
            <a href="#dashboard" onClick={closeMobileMenu} className="py-2 hover:text-white transition-colors border-b border-white/5">Interview Console</a>
            <a href="#report" onClick={closeMobileMenu} className="py-2 hover:text-white transition-colors border-b border-white/5">AI Dossier</a>
            <Link href="/workspace" onClick={closeMobileMenu} className="py-2 text-accent-cyan hover:text-cyan-400 transition-colors font-semibold border-b border-white/5">
              Live Workspace
            </Link>
            <Link href="/book-demo" onClick={closeMobileMenu} className="py-2 hover:text-white transition-colors border-b border-white/5">
              Book Demo
            </Link>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/workspace"
              onClick={closeMobileMenu}
              className="relative group overflow-hidden px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg shadow-cyan-500/20 text-center border border-cyan-400/30"
            >
              <span className="relative z-10 flex items-center justify-center gap-1.5">
                <span>Enter Workspace</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-cyan opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
