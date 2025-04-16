
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingPlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  name,
  price,
  description,
  features,
  highlighted = false,
}) => (
  <div className={`
    rounded-2xl border ${highlighted ? 'border-primary/50 bg-primary/5' : 'border-border bg-card'}
    p-6 shadow-lg
  `}>
    <div className="mb-6">
      <h3 className={`text-2xl font-bold ${highlighted ? 'text-primary' : ''}`}>{name}</h3>
      <p className="text-muted-foreground mt-1">{description}</p>
    </div>
    
    <div className="mb-6">
      <span className="text-4xl font-bold">{price}</span>
      {price !== 'Free' && <span className="text-muted-foreground ml-2">/month</span>}
    </div>
    
    <ul className="mb-8 space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className={`mr-2 h-5 w-5 ${highlighted ? 'text-primary' : ''}`} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    
    <Button className={`w-full ${highlighted ? 'bg-primary hover:bg-primary/90' : ''}`}>
      Get Started
    </Button>
  </div>
);

const Premium: React.FC = () => {
  return (
    <div className="container py-12 mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Upgrade Your AI Experience</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get access to premium AI prompt templates and exclusive resources
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <PricingPlan 
          name="Free"
          price="Free"
          description="Essential access to NGC resources"
          features={[
            "Browse public AI tools",
            "Access community forum",
            "Basic prompt templates",
            "Limited research papers"
          ]}
        />
        
        <PricingPlan 
          name="Pro"
          price="$9.99"
          description="Advanced features for AI enthusiasts"
          features={[
            "Everything in Free",
            "250+ premium prompt templates",
            "Full research paper access",
            "Save favorite resources",
            "Priority support"
          ]}
          highlighted={true}
        />
        
        <PricingPlan 
          name="Enterprise"
          price="$29.99"
          description="Complete solution for teams & businesses"
          features={[
            "Everything in Pro",
            "API access",
            "Team collaboration tools",
            "Custom prompt development",
            "Dedicated account manager",
            "Training sessions"
          ]}
        />
      </div>
      
      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-4">Questions about our premium plans?</p>
        <Button variant="outline">Contact Sales</Button>
      </div>
    </div>
  );
};

export default Premium;
