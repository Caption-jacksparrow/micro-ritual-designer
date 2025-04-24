'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ReflectionForm from '@/components/rituals/ReflectionForm';
import PerformanceTracking from '@/components/rituals/PerformanceTracking';
import { Ritual, getRitualById, changeRitualStatus } from '@/components/rituals/RitualService';

export default function RitualDetail() {
  const params = useParams();
  const [ritual, setRitual] = useState<Ritual | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReflection, setShowReflection] = useState(false);
  const [statusChanging, setStatusChanging] = useState(false);
  
  useEffect(() => {
    if (params.id) {
      const ritualId = Array.isArray(params.id) ? params.id[0] : params.id;
      const ritualData = getRitualById(ritualId);
      setRitual(ritualData || null);
      setLoading(false);
    }
  }, [params.id]);
  
  const handleStatusChange = async (newStatus: 'active' | 'paused' | 'archived') => {
    if (!ritual) return;
    
    setStatusChanging(true);
    
    try {
      const updatedRitual = changeRitualStatus(ritual.id, newStatus);
      if (updatedRitual) {
        setRitual(updatedRitual);
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error changing ritual status:', error);
    } finally {
      setStatusChanging(false);
    }
  };
  
  const handleReflectionComplete = () => {
    setShowReflection(false);
  };
  
  if (loading) {
    return <div>Loading ritual details...</div>;
  }
  
  if (!ritual) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Ritual Not Found</h2>
        <p className="text-neutral-dark mb-6">The ritual you're looking for doesn't exist or has been removed.</p>
        <Link href="/rituals" className="btn-primary">
          Back to Rituals
        </Link>
      </div>
    );
  }
  
  // Format duration for display
  const formatDuration = (duration: string) => {
    switch (duration) {
      case '30': return '30 seconds';
      case '60': return '1 minute';
      case '120': return '2 minutes';
      case '180': return '3 minutes';
      case '300': return '5 minutes';
      default: return duration;
    }
  };
  
  // Get purpose label
  const getPurposeLabel = (purpose: string) => {
    const purposeMap: Record<string, string> = {
      'grounding': 'Grounding & Centering',
      'transition': 'Transition Between Activities',
      'connection': 'Connection With Others',
      'reflection': 'Reflection & Awareness',
      'celebration': 'Celebration & Gratitude'
    };
    
    return purposeMap[purpose] || purpose;
  };
  
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <Link href="/rituals" className="text-primary hover:underline">
          &larr; Back to Rituals
        </Link>
        
        <div className="flex space-x-2">
          {ritual.status === 'active' ? (
            <Button 
              variant="outline" 
              onClick={() => handleStatusChange('paused')}
              disabled={statusChanging}
            >
              Pause Ritual
            </Button>
          ) : ritual.status === 'paused' ? (
            <Button 
              variant="outline" 
              onClick={() => handleStatusChange('active')}
              disabled={statusChanging}
            >
              Activate Ritual
            </Button>
          ) : null}
          
          {ritual.status !== 'archived' && (
            <Button 
              variant="secondary" 
              onClick={() => handleStatusChange('archived')}
              disabled={statusChanging}
            >
              Archive Ritual
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold mb-0">{ritual.name}</h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                ritual.status === 'active' ? 'bg-green-100 text-green-800' :
                ritual.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                'bg-neutral text-neutral-dark'
              }`}>
                {ritual.status.charAt(0).toUpperCase() + ritual.status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium mb-1">Purpose</h3>
                <p>{getPurposeLabel(ritual.purpose)}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Duration</h3>
                <p>{formatDuration(ritual.duration)}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Trigger</h3>
                <p>
                  <span className="font-medium">
                    {ritual.triggerType === 'time' ? 'Time: ' :
                     ritual.triggerType === 'location' ? 'Location: ' :
                     'Activity: '}
                  </span>
                  {ritual.trigger}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Environment</h3>
                <p>{ritual.environment}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Elements</h3>
              <div className="flex flex-wrap gap-2">
                {ritual.elements.map((element, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-1 rounded-md text-sm bg-neutral-light text-neutral-dark">
                    {element}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Values</h3>
              <div className="flex flex-wrap gap-2">
                {ritual.values.map((value, index) => (
                  <span key={index} className="value-tag">
                    {value}
                  </span>
                ))}
              </div>
            </div>
            
            {ritual.status === 'active' && (
              <div className="mt-8 flex justify-center">
                <Button onClick={() => setShowReflection(true)}>
                  Record Reflection
                </Button>
              </div>
            )}
          </Card>
          
          {showReflection && (
            <div className="mt-6">
              <ReflectionForm 
                ritual={ritual} 
                onComplete={handleReflectionComplete} 
              />
            </div>
          )}
        </div>
        
        <div>
          <Card>
            <PerformanceTracking ritual={ritual} />
          </Card>
        </div>
      </div>
    </div>
  );
}
