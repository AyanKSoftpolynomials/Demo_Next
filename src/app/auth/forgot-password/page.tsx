"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotSchema = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ForgotSchema>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotSchema) => {
    setSubmitted(true);
    toast({
      title: "Reset link sent",
      description: `Password reset instructions sent to ${data.email}.`,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 px-4 py-12">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/10 shadow-2xl text-white">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <GraduationCap className="h-10 w-10 text-indigo-400" />
          </div>
          <CardTitle className="text-2xl font-extrabold tracking-tight text-white">
            Reset Password
          </CardTitle>
          <CardDescription className="text-slate-400">
            {submitted
              ? "Check your inbox for further instructions"
              : "Enter your email address and we'll send you a recovery link"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-3 text-center">
              <CheckCircle2 className="h-14 w-14 text-emerald-400 animate-bounce" />
              <h3 className="font-bold text-lg text-white">Check Your Email</h3>
              <p className="text-sm text-slate-300 max-w-xs">
                We have emailed a password recovery link to your registered email address.
              </p>
              <Button asChild className="mt-4 bg-indigo-600 text-white hover:bg-indigo-700 w-full">
                <Link href="/auth/login">Back to Login</Link>
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-slate-800">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-350 dark:text-slate-350 font-semibold">Email Address</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10 bg-slate-950/20 text-white placeholder:text-slate-500 border-white/10 focus-visible:ring-indigo-400"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-2 mt-2">
                  Send Recovery Link
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        {!submitted && (
          <CardFooter className="flex justify-center text-xs text-slate-400 pb-6 border-t border-white/10 pt-4">
            <Link
              href="/auth/login"
              className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Sign In
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
