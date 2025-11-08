"use client";

import { useEffect, useState } from "react";

import { DashboardLayout } from "@/components/DashboardLayout";
import { ChatThread } from "@/components/messaging/ChatThread";
import { ConversationsList } from "@/components/messaging/ConversationsList";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  currentUserId,
  mockConversations,
  mockMessages,
  mockUsers,
} from "@/data/mockMessagingData";
import type { Attachment, Conversation, Message } from "@/types/messaging";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | undefined
  >();
  const [blockedConversations, setBlockedConversations] = useState<Set<string>>(
    new Set(),
  );
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setConversations(mockConversations);
      setMessages(mockMessages);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Stub for real-time updates
    }, 30_000);

    return () => clearInterval(interval);
  }, []);

  const currentUser = mockUsers.find((user) => user.id === currentUserId);
  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedConversationId,
  );
  const conversationMessages = selectedConversationId
    ? messages[selectedConversationId] ?? []
    : [];

  const otherUser = selectedConversation
    ? mockUsers.find(
        (user) =>
          user.id ===
          (selectedConversation.teacherId === currentUserId
            ? selectedConversation.studentId
            : selectedConversation.teacherId),
      )
    : undefined;

  const handleSendMessage = (text: string, attachments: Attachment[]) => {
    if (!selectedConversationId || !currentUser) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversationId,
      senderId: currentUser.id,
      type:
        attachments.length > 0
          ? attachments[0].type === "image"
            ? "image"
            : "file"
          : "text",
      content: text,
      url: attachments[0]?.preview,
      fileName: attachments[0]?.name,
      fileSize: attachments[0]?.size,
      createdAt: new Date().toISOString(),
    };

    setMessages((previous) => ({
      ...previous,
      [selectedConversationId]: [
        ...(previous[selectedConversationId] ?? []),
        newMessage,
      ],
    }));

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === selectedConversationId
          ? {
              ...conversation,
              lastMessageAt: newMessage.createdAt,
              lastMessageText: text || "Sent an attachment",
            }
          : conversation,
      ),
    );

    setTimeout(() => {
      const responseMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        conversationId: selectedConversationId,
        senderId: otherUser?.id ?? "",
        type: "text",
        content: "Thanks for your message! I'll get back to you soon.",
        createdAt: new Date().toISOString(),
      };

      setMessages((previous) => ({
        ...previous,
        [selectedConversationId]: [
          ...(previous[selectedConversationId] ?? []),
          responseMessage,
        ],
      }));

      setConversations((previous) =>
        previous.map((conversation) =>
          conversation.id === selectedConversationId
            ? {
                ...conversation,
                lastMessageAt: responseMessage.createdAt,
                lastMessageText: responseMessage.content,
                unreadCount: conversation.unreadCount + 1,
              }
            : conversation,
        ),
      );

      toast({
        title: `New message from ${otherUser?.name}`,
        description: responseMessage.content,
      });
    }, 2_000);
  };

  const handleBlockUser = () => {
    if (!selectedConversationId) return;
    setBlockedConversations((previous) => new Set(previous).add(selectedConversationId));

    const systemMessage: Message = {
      id: `msg-system-${Date.now()}`,
      conversationId: selectedConversationId,
      senderId: "system",
      type: "system",
      content: "You blocked this user.",
      createdAt: new Date().toISOString(),
    };

    setMessages((previous) => ({
      ...previous,
      [selectedConversationId]: [
        ...(previous[selectedConversationId] ?? []),
        systemMessage,
      ],
    }));
  };

  const handleUnblockUser = () => {
    if (!selectedConversationId) return;
    setBlockedConversations((previous) => {
      const next = new Set(previous);
      next.delete(selectedConversationId);
      return next;
    });

    const systemMessage: Message = {
      id: `msg-system-${Date.now()}`,
      conversationId: selectedConversationId,
      senderId: "system",
      type: "system",
      content: "You unblocked this user.",
      createdAt: new Date().toISOString(),
    };

    setMessages((previous) => ({
      ...previous,
      [selectedConversationId]: [
        ...(previous[selectedConversationId] ?? []),
        systemMessage,
      ],
    }));
  };

  const handleReportUser = (reason: string) => {
    console.log("Report user:", {
      otherUser,
      reason,
      conversationId: selectedConversationId,
    });
  };

  const handleFlagMessage = (messageId: string, reason: string) => {
    console.log("Flag message:", { messageId, reason });
  };

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, unreadCount: 0 }
          : conversation,
      ),
    );
  };

  if (loading) {
    return (
      <DashboardLayout shiftWithSidebar>
        <div className="h-full flex">
          <div className="w-80 border-r">
            <div className="p-4 space-y-4">
              <Skeleton className="h-10 w-full" />
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Skeleton className="h-96 w-96" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout shiftWithSidebar>
      <div className="h-[calc(100vh-8rem)] flex">
        <div className="w-80 border-r flex-shrink-0 bg-background">
          <ConversationsList
            conversations={conversations}
            users={mockUsers}
            currentUserId={currentUserId}
            selectedConversationId={selectedConversationId}
            onSelectConversation={handleSelectConversation}
          />
        </div>

        <div className="flex-1 bg-background">
          {selectedConversation && currentUser && otherUser ? (
            <ChatThread
              messages={conversationMessages}
              currentUser={currentUser}
              otherUser={otherUser}
              onSendMessage={handleSendMessage}
              isBlocked={blockedConversations.has(selectedConversationId!)}
              onBlockUser={handleBlockUser}
              onUnblockUser={handleUnblockUser}
              onReportUser={handleReportUser}
              onFlagMessage={handleFlagMessage}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

