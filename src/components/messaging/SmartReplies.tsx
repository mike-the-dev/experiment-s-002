"use client";

import { useMemo } from "react";

import { Button } from "@/components/ui/button";

interface SmartRepliesProps {
  onSelectReply: (text: string) => void;
}

const SMART_REPLIES = [
  "Got it — let's pick this up at our next lesson.",
  "Thanks! I'll review this and get back to you soon.",
  "No worries — we can adjust the plan next time.",
  "Great progress — keep it up this week!",
  "Let's reschedule — what times work for you?",
  "Please upload the piece/recording when you can.",
];

export function SmartReplies({ onSelectReply }: SmartRepliesProps) {
  const suggestions = useMemo(() => {
    const shuffled = [...SMART_REPLIES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

  if (suggestions.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {suggestions.map((reply, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="flex-shrink-0 text-xs whitespace-nowrap"
          onClick={() => onSelectReply(reply)}
        >
          {reply}
        </Button>
      ))}
    </div>
  );
}

