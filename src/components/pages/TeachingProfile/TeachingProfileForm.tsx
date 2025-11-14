"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { useTeachingProfileForm } from "@/features/teacherProfile/teachingProfile/useTeachingProfileForm";
import { LessonFormat, ExperienceLevel } from "@/features/teacherProfile/_shared/teacherProfile.schema";
import { InstrumentSelector } from "@/components/ui/instrument-selector";
import { getFilenameFromUrl } from "@/lib/utils";

interface TeachingProfileFormProps {
  accountType?: string;
}

export function TeachingProfileForm({ accountType = "teacher" }: TeachingProfileFormProps) {
  const {
    form,
    isPending,
    validators,
    handleFormSubmit,
    handleBack,
    availableInstruments,
    profileImageUrl,
  } = useTeachingProfileForm({ accountType });

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 py-12">
      {/* Background styling matching signup page */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      <Card className="w-full max-w-3xl relative backdrop-blur-sm bg-white/95 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Set up your teaching profile.
          </CardTitle>
          <CardDescription className="text-base">
            We&apos;ll use this information to personalize your Sonata dashboard and help you stay organized. You can edit any of these details later.
          </CardDescription>
          <div className="pt-2">
            <p className="text-sm text-purple-600 font-medium">Step 3 of 4</p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleFormSubmit} noValidate className="space-y-8">
            {/* Section 1 - Teaching Basics */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Teaching Basics</h3>
              
              {/* Instruments Field */}
              <form.Field
                name="instruments"
                validators={validators.instruments}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="instruments">Primary Instrument(s)</Label>
                    <InstrumentSelector
                      field={field}
                      availableInstruments={availableInstruments}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Lesson Format Field */}
              <form.Field
                name="lessonFormat"
                validators={validators.lessonFormat}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label>Lesson Format</Label>
                    <RadioGroup
                      value={field.state.value || ""}
                      onValueChange={(value) => {
                        field.handleChange(value as LessonFormat);
                        // Trigger blur after value change
                        setTimeout(() => field.handleBlur(), 0);
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in-person" id="in-person" />
                        <Label htmlFor="in-person" className="font-normal cursor-pointer">In-Person</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="online" id="online" />
                        <Label htmlFor="online" className="font-normal cursor-pointer">Online</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both" className="font-normal cursor-pointer">Both</Label>
                      </div>
                    </RadioGroup>
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Experience and Location Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <form.Field
                  name="experience"
                  validators={validators.experience}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Select
                        value={field.state.value || ""}
                        onValueChange={(value) => {
                          field.handleChange(value as "" | ExperienceLevel);
                          // Trigger blur after value change
                          setTimeout(() => field.handleBlur(), 0);
                        }}
                      >
                        <SelectTrigger id="experience">
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-2">0-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-sm text-destructive">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name="location"
                  validators={validators.location}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="location">City / ZIP Code</Label>
                      <Input
                        id="location"
                        name={field.name}
                        placeholder="e.g., New York, NY or 10001"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        required
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-sm text-destructive">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>
            </div>

            {/* Section 2 - Teaching Bio */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Teaching Bio / Style</h3>
              
              <form.Field
                name="bio"
                validators={validators.bio}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="bio">
                      Tell us about your teaching approach <span className="text-gray-400">(optional)</span>
                    </Label>
                    <Textarea
                      id="bio"
                      name={field.name}
                      placeholder="Tell us a bit about your approach to teaching..."
                      className="min-h-[120px]"
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
                name="profilePicture"
                validators={validators.profilePicture}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="profilePicture">
                      Profile Picture or Logo <span className="text-gray-400">(optional)</span>
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                      <input
                        type="file"
                        id="profilePicture"
                        name={field.name}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          field.handleChange(file);
                          field.handleBlur();
                        }}
                      />
                      <label htmlFor="profilePicture" className="cursor-pointer flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          {field.state.value?.name || (profileImageUrl && profileImageUrl.trim() ? getFilenameFromUrl(profileImageUrl) : "Click to upload or drag and drop")}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                      </label>
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

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
                disabled={isPending}
                className="flex-1 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Saving..." : "Continue → Payment Setup"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};