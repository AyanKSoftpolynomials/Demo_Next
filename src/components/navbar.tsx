"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GraduationCap, Sun, Moon, LogOut, User as UserIcon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

export function Navbar() {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check local preferences
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove("dark");
      setDarkMode(false);
      toast({ title: "Theme changed", description: "Light mode activated" });
    } else {
      root.classList.add("dark");
      setDarkMode(true);
      toast({ title: "Theme changed", description: "Dark mode activated" });
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out of your session.",
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/85">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-300">
               LMS
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/student/dashboard"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition dark:text-slate-350 dark:hover:text-indigo-400"
            >
              Dashboard
            </Link>
            <Link
              href="/student/courses"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition dark:text-slate-350 dark:hover:text-indigo-400"
            >
              My Courses
            </Link>
            <Link
              href="/instructor/manage-courses"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition dark:text-slate-350 dark:hover:text-indigo-400"
            >
              Instructor Portal
            </Link>
            <Link
              href="/admin/users"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition dark:text-slate-350 dark:hover:text-indigo-400"
            >
              Admin
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            className="rounded-full"
          >
            {darkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem] text-slate-700 dark:text-slate-300" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800"
              >
                <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                  AT
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/student/dashboard" className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  Profile Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-rose-600 focus:text-rose-500 flex items-center gap-2 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
