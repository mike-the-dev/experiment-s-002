"use client";

import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Conversation, User } from "@/types/messaging";
import { MessageSquare, Search } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ConversationsListProps {
  conversations: Conversation[];
  users: User[];
  currentUserId: string;
  selectedConversationId?: string;
  onSelectConversation: (conversationId: string) => void;
}

export function ConversationsList({
  conversations,
  users,
  currentUserId,
  selectedConversationId,
  onSelectConversation,
}: ConversationsListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const getOtherUser = (conversation: Conversation): User | undefined => {
    const otherUserId =
      conversation.teacherId === currentUserId
        ? conversation.studentId
        : conversation.teacherId;
    return users.find((user) => user.id === otherUserId);
  };

  const filteredConversations = conversations.filter((conversation) => {
    const otherUser = getOtherUser(conversation);
    if (!otherUser) return false;
    return otherUser.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const sortedConversations = [...filteredConversations].sort(
    (a, b) =>
      new Date(b.lastMessageAt).getTime() -
      new Date(a.lastMessageAt).getTime(),
  );

  if (conversations.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        <MessageSquare className="h-12 w-12 text-muted-foreground mb-3" />
        <h3 className="font-medium text-lg mb-1">No conversations yet</h3>
        <p className="text-sm text-muted-foreground">
          Start a conversation with one of your connected students
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col chat-container-white">
      <div className="p-4 border-b chat-container-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 chat-container-white">
        <div className="divide-y">
          {sortedConversations.map((conversation) => {
            const otherUser = getOtherUser(conversation);
            if (!otherUser) return null;

            const initials = otherUser.name
              .split(" ")
              .map((name) => name[0])
              .join("")
              .toUpperCase();

            const isSelected = selectedConversationId === conversation.id;
            const hasUnread = conversation.unreadCount > 0;

            return (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={cn(
                  "w-full p-4 flex gap-3 transition-colors text-left conversation-item",
                  isSelected && "conversation-selected",
                )}
              >
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarFallback className="avatar-bg-color">{initials}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3
                      className={cn(
                        "font-medium truncate",
                        hasUnread && "font-semibold",
                      )}
                    >
                      {otherUser.name}
                    </h3>
                    <span className="text-xs text-muted-foreground flex-shrink-0 conversation-text-white">
                      {formatDistanceToNow(
                        new Date(conversation.lastMessageAt),
                        {
                          addSuffix: false,
                        },
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        "text-sm truncate conversation-text-white conversation-message-preview",
                        hasUnread
                          ? "text-foreground font-medium"
                          : "text-muted-foreground",
                      )}
                    >
                      {conversation.lastMessageText}
                    </p>
                    {hasUnread && (
                      <Badge
                        variant="default"
                        className="flex-shrink-0 h-5 min-w-[20px] px-1.5 flex items-center justify-center"
                      >
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>

                  {otherUser.instrument && (
                    <p className="text-xs text-muted-foreground mt-1 conversation-text-white">
                      {otherUser.instrument}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

