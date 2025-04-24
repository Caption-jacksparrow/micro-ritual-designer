'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function Card({ 
  children, 
  className = '', 
  onClick, 
  hoverable = false 
}: CardProps) {
  const baseClasses = 'bg-white p-6 rounded-lg shadow-sm';
  const hoverClasses = hoverable ? 'hover:shadow-md transition-shadow cursor-pointer' : '';
  const combinedClasses = `${baseClasses} ${hoverClasses} ${className}`;
  
  return (
    <div 
      className={combinedClasses}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
