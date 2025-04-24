'use client';

import { useEffect } from 'react';
import { initializeWithSampleData } from '@/components/rituals/RitualService';

// This component initializes the application with sample data
export default function AppInitializer() {
  useEffect(() => {
    // Initialize with sample data if none exists
    initializeWithSampleData();
  }, []);
  
  // This component doesn't render anything
  return null;
}
