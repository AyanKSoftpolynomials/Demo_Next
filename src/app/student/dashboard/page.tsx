"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Trophy, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/course-card";
import { mockCourses } from "@/lib/mock-data";

export default function StudentDashboardPage() {
  const activeCourses = mockCourses.filter((c) => c.progressPercent > 0);

  const stats = [
    { label: "Enrolled Courses", value: "2", icon: BookOpen, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400" },
    { label: "Completed Lessons", value: "3", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400" },
    { label: "Learning Hours", value: "12.4 hrs", icon: Clock, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400" },
    { label: "XP Points", value: "850", icon: Trophy, color: "text-violet-600 bg-violet-50 dark:bg-violet-950/40 dark:text-violet-400" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-indigo-900 to-violet-800 text-white rounded-xl shadow-md space-y-2 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10">
          <BookOpen className="h-64 w-64" />
        </div>
        <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/10">
          Day 8 Learning Sprint
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back, Ayan!</h1>
        <p className="text-sm text-indigo-100 max-w-xl">
          You are doing great! You have completed 3 lessons this week. Keep up the momentum to reach your learning milestone.
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border border-slate-200 dark:border-slate-800">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                    {stat.value}
                  </h3>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Active Courses Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">My Active Courses</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Pick up right where you left off</p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/student/courses" className="flex items-center gap-1.5">
              View All Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCourses.map((course) => (
            <CourseCard key={course.id} course={course} isEnrolled={true} />
          ))}
        </div>
      </div>

      {/* Recent Activity List */}
      <Card className="border border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Recent Syllabus Achievements</CardTitle>
          <CardDescription>Your recently completed modules and achievements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
            <div className="flex-1 space-y-0.5">
              <h4 className="font-bold text-sm">Completed Lesson: Primitive Types Breakdown</h4>
              <p className="text-xs text-slate-500">TypeScript Fundamentals for Production • 2 hours ago</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">+100 XP</span>
          </div>

          <div className="flex items-start gap-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
            <div className="flex-1 space-y-0.5">
              <h4 className="font-bold text-sm">Completed Lesson: Why TypeScript?</h4>
              <p className="text-xs text-slate-500">TypeScript Fundamentals for Production • 1 day ago</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">+100 XP</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
