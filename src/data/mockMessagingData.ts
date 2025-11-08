import type { Conversation, Message, User } from "@/types/messaging";

export const mockUsers: User[] = [
  {
    id: "teacher-1",
    name: "Sarah Johnson",
    role: "teacher",
    avatar: undefined,
  },
  {
    id: "student-1",
    name: "Emma Wilson",
    role: "student",
    instrument: "Piano",
  },
  {
    id: "student-2",
    name: "Lucas Martinez",
    role: "student",
    instrument: "Guitar",
  },
  {
    id: "student-3",
    name: "Sophia Chen",
    role: "student",
    instrument: "Violin",
  },
  {
    id: "student-4",
    name: "Oliver Brown",
    role: "student",
    instrument: "Drums",
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    teacherId: "teacher-1",
    studentId: "student-1",
    lastMessageAt: new Date().toISOString(),
    lastMessageText: "That sounds great! I'll practice this week.",
    unreadCount: 2,
  },
  {
    id: "conv-2",
    teacherId: "teacher-1",
    studentId: "student-2",
    lastMessageAt: new Date(Date.now() - 3_600_000).toISOString(),
    lastMessageText: "Can we reschedule tomorrow's lesson?",
    unreadCount: 0,
  },
  {
    id: "conv-3",
    teacherId: "teacher-1",
    studentId: "student-3",
    lastMessageAt: new Date(Date.now() - 86_400_000).toISOString(),
    lastMessageText: "Thank you for the feedback!",
    unreadCount: 1,
  },
  {
    id: "conv-4",
    teacherId: "teacher-1",
    studentId: "student-4",
    lastMessageAt: new Date(Date.now() - 172_800_000).toISOString(),
    lastMessageText: "See you next week!",
    unreadCount: 0,
  },
];

export const mockMessages: Record<string, Message[]> = {
  "conv-1": [
    {
      id: "msg-1",
      conversationId: "conv-1",
      senderId: "student-1",
      type: "text",
      content: "Hi! I have a question about the piece we practiced yesterday.",
      createdAt: new Date(Date.now() - 7_200_000).toISOString(),
      readAt: new Date(Date.now() - 7_100_000).toISOString(),
    },
    {
      id: "msg-2",
      conversationId: "conv-1",
      senderId: "teacher-1",
      type: "text",
      content: "Of course! What's your question?",
      createdAt: new Date(Date.now() - 7_000_000).toISOString(),
      readAt: new Date(Date.now() - 6_900_000).toISOString(),
    },
    {
      id: "msg-3",
      conversationId: "conv-1",
      senderId: "student-1",
      type: "text",
      content:
        "I'm struggling with the tempo in measure 16. Should I slow down or keep pushing through?",
      createdAt: new Date(Date.now() - 6_800_000).toISOString(),
      readAt: new Date(Date.now() - 6_700_000).toISOString(),
    },
    {
      id: "msg-4",
      conversationId: "conv-1",
      senderId: "teacher-1",
      type: "text",
      content:
        "Great question! I'd recommend slowing down and focusing on accuracy first. Speed will come naturally with practice.",
      createdAt: new Date(Date.now() - 6_600_000).toISOString(),
      readAt: new Date(Date.now() - 6_500_000).toISOString(),
    },
    {
      id: "msg-5",
      conversationId: "conv-1",
      senderId: "student-1",
      type: "text",
      content: "That sounds great! I'll practice this week.",
      createdAt: new Date().toISOString(),
    },
  ],
  "conv-2": [
    {
      id: "msg-6",
      conversationId: "conv-2",
      senderId: "student-2",
      type: "text",
      content: "Hi Sarah! Can we reschedule tomorrow's lesson?",
      createdAt: new Date(Date.now() - 3_600_000).toISOString(),
      readAt: new Date(Date.now() - 3_500_000).toISOString(),
    },
    {
      id: "msg-7",
      conversationId: "conv-2",
      senderId: "teacher-1",
      type: "text",
      content: "Of course! What times work better for you?",
      createdAt: new Date(Date.now() - 3_400_000).toISOString(),
      readAt: new Date(Date.now() - 3_300_000).toISOString(),
    },
    {
      id: "msg-8",
      conversationId: "conv-2",
      senderId: "student-2",
      type: "text",
      content: "Would Thursday afternoon work?",
      createdAt: new Date(Date.now() - 3_200_000).toISOString(),
      readAt: new Date(Date.now() - 3_100_000).toISOString(),
    },
  ],
  "conv-3": [
    {
      id: "msg-9",
      conversationId: "conv-3",
      senderId: "teacher-1",
      type: "text",
      content:
        "Great work on your performance last week! Your bow technique has really improved.",
      createdAt: new Date(Date.now() - 86_400_000).toISOString(),
      readAt: new Date(Date.now() - 86_300_000).toISOString(),
    },
    {
      id: "msg-10",
      conversationId: "conv-3",
      senderId: "student-3",
      type: "text",
      content: "Thank you for the feedback!",
      createdAt: new Date(Date.now() - 86_200_000).toISOString(),
    },
  ],
  "conv-4": [
    {
      id: "msg-11",
      conversationId: "conv-4",
      senderId: "teacher-1",
      type: "text",
      content: "Don't forget to practice your rudiments this week!",
      createdAt: new Date(Date.now() - 172_800_000).toISOString(),
      readAt: new Date(Date.now() - 172_700_000).toISOString(),
    },
    {
      id: "msg-12",
      conversationId: "conv-4",
      senderId: "student-4",
      type: "text",
      content: "Will do! See you next week!",
      createdAt: new Date(Date.now() - 172_600_000).toISOString(),
      readAt: new Date(Date.now() - 172_500_000).toISOString(),
    },
  ],
};

export const currentUserId = "teacher-1";

