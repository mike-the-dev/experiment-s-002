"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type BackToHomeButtonProps = {
  className?: string;
};

export const BackToHomeButton: React.FC<BackToHomeButtonProps> = ({ className }) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className={className}
      onClick={() => router.push("/")}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to home
    </Button>
  );
};

