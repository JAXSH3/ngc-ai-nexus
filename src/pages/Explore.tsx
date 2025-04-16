
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceCard from '@/components/ResourceCard';

// Sample data for different types
const aiTools = [
  {
    id: 't1',
    title: 'ChatGPT',
    description: 'Conversational AI assistant for natural language tasks',
    type: 'tool' as const,
    isPremium: false,
  },
  {
    id: 't2',
    title: 'Stable Diffusion',
    description: 'Generate stunning images from text descriptions',
    type: 'tool' as const,
    isPremium: false,
  },
  {
    id: 't3',
    title: 'Midjourney',
    description: 'AI image generation with artistic style control',
    type: 'tool' as const,
    isPremium: true,
  }
];

const promptTemplates = [
  {
    id: 'p1',
    title: 'Research Paper Analyzer',
    description: 'Extract key insights from academic papers quickly',
    type: 'prompt' as const,
    isPremium: false,
  },
  {
    id: 'p2',
    title: 'Code Refactoring',
    description: 'Transform legacy code into clean, modern patterns',
    type: 'prompt' as const,
    isPremium: true
  },
  {
    id: 'p3',
    title: 'Data Visualization Helper',
    description: 'Generate code for beautiful data visualizations',
    type: 'prompt' as const,
    isPremium: false,
  }
];

const researchPapers = [
  {
    id: 'r1',
    title: 'Attention Is All You Need',
    description: 'Introduces the transformer architecture that revolutionized NLP',
    type: 'paper' as const,
    isPremium: false,
  },
  {
    id: 'r2',
    title: 'GPT-4 Technical Report',
    description: 'Detailed analysis of GPT-4\'s capabilities and limitations',
    type: 'paper' as const,
    isPremium: false,
  },
  {
    id: 'r3',
    title: 'RLHF: Reinforcement Learning from Human Feedback',
    description: 'How human feedback shapes modern AI systems',
    type: 'paper' as const,
    isPremium: true
  }
];

const projects = [
  {
    id: 'pr1',
    title: 'Open Source LLM',
    description: 'A community-maintained large language model',
    type: 'project' as const,
    isPremium: false,
  },
  {
    id: 'pr2',
    title: 'AI Image Classifier',
    description: 'Train custom classifiers with minimal data',
    type: 'project' as const,
    isPremium: false,
  },
  {
    id: 'pr3',
    title: 'Neural Style Transfer',
    description: 'Apply artistic styles to any image using neural networks',
    type: 'project' as const,
    isPremium: true,
  }
];

const Explore: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Explore Resources</h1>
        <p className="text-muted-foreground">
          Discover curated AI tools, prompt templates, research papers, and projects
        </p>
      </div>
      
      <Tabs defaultValue="tools" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="tools">AI Tools</TabsTrigger>
          <TabsTrigger value="prompts">Prompt Templates</TabsTrigger>
          <TabsTrigger value="papers">Research Papers</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tools" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool) => (
            <ResourceCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              type={tool.type}
              isPremium={tool.isPremium}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="prompts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promptTemplates.map((prompt) => (
            <ResourceCard
              key={prompt.id}
              title={prompt.title}
              description={prompt.description}
              type={prompt.type}
              isPremium={prompt.isPremium}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="papers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchPapers.map((paper) => (
            <ResourceCard
              key={paper.id}
              title={paper.title}
              description={paper.description}
              type={paper.type}
              isPremium={paper.isPremium}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="projects" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ResourceCard
              key={project.id}
              title={project.title}
              description={project.description}
              type={project.type}
              isPremium={project.isPremium}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Explore;
