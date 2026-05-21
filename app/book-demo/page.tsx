"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  Globe,
  Cpu,
  User,
  Building,
  Mail,
  FileText,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Terminal,
  Activity,
  Shield,
  Layers,
  ChevronLeft,
  ChevronRight,
  UserCheck
} from "lucide-react";

// Agent definitions
const AGENTS = [
  {
    id: "zai",
    name: "Zai",
    role: "AI Recruiter & Biometric Screener",
    description: "Evaluates candidates under structured pressure. Analyzes micro-expressions, composure telemetry, and technical correctness in real time.",
    themeColor: "accent-blue",
    accentHex: "#3b82f6",
    features: ["Speech/Audio composition check", "Interactive tech probing", "Composure spike analytics"]
  },
  {
    id: "veda",
    name: "Veda",
    role: "AI Onboarding & Compliance Agent",
    description: "Aligns candidate skills with target organizational structures. Reviews corporate security alignment, values compliance, and team mesh index.",
    themeColor: "accent-emerald",
    accentHex: "#10b981",
    features: ["Security clearance dry-run", "Mesh index evaluation", "Corporate values alignment"]
  },
  {
    id: "kaelen",
    name: "Kaelen",
    role: "AI Technical Architect Evaluator",
    description: "Initiates live systems architecture pressure tests. Probes Postgres connection pooling, replica distribution, and distributed lock behavior.",
    themeColor: "accent-coral",
    accentHex: "#f43f5e",
    features: ["Database failure prompt loops", "Scale-out architectural design", "Systems latency verification"]
  }
];

// Available time slots
const TIME_SLOTS = [
  "09:00 AM",
  "10:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM"
];

// Available Timezones
const TIMEZONES = [
  { value: "America/New_York", label: "Eastern Time (ET) - New York" },
  { value: "America/Chicago", label: "Central Time (CT) - Chicago" },
  { value: "America/Denver", label: "Mountain Time (MT) - Denver" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT) - Los Angeles" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT) - London" },
  { value: "Europe/Paris", label: "Central European Time (CET) - Paris" },
  { value: "Asia/Kolkata", label: "India Standard Time (IST) - Mumbai" },
  { value: "Asia/Singapore", label: "Singapore Time (SGT) - Singapore" }
];

