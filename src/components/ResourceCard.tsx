
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ResourceCardProps {
  title: string;
  description: string;
  type: 'tool' | 'prompt' | 'paper' | 'project';
  isPremium?: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  type,
  isPremium = false,
}) => {
  // Different button text based on resource type
  const buttonText = type === 'tool' || type === 'prompt' ? 'Try' : 'View';
  
  // Badge color based on resource type
  const getBadgeVariant = () => {
    switch(type) {
      case 'tool': return 'default';
      case 'prompt': return 'secondary';
      case 'paper': return 'outline';
      case 'project': return 'destructive';
      default: return 'default';
    }
  };
  
  return (
    <div className="ngc-card flex flex-col h-full">
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium">{title}</h3>
          <Badge variant={getBadgeVariant()} className="capitalize">
            {type}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          {description}
        </p>
        <div className="mt-auto pt-4">
          <Button className="w-full">
            {isPremium && <span className="mr-2">✨</span>}
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
