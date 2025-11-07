"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, DollarSign, Video, Copy, Share2, Clock, MapPin, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TeacherDashboard() {
  const { toast } = useToast();
  const router = useRouter();
  const firstName = "Maria";
  const referralCode = "MARIA2024";
  const [showEarnings, setShowEarnings] = useState(false);

  const stats = [
    { label: "Active Students", value: "24", icon: Users, color: "text-purple-600" },
    { label: "Upcoming Lessons", value: "8", icon: Calendar, color: "text-blue-600" },
    { label: "Monthly Earnings", value: "$3,200", icon: DollarSign, color: "text-green-600", hasToggle: true },
  ];

  const makeupLessons = [
    { student: "Emma Thompson", type: "Booked", date: "Thu, Jan 16", time: "3:00 PM" },
    { student: "Lucas Brown", type: "Missed - Not Booked", date: "Mon, Jan 13", time: "N/A" },
    { student: "Sofia Martinez", type: "Booked", date: "Fri, Jan 17", time: "5:30 PM" },
  ];

  const todaysLessons = [
    { time: "10:00 AM", student: "Emma Thompson", instrument: "Piano", location: "Studio A" },
    { time: "2:00 PM", student: "James Wilson", instrument: "Guitar", location: "Online" },
    { time: "4:30 PM", student: "Sofia Martinez", instrument: "Violin", location: "Studio B" },
  ];

  const recentActivity = [
    { student: "Emma Thompson", activity: "Completed 30 minutes of practice", time: "2 hours ago" },
    { student: "James Wilson", activity: "Achieved milestone: 50 lessons completed", time: "5 hours ago" },
    { student: "Sofia Martinez", activity: "Logged practice session", time: "Yesterday" },
    { student: "Lucas Brown", activity: "Completed lesson", time: "Yesterday" },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const handleStatClick = (label: string) => {
    switch (label) {
      case "Active Students":
        router.push("/teacher/students");
        break;
      case "Upcoming Lessons":
        router.push("/teacher/schedule");
        break;
      case "Monthly Earnings":
        router.push("/teacher/studio");
        break;
    }
  };

  return (
    <DashboardLayout>
      <div className="container max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Welcome back, {firstName}!
        </h1>
        <p className="text-muted-foreground mt-2">Here's your studio at a glance.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleStatClick(stat.label)}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">
                    {stat.hasToggle && !showEarnings ? "••••••" : stat.value}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <stat.icon className={`h-10 w-10 ${stat.color}`} />
                  {stat.hasToggle && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowEarnings(!showEarnings);
                      }}
                    >
                      {showEarnings ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Digital Make-ups Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Digital Make-ups</p>
                <p className="text-3xl font-bold mt-1">{makeupLessons.length}</p>
              </div>
              <Video className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Lessons */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Lessons</CardTitle>
          <CardDescription>Your schedule for today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {todaysLessons.map((lesson, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border bg-background hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium min-w-[80px]">
                  <Clock className="h-4 w-4" />
                  {lesson.time}
                </div>
                <div className="border-l pl-4">
                  <p className="font-medium">{lesson.student}</p>
                  <p className="text-sm text-muted-foreground">{lesson.instrument}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {lesson.location}
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full mt-4" onClick={() => router.push("/teacher/schedule")}>
            View Full Schedule
          </Button>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Marketplace Visibility */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Marketplace</CardTitle>
                <CardDescription>Visible to New Students</CardDescription>
              </div>
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 opacity-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Profile Visibility</p>
                <p className="text-sm text-muted-foreground">
                  Your profile is discoverable when this is on
                </p>
              </div>
              <Switch disabled />
            </div>
          </CardContent>
        </Card>

        {/* Referral Program */}
        <Card>
          <CardHeader>
            <CardTitle>Referral Program</CardTitle>
            <CardDescription>Share and earn rewards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-3 text-center">
                <span className="text-xl font-bold tracking-wider">{referralCode}</span>
              </div>
              <Button variant="outline" size="icon" onClick={() => handleCopy(referralCode)}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Share your code and earn $25 for each new student who joins.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Student milestones and achievements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-start justify-between p-3 rounded-lg border bg-background"
            >
              <div>
                <p className="font-medium">{activity.student}</p>
                <p className="text-sm text-muted-foreground mt-1">{activity.activity}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {activity.time}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Studio Summary Widget */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Practice Hours This Week</p>
              <p className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                127
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Most Active Student</p>
              <p className="text-2xl font-bold mt-2">Emma Thompson</p>
              <p className="text-sm text-muted-foreground mt-1">18 hours practiced</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </DashboardLayout>
  );
}