export default function BookDemoPage() {
  const [selectedAgent, setSelectedAgent] = useState("zai");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [timezone, setTimezone] = useState("America/New_York");
  
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [useCase, setUseCase] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Booking Flow States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [submitLogs, setSubmitLogs] = useState<string[]>([]);
  const [isBooked, setIsBooked] = useState(false);
  const [meetingCode, setMeetingCode] = useState("");
  const [copied, setCopied] = useState(false);

  // Calendar navigation states
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const logTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Detect user timezone on mount
  useEffect(() => {
    try {
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (TIMEZONES.some(tz => tz.value === userTz)) {
        setTimezone(userTz);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Copy to clipboard helper
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://meet.humain.ai/room/zai-telemetry-${meetingCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calendar Calculations
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingArray = Array.from({ length: firstDayIndex }, (_, i) => null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isPastDate = (day: number) => {
    const checkDate = new Date(currentYear, currentMonth, day);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const handleSelectDay = (day: number) => {
    if (isPastDate(day)) return;
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  // Form Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Full name is required";
    if (!email.trim()) {
      errors.email = "Work email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!company.trim()) errors.company = "Company name is required";
    if (!selectedDate) errors.date = "Please select a date from the calendar";
    if (!selectedSlot) errors.slot = "Please select a preferred time slot";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Form Submission with Simulated Terminal logs
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to errors or display notification
      return;
    }

    setIsSubmitting(true);
    setSubmitStep(0);
    
    // Generate a random meeting code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setMeetingCode(code);

    const simulationLogs = [
      "Establishing link with HumAIn telemetry cluster...",
      "Resolving routing paths to nodes under active zone load...",
      `Deploying digital sandbox workspace for client ${email}...`,
      `Initializing digital agent instance: ZAI_${selectedAgent.toUpperCase()}_STABLE...`,
      "Synchronizing telemetry scheduling registries...",
      "Injecting WebRTC audio/video hooks for stream recording...",
      "Creating dossier secure container (SOC-2 encryption layer)...",
      "Demo slot reservation committed successfully."
    ];

    setSubmitLogs([simulationLogs[0]]);

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      currentLogIndex++;
      if (currentLogIndex < simulationLogs.length) {
        setSubmitLogs(prev => [...prev, simulationLogs[currentLogIndex]]);
        setSubmitStep(currentLogIndex);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSubmitting(false);
          setIsBooked(true);
        }, 800);
      }
    }, 450);
  };

  const currentAgentObj = AGENTS.find(a => a.id === selectedAgent) || AGENTS[0];

  return (
    <div className="min-h-screen bg-background-dark text-white selection:bg-accent-blue/30 relative flex flex-col overflow-x-hidden mesh-grid">
      {/* Background spotlights */}
      <div className="absolute inset-0 pointer-events-none radial-bg z-0" />
      <div className="absolute inset-0 pointer-events-none radial-bg-coral z-0" />

      {/* Top Header/Navbar */}
      <header className="relative z-10 w-full border-b border-white/5 bg-black/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-accent-blue/10 rounded-lg border border-accent-blue/30 text-accent-blue shadow-lg shadow-blue-500/5">
              <Cpu size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center">
              Hum<span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">AIn</span>
            </span>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all font-medium"
          >
            <ArrowLeft size={14} />
            <span>Back to Platform</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Step Animate Presence container */}
        <AnimatePresence mode="wait">
          {!isBooked ? (
            <motion.div
              key="booking-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              
              {/* Left Column: Form & Settings (Cols 7) */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-[10px] font-bold tracking-wider uppercase mb-3">
                    <Sparkles size={10} className="animate-pulse" />
                    <span>Briefing Scheduler</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
                    Deploy a Digital Agent
                  </h1>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">
                    Configure your workspace telemetry parameters below. Schedule a live briefing with our team to configure agent parameters, calendar integrations, and model weights.
                  </p>
                </div>

                <form onSubmit={handleSubmitBooking} className="space-y-8">
                  {/* STEP 1: SELECT AGENT */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-300">1</span>
                      Select Demo Model
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {AGENTS.map((agent) => {
                        const isSelected = selectedAgent === agent.id;
                        return (
                          <button
                            key={agent.id}
                            type="button"
                            onClick={() => setSelectedAgent(agent.id)}
                            className={`glass-card p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 relative group cursor-pointer ${
                              isSelected
                                ? `border-${agent.themeColor} shadow-lg shadow-${agent.themeColor}/10 bg-black/80`
                                : "border-white/5 bg-black/30 hover:border-white/10 hover:bg-black/50"
                            }`}
                          >
                            {isSelected && (
                              <div
                                className="absolute top-3 right-3 h-2 w-2 rounded-full animate-ping"
                                style={{ backgroundColor: agent.accentHex }}
                              />
                            )}
                            <div>
                              <div
                                className={`h-8 w-8 rounded-xl flex items-center justify-center mb-4 border transition-colors ${
                                  isSelected
                                    ? `bg-${agent.themeColor}/10 border-${agent.themeColor}/30 text-${agent.themeColor}`
                                    : "bg-white/5 border-white/5 text-gray-400 group-hover:text-white group-hover:border-white/15"
                                }`}
                              >
                                {agent.id === "zai" ? (
                                  <Cpu size={16} />
                                ) : agent.id === "veda" ? (
                                  <UserCheck size={16} />
                                ) : (
                                  <Layers size={16} />
                                )}
                              </div>
                              <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                                {agent.name}
                                <span className="text-[10px] font-mono text-gray-500">v1.2</span>
                              </h4>
                              <p className="text-[11px] text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                                {agent.description}
                              </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-white/5 w-full flex items-center justify-between text-[9px] font-mono text-gray-500">
                              <span>DEPLOY TIME: ~2.5s</span>
                              <span className={isSelected ? `text-${agent.themeColor}` : ""}>
                                {isSelected ? "ACTIVE" : "SELECT"}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* STEP 2: SELECT DATE & TIME */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-300">2</span>
                      Select Date & Time
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      
                      {/* Interactive Calendar Card (7 cols) */}
                      <div className="md:col-span-7 glass-card p-5 rounded-2xl border border-white/5 relative overflow-hidden bg-black/40">
                        {/* Month Header */}
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-bold tracking-tight text-white font-mono flex items-center gap-1.5">
                            <CalendarIcon size={14} className="text-accent-blue" />
                            {months[currentMonth]} {currentYear}
                          </h4>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={handlePrevMonth}
                              className="p-1.5 rounded-lg border border-white/5 hover:border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors"
                            >
                              <ChevronLeft size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={handleNextMonth}
                              className="p-1.5 rounded-lg border border-white/5 hover:border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors"
                            >
                              <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-gray-500 uppercase font-semibold mb-2">
                          <div>Su</div>
                          <div>Mo</div>
                          <div>Tu</div>
                          <div>We</div>
                          <div>Th</div>
                          <div>Fr</div>
                          <div>Sa</div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-xs">
                          {paddingArray.map((_, idx) => (
                            <div key={`padding-${idx}`} className="aspect-square" />
                          ))}
                          {daysArray.map((day) => {
                            const isPast = isPastDate(day);
                            const thisDate = new Date(currentYear, currentMonth, day);
                            const isSelected = selectedDate?.toDateString() === thisDate.toDateString();
                            
                            return (
                              <button
                                key={`day-${day}`}
                                type="button"
                                disabled={isPast}
                                onClick={() => handleSelectDay(day)}
                                className={`aspect-square rounded-xl flex items-center justify-center transition-all relative font-mono ${
                                  isPast
                                    ? "text-gray-700 cursor-not-allowed hover:bg-transparent"
                                    : isSelected
                                      ? "bg-accent-blue text-white font-bold shadow-md shadow-blue-500/20"
                                      : "text-gray-300 hover:bg-white/5 hover:text-white cursor-pointer"
                                }`}
                              >
                                {day}
                                {!isPast && !isSelected && (day % 3 === 0) && (
                                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-accent-cyan/80" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                        {formErrors.date && (
                          <p className="text-[10px] text-accent-coral mt-3 font-mono">
                            * {formErrors.date}
                          </p>
                        )}
                      </div>

                      {/* Time slot & Timezone picker (5 cols) */}
                      <div className="md:col-span-5 space-y-4">
                        
                        {/* Timezone picker */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-1.5">
                            <Globe size={12} className="text-gray-400" />
                            Timezone
                          </label>
                          <div className="relative">
                            <select
                              value={timezone}
                              onChange={(e) => setTimezone(e.target.value)}
                              className="w-full text-xs bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-gray-300 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all font-mono appearance-none"
                            >
                              {TIMEZONES.map((tz) => (
                                <option key={tz.value} value={tz.value} className="bg-[#050505] text-gray-300">
                                  {tz.label}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-3 top-2.5 pointer-events-none text-gray-500 text-[10px]">▼</div>
                          </div>
                        </div>

                        {/* Slots */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-1.5">
                            <Clock size={12} className="text-gray-400" />
                            Available Slots
                          </label>
                          
                          {selectedDate ? (
                            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                              {TIME_SLOTS.map((slot) => {
                                const isSelected = selectedSlot === slot;
                                return (
                                  <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`w-full text-xs font-mono py-2.5 px-3 rounded-xl border text-center transition-all ${
                                      isSelected
                                        ? "bg-accent-blue/10 border-accent-blue text-accent-blue shadow-inner"
                                        : "bg-black/20 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                                    }`}
                                  >
                                    {slot}
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="py-8 px-4 text-center rounded-xl border border-white/5 bg-black/10 text-gray-500 text-xs italic font-mono">
                              Select a date to unlock slots
                            </div>
                          )}
                          
                          {formErrors.slot && (
                            <p className="text-[10px] text-accent-coral mt-1 font-mono">
                              * {formErrors.slot}
                            </p>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* STEP 3: CORPORATE DETAILS */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-300">3</span>
                      Briefing Target Parameters
                    </h3>

                    <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4 bg-black/30">
                      
                      {/* Name & Email Group */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-1.5">
                            <User size={12} className="text-gray-500" />
                            Full Name
                          </label>
                          <input
                            type="text"
                            placeholder="Alex Chen"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              if (formErrors.name) setFormErrors(prev => ({ ...prev, name: "" }));
                            }}
                            className={`w-full text-xs bg-black/50 border rounded-xl px-3.5 py-3 text-white focus:outline-none focus:ring-1 transition-all ${
                              formErrors.name
                                ? "border-accent-coral/50 focus:ring-accent-coral/20"
                                : "border-white/5 focus:border-accent-blue/50 focus:ring-accent-blue/20"
                            }`}
                          />
                          {formErrors.name && (
                            <p className="text-[9px] text-accent-coral font-mono">{formErrors.name}</p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-1.5">
                            <Mail size={12} className="text-gray-500" />
                            Work Email
                          </label>
                          <input
                            type="email"
                            placeholder="alex@company.io"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (formErrors.email) setFormErrors(prev => ({ ...prev, email: "" }));
                            }}
                            className={`w-full text-xs bg-black/50 border rounded-xl px-3.5 py-3 text-white focus:outline-none focus:ring-1 transition-all ${
                              formErrors.email
                                ? "border-accent-coral/50 focus:ring-accent-coral/20"
                                : "border-white/5 focus:border-accent-blue/50 focus:ring-accent-blue/20"
                            }`}
                          />
                          {formErrors.email && (
                            <p className="text-[9px] text-accent-coral font-mono">{formErrors.email}</p>
                          )}
                        </div>
                      </div>

                      {/* Company & Role Group */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-1.5">
                            <Building size={12} className="text-gray-500" />
                            Company Name
                          </label>
                          <input
                            type="text"
                            placeholder="Vertex Systems"
                            value={company}
                            onChange={(e) => {
                              setCompany(e.target.value);
                              if (formErrors.company) setFormErrors(prev => ({ ...prev, company: "" }));
                            }}
                            className={`w-full text-xs bg-black/50 border rounded-xl px-3.5 py-3 text-white focus:outline-none focus:ring-1 transition-all ${
                              formErrors.company
                                ? "border-accent-coral/50 focus:ring-accent-coral/20"
                                : "border-white/5 focus:border-accent-blue/50 focus:ring-accent-blue/20"
                            }`}
                          />
                          {formErrors.company && (
                            <p className="text-[9px] text-accent-coral font-mono">{formErrors.company}</p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-1.5">
                            <UserCheck size={12} className="text-gray-500" />
                            Your Role
                          </label>
                          <input
                            type="text"
                            placeholder="VP of Engineering"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full text-xs bg-black/50 border border-white/5 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all"
                          />
                        </div>
                      </div>

                      {/* Notes / Special Use Cases */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-1.5">
                          <FileText size={12} className="text-gray-500" />
                          Custom Use Cases / Evaluation Focus (Optional)
                        </label>
                        <textarea
                          placeholder="Interested in testing composure spike metrics for database latency prompts, or high-volume async recruiting loops."
                          rows={3}
                          value={useCase}
                          onChange={(e) => setUseCase(e.target.value)}
                          className="w-full text-xs bg-black/50 border border-white/5 rounded-xl p-3 text-white focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all resize-none leading-relaxed"
                        />
                      </div>

                    </div>
                  </div>

                  {/* Submission Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-accent-blue hover:bg-blue-600 active:scale-[0.99] text-white font-semibold rounded-2xl shadow-xl shadow-blue-500/10 hover:shadow-blue-500/25 transition-all text-sm flex items-center justify-center gap-2 group cursor-pointer border border-blue-400/20"
                  >
                    <span>Deploy Demo briefing</span>
                    <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                  </button>

                </form>
              </div>

              {/* Right Column: Previews & Explanatory Telemetry (Cols 5) */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                
                {/* Visualizing details of Selected Agent */}
                <div className="glass-card rounded-2xl p-6 border-white/10 relative overflow-hidden bg-black/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-50" />
                  
                  <h3 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4 flex items-center gap-2">
                    <Activity size={14} className={`text-${currentAgentObj.themeColor}`} />
                    Model Telemetry Spec
                  </h3>

                  <div className="space-y-4 relative z-10">
                    <div>
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        {currentAgentObj.name}
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 font-mono">v1.2</span>
                      </h4>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">{currentAgentObj.role}</p>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                      {currentAgentObj.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2">
                      <h5 className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Features Installed</h5>
                      <ul className="space-y-2 text-xs">
                        {currentAgentObj.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-300">
                            <div className={`h-1.5 w-1.5 rounded-full bg-${currentAgentObj.themeColor}`} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Simulating active voice waveform if Zai is selected */}
                    {selectedAgent === "zai" && (
                      <div className="pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 uppercase mb-2">
                          <span>Live Composure Feed</span>
                          <span className="text-accent-blue flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-ping" />
                            Streaming
                          </span>
                        </div>
                        <div className="h-12 bg-black/60 rounded-xl border border-white/5 flex items-center justify-center gap-1.5 px-4 overflow-hidden relative">
                          {Array.from({ length: 24 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-accent-blue/80 rounded-full animate-waveform"
                              style={{
                                height: `${Math.random() * 80 + 20}%`,
                                animationDelay: `${i * 0.05}s`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Simulating network replica checks if Kaelen is selected */}
                    {selectedAgent === "kaelen" && (
                      <div className="pt-4 border-t border-white/5 space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 uppercase">
                          <span>Architecture Telemetry</span>
                          <span className="text-accent-coral flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-coral animate-ping" />
                            Simulation Active
                          </span>
                        </div>
                        <div className="bg-black/60 p-3 rounded-xl border border-white/5 font-mono text-[10px] space-y-1.5 text-gray-400">
                          <div className="flex justify-between">
                            <span>DBMS connection status:</span>
                            <span className="text-accent-emerald">CONNECTED</span>
                          </div>
                          <div className="flex justify-between">
                            <span>PgBouncer pooling:</span>
                            <span className="text-white">Active (Session Mode)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Latency benchmark:</span>
                            <span className="text-accent-coral">Spike detected (14ms)</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Simulating culture match index if Veda is selected */}
                    {selectedAgent === "veda" && (
                      <div className="pt-4 border-t border-white/5 space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 uppercase">
                          <span>Organizational Mesh</span>
                          <span className="text-accent-emerald flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald animate-ping" />
                            Calculating
                          </span>
                        </div>
                        <div className="bg-black/60 p-3.5 rounded-xl border border-white/5 flex items-center justify-between gap-4">
                          <div className="space-y-0.5">
                            <p className="text-[10px] text-gray-500 font-mono">Mesh Alignment Score</p>
                            <p className="text-lg font-bold text-white font-mono">94.8%</p>
                          </div>
                          <div className="relative h-12 w-12 flex items-center justify-center">
                            <svg className="absolute inset-0 w-full h-full transform -rotate-95" viewBox="0 0 36 36">
                              <path
                                className="text-white/5"
                                strokeWidth="3"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className="text-accent-emerald"
                                strokeWidth="3"
                                strokeDasharray="95, 100"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                            <span className="text-[9px] font-mono text-gray-300">95%</span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Briefing Checklist Summary */}
                <div className="glass-card rounded-2xl p-6 border-white/5 bg-black/20 space-y-4">
                  <h4 className="text-xs font-bold font-mono tracking-widest text-gray-500 uppercase flex items-center gap-1.5">
                    <Shield size={14} className="text-accent-cyan" />
                    HumAIn Security Standard
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-2 text-xs text-gray-400">
                    <div className="flex gap-2">
                      <CheckCircle2 size={12} className="text-accent-emerald shrink-0 mt-0.5" />
                      <span>All calendar entries secure via 256-bit encryption.</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 size={12} className="text-accent-emerald shrink-0 mt-0.5" />
                      <span>Biometric feeds processed strictly in local nodes (HIPAA compliant).</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 size={12} className="text-accent-emerald shrink-0 mt-0.5" />
                      <span>Sandbox environment spins down automatically after 24 hours.</span>
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          ) : (
            
            /* DYNAMIC SUCCESS STATE */
            <motion.div
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-2xl mx-auto"
            >
              <div className="glass-card rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden bg-black/70 shadow-2xl space-y-8">
                
                {/* Spotlights and backgrounds */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 to-accent-emerald/5 pointer-events-none" />
                <div className="absolute top-0 right-0 h-44 w-44 rounded-full bg-accent-emerald/10 blur-3xl pointer-events-none" />
                
                <div className="text-center relative z-10 flex flex-col items-center">
                  <div className="h-16 w-16 bg-accent-emerald/10 border border-accent-emerald/20 rounded-full flex items-center justify-center text-accent-emerald mb-6 shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 size={32} />
                  </div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
                    Briefing Deployed Successfully
                  </h1>
                  <p className="text-gray-400 text-sm max-w-md">
                    We've registered your telemetry requirements and spawned an active instance of Agent {currentAgentObj.name}. A calendar invitation has been sent to your email.
                  </p>
                </div>

                {/* Dashboard Details Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  
                  {/* Left: Schedule Summary */}
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4">
                    <h3 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                      <CalendarIcon size={12} className="text-accent-blue" />
                      Reservation Details
                    </h3>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Agent:</span>
                        <span className="text-white font-bold">{currentAgentObj.name} v1.2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date:</span>
                        <span className="text-white font-bold">{selectedDate?.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time:</span>
                        <span className="text-white font-bold font-mono">{selectedSlot}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Timezone:</span>
                        <span className="text-white font-mono">{timezone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Technical Endpoint Specs */}
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4">
                    <h3 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Terminal size={12} className="text-accent-cyan" />
                      Client Metadata
                    </h3>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Host:</span>
                        <span className="text-white">{name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Company:</span>
                        <span className="text-white font-mono">{company}</span>
                      </div>
                      <div className="flex justify-between text-ellipsis overflow-hidden">
                        <span className="text-gray-400">Target Node:</span>
                        <span className="text-accent-cyan font-mono">node-us-east-{meetingCode.toLowerCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Encryption:</span>
                        <span className="text-accent-emerald font-mono">AES-GCM-256</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Meet Link Copy section */}
                <div className="bg-black/50 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                  <div className="space-y-0.5 text-center sm:text-left">
                    <p className="text-[10px] font-mono text-gray-500 uppercase">HumAIn Meeting Room</p>
                    <p className="text-xs font-mono text-gray-300">meet.humain.ai/room/zai-telemetry-{meetingCode}</p>
                  </div>
                  
                  <button
                    onClick={handleCopyLink}
                    className="w-full sm:w-auto px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer text-gray-300 hover:text-white"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-accent-emerald" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Room Link</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Sample dossier preview button */}
                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono relative z-10">
                  <span>Invitation ID: hum-sched-{meetingCode.toLowerCase()}</span>
                  
                  <Link
                    href="/"
                    className="text-accent-blue hover:text-blue-400 transition-colors flex items-center gap-1.5 font-bold"
                  >
                    <span>Return to Dashboard</span>
                    <ArrowLeft size={12} className="rotate-180" />
                  </Link>
                </div>

              </div>
            </motion.div>

          )}
        </AnimatePresence>

      </main>

      {/* Futuristic Telemetry Submission Terminal Modal */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="max-w-lg w-full glass-card rounded-2xl border border-white/15 bg-black/90 p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl"
            >
              
              {/* Scanline visual overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/5 to-transparent animate-scan pointer-events-none" />

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-accent-blue/10 border border-accent-blue/20 rounded-xl text-accent-blue">
                  <Terminal size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-mono uppercase tracking-widest text-white">
                    HumAIn Deployment Console
                  </h3>
                  <p className="text-[10px] text-gray-500 font-mono">
                    PROVISIONING ACTIVE DIGITAL SESSION...
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 font-mono">
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>STATUS: {submitStep === 7 ? "RESOLVED" : "COMPILING..."}</span>
                  <span>{Math.round(((submitStep + 1) / 8) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    className="h-full bg-accent-blue"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((submitStep + 1) / 8) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Simulated Log Output Console */}
              <div className="bg-black border border-white/5 rounded-xl p-4 h-48 overflow-y-auto font-mono text-[10px] space-y-1.5 text-gray-400 relative">
                {submitLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-accent-blue select-none">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
                
                {/* Scrolling baseline element */}
                <div className="h-0" />
              </div>

              <div className="text-center text-[9px] font-mono text-gray-600">
                HumAIn Telemetry Server v1.0.8 &copy; {new Date().getFullYear()}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Details */}
      <footer className="relative z-10 border-t border-white/5 bg-black/60 py-6 text-center text-[10px] text-gray-500 font-mono mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span>&copy; {new Date().getFullYear()} HumAIn Technologies Inc. All biological assets protected under encryption protocols.</span>
        </div>
      </footer>
    </div>
  );
}
