import { z } from "zod";
import {
  TeachingProfileFormData,
  TeachingProfileFormErrors,
  LessonFormat,
  ExperienceLevel,
} from "./teacherProfile.schema";

/**
 * Lesson format enum schema for validation
 */
export const lessonFormatSchema = z.enum(["in-person", "online", "both"], {
  message: "Please select a lesson format.",
});

/**
 * Experience level enum schema for validation
 */
export const experienceLevelSchema = z.enum(["0-2", "3-5", "6-10", "10+"], {
  message: "Please select your years of experience.",
});

/**
 * Individual field schemas for real-time validation
 */
export const instrumentsFieldSchema = z
  .array(z.string())
  .min(1, "Please select at least one instrument.");

export const lessonFormatFieldSchema = lessonFormatSchema;

export const experienceFieldSchema = experienceLevelSchema;

export const locationFieldSchema = z
  .string()
  .min(1, "Location is required.")
  .max(200, "Location must be less than 200 characters.");

export const bioFieldSchema = z
  .string()
  .trim()
  .max(1000, "Bio must be less than 1000 characters.")
  .optional();

export const profilePictureFieldSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= 5 * 1024 * 1024,
    "Profile picture must be less than 5MB."
  )
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    "Profile picture must be a JPEG, PNG, or WebP image."
  )
  .optional()
  .nullable();

/**
 * Full form schema for submission validation
 */
export const teachingProfileFormSchema = z
  .object({
    instruments: instrumentsFieldSchema,
    lessonFormat: lessonFormatFieldSchema,
    experience: experienceFieldSchema,
    location: locationFieldSchema.trim(),
    bio: bioFieldSchema,
    profilePicture: profilePictureFieldSchema,
  })
  .refine(
    (data) => data.instruments.length > 0,
    {
      message: "Please select at least one instrument.",
      path: ["instruments"],
    }
  );

/**
 * Infer TypeScript type from Zod schema
 */
export type TeachingProfileFormDataZod = z.infer<typeof teachingProfileFormSchema>;

/**
 * Validates the instruments array using Zod
 * @param instruments - Instruments array to validate
 * @returns Error message or undefined if valid
 */
export const validateInstruments = (instruments: string[]): string | undefined => {
  const result = instrumentsFieldSchema.safeParse(instruments);
  if (!result.success) {
    return result.error.issues[0]?.message;
  }
  return undefined;
};

/**
 * Validates the lesson format using Zod
 * @param lessonFormat - Lesson format to validate
 * @returns Error message or undefined if valid
 */
export const validateLessonFormat = (lessonFormat: string): string | undefined => {
  const result = lessonFormatFieldSchema.safeParse(lessonFormat);
  if (!result.success) {
    return result.error.issues[0]?.message;
  }
  return undefined;
};

/**
 * Validates the experience level using Zod
 * @param experience - Experience level to validate
 * @returns Error message or undefined if valid
 */
export const validateExperience = (experience: string): string | undefined => {
  const result = experienceFieldSchema.safeParse(experience);
  if (!result.success) {
    return result.error.issues[0]?.message;
  }
  return undefined;
};

/**
 * Validates the location using Zod
 * @param location - Location to validate
 * @returns Error message or undefined if valid
 */
export const validateLocation = (location: string): string | undefined => {
  const result = locationFieldSchema.safeParse(location);
  if (!result.success) {
    return result.error.issues[0]?.message;
  }
  return undefined;
};

/**
 * Validates the bio using Zod
 * @param bio - Bio to validate
 * @returns Error message or undefined if valid
 */
export const validateBio = (bio: string): string | undefined => {
  if (!bio || bio.trim().length === 0) {
    return undefined; // Bio is optional
  }
  const result = bioFieldSchema.safeParse(bio);
  if (!result.success) {
    return result.error.issues[0]?.message;
  }
  return undefined;
};

/**
 * Validates the profile picture using Zod
 * @param profilePicture - Profile picture file to validate
 * @returns Error message or undefined if valid
 */
export const validateProfilePicture = (profilePicture: File | null): string | undefined => {
  if (!profilePicture) {
    return undefined; // Profile picture is optional
  }
  const result = profilePictureFieldSchema.safeParse(profilePicture);
  if (!result.success) {
    return result.error.issues[0]?.message;
  }
  return undefined;
};

/**
 * Validates all form fields using Zod schema
 * @param data - Form data to validate
 * @returns Object containing validation errors
 */
export const validateTeachingProfileForm = (
  data: TeachingProfileFormData
): TeachingProfileFormErrors => {
  const errors: TeachingProfileFormErrors = {};

  // Convert form data to a format that matches the schema
  const schemaData = {
    instruments: data.instruments,
    lessonFormat: data.lessonFormat || undefined,
    experience: data.experience || undefined,
    location: data.location,
    bio: data.bio || undefined,
    profilePicture: data.profilePicture || undefined,
  };

  const result = teachingProfileFormSchema.safeParse(schemaData);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      if (field && typeof field === "string") {
        errors[field] = issue.message;
      }
    });
  }

  return errors;
};

/**
 * Validates and parses form data using Zod
 * Returns the parsed data if valid, throws if invalid
 * @param data - Form data to validate and parse
 * @returns Parsed and validated form data
 */
export const parseTeachingProfileForm = (data: unknown): TeachingProfileFormData => {
  const parsed = teachingProfileFormSchema.parse(data);
  return {
    instruments: parsed.instruments,
    lessonFormat: parsed.lessonFormat as LessonFormat | "",
    experience: parsed.experience as ExperienceLevel | "",
    location: parsed.location,
    bio: parsed.bio || "",
    profilePicture: parsed.profilePicture || null,
  };
};

/**
 * Safely validates and parses form data using Zod
 * Returns success/error result instead of throwing
 * @param data - Form data to validate and parse
 * @returns Success result with parsed data or error result
 */
export const safeParseTeachingProfileForm = (data: unknown) => {
  return teachingProfileFormSchema.safeParse(data);
};

