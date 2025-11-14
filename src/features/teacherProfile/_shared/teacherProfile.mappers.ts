import {
  TeachingProfileFormData,
  CreateTeachingProfileInput,
  LessonFormat,
  ExperienceLevel,
} from "./teacherProfile.schema";

/**
 * Transforms form data for API submission
 * @param data - Raw form data
 * @returns Sanitized payload with teaching profile data
 */
export const mapTeachingProfileFormData = (
  data: TeachingProfileFormData
): CreateTeachingProfileInput => {
  return {
    instruments: data.instruments,
    lessonFormat: data.lessonFormat as LessonFormat,
    experience: data.experience as ExperienceLevel,
    location: data.location.trim(),
    bio: data.bio.trim() || undefined,
    profilePicture: data.profilePicture || undefined,
  };
};

