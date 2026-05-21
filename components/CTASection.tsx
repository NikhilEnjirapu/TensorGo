"use client";

import React from "react";
import { Cpu, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <footer id="cta" className="relative border-t border-white/5 bg-[#050505] overflow-hidden radial-bg-coral">
      
      {/* Main CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="max-w-3xl mx-auto glass-card rounded-3xl p-8 md:p-12 border-white/10 relative overflow-hidden bg-black/60 shadow-2xl">
          {/* Spotlight overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 to-accent-coral/5 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="p-3 bg-accent-coral/10 border border-accent-coral/20 rounded-2xl text-accent-coral mb-6">
              <Cpu size={24} />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Transform Hiring with AI
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
              Integrate Zai into your interview calendar today. Eliminate evaluation bias, review biological composure spikes, and compile deep structured candidate profiles automatically.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-sm">
              <Link
                href="/book-demo"
                className="px-6 py-3.5 bg-accent-blue text-white font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/10 hover:bg-blue-600 transition-all group"
              >
                <span>Book Demo Session</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 pt-12 pb-32 text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left: Branding */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-accent-blue/15 border border-accent-blue/30 rounded-lg text-accent-blue">
                <Cpu size={16} />
              </div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center">
                Hum<span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">AIn</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
              Building objective multi-modal digital agents capable of hearing, seeing, understanding, and executing high-stress workflows.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
              <ShieldCheck size={12} className="text-accent-emerald" />
              <span>SOC2 Type II Certified Pipeline</span>
            </div>
          </div>

          {/* Right columns: links */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-gray-400 hover:text-white transition-colors">Interviewer Core</a></li>
              <li><a href="#dashboard" className="text-gray-400 hover:text-white transition-colors">Telemetry API</a></li>
              <li><a href="#report" className="text-gray-400 hover:text-white transition-colors">Dossier Engine</a></li>
              <li><a href="#ecosystem" className="text-gray-400 hover:text-white transition-colors">Agent Pipeline</a></li>
            </ul>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <h4 className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Compliance</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GDPR Data Shield</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Biometric Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ethical AI Charter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Security</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-mono">
          <span>&copy; {new Date().getFullYear()} HumAIn Technologies Inc. All biological assets protected under encryption protocols.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">API Docs</a>
            <a href="#" className="hover:text-white">System Status</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
