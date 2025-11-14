import { cookies } from "next/headers";
import { fetchTeacherInviteInfoServer } from "../inviteStudents.service";
import { TeacherInviteInfoDTO } from "../_shared/inviteStudents.schema";

/**
 * Server-side function to get teacher invite information
 * This should be used in Next.js server components
 * 
 * @returns Promise resolving to the teacher invite info object or null if fetch fails
 */
export const getTeacherInviteInfo = async (): Promise<TeacherInviteInfoDTO | null> => {
  const cookieStore = await cookies();
  return fetchTeacherInviteInfoServer(cookieStore);
};

