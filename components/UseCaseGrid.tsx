"use client";

import React from "react";
import { Building2, Globe, Users, Scale, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function UseCaseGrid() {
  const useCases = [
    {
      title: "Enterprise Hiring",
      description: "Scale high-fidelity evaluations across complex engineering orgs. Standardizes architectural grading benchmarks and plugs directly into ATS suites like Greenhouse or Workday.",
      icon: Building2,
      tag: "ATS INTEGRATED"
    },
    {
      title: "Remote First Screening",
      description: "Vet global applications without scheduling overhead. Zai conducts local WebRTC audits that calibrate for regional bandwidth issues, verifying identities in real time.",
      icon: Globe,
      tag: "GLOBAL TELEMETRY"
    },
    {
      title: "High-Volume Intake",
      description: "Process thousands of developers without screening fatigue. Automates initial technical coding reviews, shortlisting matching candidates based on composure, clarity, and competence.",
      icon: Users,
      tag: "AUTOMATED BENCHMARKS"
    },
    {
      title: "Compliance & Bias Audit",
      description: "Ensure complete evaluation objectivity. Zai focuses strictly on logic correctiveness, semantic architecture, and stress indicators, stripping out demographic skew variables.",
      icon: Scale,
      tag: "SOC2 COMPLIANT"
    }
  ];

  return (
    <section id="usecases" className="py-20 border-t border-white/5 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineered for Modern Teams
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
            Whether scaling a global remote workforce or streamlining enterprise pipelines, Zai delivers objective candidates at speed.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            
            return (
              <motion.div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl p-6 border-white/5 flex flex-col justify-between text-left group"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-accent-blue/10 border border-accent-blue/20 rounded-xl text-accent-blue shadow-lg shadow-blue-500/5 group-hover:scale-110 transition-transform">
                      <Icon size={20} />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      {uc.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {uc.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    {uc.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-accent-blue font-semibold group-hover:text-accent-cyan transition-colors cursor-pointer w-fit">
                  <span>Explore Workflow</span>
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
