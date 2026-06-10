import { Course, User, Enrollment } from "@/types";

export const mockUsers: User[] = [
  {
    id: "usr_1",
    name: "Ayan Khan",
    email: "ayan@antialiased.com",
    role: "student",
    avatarUrl: "/avatars/ayan.jpg",
    bio: "Full Stack Trainee learning React, Next.js, and TypeScript.",
  },
  {
    id: "usr_2",
    name: "Dr. Sarah Jenkins",
    email: "sarah.j@lms.com",
    role: "instructor",
    avatarUrl: "/avatars/sarah.jpg",
    bio: "Senior Software Architect with 15+ years experience in distributed systems.",
  },
  {
    id: "usr_3",
    name: "Alex Mercer",
    email: "alex.m@lms.com",
    role: "admin",
    avatarUrl: "/avatars/alex.jpg",
    bio: "Lead Platform Administrator.",
  },
  {
    id: "usr_4",
    name: "John Doe",
    email: "john.doe@gmail.com",
    role: "student",
  },
  {
    id: "usr_5",
    name: "Jane Smith",
    email: "jane.smith@yahoo.com",
    role: "student",
  }
];

export const mockCourses: Course[] = [
  {
    id: "course_ts_101",
    title: "TypeScript Fundamentals for Production",
    description: "Learn variables, interfaces, enums, generics, and compiler configurations from scratch to industry level.",
    instructorId: "usr_2",
    instructorName: "Dr. Sarah Jenkins",
    price: 49.99,
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
    tags: ["TypeScript", "Programming", "Best Seller"],
    progressPercent: 65,
    status: "published",
    enrolledStudentsCount: 342,
    averageRating: 4.8,
    modules: [
      {
        id: "mod_ts_1",
        title: "Introduction & Basic Types",
        lessons: [
          { id: "les_ts_1_1", title: "Why TypeScript?", duration: 10, isCompleted: true, videoUrl: "https://example.com/video1", textContent: "TypeScript is a strict syntactical superset of JavaScript..." },
          { id: "les_ts_1_2", title: "Installing Compiler & Tooling", duration: 15, isCompleted: true, videoUrl: "https://example.com/video2" },
          { id: "les_ts_1_3", title: "Primitive Types Breakdown", duration: 20, isCompleted: false, videoUrl: "https://example.com/video3" },
        ]
      },
      {
        id: "mod_ts_2",
        title: "Advanced Structures",
        lessons: [
          { id: "les_ts_2_1", title: "Interfaces vs Type Aliases", duration: 25, isCompleted: false },
          { id: "les_ts_2_2", title: "Deep Dive: Generics", duration: 30, isCompleted: false },
        ]
      }
    ]
  },
  {
    id: "course_next_202",
    title: "Next.js 15 Masterclass (App Router)",
    description: "Build serverless full-stack web applications using React Server Components, Server Actions, Route Handlers, and cache policies.",
    instructorId: "usr_2",
    instructorName: "Dr. Sarah Jenkins",
    price: 99.99,
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
    tags: ["Next.js", "React", "Trending"],
    progressPercent: 20,
    status: "published",
    enrolledStudentsCount: 198,
    averageRating: 4.9,
    modules: [
      {
        id: "mod_next_1",
        title: "Architecture & Layouts",
        lessons: [
          { id: "les_next_1_1", title: "Server Components vs Client Components", duration: 18, isCompleted: true },
          { id: "les_next_1_2", title: "Root Layouts & Nested Routers", duration: 22, isCompleted: false },
        ]
      }
    ]
  },
  {
    id: "course_tailwind_303",
    title: "Tailwind CSS Design Systems",
    description: "Learn to build custom premium responsive design layouts, flexbox, grid grids, transitions, and dark modes without writing raw CSS.",
    instructorId: "usr_2",
    instructorName: "Dr. Sarah Jenkins",
    price: 29.99,
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60",
    tags: ["Tailwind CSS", "Design", "New Release"],
    progressPercent: 0,
    status: "published",
    enrolledStudentsCount: 89,
    averageRating: 4.5,
    modules: [
      {
        id: "mod_tw_1",
        title: "Layout Basics",
        lessons: [
          { id: "les_tw_1_1", title: "Utility First Concept", duration: 12, isCompleted: false },
          { id: "les_tw_1_2", title: "Grid & Flexbox Positioning", duration: 25, isCompleted: false }
        ]
      }
    ]
  }
];

export const mockEnrollments: Enrollment[] = [
  {
    id: "enr_1",
    userId: "usr_1",
    courseId: "course_ts_101",
    progressPercent: 65,
    completedLessons: ["les_ts_1_1", "les_ts_1_2"],
    enrolledAt: "2026-05-01T10:00:00Z",
  },
  {
    id: "enr_2",
    userId: "usr_1",
    courseId: "course_next_202",
    progressPercent: 20,
    completedLessons: ["les_next_1_1"],
    enrolledAt: "2026-05-15T14:30:00Z",
  }
];
