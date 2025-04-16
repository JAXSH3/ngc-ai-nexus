
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import UserAvatar from '@/components/UserAvatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, BookmarkIcon, History, Settings } from 'lucide-react';

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

const Profile: React.FC = () => {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

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

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUser(editedUser);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column: User info */}
        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle>Profile</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleEditToggle}
                >
                  <Edit className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <UserAvatar name={user.name} size="lg" className="mb-4" />
                {isEditing ? (
                  <Input 
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                    className="text-center mb-1"
                  />
                ) : (
                  <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
                )}
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Input 
                      id="bio"
                      name="bio"
                      value={editedUser.bio}
                      onChange={handleInputChange}
                      className="h-24"
                    />
                  ) : (
                    <p className="text-sm mt-1">{user.bio}</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {isEditing && (
                <Button className="w-full" onClick={handleEditToggle}>
                  Save Changes
                </Button>
              )}
            </CardFooter>
          </Card>
          
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
                    {user.preferences.categories.map((category) => (
                      <div key={category} className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                        {category}
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="rounded-full">
                      + Add
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column: Activity */}
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

export default Profile;
