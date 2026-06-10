"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Star, User } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
}

export function CourseCard({ course, isEnrolled = false }: CourseCardProps) {
  // Safe check for cover image
  const coverImage = course.coverImage || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60";

  return (
    <Card className="group flex flex-col overflow-hidden h-full border border-slate-200 dark:border-slate-800 hover:shadow-md transition">
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={coverImage}
          alt={course.title}
          className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
        />
        <div className="absolute top-2 right-2 flex gap-1.5 flex-wrap justify-end">
          {course.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-indigo-600 text-white dark:bg-indigo-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <CardHeader className="p-4 pb-2 space-y-1">
        <h3 className="font-bold text-base line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
          {course.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 min-h-[2rem]">
          {course.description}
        </p>
      </CardHeader>

      <CardContent className="p-4 pt-0 pb-2 flex-1 flex flex-col justify-end">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <User className="h-3 w-3 text-indigo-500" />
          <span className="font-medium">{course.instructorName}</span>
        </div>

        {isEnrolled ? (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500 dark:text-slate-400">Progress</span>
              <span className="text-indigo-600 dark:text-indigo-400">{course.progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden dark:bg-slate-800">
              <div
                className="bg-indigo-600 h-full transition-all dark:bg-indigo-500"
                style={{ width: `${course.progressPercent}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {course.averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
              {course.price === 0 ? "Free" : `$${course.price.toFixed(2)}`}
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 mt-auto">
        <Button asChild className="w-full mt-3" size="sm" variant={isEnrolled ? "outline" : "default"}>
          <Link href={`/student/courses/${course.id}`}>
            <BookOpen className="h-3.5 w-3.5 mr-2" />
            {isEnrolled ? "Continue Learning" : "View Details"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
