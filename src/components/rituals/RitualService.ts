// RitualService.ts
// Service for managing ritual data and operations

export interface Ritual {
  id: string;
  name: string;
  purpose: string;
  duration: string;
  elements: string[];
  trigger: string;
  triggerType: 'time' | 'location' | 'activity';
  environment: string;
  values: string[];
  status: 'active' | 'paused' | 'archived';
  createdAt: string;
  lastPerformed?: string;
}

export interface RitualPerformance {
  ritualId: string;
  performedAt: string;
  completed: boolean;
  reflection?: string;
  meaningRating?: number; // 1-5 scale
}

// Get all rituals
export const getRituals = (): Ritual[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const rituals = localStorage.getItem('rituals');
    return rituals ? JSON.parse(rituals) : [];
  } catch (error) {
    console.error('Error getting rituals:', error);
    return [];
  }
};

// Get a single ritual by ID
export const getRitualById = (id: string): Ritual | undefined => {
  const rituals = getRituals();
  return rituals.find(ritual => ritual.id === id);
};

// Save a new ritual
export const saveRitual = (ritual: Omit<Ritual, 'id' | 'createdAt' | 'status'>): Ritual => {
  const rituals = getRituals();
  
  const newRitual: Ritual = {
    ...ritual,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: 'active'
  };
  
  localStorage.setItem('rituals', JSON.stringify([...rituals, newRitual]));
  
  return newRitual;
};

// Update an existing ritual
export const updateRitual = (updatedRitual: Ritual): Ritual => {
  const rituals = getRituals();
  const updatedRituals = rituals.map(ritual => 
    ritual.id === updatedRitual.id ? updatedRitual : ritual
  );
  
  localStorage.setItem('rituals', JSON.stringify(updatedRituals));
  
  return updatedRitual;
};

// Delete a ritual
export const deleteRitual = (id: string): boolean => {
  const rituals = getRituals();
  const filteredRituals = rituals.filter(ritual => ritual.id !== id);
  
  if (filteredRituals.length === rituals.length) {
    return false; // Ritual not found
  }
  
  localStorage.setItem('rituals', JSON.stringify(filteredRituals));
  return true;
};

// Change ritual status
export const changeRitualStatus = (id: string, status: 'active' | 'paused' | 'archived'): Ritual | undefined => {
  const rituals = getRituals();
  const ritualIndex = rituals.findIndex(ritual => ritual.id === id);
  
  if (ritualIndex === -1) {
    return undefined;
  }
  
  const updatedRitual = {
    ...rituals[ritualIndex],
    status
  };
  
  rituals[ritualIndex] = updatedRitual;
  localStorage.setItem('rituals', JSON.stringify(rituals));
  
  return updatedRitual;
};

// Record a ritual performance
export const recordRitualPerformance = (performance: Omit<RitualPerformance, 'performedAt'>): RitualPerformance => {
  const performances = getRitualPerformances();
  
  const newPerformance: RitualPerformance = {
    ...performance,
    performedAt: new Date().toISOString()
  };
  
  localStorage.setItem('ritualPerformances', JSON.stringify([...performances, newPerformance]));
  
  // Update the lastPerformed date on the ritual
  const rituals = getRituals();
  const ritualIndex = rituals.findIndex(ritual => ritual.id === performance.ritualId);
  
  if (ritualIndex !== -1) {
    rituals[ritualIndex] = {
      ...rituals[ritualIndex],
      lastPerformed: newPerformance.performedAt
    };
    
    localStorage.setItem('rituals', JSON.stringify(rituals));
  }
  
  return newPerformance;
};

// Get all performances for a ritual
export const getRitualPerformances = (): RitualPerformance[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const performances = localStorage.getItem('ritualPerformances');
    return performances ? JSON.parse(performances) : [];
  } catch (error) {
    console.error('Error getting ritual performances:', error);
    return [];
  }
};

// Get performances for a specific ritual
export const getPerformancesForRitual = (ritualId: string): RitualPerformance[] => {
  const performances = getRitualPerformances();
  return performances.filter(performance => performance.ritualId === ritualId);
};

// Get today's rituals
export const getTodaysRituals = (): Ritual[] => {
  const rituals = getRituals().filter(ritual => ritual.status === 'active');
  
  // For a real app, we would filter based on time, location, etc.
  // For now, we'll just return all active rituals
  return rituals;
};

// Initialize with sample data if empty
export const initializeWithSampleData = (): void => {
  const rituals = getRituals();
  
  if (rituals.length === 0) {
    const sampleRituals: Omit<Ritual, 'id' | 'createdAt' | 'status'>[] = [
      {
        name: 'Morning Threshold',
        purpose: 'grounding',
        duration: '30',
        elements: ['Physical action', 'Breath focus', 'Verbal phrase'],
        trigger: 'Before leaving home',
        triggerType: 'time',
        environment: 'Front door',
        values: ['Presence', 'Intention']
      },
      {
        name: 'Midday Pause',
        purpose: 'reflection',
        duration: '60',
        elements: ['Visual focus', 'Breath focus'],
        trigger: 'Before lunch',
        triggerType: 'time',
        environment: 'Window',
        values: ['Renewal', 'Focus']
      },
      {
        name: 'Work Closing',
        purpose: 'transition',
        duration: '120',
        elements: ['Physical action', 'Verbal phrase'],
        trigger: 'End of workday',
        triggerType: 'time',
        environment: 'Desk',
        values: ['Boundaries', 'Completion']
      }
    ];
    
    sampleRituals.forEach(ritual => saveRitual(ritual));
  }
};
