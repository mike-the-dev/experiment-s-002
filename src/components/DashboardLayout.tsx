"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "./ui/button";
import { Plus, Bell, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: ReactNode;
}

function Header() {
  const router = useRouter();
  const { state, open } = useSidebar();
  const isMobile = useIsMobile();
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);

  const handleSignOut = () => {
    router.push("/signin");
  };

  const handleAnnouncementSave = () => {
    // TODO: Implement announcement save logic
    toast({ 
      title: "Announcement sent",
      description: "Your announcement has been sent.",
    });
    setAnnouncementModalOpen(false);
  };

  // Calculate margin: only apply on desktop, based on sidebar state
  const marginLeft = !isMobile ? (open ? "16rem" : "3rem") : "0";

  return (
    <>
      <header 
        className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6 sticky top-0 z-30 transition-[margin-left] duration-200 ease-linear"
        style={{ marginLeft }}
      >
        <div className="flex items-center gap-4">
          <SidebarTrigger />
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setAnnouncementModalOpen(true)}>
            <Bell className="h-4 w-4 mr-2" />
            Send Announcement
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white" onClick={() => router.push("/teacher/add-student")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* TODO: Add ComposeAnnouncementModal component when available */}
      {announcementModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Compose Announcement</h2>
            <p className="text-sm text-muted-foreground mb-4">Announcement modal coming soon...</p>
            <div className="flex gap-2">
              <Button onClick={handleAnnouncementSave}>Save</Button>
              <Button variant="outline" onClick={() => setAnnouncementModalOpen(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          
          <footer className="py-4 text-center text-sm text-muted-foreground border-t bg-background/50">
            Powered by Sonata
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}

