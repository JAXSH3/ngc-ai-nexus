
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Post: React.FC = () => {
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = useState('thought');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/community');
    }, 1000);
  };
  
  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Create a Post</h1>
        <p className="text-muted-foreground">
          Share your thoughts, questions, or discoveries with the NGC community
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="post-type">Post Type</Label>
          <Select 
            value={postType} 
            onValueChange={setPostType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select post type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thought">Thought/Opinion</SelectItem>
              <SelectItem value="question">Question</SelectItem>
              <SelectItem value="resource">Resource Share</SelectItem>
              <SelectItem value="project">Project Update</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {postType === 'resource' && (
          <div className="space-y-2">
            <Label htmlFor="resource-link">Resource Link</Label>
            <Input 
              id="resource-link" 
              placeholder="https://example.com/resource"
              type="url"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="post-content">Content</Label>
          <Textarea
            id="post-content"
            placeholder="What's on your mind about AI?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            rows={6}
            className="resize-none"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Topics (Optional)</Label>
          <div className="flex flex-wrap gap-2">
            {['AI', 'Machine Learning', 'Data Science', 'Neural Networks', 'GPT', 'Research'].map((tag) => (
              <button
                key={tag}
                type="button"
                className="bg-muted hover:bg-muted/80 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </button>
            ))}
            <button
              type="button"
              className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
            >
              + Add Topic
            </button>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate('/community')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !postContent.trim()}>
            {isSubmitting ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Post;
