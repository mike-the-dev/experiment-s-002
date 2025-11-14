"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";
import { usePricingSetupForm } from "@/features/pricingSetup/pricingSetup/usePricingSetupForm";
import { PaymentMethod, LessonDuration } from "@/features/pricingSetup/_shared/pricingSetup.schema";

interface PricingSetupFormProps {
  accountType?: string;
}

export function PricingSetupForm({ accountType = "teacher" }: PricingSetupFormProps) {
  const {
    form,
    isPending,
    validators,
    handleFormSubmit,
    handleBack,
  } = usePricingSetupForm({ accountType });

  const paymentMethod = form.state.values.paymentMethod;

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 py-12">
      {/* Background styling matching previous pages */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      <Card className="w-full max-w-3xl relative backdrop-blur-sm bg-white/95 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Set up how you&apos;ll handle student payments.
          </CardTitle>
          <CardDescription className="text-base">
            You&apos;re in control of how you get paid. You can update this anytime later in your settings.
          </CardDescription>
          <div className="pt-2">
            <p className="text-sm text-purple-600 font-medium">Step 4 of 4</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleFormSubmit} noValidate>
            {/* Option 1 - Use Sonata for Payments */}
            <form.Field
              name="paymentMethod"
              validators={validators.paymentMethod}
            >
              {(field) => (
                <>
                  <div
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all mb-6 ${
                      field.state.value === "sonata"
                        ? "border-purple-500 bg-purple-50/50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                    onClick={() => {
                      field.handleChange("sonata" as PaymentMethod);
                      field.handleBlur();
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          Use Sonata for Payments
                          <span className="text-xs font-normal px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                            Recommended
                          </span>
                        </h3>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          field.state.value === "sonata"
                            ? "border-purple-500 bg-purple-500"
                            : "border-gray-300"
                        }`}
                      >
                        {field.state.value === "sonata" && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      With Sonata, your students are charged automatically each month for their upcoming lessons, so you never have to chase payments or wonder if you&apos;ve been paid. Every lesson you teach is already covered, your income is consistent, and payments arrive securely through Stripe straight to your account.
                    </p>

                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Your students will pay you directly through Sonata.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">You&apos;ll receive automatic monthly payouts to your bank account.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Full control of your lesson pricing.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Secure Stripe integration.</span>
                      </li>
                    </ul>

                    {field.state.value === "sonata" && (
                      <div className="space-y-4 pt-4 border-t border-gray-200">
                        <div className="grid gap-4 md:grid-cols-2">
                          <form.Field
                            name="lessonRate"
                            validators={validators.lessonRate}
                          >
                            {(rateField) => (
                              <div className="space-y-2">
                                <Label htmlFor="lessonRate">Standard Lesson Rate</Label>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                  <Input
                                    id="lessonRate"
                                    type="number"
                                    placeholder="80"
                                    className="pl-7"
                                    value={rateField.state.value}
                                    onChange={(e) => {
                                      rateField.handleChange(e.target.value);
                                      setTimeout(() => rateField.handleBlur(), 0);
                                    }}
                                    onBlur={rateField.handleBlur}
                                  />
                                </div>
                                {rateField.state.meta.errors.length > 0 && (
                                  <p className="text-sm text-destructive">
                                    {rateField.state.meta.errors[0]}
                                  </p>
                                )}
                              </div>
                            )}
                          </form.Field>

                          <form.Field
                            name="lessonDuration"
                            validators={validators.lessonDuration}
                          >
                            {(durationField) => (
                              <div className="space-y-2">
                                <Label htmlFor="lessonDuration">Lesson Duration</Label>
                                <Select
                                  value={durationField.state.value || ""}
                                  onValueChange={(value) => {
                                    durationField.handleChange(value as LessonDuration);
                                    setTimeout(() => durationField.handleBlur(), 0);
                                  }}
                                >
                                  <SelectTrigger id="lessonDuration">
                                    <SelectValue placeholder="Select duration" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="30">30 min</SelectItem>
                                    <SelectItem value="45">45 min</SelectItem>
                                    <SelectItem value="60">60 min</SelectItem>
                                  </SelectContent>
                                </Select>
                                {durationField.state.meta.errors.length > 0 && (
                                  <p className="text-sm text-destructive">
                                    {durationField.state.meta.errors[0]}
                                  </p>
                                )}
                              </div>
                            )}
                          </form.Field>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            This will be your default rate. You can create different prices and lesson lengths for individual students later from your dashboard.
                          </p>
                          <p className="text-xs text-gray-500">
                            Students are charged monthly upfront for 4 lessons.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Option 2 - Handle Payments on My Own */}
                  <div
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all mb-6 ${
                      field.state.value === "own"
                        ? "border-purple-500 bg-purple-50/50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                    onClick={() => {
                      field.handleChange("own" as PaymentMethod);
                      field.handleBlur();
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Handle Payments on My Own
                        </h3>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          field.state.value === "own"
                            ? "border-purple-500 bg-purple-500"
                            : "border-gray-300"
                        }`}
                      >
                        {field.state.value === "own" && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>

                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Keep using your current payment methods (cash, Venmo, Zelle, etc.).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">You can switch to Sonata payments anytime.</span>
                      </li>
                    </ul>
                  </div>

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive mb-4">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </>
              )}
            </form.Field>

            {/* Navigation Controls */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1 cursor-pointer hover:bg-[#BE5EED] hover:text-white"
                disabled={isPending}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isPending || !paymentMethod}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-white"
              >
                {isPending ? "Saving..." : "Complete Setup"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

