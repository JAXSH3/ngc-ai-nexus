
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  Heart, 
  Share, 
  MoreHorizontal 
} from 'lucide-react';

// Sample posts data
const postsData = [
  {
    id: '1',
    user: {
      name: 'Alex Johnson',
      handle: '@alexj',
      avatar: ''
    },
    content: "Just tried the new GPT-4 API and I'm blown away by its reasoning capabilities! It solved a complex algorithm problem in seconds that would have taken me hours.",
    timestamp: '2h ago',
    likes: 42,
    comments: 7
  },
  {
    id: '2',
    user: {
      name: 'Sarah Kim',
      handle: '@sarahk',
      avatar: ''
    },
    content: 'Question for the AI community: What are your favorite libraries for visualizing large language model outputs? Working on a project and need recommendations!',
    timestamp: '5h ago',
    likes: 18,
    comments: 13
  },
  {
    id: '3',
    user: {
      name: 'Marcus Chen',
      handle: '@mchen',
      avatar: ''
    },
    content: 'New research paper alert: "Scaling Deep Learning for Material Discovery". The team used transformer models to predict material properties with unprecedented accuracy. Link in comments!',
    timestamp: '1d ago',
    likes: 87,
    comments: 24
  },
  {
    id: '4',
    user: {
      name: 'Priya Patel',
      handle: '@priyap',
      avatar: ''
    },
    content: 'I created a prompt template for generating high-quality data visualization code in Python. Boosted my productivity by 70%. Should I share it as a premium resource?',
    timestamp: '2d ago',
    likes: 56,
    comments: 31
  }
];

const Community: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Community</h1>
        <p className="text-muted-foreground">
          Join the conversation with AI enthusiasts, researchers, and developers
        </p>
      </div>
      
      {/* Create post */}
      <div className="mb-8 p-4 border border-border rounded-2xl bg-card">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <div className="h-full w-full rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <span className="font-medium text-sm">U</span>
            </div>
          </Avatar>
          <div className="flex-1">
            <textarea 
              className="w-full bg-background border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none h-20 p-2 rounded-lg"
              placeholder="Share your thoughts on AI..."
            />
            <div className="flex justify-end mt-2">
              <Button>Post</Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Posts feed */}
      <div className="space-y-6">
        {postsData.map((post) => (
          <div key={post.id} className="p-4 border border-border rounded-2xl bg-card">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <div className="h-full w-full rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <span className="font-medium text-sm">{post.user.name.charAt(0)}</span>
                </div>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{post.user.name}</span>
                    <span className="text-muted-foreground text-sm ml-2">{post.user.handle}</span>
                    <span className="text-muted-foreground text-sm ml-2">•</span>
                    <span className="text-muted-foreground text-sm ml-2">{post.timestamp}</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="mt-2 mb-4">{post.content}</p>
                
                <div className="flex items-center gap-6 text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-foreground">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-foreground">
                    <Share className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
