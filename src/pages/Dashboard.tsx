
import React, { useState } from 'react';
import ResourceCard from '@/components/ResourceCard';
import CategoryFilter from '@/components/CategoryFilter';

// Sample data
const resourcesData = [
  {
    id: '1',
    title: 'ChatGPT',
    description: 'Conversational AI assistant for natural language tasks',
    type: 'tool' as const,
    category: 'AI Assistant'
  },
  {
    id: '2',
    title: 'Stable Diffusion',
    description: 'Generate stunning images from text descriptions',
    type: 'tool' as const,
    category: 'Image Generation'
  },
  {
    id: '3',
    title: 'Data Science Prompt Pack',
    description: 'Curated prompts for data analysis and visualization',
    type: 'prompt' as const,
    category: 'Data Science',
    isPremium: true
  },
  {
    id: '4',
    title: 'Attention Is All You Need',
    description: 'Research paper introducing the transformer architecture',
    type: 'paper' as const,
    category: 'Research'
  },
  {
    id: '5',
    title: 'AI Image Classifier',
    description: 'Open source project for image classification using ML',
    type: 'project' as const,
    category: 'Computer Vision'
  },
  {
    id: '6',
    title: 'GPT-4 Technical Report',
    description: 'Comprehensive overview of GPT-4 architecture and capabilities',
    type: 'paper' as const,
    category: 'Research'
  },
];

// Categories derived from resources
const categories = Array.from(new Set(resourcesData.map(resource => resource.category)));

const Dashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter resources by selected category
  const filteredResources = selectedCategory
    ? resourcesData.filter(resource => resource.category === selectedCategory)
    : resourcesData;
  
  return (
    <div className="container py-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground">
          Discover the latest AI tools, prompts, papers, and projects
        </p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-4">Categories</h2>
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            title={resource.title}
            description={resource.description}
            type={resource.type}
            isPremium={resource.isPremium}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
