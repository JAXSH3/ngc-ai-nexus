
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command";
import { SearchCheck, SearchX, Wrench, FileText, Code, Layers } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';

// Sample data - in a real implementation, this would come from your backend
const searchableItems = [
  // AI Tools
  { id: 't1', title: 'ChatGPT', description: 'Conversational AI assistant for natural language tasks', type: 'tool', category: 'AI Assistant', url: '/explore?type=tools' },
  { id: 't2', title: 'Stable Diffusion', description: 'Generate stunning images from text descriptions', type: 'tool', category: 'Image Generation', url: '/explore?type=tools' },
  { id: 't3', title: 'Midjourney', description: 'AI image generation with artistic style control', type: 'tool', category: 'Image Generation', url: '/explore?type=tools' },
  { id: 't4', title: 'Claude', description: 'AI assistant by Anthropic with strong reasoning abilities', type: 'tool', category: 'AI Assistant', url: '/explore?type=tools' },
  
  // Prompts
  { id: 'p1', title: 'Research Paper Analyzer', description: 'Extract key insights from academic papers quickly', type: 'prompt', category: 'Research', url: '/explore?type=prompts' },
  { id: 'p2', title: 'Code Refactoring', description: 'Transform legacy code into clean, modern patterns', type: 'prompt', category: 'Development', url: '/explore?type=prompts' },
  { id: 'p3', title: 'Data Visualization Helper', description: 'Generate code for beautiful data visualizations', type: 'prompt', category: 'Data Science', url: '/explore?type=prompts' },
  
  // Papers
  { id: 'r1', title: 'Attention Is All You Need', description: 'Introduces the transformer architecture that revolutionized NLP', type: 'paper', category: 'NLP', url: '/explore?type=papers' },
  { id: 'r2', title: 'GPT-4 Technical Report', description: 'Detailed analysis of GPT-4\'s capabilities and limitations', type: 'paper', category: 'AI Models', url: '/explore?type=papers' },
  
  // Projects
  { id: 'pr1', title: 'Open Source LLM', description: 'A community-maintained large language model', type: 'project', category: 'Open Source', url: '/explore?type=projects' },
  { id: 'pr2', title: 'AI Image Classifier', description: 'Train custom classifiers with minimal data', type: 'project', category: 'Computer Vision', url: '/explore?type=projects' },
];

interface SearchModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(searchableItems);

  // Mock AI-powered search - in a real implementation, this would use a more sophisticated algorithm
  // or potentially integrate with an AI service like OpenAI
  useEffect(() => {
    if (!query) {
      setResults(searchableItems);
      return;
    }

    // Simulate AI understanding with a more sophisticated search
    const lowerQuery = query.toLowerCase();
    
    // Perform "intelligent" search that understands semantics, not just keywords
    const filtered = searchableItems.filter((item) => {
      // Check direct matches
      const titleMatch = item.title.toLowerCase().includes(lowerQuery);
      const descMatch = item.description.toLowerCase().includes(lowerQuery);
      const categoryMatch = item.category.toLowerCase().includes(lowerQuery);
      const typeMatch = item.type.toLowerCase().includes(lowerQuery);
      
      // Semantic understanding (simple simulation)
      const isGenerationTool = 
        (lowerQuery.includes('image') || lowerQuery.includes('picture') || lowerQuery.includes('art')) && 
        (item.category === 'Image Generation');
        
      const isAssistantTool = 
        (lowerQuery.includes('chat') || lowerQuery.includes('talk') || lowerQuery.includes('assistant')) && 
        (item.category === 'AI Assistant');
        
      const isDataTool = 
        (lowerQuery.includes('data') || lowerQuery.includes('visualization') || lowerQuery.includes('chart')) && 
        (item.category === 'Data Science');
        
      return titleMatch || descMatch || categoryMatch || typeMatch || 
             isGenerationTool || isAssistantTool || isDataTool;
    });

    setResults(filtered);
  }, [query]);

  // Handle selection of an item
  const handleSelect = (item: typeof searchableItems[0]) => {
    setOpen(false);
    navigate(item.url);
  };

  // Get icon by type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tool':
        return <Wrench className="h-4 w-4 mr-2" />;
      case 'prompt':
        return <Code className="h-4 w-4 mr-2" />;
      case 'paper':
        return <FileText className="h-4 w-4 mr-2" />;
      case 'project':
        return <Layers className="h-4 w-4 mr-2" />;
      default:
        return <SearchCheck className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder="Search AI tools, prompts, papers, projects..." 
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          <div className="flex items-center justify-center py-6">
            <SearchX className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>No results found. Try a different search.</span>
          </div>
        </CommandEmpty>
        
        {results.length > 0 && (
          <>
            {/* Group results by type */}
            {['tool', 'prompt', 'paper', 'project'].map((type) => {
              const typeResults = results.filter(item => item.type === type);
              
              if (typeResults.length === 0) return null;
              
              return (
                <CommandGroup key={type} heading={`${type.charAt(0).toUpperCase() + type.slice(1)}s`}>
                  {typeResults.map((item) => (
                    <CommandItem 
                      key={item.id} 
                      onSelect={() => handleSelect(item)}
                      className="cursor-pointer"
                    >
                      {getTypeIcon(item.type)}
                      <div className="flex flex-col">
                        <span>{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchModal;
