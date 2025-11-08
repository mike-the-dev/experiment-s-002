"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "./ui/button";
import { Plus, Bell, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { clearAuthSession } from "@/clearAuthSession";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  shiftWithSidebar?: boolean;
}

function Header() {
  const router = useRouter();
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);

  const handleSignOut = () => {
    clearAuthSession();
    router.push("/signin/teacher");
  };

  const handleAnnouncementSave = () => {
    // TODO: Implement announcement save logic
    toast({ 
      title: "Announcement sent",
      description: "Your announcement has been sent.",
    });
    setAnnouncementModalOpen(false);
  };

  return (
    <>
      <header
        className="h-16 border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white/80 flex items-center justify-between px-6 sticky top-0 z-30"
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

function useSidebarOffset(shiftWithSidebar: boolean) {
  const { open } = useSidebar();
  const isMobile = useIsMobile();

  if (!shiftWithSidebar || isMobile) {
    return "0px";
  }

  return open ? "var(--sidebar-width)" : "var(--sidebar-width-icon)";
}

function ContentArea({ children, shiftWithSidebar }: { children: ReactNode; shiftWithSidebar: boolean }) {
  const sidebarOffset = useSidebarOffset(shiftWithSidebar);

  return (
    <div
      className={cn(
        "flex min-h-screen flex-1 min-w-0 flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50",
        shiftWithSidebar && "transition-[margin-left] duration-200 ease-linear",
      )}
      style={shiftWithSidebar ? { marginLeft: sidebarOffset } : undefined}
    >
      {children}
    </div>
  );
}

export function DashboardLayout({ children, shiftWithSidebar = false }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <ContentArea shiftWithSidebar={shiftWithSidebar}>
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        <footer className="py-4 text-center text-sm text-muted-foreground border-t bg-background/50">
          Powered by Sonata
        </footer>
      </ContentArea>
    </SidebarProvider>
  );
}

