"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, BookOpen, CheckCircle, Circle, PlayCircle, Star, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { mockCourses } from "@/lib/mock-data";
import type { Course, Lesson } from "@/types";

export default function CourseDetailsPage() {
  const params = useParams();
  const { toast } = useToast();
  
  const courseId = params?.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const foundCourse = mockCourses.find((c) => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      
      // Initialize completed lessons list from mock data
      const ids: string[] = [];
      foundCourse.modules.forEach((mod) => {
        mod.lessons.forEach((les) => {
          if (les.isCompleted) {
            ids.push(les.id);
          }
        });
      });
      setCompletedLessonIds(ids);

      // Select first lesson by default
      if (foundCourse.modules.length > 0 && foundCourse.modules[0].lessons.length > 0) {
        setSelectedLesson(foundCourse.modules[0].lessons[0]);
      }
    }
  }, [courseId]);

  // Recalculate progress when completed lessons shift
  useEffect(() => {
    if (!course) return;
    let totalLessonsCount = 0;
    course.modules.forEach((mod) => {
      totalLessonsCount += mod.lessons.length;
    });

    if (totalLessonsCount > 0) {
      const percentage = Math.round((completedLessonIds.length / totalLessonsCount) * 100);
      setProgress(percentage);
    }
  }, [completedLessonIds, course]);

  if (!course) {
    return (
      <div className="text-center py-12 space-y-4">
        <h2 className="text-2xl font-bold text-red-500">Course Not Found</h2>
        <p className="text-slate-500">The course you are looking for does not exist in our system.</p>
        <Button onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  const handleLessonToggle = (lessonId: string, lessonTitle: string) => {
    if (completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds(prev => prev.filter(id => id !== lessonId));
      toast({
        title: "Progress Updated",
        description: `Marked "${lessonTitle}" as incomplete.`,
      });
    } else {
      setCompletedLessonIds(prev => [...prev, lessonId]);
      toast({
        title: "🎉 Lesson Completed!",
        description: `Successfully completed: "${lessonTitle}".`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Back Anchor */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => window.history.back()} className="rounded-full">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
      </div>

      {/* Main Grid: Viewer Left, Syllabus Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Lesson Player/Content Viewer */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950">
            <div className="aspect-video w-full bg-slate-900 flex items-center justify-center relative text-white">
              {selectedLesson?.videoUrl ? (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <PlayCircle className="h-20 w-20 text-indigo-500 animate-pulse" />
                  <span className="text-sm font-semibold tracking-wider text-slate-400">
                    Playing: {selectedLesson.title}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <FileText className="h-20 w-20 text-slate-500" />
                  <span className="text-sm font-semibold tracking-wider text-slate-400">
                    Document Viewer: {selectedLesson?.title}
                  </span>
                </div>
              )}
            </div>
            
            <CardHeader className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <CardTitle className="text-xl font-bold">{selectedLesson?.title}</CardTitle>
                  <CardDescription className="mt-1">
                    Lesson duration: {selectedLesson?.duration} minutes
                  </CardDescription>
                </div>

                {selectedLesson && (
                  <Button
                    onClick={() => handleLessonToggle(selectedLesson.id, selectedLesson.title)}
                    variant={completedLessonIds.includes(selectedLesson.id) ? "outline" : "default"}
                    className="font-semibold shadow-sm"
                  >
                    {completedLessonIds.includes(selectedLesson.id) ? "Mark Incomplete" : "Mark as Completed"}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
              <p>
                {selectedLesson?.textContent || 
                  "In this lesson, we cover practical syntax mappings and architecture designs. Follow the visual steps detailed in the video player or refer to the course documentation PDF linked below."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Syllabus & Course Metrics */}
        <div className="space-y-6">
          
          {/* Progress Card */}
          <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">Course Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{progress}%</span>
                <span className="text-xs font-semibold text-slate-500">
                  {completedLessonIds.length} lessons completed
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden dark:bg-slate-800">
                <div
                  className="bg-indigo-600 h-full transition-all dark:bg-indigo-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Syllabus / Module List */}
          <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-base font-bold">Course Syllabus</CardTitle>
              <CardDescription>Click a lesson to select or toggle progress</CardDescription>
            </CardHeader>
            <CardContent className="p-2 space-y-4 max-h-[400px] overflow-y-auto mt-2">
              {course.modules.map((mod) => (
                <div key={mod.id} className="space-y-2">
                  <h4 className="font-extrabold text-xs text-slate-500 uppercase tracking-wider px-2">
                    {mod.title}
                  </h4>
                  <div className="space-y-1">
                    {mod.lessons.map((les) => {
                      const isSelected = selectedLesson?.id === les.id;
                      const isDone = completedLessonIds.includes(les.id);
                      return (
                        <div
                          key={les.id}
                          onClick={() => setSelectedLesson(les)}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition text-xs font-medium ${
                            isSelected
                              ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400"
                              : "text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLessonToggle(les.id, les.title);
                              }}
                              className="hover:scale-110 transition active:scale-95"
                            >
                              {isDone ? (
                                <CheckCircle className="h-4 w-4 text-emerald-500 fill-emerald-500/10" />
                              ) : (
                                <Circle className="h-4 w-4 text-slate-400" />
                              )}
                            </span>
                            <span className="line-clamp-1">{les.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                            {les.duration}m
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
