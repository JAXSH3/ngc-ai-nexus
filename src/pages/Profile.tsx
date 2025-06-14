import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import UserAvatar from '@/components/UserAvatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, BookmarkIcon, History, Settings } from 'lucide-react';
import { useUserProfile } from "@/hooks/useUserProfile";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const Profile: React.FC = () => {
  const { toast } = useToast();
  const {
    user,
    profile,
    isLoading,
    error,
    updateProfile,
    updating,
  } = useUserProfile();

  const [isEditing, setIsEditing] = React.useState(false);
  // Use local state for editable fields
  const [editedProfile, setEditedProfile] = React.useState({
    first_name: "",
    last_name: "",
    bio: "",
  });

  React.useEffect(() => {
    if (profile) {
      setEditedProfile({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  const handleEditToggle = () => {
    setIsEditing((editing) => !editing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!profile) return;
    try {
      await updateProfile({
        id: profile.id,
        first_name: editedProfile.first_name,
        last_name: editedProfile.last_name,
        bio: editedProfile.bio,
      });
      toast({
        title: "Profile updated",
        description: "Your profile changes were saved.",
      });
      setIsEditing(false);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: err.message,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-muted-foreground">Loading profile...</span>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-red-500">
          {error?.message || "Profile not found."}
        </span>
      </div>
    );
  }

  // For display name, fallback to first+last, or email if no names
  const displayName = `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || profile.email;

  return (
    <div className="container py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column: User info */}
        <div className="md:col-span-1">
          <div className="mb-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle>Profile</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={handleEditToggle}
                    disabled={updating}
                  >
                    <Edit className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <UserAvatar name={displayName} size="lg" className="mb-4" />
                  {isEditing ? (
                    <>
                      <div className="flex gap-2 w-full">
                        <Input
                          name="first_name"
                          value={editedProfile.first_name}
                          onChange={handleInputChange}
                          placeholder="First Name"
                        />
                        <Input
                          name="last_name"
                          value={editedProfile.last_name}
                          onChange={handleInputChange}
                          placeholder="Last Name"
                        />
                      </div>
                    </>
                  ) : (
                    <h2 className="text-xl font-semibold mb-1">{displayName}</h2>
                  )}
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                </div>
                <div className="space-y-4 w-full">
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        name="bio"
                        value={editedProfile.bio}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Tell us about yourself"
                        rows={4}
                      />
                    ) : (
                      <p className="text-sm mt-1">{profile.bio || <span className="text-muted-foreground">No bio provided.</span>}</p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {isEditing && (
                  <Button className="w-full" onClick={handleSave} loading={updating}>
                    {updating ? "Saving..." : "Save Changes"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {/* No dynamic categories yet; placeholder */}
                    <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">AI Assistant</div>
                    <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">Image Generation</div>
                    <Button variant="outline" size="sm" className="rounded-full">
                      + Add
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right column: kept as in original */}
        <div className="md:col-span-2">
          <Tabs defaultValue="saved">
            <TabsList className="mb-6">
              <TabsTrigger value="saved">
                <BookmarkIcon className="h-4 w-4 mr-2" />
                Saved
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="saved">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Resources</CardTitle>
                  <CardDescription>Resources you've bookmarked for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {savedResources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">{resource.category}</p>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Browsing History</CardTitle>
                  <CardDescription>Resources you've recently viewed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {browsingHistory.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">Viewed on {item.timestamp}</p>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="email-notifications" defaultChecked />
                        <label htmlFor="email-notifications">Receive email notifications</label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dark-mode">Theme</Label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="dark-mode" 
                          defaultChecked={user.preferences.theme === 'dark'} 
                        />
                        <label htmlFor="dark-mode">Dark Mode</label>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t">
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Mock user data - in a real app, this would come from your auth provider
const mockUser = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  bio: 'AI enthusiast and researcher focused on generative models and their applications.',
  preferences: {
    categories: ['AI Assistant', 'Image Generation', 'Data Science'],
    theme: 'dark',
  }
};

// Mock saved resources
const savedResources = [
  { id: '1', title: 'ChatGPT', category: 'AI Assistant' },
  { id: '2', title: 'Stable Diffusion', category: 'Image Generation' },
  { id: '3', title: 'ML Fundamentals', category: 'Course' },
];

// Mock browsing history
const browsingHistory = [
  { id: '1', title: 'GPT-4 Technical Report', timestamp: '2023-04-15' },
  { id: '2', title: 'AI Image Classifier', timestamp: '2023-04-14' },
  { id: '3', title: 'Data Science Prompt Pack', timestamp: '2023-04-13' },
];

export default Profile;
