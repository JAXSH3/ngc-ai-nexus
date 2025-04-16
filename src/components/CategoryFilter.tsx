
import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        key="all"
        className={cn(
          "ngc-category-button",
          selectedCategory === null && "bg-accent text-accent-foreground"
        )}
        onClick={() => onSelectCategory(null)}
      >
        All
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          className={cn(
            "ngc-category-button",
            selectedCategory === category && "bg-accent text-accent-foreground"
          )}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
