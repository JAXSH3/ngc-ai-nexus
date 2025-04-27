
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to the Next Generation Community
        </h1>
        <p className="text-xl text-muted-foreground">
          Connect with like-minded individuals, explore new ideas, and contribute to our growing community.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/community">
            <Button size="lg" className="gap-2">
              Join Community <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/explore">
            <Button size="lg" variant="outline" className="gap-2">
              Explore <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-5xl">
        {[
          {
            title: "Connect",
            description: "Build meaningful connections with people who share your interests and passion."
          },
          {
            title: "Share",
            description: "Share your knowledge, experiences, and insights with the community."
          },
          {
            title: "Grow",
            description: "Learn from others and grow personally and professionally."
          }
        ].map((card, index) => (
          <div key={index} className="bg-card p-6 rounded-xl shadow-sm border border-border">
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-muted-foreground">{card.description}</p>
          </div>
        ))}
      </div>
      
      {/* Supabase notice */}
      <div className="text-sm text-muted-foreground mt-8 p-4 bg-muted rounded-lg max-w-xl">
        <strong>Note:</strong> This application requires Supabase configuration to enable authentication and database features.
        Please add your Supabase URL and anonymous key as environment variables:
        <pre className="mt-2 bg-background p-2 rounded text-xs overflow-auto">
          VITE_SUPABASE_URL=your-supabase-url<br />
          VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
        </pre>
      </div>
    </div>
  );
};

export default Index;
