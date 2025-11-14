"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import type { Attachment, Message, User } from "@/types/messaging";
import {
  AlertTriangle,
  Flag,
  MessageSquare,
  MoreVertical,
} from "lucide-react";
import { format, isSameDay, isToday, isYesterday } from "date-fns";

import { BlockUserDialog } from "./BlockUserDialog";
import { FlagMessageDialog } from "./FlagMessageDialog";
import { MessageBubble } from "./MessageBubble";
import { MessageComposer } from "./MessageComposer";
import { ReportUserDialog } from "./ReportUserDialog";

interface ChatThreadProps {
  messages: Message[];
  currentUser: User;
  otherUser: User;
  onSendMessage: (text: string, attachments: Attachment[]) => void;
  isBlocked?: boolean;
  onBlockUser: () => void;
  onUnblockUser: () => void;
  onReportUser: (reason: string) => void;
  onFlagMessage: (messageId: string, reason: string) => void;
}

export function ChatThread({
  messages,
  currentUser,
  otherUser,
  onSendMessage,
  isBlocked = false,
  onBlockUser,
  onUnblockUser,
  onReportUser,
  onFlagMessage,
}: ChatThreadProps) {
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [flagDialogOpen, setFlagDialogOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  const initials = otherUser.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleBlockConfirm = () => {
    onBlockUser();
    setBlockDialogOpen(false);
    toast({
      title: "User blocked",
      description: `You've blocked ${otherUser.name}. You can unblock them in Settings.`,
    });
  };

  const handleReportSubmit = (reason: string) => {
    onReportUser(reason);
    toast({
      title: "Report submitted",
      description: "Thanks — we'll review this.",
    });
  };

  const handleFlagMessage = (messageId: string) => {
    setSelectedMessageId(messageId);
    setFlagDialogOpen(true);
  };

  const handleFlagSubmit = (reason: string) => {
    onFlagMessage(selectedMessageId, reason);
    toast({
      title: "Message flagged",
      description: "Thanks — we'll review this.",
    });
  };

  const groupedMessages: Array<{ date: Date; messages: Message[] }> = [];
  messages.forEach((message) => {
    const messageDate = new Date(message.createdAt);
    const lastGroup = groupedMessages[groupedMessages.length - 1];

    if (lastGroup && isSameDay(lastGroup.date, messageDate)) {
      lastGroup.messages.push(message);
    } else {
      groupedMessages.push({ date: messageDate, messages: [message] });
    }
  });

  const formatDayDivider = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "MMMM d, yyyy");
  };

  if (messages.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        <MessageSquare className="h-12 w-12 text-muted-foreground mb-3" />
        <h3 className="font-medium text-lg mb-1">
          Say hi to get the conversation started
        </h3>
        <p className="text-sm text-muted-foreground">
          Send a message to {otherUser.name}
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col chat-container-white">
      <div className="border-b chat-container-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="avatar-bg-color">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <Link href={`/students/${otherUser.id}`} className="hover:underline">
              <h2 className="font-semibold">{otherUser.name}</h2>
            </Link>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs role-badge-bg">
                {otherUser.role === "student" ? "Student" : "Teacher"}
              </Badge>
              {otherUser.instrument && (
                <span className="text-xs text-muted-foreground">
                  {otherUser.instrument}
                </span>
              )}
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-[#BE5EED] hover:text-white rounded-xl">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white z-50">
            {isBlocked ? (
              <DropdownMenuItem onClick={onUnblockUser} className="cursor-pointer hover:bg-[#BE5EED] hover:text-white focus:bg-[#BE5EED] focus:text-white">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Unblock user
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem onClick={() => setBlockDialogOpen(true)} className="cursor-pointer hover:bg-[#BE5EED] hover:text-white focus:bg-[#BE5EED] focus:text-white">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Block user
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReportDialogOpen(true)} className="cursor-pointer hover:bg-[#BE5EED] hover:text-white focus:bg-[#BE5EED] focus:text-white">
                  <Flag className="h-4 w-4 mr-2" />
                  Report user
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea className="flex-1 p-4 chat-container-white" ref={scrollRef}>
        {isBlocked && (
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You&apos;ve blocked this user.{" "}
            <button onClick={onUnblockUser} className="underline">
              Unblock
            </button>{" "}
            to continue messaging.
          </AlertDescription>
          </Alert>
        )}

        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex}>
            <div className="flex items-center justify-center my-6">
              <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                {formatDayDivider(group.date)}
              </div>
            </div>

            {group.messages.map((message) => {
              const sender =
                message.senderId === currentUser.id ? currentUser : otherUser;
              const isCurrentUser = message.senderId === currentUser.id;

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  sender={sender}
                  isCurrentUser={isCurrentUser}
                  onFlagMessage={handleFlagMessage}
                />
              );
            })}
          </div>
        ))}
      </ScrollArea>

      <MessageComposer onSendMessage={onSendMessage} disabled={isBlocked} />

      <BlockUserDialog
        open={blockDialogOpen}
        onOpenChange={setBlockDialogOpen}
        userName={otherUser.name}
        onConfirm={handleBlockConfirm}
      />

      <ReportUserDialog
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
        userName={otherUser.name}
        onSubmit={handleReportSubmit}
      />

      <FlagMessageDialog
        open={flagDialogOpen}
        onOpenChange={setFlagDialogOpen}
        onSubmit={handleFlagSubmit}
      />
    </div>
  );
}

