"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, Shield, Award, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white overflow-hidden relative selection:bg-indigo-500 selection:text-white">
      {/* Background blobs for premium glassmorphism feel */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="w-full border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-indigo-400 animate-pulse" />
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-400 to-violet-300 bg-clip-text text-transparent">
              Antigravity LMS
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="text-slate-300 hover:text-white">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-indigo-600 text-white hover:bg-indigo-700">
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Content Section */}
      <main className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Text */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-xs font-semibold tracking-wide text-indigo-300 uppercase">
              🚀 Day 8 Development Sprint Complete
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
              Accelerate Team
              <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                Technical Knowledge.
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed">
              Experience the future of corporate training. A fully integrated type-safe learning system powered by Next.js, Tailwind CSS, TypeScript, and shadcn/ui components.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700 font-bold px-8 py-6 rounded-lg text-base shadow-lg shadow-indigo-600/20">
                <Link href="/student/dashboard" className="flex items-center gap-2">
                  Launch Student Portal
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/10 hover:bg-white/5 font-bold px-8 py-6 rounded-lg text-base">
                <Link href="/instructor/manage-courses">
                  Instructor Portal
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Right Interactive Dashboard Mockup Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-md space-y-6 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  LMS Learning Metrics
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <BookOpen className="h-5 w-5 text-indigo-400" />
                  <span className="text-[10px] text-slate-400 block uppercase">Enrolled</span>
                  <span className="text-lg font-black">2 Sprints</span>
                </div>
                
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <Users className="h-5 w-5 text-emerald-400" />
                  <span className="text-[10px] text-slate-400 block uppercase">Students</span>
                  <span className="text-lg font-black">629 active</span>
                </div>
                
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <Award className="h-5 w-5 text-amber-400" />
                  <span className="text-[10px] text-slate-400 block uppercase">Rating</span>
                  <span className="text-lg font-black">4.7 stars</span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <Shield className="h-5 w-5 text-violet-400" />
                  <span className="text-[10px] text-slate-400 block uppercase">Security</span>
                  <span className="text-lg font-black">Type-Safe</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-600/10 border border-indigo-500/25 space-y-2">
                <span className="text-xs font-bold text-indigo-300 block">Syllabus Highlight:</span>
                <p className="text-xs text-slate-350 leading-relaxed">
                  Next.js App Router architectures, TypeScript generics and custom guards, Tailwind responsiveness, and shadcn component wrappers.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full border-t border-white/5 py-8 text-center text-slate-500 text-xs">
        <p>© 2026 Antigravity LMS Learning Sprint. All rights reserved.</p>
      </footer>
    </div>
  );
}
