'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Ritual, RitualPerformance, getPerformancesForRitual, recordRitualPerformance } from './RitualService';

interface ReflectionFormProps {
  ritual: Ritual;
  onComplete: () => void;
}

export default function ReflectionForm({ ritual, onComplete }: ReflectionFormProps) {
  const [reflection, setReflection] = useState('');
  const [meaningRating, setMeaningRating] = useState<number>(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Record the reflection
      recordRitualPerformance({
        ritualId: ritual.id,
        completed: true,
        reflection,
        meaningRating
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onComplete();
    } catch (error) {
      console.error('Error saving reflection:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="mb-6">
      <h3 className="text-xl font-semibold mb-4">Reflect on your ritual</h3>
      <p className="text-neutral-dark mb-6">
        Taking a moment to reflect helps deepen the impact of your ritual practice.
      </p>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          How meaningful was this ritual experience?
        </label>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => setMeaningRating(rating)}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${meaningRating === rating ? 'bg-primary text-white' : 'bg-neutral text-neutral-dark'}
              `}
            >
              {rating}
            </button>
          ))}
        </div>
        <p className="text-xs text-neutral-dark mt-1">
          1 = Not meaningful, 5 = Deeply meaningful
        </p>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          What did you notice during or after this ritual? (optional)
        </label>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          className="input-field min-h-[100px]"
          placeholder="e.g., I felt more centered, I noticed tension in my shoulders, I was distracted by thoughts of work..."
        />
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Reflection'}
        </Button>
      </div>
    </Card>
  );
}
