import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar: React.FC = () => {
  const [isAuthenticated] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex h-16 items-center px-6 md:px-8">
        {/* Logo - visible on all screens */}
        <Link to="/" className="mr-6 flex items-center gap-2 font-semibold text-2xl text-foreground">
          <img 
            src="/lovable-uploads/3e98d7de-e2bf-46fb-8a20-1251b23ffac0.png" 
            alt="NGC Logo" 
            className="h-8 w-auto" 
          />
        </Link>

        {/* Search bar - centered */}
        <div className="flex-1 flex justify-center">
          <div className="ngc-search-bar w-full max-w-lg">
            <Search className="mr-2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search anything"
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Navigation - right aligned */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Globe className="h-5 w-5" />
          </Button>

          <Link to="/community">
            <Button className="rounded-full bg-white text-ngc-dark hover:bg-white/90">
              COMMUNITY
            </Button>
          </Link>

          {isAuthenticated ? (
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
