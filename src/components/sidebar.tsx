"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  FolderOpen,
  Users,
  Settings,
  ShieldCheck,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/student/dashboard",
      role: "student",
    },
    {
      label: "My Courses",
      icon: BookOpen,
      href: "/student/courses",
      role: "student",
    },
    {
      label: "Create Course",
      icon: PlusCircle,
      href: "/instructor/create-course",
      role: "instructor",
    },
    {
      label: "Manage Courses",
      icon: FolderOpen,
      href: "/instructor/manage-courses",
      role: "instructor",
    },
    {
      label: "User Management",
      icon: Users,
      href: "/admin/users",
      role: "admin",
    },
    {
      label: "Portal Config",
      icon: ShieldCheck,
      href: "/admin/courses",
      role: "admin",
    },
  ];

  return (
    <aside
      className={cn(
        "hidden md:flex h-[calc(100vh-4rem)] w-64 flex-col border-r border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50",
        className
      )}
    >
      <div className="space-y-4 flex-1">
        <div className="py-2">
          <h2 className="px-4 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            Student Portal
          </h2>
          <div className="mt-2 space-y-1">
            {links
              .filter((l) => l.role === "student")
              .map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-450 dark:hover:bg-slate-850 dark:hover:text-indigo-400",
                      isActive &&
                        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
          <h2 className="px-4 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            Instructor Portal
          </h2>
          <div className="mt-2 space-y-1">
            {links
              .filter((l) => l.role === "instructor")
              .map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-450 dark:hover:bg-slate-850 dark:hover:text-indigo-400",
                      isActive &&
                        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
          <h2 className="px-4 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            Administration
          </h2>
          <div className="mt-2 space-y-1">
            {links
              .filter((l) => l.role === "admin")
              .map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-450 dark:hover:bg-slate-850 dark:hover:text-indigo-400",
                      isActive &&
                        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-450 dark:hover:bg-slate-850 dark:hover:text-indigo-400"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
