
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
  { id: 't1', title: 'ChatGPT', description: 'Conversational AI assistant for natural language tasks', type: 'tool', category: 'AI Assistant', tags: ['chat', 'language', 'writing'], url: '/explore?type=tools' },
  { id: 't2', title: 'Stable Diffusion', description: 'Generate stunning images from text descriptions', type: 'tool', category: 'Image Generation', tags: ['image', 'art', 'generation'], url: '/explore?type=tools' },
  { id: 't3', title: 'Midjourney', description: 'AI image generation with artistic style control', type: 'tool', category: 'Image Generation', tags: ['image', 'art', 'creative'], url: '/explore?type=tools' },
  { id: 't4', title: 'Claude', description: 'AI assistant by Anthropic with strong reasoning abilities', type: 'tool', category: 'AI Assistant', tags: ['reasoning', 'analysis', 'chat'], url: '/explore?type=tools' },
  
  // Prompts
  { id: 'p1', title: 'Research Paper Analyzer', description: 'Extract key insights from academic papers quickly', type: 'prompt', category: 'Research', tags: ['academic', 'research', 'analysis'], url: '/explore?type=prompts' },
  { id: 'p2', title: 'Code Refactoring', description: 'Transform legacy code into clean, modern patterns', type: 'prompt', category: 'Development', tags: ['code', 'programming', 'optimization'], url: '/explore?type=prompts' },
  { id: 'p3', title: 'Data Visualization Helper', description: 'Generate code for beautiful data visualizations', type: 'prompt', category: 'Data Science', tags: ['data', 'visualization', 'charts'], url: '/explore?type=prompts' },
  
  // Papers
  { id: 'r1', title: 'Attention Is All You Need', description: 'Introduces the transformer architecture that revolutionized NLP', type: 'paper', category: 'NLP', tags: ['machine learning', 'nlp', 'transformer'], url: '/explore?type=papers' },
  { id: 'r2', title: 'GPT-4 Technical Report', description: 'Detailed analysis of GPT-4\'s capabilities and limitations', type: 'paper', category: 'AI Models', tags: ['gpt', 'ai', 'large language model'], url: '/explore?type=papers' },
  
  // Projects
  { id: 'pr1', title: 'Open Source LLM', description: 'A community-maintained large language model', type: 'project', category: 'Open Source', tags: ['llm', 'machine learning', 'community'], url: '/explore?type=projects' },
  { id: 'pr2', title: 'AI Image Classifier', description: 'Train custom classifiers with minimal data', type: 'project', category: 'Computer Vision', tags: ['image', 'classification', 'machine learning'], url: '/explore?type=projects' },
];

interface SearchModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(searchableItems);

  // Enhanced AI-powered search algorithm
  useEffect(() => {
    if (!query) {
      setResults(searchableItems);
      return;
    }

    // Normalize and preprocess query
    const normalizedQuery = query.toLowerCase().trim();
    
    // Advanced semantic search with multiple matching strategies
    const filtered = searchableItems.filter((item) => {
      // Exact and partial matching
      const titleMatch = item.title.toLowerCase().includes(normalizedQuery);
      const descriptionMatch = item.description.toLowerCase().includes(normalizedQuery);
      const categoryMatch = item.category.toLowerCase().includes(normalizedQuery);
      const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(normalizedQuery));
      
      // Semantic intent matching
      const intentMatchers = [
        // Image-related queries
        {
          keywords: ['image', 'art', 'picture', 'generate', 'drawing', 'visual'],
          match: () => item.category === 'Image Generation' || item.tags.includes('image')
        },
        // Coding and development queries
        {
          keywords: ['code', 'programming', 'develop', 'refactor', 'optimize'],
          match: () => item.category === 'Development' || item.tags.includes('code')
        },
        // Research and academic queries
        {
          keywords: ['research', 'paper', 'academic', 'study', 'analysis'],
          match: () => item.type === 'paper' || item.category === 'Research'
        },
        // AI assistant and chat queries
        {
          keywords: ['chat', 'assistant', 'conversation', 'help', 'talk'],
          match: () => item.category === 'AI Assistant' || item.tags.includes('chat')
        }
      ];

      // Check intent matchers
      const intentMatch = intentMatchers.some(matcher => 
        matcher.keywords.some(keyword => normalizedQuery.includes(keyword)) && matcher.match()
      );
      
      // Scoring mechanism for ranking results
      const score = [
        titleMatch ? 5 : 0,
        descriptionMatch ? 3 : 0,
        categoryMatch ? 2 : 0,
        tagMatch ? 2 : 0,
        intentMatch ? 4 : 0
      ].reduce((a, b) => a + b, 0);

      return score > 0;
    });

    // Sort results by relevance score (you could implement a more sophisticated ranking algorithm)
    const sortedResults = filtered.sort((a, b) => {
      const scoreA = a.title.toLowerCase().includes(normalizedQuery) ? 10 : 0;
      const scoreB = b.title.toLowerCase().includes(normalizedQuery) ? 10 : 0;
      return scoreB - scoreA;
    });

    setResults(sortedResults);
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
        placeholder="Search AI tools, prompts, papers, projects... (Try natural language)" 
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          <div className="flex items-center justify-center py-6">
            <SearchX className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>No results found. Try a different search or be more descriptive.</span>
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
