export type UserRole = "student" | "instructor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  bio?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: number; // in minutes
  videoUrl?: string;
  textContent?: string;
  isCompleted?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export type CourseStatus = "draft" | "published" | "archived";

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  price: number;
  coverImage?: string;
  tags: string[];
  progressPercent: number; // for students enrolled
  status: CourseStatus;
  modules: Module[];
  enrolledStudentsCount: number;
  averageRating: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progressPercent: number;
  completedLessons: string[]; // array of Lesson IDs
  enrolledAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
}
