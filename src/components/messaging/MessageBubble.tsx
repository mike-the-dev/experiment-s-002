"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Message, User } from "@/types/messaging";
import { Download, Flag, MoreVertical } from "lucide-react";
import { format } from "date-fns";

interface MessageBubbleProps {
  message: Message;
  sender: User;
  isCurrentUser: boolean;
  onFlagMessage: (messageId: string) => void;
}

export function MessageBubble({
  message,
  sender,
  isCurrentUser,
  onFlagMessage,
}: MessageBubbleProps) {
  const initials = sender.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  if (message.type === "system") {
    return (
      <div className="flex justify-center my-4">
        <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("flex gap-3 mb-4", isCurrentUser && "flex-row-reverse")}
    >
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>

      <div
        className={cn("flex flex-col max-w-[70%]", isCurrentUser && "items-end")}
      >
        <div className="flex items-center gap-2 mb-1">
          {!isCurrentUser && (
            <span className="text-xs font-medium text-muted-foreground">
              {sender.name}
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            {format(new Date(message.createdAt), "h:mm a")}
          </span>
        </div>

        <div
          className={cn(
            "rounded-2xl px-4 py-2 relative group",
            isCurrentUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted",
          )}
        >
          {message.type === "text" && (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          )}

          {message.type === "image" && (
            <div className="space-y-2">
              <img
                src={message.url}
                alt="Shared image"
                className="rounded-lg max-w-full h-auto"
              />
              {message.content && <p className="text-sm">{message.content}</p>}
            </div>
          )}

          {message.type === "file" && (
            <div className="flex items-center gap-3 min-w-[200px]">
              <div className="flex-1">
                <p className="text-sm font-medium">{message.fileName}</p>
                <p className="text-xs opacity-70">{message.fileSize}</p>
              </div>
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          )}

          {!isCurrentUser && (
            <div className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover z-50">
                  <DropdownMenuItem onClick={() => onFlagMessage(message.id)}>
                    <Flag className="h-4 w-4 mr-2" />
                    Flag message
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

