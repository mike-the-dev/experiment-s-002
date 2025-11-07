"use client";

import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Users, 
  Home, 
  BarChart3, 
  Settings,
  User,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/teacher/dashboard", icon: LayoutDashboard },
  { title: "My Profile", url: "/teacher/dashboard/profile", icon: User },
  { title: "Schedule", url: "/teacher/schedule", icon: Calendar },
  { title: "Messages", url: "/teacher/messages", icon: MessageSquare },
  { title: "Students", url: "/teacher/students", icon: Users },
  { title: "My Studio", url: "/teacher/studio", icon: Home },
  { title: "My Sonata Site (Beta)", url: "/teacher/sonata-site", icon: Sparkles },
  { title: "Analytics", url: "/teacher/analytics", icon: BarChart3 },
  { title: "Settings", url: "/teacher/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-4">
            <h2 className="text-lg font-semibold">
              {open ? (
                <>
                  <span className="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">Sonata </span>
                  <span className="text-yellow-500">Con </span>
                  <span className="text-yellow-500">Brio</span>
                </>
              ) : "S"}
            </h2>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

