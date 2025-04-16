
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  src?: string;
  name?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  src, 
  name = 'User', 
  className,
  size = 'md' 
}) => {
  // Get initials from name
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  // Determine size class
  const sizeClass = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  return (
    <Avatar className={cn(sizeClass[size], className)}>
      {src ? (
        <AvatarImage src={src} alt={name} />
      ) : null}
      <AvatarFallback className="bg-primary/10 text-primary">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
