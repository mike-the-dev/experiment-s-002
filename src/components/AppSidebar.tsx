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
  Sparkles,
  TrendingUp,
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
import { AppRoute } from "@/types/appRoutes";
import type { CSSProperties } from "react";

const items = [
  { title: "Dashboard", url: AppRoute.TeacherDashboard, icon: LayoutDashboard },
  { title: "My Profile", url: AppRoute.TeacherDashboardProfile, icon: User },
  { title: "Schedule", url: AppRoute.TeacherSchedule, icon: Calendar },
  { title: "Messages", url: AppRoute.TeacherMessages, icon: MessageSquare },
  { title: "Students", url: AppRoute.TeacherStudents, icon: Users },
  { title: "My Studio", url: AppRoute.TeacherStudio, icon: Home },
  { title: "Growth Center", url: AppRoute.TeacherDashboardGrowthCenter, icon: TrendingUp },
  { title: "My Sonata Site (Beta)", url: AppRoute.TeacherSonataSite, icon: Sparkles },
  { title: "Analytics", url: AppRoute.TeacherAnalytics, icon: BarChart3 },
  { title: "Settings", url: AppRoute.TeacherSettings, icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="md:[&_[data-sidebar=sidebar]]:bg-gradient-to-br md:[&_[data-sidebar=sidebar]]:from-purple-50 md:[&_[data-sidebar=sidebar]]:via-white md:[&_[data-sidebar=sidebar]]:to-blue-50 md:[&_[data-sidebar=sidebar]]:border-r md:[&_[data-sidebar=sidebar]]:border-purple-100/40"
      style={
        {
          "--sidebar-border-width": "1px",
        } as CSSProperties
      }
    >
      <SidebarContent className="md:pt-16">
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

