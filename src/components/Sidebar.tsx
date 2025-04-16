
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Search, 
  MessageSquare,
  Users,
  PenSquare,
  Settings,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import UserAvatar from './UserAvatar';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div className={cn("pb-12 w-64 border-r border-border bg-background", className)}>
      <div className="space-y-4 py-4">
        <div className="py-2">
          <div className="space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) => 
                cn("ngc-sidebar-link", isActive && "active")
              }
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/explore"
              className={({ isActive }) => 
                cn("ngc-sidebar-link", isActive && "active")
              }
            >
              <Search className="h-5 w-5" />
              <span>Explore</span>
            </NavLink>
            <NavLink
              to="/messages"
              className={({ isActive }) => 
                cn("ngc-sidebar-link", isActive && "active")
              }
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </NavLink>
            <NavLink
              to="/community"
              className={({ isActive }) => 
                cn("ngc-sidebar-link", isActive && "active")
              }
            >
              <Users className="h-5 w-5" />
              <span>Community</span>
            </NavLink>
            <NavLink
              to="/post"
              className={({ isActive }) => 
                cn("ngc-sidebar-link", isActive && "active")
              }
            >
              <PenSquare className="h-5 w-5" />
              <span>Post</span>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) => 
                cn("ngc-sidebar-link", isActive && "active")
              }
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) => 
                cn("ngc-sidebar-link", isActive && "active")
              }
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* User profile at bottom */}
      <div className="fixed bottom-0 w-64 border-t border-border p-4 bg-background">
        <NavLink to="/profile" className="flex items-center gap-3">
          <UserAvatar name="Alex Johnson" size="sm" className="h-10 w-10" />
          <div>
            <p className="text-sm font-medium leading-none mb-1">Alex Johnson</p>
            <span className="text-xs text-muted-foreground underline-offset-4 hover:underline">
              View Profile
            </span>
          </div>
          <button className="ml-auto text-muted-foreground hover:text-foreground">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5L7 2.5C7 2.22386 7.22386 2 7.5 2Z" fill="currentColor"/>
              <path d="M7 11C7 10.7239 7.22386 10.5 7.5 10.5C7.77614 10.5 8 10.7239 8 11C8 11.2761 7.77614 11.5 7.5 11.5C7.22386 11.5 7 11.2761 7 11Z" fill="currentColor"/>
            </svg>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
