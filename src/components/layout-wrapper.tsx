"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, GraduationCap, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Check if current route is auth, if so, render without shell layouts
  const isAuthPage = pathname?.startsWith("/auth");

  if (isAuthPage) {
    return <main className="min-h-screen bg-slate-50 dark:bg-slate-950">{children}</main>;
  }

  const mobileNavLinks = [
    { label: "Student Dashboard", href: "/student/dashboard" },
    { label: "My Enrolled Courses", href: "/student/courses" },
    { label: "Create Course Form", href: "/instructor/create-course" },
    { label: "Manage Instructor Courses", href: "/instructor/manage-courses" },
    { label: "User Management (Admin)", href: "/admin/users" },
    { label: "Portal Config (Admin)", href: "/admin/courses" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors">
      <Navbar />

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <Sidebar className="flex-shrink-0" />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Mobile Navigation Trigger */}
          <div className="flex md:hidden items-center justify-between mb-6 p-4 border border-slate-200 bg-white rounded-lg dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span className="font-extrabold text-sm tracking-tight bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-300">
                Menu Portal
              </span>
            </div>
            
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle mobile menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader className="pb-4 border-b">
                  <SheetTitle className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-indigo-600" />
                    <span>LMS Portals</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1.5 mt-4">
                  {mobileNavLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                          isActive
                            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400"
                            : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-850"
                        }`}
                      >
                        {link.label}
                        <ChevronRight className="h-4 w-4 opacity-50" />
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
