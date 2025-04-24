'use client';

import { useEffect, useState } from 'react';
import { Ritual, getTodaysRituals, recordRitualPerformance } from './RitualService';

interface NotificationState {
  showNotification: boolean;
  currentRitual: Ritual | null;
  isCompleting: boolean;
}

export default function NotificationSystem() {
  const [state, setState] = useState<NotificationState>({
    showNotification: false,
    currentRitual: null,
    isCompleting: false
  });
  
  // Check for rituals that need to be performed
  useEffect(() => {
    // For demo purposes, we'll manually trigger notifications
    // In a production app, this would use a proper notification system
    const checkForDueRituals = () => {
      const todaysRituals = getTodaysRituals();
      
      if (todaysRituals.length > 0 && !state.showNotification) {
        // For demo, just show the first ritual
        setState({
          showNotification: true,
          currentRitual: todaysRituals[0],
          isCompleting: false
        });
      }
    };
    
    // Check immediately on mount
    checkForDueRituals();
    
    // Note: In a production app, we would use a proper notification system
    // instead of setInterval, which is used here for demonstration purposes only
    
    return () => {
      // Cleanup function
    };
  }, [state.showNotification]);
  
  // Function to manually trigger a notification (for demo purposes)
  const triggerNotification = () => {
    const todaysRituals = getTodaysRituals();
    if (todaysRituals.length > 0 && !state.showNotification) {
      setState({
        showNotification: true,
        currentRitual: todaysRituals[0],
        isCompleting: false
      });
    }
  };
  
  const handleComplete = () => {
    if (!state.currentRitual) return;
    
    setState(prev => ({ ...prev, isCompleting: true }));
    
    // Record the ritual performance
    recordRitualPerformance({
      ritualId: state.currentRitual.id,
      completed: true
    });
    
    // Close notification after a brief delay
    setTimeout(() => {
      setState({
        showNotification: false,
        currentRitual: null,
        isCompleting: false
      });
    }, 1500);
  };
  
  const handleDismiss = () => {
    if (!state.currentRitual) return;
    
    // Record the ritual as not completed
    recordRitualPerformance({
      ritualId: state.currentRitual.id,
      completed: false
    });
    
    setState({
      showNotification: false,
      currentRitual: null,
      isCompleting: false
    });
  };
  
  return (
    <>
      {/* Demo button to trigger notifications - would be removed in production */}
      <button 
        onClick={triggerNotification}
        className="fixed bottom-4 left-4 bg-primary text-white px-3 py-1 rounded-md text-sm"
        aria-label="Demo: Trigger notification"
      >
        Demo: Trigger Ritual Notification
      </button>
      
      {/* Actual notification */}
      {state.showNotification && state.currentRitual && (
        <div className="fixed bottom-4 right-4 max-w-sm w-full bg-white dark:bg-neutral-light rounded-lg shadow-lg p-4 border border-neutral animate-slide-up z-50">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">Time for your ritual</h3>
            <button 
              onClick={handleDismiss}
              className="text-neutral-dark hover:text-primary"
              aria-label="Dismiss notification"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="mb-4">
            <p className="font-medium">{state.currentRitual.name}</p>
            <p className="text-sm text-neutral-dark">
              {state.currentRitual.duration === '30' ? '30 seconds' :
               state.currentRitual.duration === '60' ? '1 minute' :
               state.currentRitual.duration === '120' ? '2 minutes' :
               state.currentRitual.duration === '180' ? '3 minutes' :
               '5 minutes'}
            </p>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button 
              onClick={handleDismiss}
              className="px-3 py-1 text-sm text-neutral-dark hover:text-primary"
              disabled={state.isCompleting}
            >
              Skip for now
            </button>
            <button 
              onClick={handleComplete}
              className="btn-primary text-sm"
              disabled={state.isCompleting}
            >
              {state.isCompleting ? 'Completing...' : 'Complete Ritual'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
