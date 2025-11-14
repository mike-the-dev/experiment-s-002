"use client";

import React from "react";
import { formOptions, useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useCreateTeachingProfile } from "../create/useCreateTeachingProfile";
import { useFetchTeachingProfile } from "../teacherProfile.service";
import {
  TeachingProfileFormData,
  TeachingProfileFormValidators,
  UseTeachingProfileFormReturn,
  LessonFormat,
  ExperienceLevel,
} from "../_shared/teacherProfile.schema";
import {
  teachingProfileFormSchema,
  validateInstruments,
  validateLessonFormat,
  validateExperience,
  validateLocation,
  validateBio,
  validateProfilePicture,
} from "../_shared/teacherProfile.validators";
import { useToast } from "@/hooks/use-toast";
import { useUpdateOnboardingStatus } from "@/features/accountProfile/update/useUpdateOnboardingStatus";
import { OnboardingState } from "@/types/onboarding";

interface UseTeachingProfileFormProps {
  accountType?: string;
}

const availableInstruments = [
  "Piano",
  "Guitar",
  "Violin",
  "Voice",
  "Drums",
  "Flute",
  "Saxophone",
  "Cello",
  "Trumpet",
  "Other",
];

export const useTeachingProfileForm = ({
  accountType = "teacher",
}: UseTeachingProfileFormProps): UseTeachingProfileFormReturn => {
  const router = useRouter();
  const { toast } = useToast();
  const { isPending, error, createTeachingProfile } = useCreateTeachingProfile();
  const { data: teachingProfile } = useFetchTeachingProfile();
  const {
    isPending: isUpdatingOnboardingStatus,
    updateOnboardingStatus,
  } = useUpdateOnboardingStatus();

  // Map teaching profile data to form default values
  const initialValues: TeachingProfileFormData = React.useMemo(() => {
    return {
      instruments: teachingProfile?.instruments || [],
      lessonFormat: (teachingProfile?.lessonFormat as LessonFormat | "") || "",
      experience: (teachingProfile?.experience as ExperienceLevel | "") || "",
      location: teachingProfile?.location || "",
      bio: teachingProfile?.bio || "",
      profilePicture: null, // Can't set File from URL, so leave as null
    };
  }, [teachingProfile]);

  const formOpts = formOptions<TeachingProfileFormData>({
    defaultValues: initialValues,
  });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      try {
        const validatedData = teachingProfileFormSchema.parse({
          instruments: value.instruments,
          lessonFormat: value.lessonFormat || undefined,
          experience: value.experience || undefined,
          location: value.location,
          bio: value.bio || undefined,
          profilePicture: value.profilePicture || undefined,
        });
        
        const payload = {
          instruments: validatedData.instruments,
          lessonFormat: validatedData.lessonFormat as LessonFormat,
          experience: validatedData.experience as ExperienceLevel,
          location: validatedData.location.trim(),
          bio: validatedData.bio?.trim() || undefined,
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));
        
        if (validatedData.profilePicture) formData.append("profilePicture", validatedData.profilePicture);

        const response = await createTeachingProfile(formData);

        if (response) {
          toast({
            title: "Teaching profile saved!",
            description: "Your teaching profile has been saved successfully.",
          });

          // Navigate to the next step in onboarding
          router.push(`/signup/teacher/pricing-setup?type=${accountType}`);
        }
      } catch (error) {
        console.error("Teaching profile form submission error:", error);
      }
    },
  });

  // Update form values when teaching profile data is loaded
  React.useEffect(() => {
    if (teachingProfile) {
      form.setFieldValue("instruments", teachingProfile.instruments);
      form.setFieldValue("lessonFormat", teachingProfile.lessonFormat as LessonFormat | "");
      form.setFieldValue("experience", teachingProfile.experience as ExperienceLevel | "");
      form.setFieldValue("location", teachingProfile.location);
      form.setFieldValue("bio", teachingProfile.bio || "");
      // Note: profilePictureUrl is a URL, not a File, so we can't set it as a File
      // The user would need to re-upload if they want to change it
    }
  }, [teachingProfile, form]);

  const validators: TeachingProfileFormValidators = {
    instruments: {
      onChange: ({ value }) => validateInstruments(value),
    },
    lessonFormat: {
      onChange: ({ value }) => {
        if (!value) return "Please select a lesson format.";
        return validateLessonFormat(value);
      },
    },
    experience: {
      onChange: ({ value }) => {
        if (!value) return "Please select your years of experience.";
        return validateExperience(value);
      },
    },
    location: {
      onChange: ({ value }) => validateLocation(value),
    },
    bio: {
      onChange: ({ value }) => validateBio(value),
    },
    profilePicture: {
      onChange: ({ value }) => validateProfilePicture(value),
    },
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const handleBack = async (): Promise<void> => {
    try {
      // Update onboarding state to the previous step (account_type)
      const response = await updateOnboardingStatus({
        onboardingState: OnboardingState.ACCOUNT_TYPE,
      });

      if (response) router.push("/signup/teacher/account-type");
    } catch (error) {
      console.error("Failed to update onboarding status:", error);
    }
  };

  const errorMessage = error ? (typeof error === "string" ? error : (error as Error)?.message || "An error occurred") : null;

  // Handle both profilePictureUrl (DTO) and profileImageUrl (API response) field names
  const profileImageUrl = teachingProfile?.profilePictureUrl || (teachingProfile as any)?.profileImageUrl;

  // Combine pending states from both mutations
  const isPendingState = isPending || isUpdatingOnboardingStatus;

  return {
    form,
    isPending: isPendingState,
    error: errorMessage,
    validators,
    handleFormSubmit,
    handleBack,
    availableInstruments,
    profileImageUrl,
  };
};
