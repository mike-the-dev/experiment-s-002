export type MessageType = "text" | "image" | "file" | "system";
export type UserRole = "teacher" | "student";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  instrument?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  type: MessageType;
  content: string;
  url?: string;
  fileName?: string;
  fileSize?: string;
  createdAt: string;
  readAt?: string;
}

export interface Conversation {
  id: string;
  teacherId: string;
  studentId: string;
  lastMessageAt: string;
  lastMessageText: string;
  unreadCount: number;
}

export interface Report {
  id: string;
  reporterId: string;
  targetUserId: string;
  conversationId: string;
  reason: string;
  createdAt: string;
}

export interface Flag {
  id: string;
  messageId: string;
  reporterId: string;
  reason: string;
  createdAt: string;
}

export interface Block {
  conversationId: string;
  blockedByUserId: string;
  active: boolean;
}

export interface Attachment {
  id: string;
  type: "image" | "file";
  name: string;
  size: string;
  preview?: string;
  file?: File;
}

