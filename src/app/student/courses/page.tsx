"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { CourseCard } from "@/components/course-card";
import { mockCourses } from "@/lib/mock-data";

export default function StudentCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = mockCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const enrolledCourses = filteredCourses.filter(c => c.progressPercent > 0);
  const browseCourses = filteredCourses;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Course Center</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your enrolled courses or browse our library of corporate tech sprints
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search courses by title, keywords or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="enrolled" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="enrolled">My Enrolled</TabsTrigger>
          <TabsTrigger value="browse">Browse Library</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrolled" className="mt-6">
          {enrolledCourses.length === 0 ? (
            <div className="text-center py-12 border border-dashed rounded-lg bg-white dark:bg-slate-900">
              <p className="text-slate-500">No active course enrollments found matching search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard key={course.id} course={course} isEnrolled={true} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="browse" className="mt-6">
          {browseCourses.length === 0 ? (
            <div className="text-center py-12 border border-dashed rounded-lg bg-white dark:bg-slate-900">
              <p className="text-slate-500">No courses available matching your query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {browseCourses.map((course) => (
                <CourseCard key={course.id} course={course} isEnrolled={course.progressPercent > 0} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
