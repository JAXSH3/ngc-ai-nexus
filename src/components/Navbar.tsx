
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UserAvatar from '@/components/UserAvatar';
import SearchModal from '@/components/SearchModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  // In a real app, you would get this from your auth provider
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user] = useState({ name: 'Alex Johnson' });
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle search input click
  const handleSearchClick = () => {
    setSearchOpen(true);
  };

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
          <div 
            className="ngc-search-bar w-full max-w-lg flex items-center px-3 h-10 rounded-md border border-input cursor-pointer"
            onClick={handleSearchClick}
            role="button"
            tabIndex={0}
          >
            <Search className="mr-2 h-5 w-5 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              Search anything... (Press Ctrl+K)
            </div>
            <div className="ml-auto text-xs text-muted-foreground hidden md:block">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                  <UserAvatar name={user.name} size="sm" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <UserAvatar name={user.name} size="sm" />
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Premium Member
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <Link to="/profile">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link to="/settings">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsAuthenticated(false)}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
          )}
        </div>
      </div>
      
      {/* AI-powered search modal */}
      <SearchModal open={searchOpen} setOpen={setSearchOpen} />
    </header>
  );
};

export default Navbar;
