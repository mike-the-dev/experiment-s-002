/**
 * Student connection status
 */
export type StudentStatus = "pending" | "connected";

/**
 * Pending student invitation
 */
export interface PendingStudent {
  id: number;
  name: string;
  status: StudentStatus;
}

/**
 * Connected student
 */
export interface ConnectedStudent {
  id: number;
  name: string;
  status: StudentStatus;
}

/**
 * Teacher invite information
 */
export interface TeacherInviteInfo {
  teacherCode: string;
  inviteLink: string;
}

/**
 * Response from API for teacher invite info
 */
export interface TeacherInviteInfoDTO {
  teacherCode: string;
  inviteLink: string;
}

/**
 * Input for completing onboarding
 */
export interface CompleteOnboardingInput {
  onboardingState: "completed";
}

/**
 * Response from API after completing onboarding
 */
export interface CompleteOnboardingDTO {
  version: number;
  updatedAt: string;
  createdAt: string;
  slug: string;
  onboardingState: "completed";
}

/**
 * Input for resending student invitation
 */
export interface ResendInviteInput {
  studentId: number;
}

/**
 * Response from API after resending invitation
 */
export interface ResendInviteDTO {
  success: boolean;
  message: string;
}

/**
 * Return type for useInviteStudentsForm hook
 */
export interface UseInviteStudentsFormReturn {
  teacherCode: string;
  inviteLink: string;
  pendingStudents: PendingStudent[];
  connectedStudents: ConnectedStudent[];
  isPending: boolean;
  error: string | null;
  handleCopy: (text: string, type: string) => void;
  handleResend: (studentId: number) => Promise<void>;
  handleContinue: () => Promise<void>;
  showQR: boolean;
  setShowQR: (show: boolean) => void;
}

