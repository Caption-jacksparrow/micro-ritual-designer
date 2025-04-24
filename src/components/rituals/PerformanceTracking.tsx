'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { Ritual, RitualPerformance, getPerformancesForRitual } from './RitualService';

interface PerformanceTrackingProps {
  ritual: Ritual;
}

export default function PerformanceTracking({ ritual }: PerformanceTrackingProps) {
  const [performances, setPerformances] = useState<RitualPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load performances for this ritual
    const loadPerformances = () => {
      const ritualPerformances = getPerformancesForRitual(ritual.id);
      // Sort by date, most recent first
      ritualPerformances.sort((a, b) => 
        new Date(b.performedAt).getTime() - new Date(a.performedAt).getTime()
      );
      setPerformances(ritualPerformances);
      setLoading(false);
    };
    
    loadPerformances();
  }, [ritual.id]);
  
  // Calculate statistics
  const completedCount = performances.filter(p => p.completed).length;
  const totalCount = performances.length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  // Calculate average meaning rating
  const ratingsCount = performances.filter(p => p.meaningRating !== undefined).length;
  const totalRating = performances.reduce((sum, p) => sum + (p.meaningRating || 0), 0);
  const averageRating = ratingsCount > 0 ? (totalRating / ratingsCount).toFixed(1) : 'N/A';
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Ritual Tracking</h3>
      
      {loading ? (
        <p>Loading performance data...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="text-center p-4">
              <p className="text-sm text-neutral-dark mb-1">Completion Rate</p>
              <p className="text-2xl font-bold">{completionRate}%</p>
              <p className="text-xs text-neutral-dark">{completedCount} of {totalCount} times</p>
            </Card>
            
            <Card className="text-center p-4">
              <p className="text-sm text-neutral-dark mb-1">Average Meaning</p>
              <p className="text-2xl font-bold">{averageRating}</p>
              <p className="text-xs text-neutral-dark">out of 5</p>
            </Card>
            
            <Card className="text-center p-4">
              <p className="text-sm text-neutral-dark mb-1">Last Performed</p>
              <p className="text-2xl font-bold">
                {performances.length > 0 
                  ? formatDate(performances[0].performedAt).split(',')[0]
                  : 'Never'}
              </p>
              <p className="text-xs text-neutral-dark">
                {performances.length > 0 
                  ? formatDate(performances[0].performedAt).split(',')[1]
                  : ''}
              </p>
            </Card>
          </div>
          
          <h4 className="font-medium mb-2">Recent Reflections</h4>
          
          {performances.length === 0 ? (
            <p className="text-neutral-dark italic">No performance data yet.</p>
          ) : (
            <div className="space-y-4">
              {performances.slice(0, 5).map((performance, index) => (
                <Card key={index} className={`p-4 ${!performance.completed ? 'opacity-70' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm text-neutral-dark">
                      {formatDate(performance.performedAt)}
                    </p>
                    <div className="flex items-center">
                      {performance.meaningRating && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary mr-2">
                          {performance.meaningRating}/5
                        </span>
                      )}
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        performance.completed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {performance.completed ? 'Completed' : 'Skipped'}
                      </span>
                    </div>
                  </div>
                  
                  {performance.reflection ? (
                    <p className="text-neutral-dark italic">"{performance.reflection}"</p>
                  ) : (
                    <p className="text-neutral-dark text-sm italic">No reflection recorded</p>
                  )}
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
