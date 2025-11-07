"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, 
  Upload, 
  Music, 
  MapPin, 
  GraduationCap, 
  Star,
  Eye,
  X,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InstrumentEntry {
  id: string;
  name: string;
  skillLevels: string[];
  rate: string;
}

export default function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showPublicPreview, setShowPublicPreview] = useState(false);
  
  // Profile data
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    mainInstrument: "Piano",
    location: "Los Angeles, CA",
    profilePhoto: "",
    bio: "Passionate piano instructor with over 15 years of experience teaching students of all ages and skill levels. I specialize in classical and jazz techniques.",
    yearsTeaching: "15",
    education: "Master of Music, Juilliard School",
    specialties: ["Piano", "Jazz", "Classical", "Beginner", "Advanced", "Adult Students"],
    teachingModes: ["in-person", "online"],
    marketplaceEnabled: true,
    displayReviews: true,
  });

  const [instruments, setInstruments] = useState<InstrumentEntry[]>([
    { id: "1", name: "Piano", skillLevels: ["Beginner", "Intermediate", "Advanced"], rate: "75" },
    { id: "2", name: "Keyboard", skillLevels: ["Beginner", "Intermediate"], rate: "60" },
  ]);

  const [media, setMedia] = useState({
    videoIntro: "",
    sampleAudio: "",
    images: [] as string[],
  });

  const availableSpecialties = [
    "Piano", "Guitar", "Violin", "Drums", "Voice", "Jazz", "Classical", 
    "Rock", "Pop", "Beginner", "Intermediate", "Advanced", "Adult Students", "Children"
  ];

  const calculateProfileCompletion = () => {
    let completed = 0;
    let total = 5;
    
    if (profileData.profilePhoto) completed++;
    if (profileData.bio) completed++;
    if (instruments.length > 0 && instruments[0].rate) completed++;
    if (profileData.yearsTeaching) completed++;
    if (profileData.specialties.length > 0) completed++;
    
    return (completed / total) * 100;
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated successfully",
      description: "Your changes have been saved.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    toast({
      title: "Changes discarded",
      description: "Your profile remains unchanged.",
    });
  };

  const toggleSpecialty = (specialty: string) => {
    setProfileData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const addInstrument = () => {
    const newInstrument: InstrumentEntry = {
      id: Date.now().toString(),
      name: "",
      skillLevels: [],
      rate: "",
    };
    setInstruments([...instruments, newInstrument]);
  };

  const removeInstrument = (id: string) => {
    setInstruments(instruments.filter(i => i.id !== id));
  };

  const updateInstrument = (id: string, field: string, value: any) => {
    setInstruments(instruments.map(i => 
      i.id === id ? { ...i, [field]: value } : i
    ));
  };

  const toggleInstrumentSkillLevel = (id: string, level: string) => {
    setInstruments(instruments.map(i => {
      if (i.id === id) {
        const skillLevels = i.skillLevels.includes(level)
          ? i.skillLevels.filter(l => l !== level)
          : [...i.skillLevels, level];
        return { ...i, skillLevels };
      }
      return i;
    }));
  };

  return (
    <DashboardLayout>
      <div className="container max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={profileData.profilePhoto} />
                  <AvatarFallback className="text-2xl">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full p-2 h-auto"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {isEditing ? (
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="text-2xl font-bold mb-2 max-w-md"
                      />
                    ) : (
                      <h1 className="text-2xl font-bold mb-2">{profileData.name}</h1>
                    )}
                    <div className="flex items-center gap-4 text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Music className="h-4 w-4" />
                        {isEditing ? (
                          <Input
                            value={profileData.mainInstrument}
                            onChange={(e) => setProfileData({ ...profileData, mainInstrument: e.target.value })}
                            className="h-8 w-32"
                          />
                        ) : (
                          profileData.mainInstrument
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {isEditing ? (
                          <Input
                            value={profileData.location}
                            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                            className="h-8 w-48"
                          />
                        ) : (
                          profileData.location
                        )}
                      </span>
                    </div>
                    <Badge variant={profileData.marketplaceEnabled ? "default" : "secondary"}>
                      {profileData.marketplaceEnabled ? "Marketplace Enabled" : "Private CRM Only"}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button onClick={handleSaveChanges}>
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => setIsEditing(true)}>
                          Edit Profile
                        </Button>
                        <Button variant="outline" onClick={() => setShowPublicPreview(true)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview Public Profile
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Completion */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Completion</CardTitle>
            <CardDescription>
              Complete your profile to appear higher in marketplace searches.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Profile Status</span>
                <span className="font-semibold">{Math.round(calculateProfileCompletion())}%</span>
              </div>
              <Progress value={calculateProfileCompletion()} />
              <div className="flex flex-wrap gap-2 mt-4">
                {profileData.profilePhoto && <Badge variant="outline">✓ Photo</Badge>}
                {profileData.bio && <Badge variant="outline">✓ Bio</Badge>}
                {instruments.length > 0 && instruments[0].rate && <Badge variant="outline">✓ Rate</Badge>}
                {profileData.yearsTeaching && <Badge variant="outline">✓ Experience</Badge>}
                {profileData.specialties.length > 0 && <Badge variant="outline">✓ Specialties</Badge>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Bio / Teaching Philosophy</Label>
              {isEditing ? (
                <Textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={5}
                  className="mt-2"
                />
              ) : (
                <p className="mt-2 text-muted-foreground">{profileData.bio}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Years Teaching</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={profileData.yearsTeaching}
                    onChange={(e) => setProfileData({ ...profileData, yearsTeaching: e.target.value })}
                    className="mt-2"
                  />
                ) : (
                  <p className="mt-2 text-muted-foreground">{profileData.yearsTeaching} years</p>
                )}
              </div>
              
              <div>
                <Label>Education / Credentials</Label>
                {isEditing ? (
                  <Input
                    value={profileData.education}
                    onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                    className="mt-2"
                  />
                ) : (
                  <p className="mt-2 text-muted-foreground flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    {profileData.education}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label>Specialties</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {isEditing ? (
                  availableSpecialties.map((specialty) => (
                    <Badge
                      key={specialty}
                      variant={profileData.specialties.includes(specialty) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleSpecialty(specialty)}
                    >
                      {specialty}
                    </Badge>
                  ))
                ) : (
                  profileData.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))
                )}
              </div>
            </div>

            <div>
              <Label>Teaching Mode</Label>
              <div className="flex gap-4 mt-2">
                {isEditing ? (
                  <>
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={profileData.teachingModes.includes("in-person")}
                        onCheckedChange={(checked) => {
                          setProfileData({
                            ...profileData,
                            teachingModes: checked
                              ? [...profileData.teachingModes, "in-person"]
                              : profileData.teachingModes.filter(m => m !== "in-person")
                          });
                        }}
                      />
                      In-Person
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={profileData.teachingModes.includes("online")}
                        onCheckedChange={(checked) => {
                          setProfileData({
                            ...profileData,
                            teachingModes: checked
                              ? [...profileData.teachingModes, "online"]
                              : profileData.teachingModes.filter(m => m !== "online")
                          });
                        }}
                      />
                      Online
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={profileData.teachingModes.includes("hybrid")}
                        onCheckedChange={(checked) => {
                          setProfileData({
                            ...profileData,
                            teachingModes: checked
                              ? [...profileData.teachingModes, "hybrid"]
                              : profileData.teachingModes.filter(m => m !== "hybrid")
                          });
                        }}
                      />
                      Hybrid
                    </label>
                  </>
                ) : (
                  <div className="flex gap-2">
                    {profileData.teachingModes.map((mode) => (
                      <Badge key={mode} variant="outline">
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instruments & Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Instruments & Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {instruments.map((instrument, index) => (
              <Card key={instrument.id}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Instrument</Label>
                          {isEditing ? (
                            <Input
                              value={instrument.name}
                              onChange={(e) => updateInstrument(instrument.id, "name", e.target.value)}
                              className="mt-2"
                            />
                          ) : (
                            <p className="mt-2 font-semibold">{instrument.name}</p>
                          )}
                        </div>
                        <div>
                          <Label>Lesson Rate (per hour)</Label>
                          {isEditing ? (
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-muted-foreground">$</span>
                              <Input
                                type="number"
                                value={instrument.rate}
                                onChange={(e) => updateInstrument(instrument.id, "rate", e.target.value)}
                                className="flex-1"
                              />
                            </div>
                          ) : (
                            <p className="mt-2 font-semibold">${instrument.rate}</p>
                          )}
                        </div>
                      </div>
                      {isEditing && instruments.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeInstrument(instrument.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div>
                      <Label>Skill Levels Accepted</Label>
                      <div className="flex gap-4 mt-2">
                        {["Beginner", "Intermediate", "Advanced"].map((level) => (
                          <label key={level} className="flex items-center gap-2">
                            <Checkbox
                              checked={instrument.skillLevels.includes(level)}
                              onCheckedChange={() => isEditing && toggleInstrumentSkillLevel(instrument.id, level)}
                              disabled={!isEditing}
                            />
                            {level}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {isEditing && (
              <Button onClick={addInstrument} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Instrument
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Media */}
        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
            <CardDescription>
              Upload photos, videos, and audio samples to showcase your teaching style
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Video Introduction</Label>
                <Button variant="outline" className="w-full mt-2" disabled={!isEditing}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Video
                </Button>
              </div>
              <div>
                <Label>Sample Audio</Label>
                <Button variant="outline" className="w-full mt-2" disabled={!isEditing}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Audio
                </Button>
              </div>
            </div>
            <div>
              <Label>Studio Photos / Certificates</Label>
              <Button variant="outline" className="w-full mt-2" disabled={!isEditing}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Images
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Snapshot */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule Snapshot</CardTitle>
            <CardDescription>
              Students on the marketplace will see only your 'Available for Lessons' times
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8 bg-muted rounded-lg text-center text-muted-foreground">
              <p>Your availability blocks will appear here</p>
              <p className="text-sm mt-2">Set your availability in the Schedule tab</p>
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Reviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-8 bg-muted rounded-lg text-center text-muted-foreground">
              <p>Student feedback will appear here once received</p>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={profileData.displayReviews}
                onCheckedChange={(checked) => 
                  setProfileData({ ...profileData, displayReviews: !!checked })
                }
                disabled={!isEditing}
              />
              <Label>Display student reviews on public profile</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Public Preview Dialog */}
      <Dialog open={showPublicPreview} onOpenChange={setShowPublicPreview}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Public Profile Preview</DialogTitle>
            <DialogDescription>
              This is how students will see your profile on the marketplace
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileData.profilePhoto} />
                <AvatarFallback className="text-xl">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{profileData.name}</h2>
                <div className="flex items-center gap-4 text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Music className="h-4 w-4" />
                    {profileData.mainInstrument}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {profileData.location}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {profileData.specialties.slice(0, 5).map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-muted-foreground">{profileData.bio}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Teaching Experience</h3>
              <p className="text-muted-foreground">{profileData.yearsTeaching} years</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Instruments & Rates</h3>
              <div className="space-y-2">
                {instruments.map((instrument) => (
                  <div key={instrument.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{instrument.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {instrument.skillLevels.join(", ")}
                      </p>
                    </div>
                    <p className="font-semibold">${instrument.rate}/hr</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Available Times</h3>
              <div className="p-4 bg-muted rounded-lg text-center text-muted-foreground">
                Your available lesson times will appear here
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

