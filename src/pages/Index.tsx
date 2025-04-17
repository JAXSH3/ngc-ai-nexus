
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Next Generation Community
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          The ultimate platform for AI, Data Science, ML, and Generative AI enthusiasts
        </p>
        
        <div className="grid gap-6 mb-8">
          <div className="bg-muted/50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">Connect with Experts</h2>
            <p className="mb-4">
              Join discussions, share insights, and collaborate with professionals in AI and data science.
            </p>
            <Link to="/community">
              <Button variant="default" size="lg">
                Explore Community
              </Button>
            </Link>
          </div>
          
          <div className="bg-muted/50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">Discover Resources</h2>
            <p className="mb-4">
              Access curated articles, tutorials, and tools to enhance your skills and knowledge.
            </p>
            <Link to="/explore">
              <Button variant="outline" size="lg">
                Browse Resources
              </Button>
            </Link>
          </div>
          
          <div className="bg-muted/50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">Share Your Work</h2>
            <p className="mb-4">
              Showcase your projects, get feedback, and inspire others in the community.
            </p>
            <Link to="/post">
              <Button variant="secondary" size="lg">
                Create Post
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link to="/register">
            <Button className="w-full" size="lg">
              Join Now
            </Button>
          </Link>
          <Link to="/login">
            <Button className="w-full" variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
