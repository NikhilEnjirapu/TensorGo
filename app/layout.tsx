import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HumAIn | Zai - The AI Recruiter & Workforce Telemetry Platform",
  description: "Meet Zai, the first HumAIn digital agent. An AI recruiter that joins calls, analyzes audio/video/biometrics, and creates un-gameable candidate dossiers.",
  keywords: ["AI Recruiter", "Biometric Screening", "HR Tech", "NextJS Recruiter", "HumAIn", "Zai AI"],
  authors: [{ name: "HumAIn Technologies" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-full flex flex-col bg-background-dark text-foreground selection:bg-accent-blue/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
