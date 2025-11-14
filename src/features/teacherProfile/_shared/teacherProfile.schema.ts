import { useForm } from "@tanstack/react-form";

/**
 * Lesson format options for teaching profile
 */
export type LessonFormat = "in-person" | "online" | "both";

/**
 * Experience level options
 */
export type ExperienceLevel = "0-2" | "3-5" | "6-10" | "10+";

/**
 * Payload sent to the API to create/update teaching profile
 */
export interface CreateTeachingProfileInput {
  instruments: string[];
  lessonFormat: LessonFormat;
  experience: ExperienceLevel;
  location: string;
  bio?: string;
  profilePicture?: File | null;
}

/**
 * Response from the API after creating/updating teaching profile
 */
export interface CreateTeachingProfileDTO {
  version: number;
  updatedAt: string;
  createdAt: string;
  slug: string;
  type: "teaching_profile";
  instruments: string[];
  lessonFormat: LessonFormat;
  experience: ExperienceLevel;
  location: string;
  bio?: string;
  profilePictureUrl?: string;
}

/**
 * Form data structure for teaching profile
 */
export interface TeachingProfileFormData {
  instruments: string[];
  lessonFormat: LessonFormat | "";
  experience: ExperienceLevel | "";
  location: string;
  bio: string;
  profilePicture: File | null;
}

/**
 * Error state for teaching profile form validation
 */
export type TeachingProfileFormErrors = {
  instruments?: string;
  lessonFormat?: string;
  experience?: string;
  location?: string;
  bio?: string;
  profilePicture?: string;
  [key: string]: string | undefined;
};

/**
 * Field validator type for TanStack Form
 */
export type FieldValidator<T> = {
  onChange: ({ value }: { value: T }) => string | undefined;
};

/**
 * Validators for teaching profile form fields
 */
export type TeachingProfileFormValidators = {
  instruments: FieldValidator<string[]>;
  lessonFormat: FieldValidator<string>;
  experience: FieldValidator<string>;
  location: FieldValidator<string>;
  bio: FieldValidator<string>;
  profilePicture: FieldValidator<File | null>;
};

/**
 * Return type for useTeachingProfileForm hook
 */
export interface UseTeachingProfileFormReturn {
  form: ReturnType<typeof useForm<TeachingProfileFormData>>;
  isPending: boolean;
  error: string | null;
  validators: TeachingProfileFormValidators;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleBack: () => void;
  availableInstruments: string[];
  profileImageUrl?: string;
}

