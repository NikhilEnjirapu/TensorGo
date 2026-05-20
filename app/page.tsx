"use client";

import React from "react";
import { SimulationProvider } from "@/context/SimulationContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemComparison from "@/components/ProblemComparison";
import WorkflowStepper from "@/components/WorkflowStepper";
import InterviewConsole from "@/components/InterviewConsole";
import AIReportCard from "@/components/AIReportCard";
import ComparisonTable from "@/components/ComparisonTable";
import UseCaseGrid from "@/components/UseCaseGrid";
import AgentGrid from "@/components/AgentGrid";
import CTASection from "@/components/CTASection";
import SimulationController from "@/components/SimulationController";

export default function Home() {
  return (
    <SimulationProvider>
      <div className="flex flex-col min-h-screen bg-background-dark text-white selection:bg-accent-blue/30 relative">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          <Hero />
          <ProblemComparison />
          <WorkflowStepper />
          <InterviewConsole />
          <AIReportCard />
          <ComparisonTable />
          <UseCaseGrid />
          <AgentGrid />
          <CTASection />
        </main>

        {/* Floating Simulation Panel */}
        <SimulationController />
      </div>
    </SimulationProvider>
  );
}
