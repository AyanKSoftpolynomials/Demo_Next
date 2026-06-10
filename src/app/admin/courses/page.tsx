"use client";

import React, { useState } from "react";
import { FolderKanban, Check, ShieldAlert, Award, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { mockCourses } from "@/lib/mock-data";
import type { Course } from "@/types";

export default function AdminCourseManagementPage() {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>(mockCourses);

  const toggleCourseStatus = (courseId: string, currentStatus: string, title: string) => {
    const nextStatus = currentStatus === "published" ? "draft" : "published";
    setCourses(prev =>
      prev.map(c => (c.id === courseId ? { ...c, status: nextStatus } : c))
    );
    toast({
      title: "Status Updated",
      description: `Course "${title}" status set to ${nextStatus.toUpperCase()}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Global Course Audit</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Approve draft curriculum files, review average user feedback ratings, and control visibility states.
        </p>
      </div>

      <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderKanban className="h-5 w-5 text-indigo-600" />
            Global Platform Catalog
          </CardTitle>
          <CardDescription>Verify licensing compliance and visibility logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author / Instructor</TableHead>
                  <TableHead>Metrics</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action Controls</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-mono text-xs text-slate-400">{course.id}</TableCell>
                    <TableCell className="font-bold text-slate-950 dark:text-white">{course.title}</TableCell>
                    <TableCell className="text-xs text-slate-500">{course.instructorName}</TableCell>
                    <TableCell className="text-xs space-y-1">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Award className="h-3 w-3" />
                        <span>Rating: {course.averageRating.toFixed(1)} ⭐</span>
                      </div>
                      <div className="text-slate-400">
                        Enrolled: {course.enrolledStudentsCount} students
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        course.status === "published"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400"
                      }`}>
                        {course.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant={course.status === "published" ? "outline" : "default"}
                        size="sm"
                        onClick={() => toggleCourseStatus(course.id, course.status, course.title)}
                        className="text-xs"
                      >
                        {course.status === "published" ? "Unpublish / Draft" : "Approve & Publish"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
