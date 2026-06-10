"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Info, DollarSign, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const courseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(80, "Title is too long"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price cannot be negative").max(1000, "Price is too high")
  ),
  tags: z.string().min(1, "Specify at least one category tag"),
});

type CourseSchema = z.infer<typeof courseSchema>;

export default function CreateCoursePage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<CourseSchema>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      tags: "",
    },
  });

  const onSubmit = (data: CourseSchema) => {
    toast({
      title: "🎉 Course Created!",
      description: `Course "${data.title}" was saved as a Draft successfully.`,
    });
    router.push("/instructor/manage-courses");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Create New Course</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Design your tech learning sprint. Define basic info, pricing models, and categorization.
        </p>
      </div>

      <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-indigo-600" />
            Basic Course Specifications
          </CardTitle>
          <CardDescription>Fill out the curriculum details below</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Course Title</FormLabel>
                    <div className="relative">
                      <Info className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. Next.js Masterclass: Zero to Hero"
                          className="pl-10 focus-visible:ring-indigo-500"
                        />
                      </FormControl>
                    </div>
                    <FormDescription>Make your course title descriptive and engaging.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Detailed Description</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        placeholder="Provide a comprehensive summary of syllabus, modules, and target students..."
                        rows={5}
                        className="flex w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-450"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Price ($ USD)</FormLabel>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            step="0.01"
                            placeholder="0.00 (Free)"
                            className="pl-10 focus-visible:ring-indigo-500"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Course Tags</FormLabel>
                      <div className="relative">
                        <Tag className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g. Next.js, React, Frontend"
                            className="pl-10 focus-visible:ring-indigo-500"
                          />
                        </FormControl>
                      </div>
                      <FormDescription>Comma-separated list of search labels.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/instructor/manage-courses")}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  Save Draft Course
                </Button>
              </div>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
