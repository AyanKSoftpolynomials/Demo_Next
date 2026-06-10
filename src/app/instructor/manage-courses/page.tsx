"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, Eye, Award, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { mockCourses } from "@/lib/mock-data";
import type { Course } from "@/types";

export default function ManageCoursesPage() {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>(mockCourses);

  const handleDelete = (courseId: string, courseTitle: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    toast({
      variant: "destructive",
      title: "Course Deleted",
      description: `Successfully removed course: "${courseTitle}"`,
    });
  };

  const instructorStats = [
    { label: "Total Students Enrolled", value: "629", icon: Users, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" },
    { label: "My Created Courses", value: `${courses.length}`, icon: BookOpen, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" },
    { label: "Average Ratings", value: "4.7 ⭐", icon: Award, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Instructor Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Publish, edit, or delete courses. Manage curriculum files and student enrollment lists.
          </p>
        </div>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
          <Link href="/instructor/create-course">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Course
          </Link>
        </Button>
      </div>

      {/* Instructor Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {instructorStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
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

      {/* Course List Table */}
      <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <CardHeader>
          <CardTitle>Course Catalog Management</CardTitle>
          <CardDescription>Active list of courses authored by you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Cover</TableHead>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Enrolled Students</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => {
                  const coverImage = course.coverImage || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60";
                  return (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="w-16 h-10 rounded overflow-hidden bg-slate-100 dark:bg-slate-900">
                          <img src={coverImage} alt={course.title} className="object-cover w-full h-full" />
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-slate-900 dark:text-white">
                        {course.title}
                      </TableCell>
                      <TableCell className="font-semibold text-xs">
                        ${course.price.toFixed(2)}
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
                      <TableCell className="text-slate-500 font-medium text-xs">
                        {course.enrolledStudentsCount} students
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-indigo-600">
                          <Link href={`/student/courses/${course.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-indigo-600">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(course.id, course.title)}
                          className="h-8 w-8 text-slate-500 hover:text-rose-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
