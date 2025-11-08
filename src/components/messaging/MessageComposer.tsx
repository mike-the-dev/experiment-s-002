"use client";

import { useState, useRef, type ChangeEvent, type KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Attachment } from "@/types/messaging";
import { FileText, Paperclip, Send, X } from "lucide-react";

import { SmartReplies } from "./SmartReplies";

interface MessageComposerProps {
  onSendMessage: (text: string, attachments: Attachment[]) => void;
  disabled?: boolean;
}

export function MessageComposer({
  onSendMessage,
  disabled,
}: MessageComposerProps) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSend = () => {
    if ((!message.trim() && attachments.length === 0) || disabled) return;

    const canSend = true;

    if (!canSend) {
      toast({
        title: "Slow down",
        description: "Please wait a moment before sending another message.",
        variant: "destructive",
      });
      return;
    }

    onSendMessage(message, attachments);
    setMessage("");
    setAttachments([]);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "application/pdf",
      "audio/mpeg",
      "video/mp4",
    ];

    const newAttachments: Attachment[] = files
      .filter((file) => {
        if (!allowedTypes.includes(file.type)) {
          toast({
            title: "Invalid file type",
            description: "Please upload PNG, JPG, PDF, MP3, or MP4 files only.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      })
      .map((file) => ({
        id: Math.random().toString(36).slice(2, 11),
        type: file.type.startsWith("image/") ? "image" : "file",
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
        file,
      }));

    setAttachments([...attachments, ...newAttachments]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter((attachment) => attachment.id !== id));
  };

  return (
    <div className="border-t bg-background p-4 space-y-3">
      {attachments.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="relative flex-shrink-0 bg-muted rounded-lg p-2 w-24"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => removeAttachment(attachment.id)}
              >
                <X className="h-3 w-3" />
              </Button>

              {attachment.type === "image" ? (
                <div>
                  <img
                    src={attachment.preview}
                    alt={attachment.name}
                    className="w-full h-16 object-cover rounded"
                  />
                  <p className="text-xs truncate mt-1">{attachment.name}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-16">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                  <p className="text-xs truncate w-full text-center mt-1">
                    {attachment.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {attachment.size}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <SmartReplies
        onSelectReply={(text) =>
          setMessage((previous) => (previous ? `${previous} ${text}` : text))
        }
      />

      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/png,image/jpeg,application/pdf,audio/mpeg,video/mp4"
          multiple
          onChange={handleFileSelect}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        <Textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="min-h-[44px] max-h-32 resize-none"
          disabled={disabled}
        />

        <Button
          onClick={handleSend}
          disabled={disabled || (!message.trim() && attachments.length === 0)}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

