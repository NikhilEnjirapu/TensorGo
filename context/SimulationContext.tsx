"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export type CandidateState = "connecting" | "answering" | "listening" | "complete";

export interface BiometricMetrics {
  heartRate: number;
  stressIndex: number;
  oxygenLevel: number;
  livenessScore: number;
}

export interface AudioMetrics {
  fillerWords: number;
  speakingRate: number;
  sentiment: "Positive" | "Neutral" | "Negative";
  sentimentScore: number; // 0 to 100
}

export interface TimelineEvent {
  id: string;
  time: string;
  seconds: number;
  speaker: "Zai" | "Candidate";
  text: string;
  annotation?: string;
  type?: "normal" | "warning" | "success";
}

interface SimulationContextType {
  isActive: boolean;
  step: number; // 0: Join, 1: Capture, 2: Analyze, 3: Report
  elapsedTime: number; // seconds
  candidateState: CandidateState;
  biometrics: BiometricMetrics;
  audio: AudioMetrics;
  timelineEvents: TimelineEvent[];
  activeTimelineIndex: number;
  startSimulation: () => void;
  stopSimulation: () => void;
  resetSimulation: () => void;
  setStep: (step: number) => void;
}

const initialEvents: TimelineEvent[] = [
  {
    id: "e1",
    time: "00:05",
    seconds: 5,
    speaker: "Zai",
    text: "Hello! I'm Zai, your AI recruiter today. Let's start with your background in scalable distributed systems. Can you walk me through your experience?",
    type: "normal"
  },
  {
    id: "e2",
    time: "00:30",
    seconds: 30,
    speaker: "Candidate",
    text: "Sure! Uh, at my last company, I led the transition of our monolithic API service to a cluster of Microservices, which... uh, actually improved our throughput by about 200%.",
    annotation: "Filler words detected ('Uh')",
    type: "warning"
  },
  {
    id: "e3",
    time: "01:15",
    seconds: 75,
    speaker: "Candidate",
    text: "We used Kubernetes and Kafka. But during peak black-friday traffic, we hit a major bottleneck in our DB write layer... it was really intense. I had to debug under pressure.",
    annotation: "Heart rate spike (98 BPM)",
    type: "warning"
  },
  {
    id: "e4",
    time: "02:00",
    seconds: 120,
    speaker: "Zai",
    text: "Impressive response. How did you resolve the write lockups on PostgreSQL? Did you scale horizontally or implement connection pooling?",
    type: "normal"
  },
  {
    id: "e5",
    time: "02:25",
    seconds: 145,
    speaker: "Candidate",
    text: "We did both. We configured PgBouncer for pooling, split the read traffic to replicas, and refactored our write queries. The database CPU usage immediately dropped to 40%.",
    annotation: "Engagement high & stress stabilized",
    type: "success"
  },
  {
    id: "e6",
    time: "02:50",
    seconds: 170,
    speaker: "Zai",
    text: "Thank you for the detailed breakdown. This concludes our technical assessment. I am analyzing the telemetry and compiling your profile.",
    type: "normal"
  }
];

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [step, setStepState] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [candidateState, setCandidateState] = useState<CandidateState>("connecting");
  const [biometrics, setBiometrics] = useState<BiometricMetrics>({
    heartRate: 72,
    stressIndex: 25,
    oxygenLevel: 98,
    livenessScore: 99.4
  });
  const [audio, setAudio] = useState<AudioMetrics>({
    fillerWords: 0,
    speakingRate: 0,
    sentiment: "Neutral",
    sentimentScore: 50
  });
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(-1);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startSimulation = () => {
    setIsActive(true);
  };

  const stopSimulation = () => {
    setIsActive(false);
  };

  const resetSimulation = () => {
    setIsActive(false);
    setStepState(0);
    setElapsedTime(0);
    setCandidateState("connecting");
    setBiometrics({
      heartRate: 72,
      stressIndex: 25,
      oxygenLevel: 98,
      livenessScore: 99.4
    });
    setAudio({
      fillerWords: 0,
      speakingRate: 0,
      sentiment: "Neutral",
      sentimentScore: 50
    });
    setActiveTimelineIndex(-1);
  };

  const setStep = (newStep: number) => {
    setStepState(newStep);
    if (newStep === 0) {
      setCandidateState("connecting");
      setElapsedTime(0);
    } else if (newStep === 1) {
      setCandidateState("listening");
      setElapsedTime(10);
    } else if (newStep === 2) {
      setCandidateState("answering");
      setElapsedTime(30);
    } else if (newStep === 3) {
      setCandidateState("complete");
      setElapsedTime(180);
    }
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => {
          const nextTime = prev + 1;

          // Step thresholds mapped to timeline
          if (nextTime < 10) {
            setStepState(0);
            setCandidateState("connecting");
          } else if (nextTime >= 10 && nextTime < 30) {
            setStepState(1);
            setCandidateState("listening");
          } else if (nextTime >= 30 && nextTime < 170) {
            setStepState(2);
            setCandidateState("answering");
          } else {
            setStepState(3);
            setCandidateState("complete");
            setIsActive(false); // Stop simulation once complete
          }

          // Dynamic Biometrics updates based on elapsedTime
          setBiometrics((prevBio) => {
            let hr = prevBio.heartRate;
            let stress = prevBio.stressIndex;

            // Scenario: Spikes around 70-90 seconds (DB Bottleneck discussion)
            if (nextTime >= 65 && nextTime <= 95) {
              hr = Math.min(105, hr + (Math.random() * 3 + 1));
              stress = Math.min(88, stress + (Math.random() * 4 + 2));
            }
            // Stabilizes after 110 seconds
            else if (nextTime > 110 && nextTime < 160) {
              hr = Math.max(76, hr - (Math.random() * 2 + 0.5));
              stress = Math.max(30, stress - (Math.random() * 3 + 1));
            }
            // Standard small jitter
            else {
              hr = 70 + Math.sin(nextTime / 5) * 3 + Math.random() * 2;
              stress = 20 + Math.cos(nextTime / 8) * 4 + Math.random() * 1.5;
            }

            return {
              heartRate: Math.round(hr * 10) / 10,
              stressIndex: Math.round(stress),
              oxygenLevel: 97 + Math.floor(Math.sin(nextTime / 20) * 1.5),
              livenessScore: 99.1 + Math.random() * 0.5
            };
          });

          // Dynamic Audio updates
          setAudio((prevAudio) => {
            let filler = prevAudio.fillerWords;
            let rate = prevAudio.speakingRate;
            let sent = prevAudio.sentiment;
            let sentScore = prevAudio.sentimentScore;

            if (nextTime < 10) {
              rate = 0;
              sent = "Neutral";
              sentScore = 50;
            } else if (nextTime >= 10 && nextTime < 30) {
              // listening
              rate = 0;
              sent = "Positive";
              sentScore = 70;
            } else {
              // answering
              rate = Math.round(140 + Math.sin(nextTime / 3) * 15 + Math.random() * 5);
              // Randomly increment filler words in specific intervals
              if (
                (nextTime > 30 && nextTime < 45 && Math.random() < 0.1) ||
                (nextTime > 65 && nextTime < 95 && Math.random() < 0.15)
              ) {
                filler += 1;
              }

              // Sentiment shifts
              if (nextTime >= 70 && nextTime <= 95) {
                sent = "Neutral";
                sentScore = Math.max(35, sentScore - 2);
              } else if (nextTime > 110) {
                sent = "Positive";
                sentScore = Math.min(82, sentScore + 1.5);
              } else {
                sentScore = 60 + Math.sin(nextTime / 10) * 8;
                if (sentScore > 65) sent = "Positive";
                else if (sentScore < 45) sent = "Negative";
                else sent = "Neutral";
              }
            }

            return {
              fillerWords: filler,
              speakingRate: rate,
              sentiment: sent,
              sentimentScore: Math.round(sentScore)
            };
          });

          // Sync Active Timeline Index
          const activeIdx = initialEvents.findIndex(
            (ev, idx) =>
              nextTime >= ev.seconds &&
              (idx === initialEvents.length - 1 || nextTime < initialEvents[idx + 1].seconds)
          );
          setActiveTimelineIndex(activeIdx);

          return nextTime;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive]);

  return (
    <SimulationContext.Provider
      value={{
        isActive,
        step,
        elapsedTime,
        candidateState,
        biometrics,
        audio,
        timelineEvents: initialEvents,
        activeTimelineIndex,
        startSimulation,
        stopSimulation,
        resetSimulation,
        setStep
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error("useSimulation must be used within a SimulationProvider");
  }
  return context;
}
