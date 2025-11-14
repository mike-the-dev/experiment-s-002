"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useInviteStudentsForm } from "@/features/inviteStudents/inviteStudents/useInviteStudentsForm";
import {
  PendingStudent,
  ConnectedStudent,
  TeacherInviteInfo,
} from "@/features/inviteStudents/_shared/inviteStudents.schema";

interface InviteStudentsFormProps {
  teacherInviteInfo: TeacherInviteInfo;
  pendingStudents?: PendingStudent[];
  connectedStudents?: ConnectedStudent[];
}

export function InviteStudentsForm({
  teacherInviteInfo,
  pendingStudents = [],
  connectedStudents = [],
}: InviteStudentsFormProps) {
  const {
    teacherCode,
    inviteLink,
    pendingStudents: formPendingStudents,
    connectedStudents: formConnectedStudents,
    isPending,
    handleCopy,
    handleResend,
    handleContinue,
    showQR,
    setShowQR,
  } = useInviteStudentsForm({
    teacherInviteInfo,
    pendingStudents,
    connectedStudents,
  });

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 py-12">
      {/* Background styling */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      <div className="w-full max-w-3xl relative space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Invite your students to join you on Sonata
          </h1>
          <p className="text-muted-foreground text-base">
            Share your code or link. When students sign up with it, they&apos;re
            automatically connected to your studio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Card 1 - Teacher Code */}
          <Card className="backdrop-blur-sm bg-white/95 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">Your Teacher Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex-1 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 text-center cursor-pointer hover:bg-[#BE5EED] hover:bg-opacity-10 transition-colors"
                  onClick={() => handleCopy(teacherCode, "Teacher code")}
                >
                  <span className="text-3xl font-bold tracking-wider text-gray-900">
                    {teacherCode}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy(teacherCode, "Teacher code")}
                  className="hover:border-[#BE5EED] hover:!bg-[#BE5EED] hover:!text-white hover:[&>svg]:!text-white transition-colors cursor-pointer"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                This code never expires. Share it with your students.
              </p>
            </CardContent>
          </Card>

          {/* Card 2 - Invite Link */}
          <Card className="backdrop-blur-sm bg-white/95 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">Invite Link</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Input
                  value={inviteLink}
                  readOnly
                  className="flex-1 cursor-pointer hover:border-[#BE5EED] transition-colors"
                  onClick={() => handleCopy(inviteLink, "Invite link")}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy(inviteLink, "Invite link")}
                  className="hover:border-[#BE5EED] hover:!bg-[#BE5EED] hover:!text-white hover:[&>svg]:!text-white transition-colors cursor-pointer"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                className="w-full cursor-pointer hover:!bg-[#BE5EED] hover:!text-white hover:[&>svg]:!text-white transition-colors"
                onClick={() => setShowQR(true)}
              >
                <QrCode className="h-4 w-4 mr-2" />
                Show QR Code
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Connections Status */}
        <Card className="backdrop-blur-sm bg-white/95 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Connections</CardTitle>
            <CardDescription>
              Manage your student invitations and connections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:text-gray-900 data-[state=active]:font-semibold"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="connected"
                  className="data-[state=active]:text-gray-900 data-[state=active]:font-semibold"
                >
                  Connected
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-2 mt-4 bg-white">
                {formPendingStudents.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No pending invitations
                  </p>
                ) : (
                  formPendingStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{student.name}</span>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => handleResend(student.id)}
                        disabled={isPending}
                      >
                        Resend
                      </Button>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="connected" className="space-y-2 mt-4 bg-white">
                {formConnectedStudents.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No connected students yet
                  </p>
                ) : (
                  formConnectedStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{student.name}</span>
                        <Badge className="bg-green-500">Connected</Badge>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-center pt-4">
          <Button
            onClick={handleContinue}
            disabled={isPending}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Processing..." : "Continue to Dashboard"}
          </Button>
        </div>
      </div>

      {/* QR Code Modal */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="!bg-white">
          <DialogHeader>
            <DialogTitle>Invite QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-64 h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center p-4">
              <QRCodeSVG
                value={inviteLink}
                size={224}
                level="H"
                includeMargin={false}
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Students can scan this code to join your studio
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

