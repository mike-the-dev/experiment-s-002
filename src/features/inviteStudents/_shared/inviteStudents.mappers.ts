import { TeacherInviteInfoDTO, TeacherInviteInfo } from "./inviteStudents.schema";

/**
 * Maps API response to teacher invite info
 * @param data - API response data
 * @returns Mapped teacher invite info
 */
export const mapTeacherInviteInfo = (
  data: TeacherInviteInfoDTO
): TeacherInviteInfo => {
  return {
    teacherCode: data.teacherCode,
    inviteLink: data.inviteLink,
  };
};

