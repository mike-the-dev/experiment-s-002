"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSignInForm } from "@/features/login/signin/useSignInForm";

export function Form() {
  const {
    form,
    isPending,
    validators,
    handleFormSubmit,
    emailInputRef,
  } = useSignInForm();

  return (
    <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
      <form.Field
        name="email"
        validators={validators.email}
      >
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Email address</Label>
            <Input
              ref={emailInputRef}
              id={field.name}
              name={field.name}
              type="email"
              placeholder="your@email.com"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-destructive">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="password"
        validators={validators.password}
      >
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Password</Label>
            <Input
              id={field.name}
              name={field.name}
              type="password"
              placeholder="Enter your password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-destructive">
                {field.state.meta.errors[0]}
              </p>
            )}
            <Link
              href="/forgot-password"
              className="text-sm text-purple-600 hover:text-purple-700 inline-block"
            >
              Forgot password?
            </Link>
          </div>
        )}
      </form.Field>

      <form.Field name="rememberMe">
        {(field) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              checked={field.state.value}
              onCheckedChange={(checked) => field.handleChange(checked as boolean)}
            />
            <Label
              htmlFor={field.name}
              className="text-sm font-normal cursor-pointer"
            >
              Remember me
            </Label>
          </div>
        )}
      </form.Field>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </Button>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Don&apos;t have an account? </span>
        <Link
          href="/signup"
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}

