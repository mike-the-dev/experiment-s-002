"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  Copy,
  Share2,
  Rocket,
  TrendingUp,
  HandshakeIcon,
  Info,
  Shield,
  Calendar as CalendarIcon,
  MessageSquare,
  FileText,
  Check,
} from "lucide-react";

interface Referral {
  name: string;
  status: "paid" | "confirmed" | "pending";
  date: string;
}

const mockReferrals: Referral[] = [
  { name: "Alex Ray", status: "paid", date: "Dec 15, 2024" },
  { name: "Jessica Bloom", status: "confirmed", date: "Jan 02, 2025" },
  { name: "Michael Torr", status: "pending", date: "Jan 28, 2025" },
];

export default function GrowthCenterPage() {
  const router = useRouter();
  const [referrals] = useState<Referral[]>(mockReferrals);
  const referralCode = "SONATA2025";

  const invitedCount = referrals.length;
  const confirmedCount = referrals.filter((r) => r.status === "confirmed" || r.status === "paid").length;
  const paidCount = referrals.filter((r) => r.status === "paid").length;
  const totalEarned = paidCount * 50;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Code copied!",
      description: "Your referral code has been copied to clipboard.",
    });
  };

  const handleShareLink = () => {
    toast({
      title: "Share link",
      description: "Sharing options coming soon!",
    });
  };

  const getStatusDisplay = (status: Referral["status"]) => {
    switch (status) {
      case "paid":
        return <span className="text-green-600 font-medium">✅ Paid</span>;
      case "confirmed":
        return <span className="text-blue-600 font-medium">🟦 Confirmed</span>;
      case "pending":
        return <span className="text-yellow-600 font-medium">🟨 Pending</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/teacher/studio")}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Studio
          </Button>
          <h1 className="text-3xl font-bold">Growth Center</h1>
          <p className="text-muted-foreground">Tools and tips to expand your studio.</p>
        </div>

        <div className="space-y-8">
          {/* Referrals & Rewards Section */}
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">Referrals & Rewards</CardTitle>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold text-primary">
                      Earn $50 for every new teacher you bring to Sonata!
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <ul className="text-xs space-y-1">
                            <li>• Must teach at least one full month before payout</li>
                            <li>• Payment issued automatically after 30 days</li>
                            <li>• No self-referrals</li>
                            <li>• Unlimited invites allowed</li>
                          </ul>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Paid out after they complete their first month of teaching.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Referral Summary Bar */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg">
                <div className="flex items-center justify-around text-center">
                  <div>
                    <p className="text-3xl font-bold">{invitedCount}</p>
                    <p className="text-xs text-muted-foreground">Invited</p>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div>
                    <p className="text-3xl font-bold text-blue-600">{confirmedCount}</p>
                    <p className="text-xs text-muted-foreground">Confirmed</p>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div>
                    <p className="text-3xl font-bold text-green-600">{paidCount}</p>
                    <p className="text-xs text-muted-foreground">Paid</p>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div>
                    <p className="text-3xl font-bold text-primary">${totalEarned}</p>
                    <p className="text-xs text-muted-foreground">Earned</p>
                  </div>
                </div>
              </div>

              {/* Referral Code & Share */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <InlineLabel className="text-sm font-medium mb-2 block">Your Referral Code</InlineLabel>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-muted px-4 py-3 rounded-md font-mono text-lg font-bold">
                        {referralCode}
                      </div>
                      <Button onClick={handleCopyCode} size="lg">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <InlineLabel className="text-sm font-medium mb-2 block">Share Your Link</InlineLabel>
                    <Button onClick={handleShareLink} size="lg" variant="outline" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Link
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Referral Tracker Table */}
              <div>
                <h3 className="font-semibold mb-3">Referral Tracker</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-3 text-sm font-semibold">Name</th>
                        <th className="text-left p-3 text-sm font-semibold">Status</th>
                        <th className="text-left p-3 text-sm font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referrals.map((referral, index) => (
                        <tr
                          key={index}
                          className="border-t hover:bg-muted/50 cursor-pointer transition-colors"
                        >
                          <td className="p-3">{referral.name}</td>
                          <td className="p-3">{getStatusDisplay(referral.status)}</td>
                          <td className="p-3 text-muted-foreground">{referral.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Earn More Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">How to Earn More</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Rocket className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Manage Your Referrals</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Share Sonata with your network. For every teacher that signs up and starts teaching, you get $50. No limits!
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold">Attract New Students</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Go to My Studio and enable &apos;Accept Platform Students.&apos; We&apos;ll feature you in our marketplace for a 15% platform fee on those students.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                      <HandshakeIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold">Boost Student Retention</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Students who receive regular progress reports are more likely to stay long-term. Consistent students mean consistent income.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* The Value We Provide Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">The Value We Provide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { icon: Shield, text: "Secure Payment Processing" },
                  { icon: CalendarIcon, text: "Automated Scheduling & Calendar Sync" },
                  { icon: MessageSquare, text: "Direct Student & Parent Messaging" },
                  { icon: FileText, text: "Professional Progress Reporting" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-2">
                      <item.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg mt-4">
                <p className="text-sm font-semibold text-center">
                  By bundling these tools, Sonata saves you an estimated $50+/month compared to using separate apps.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

const InlineLabel = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <label className={`text-sm font-medium ${className}`}>{children}</label>
);

