'use client';

import { useState } from 'react';

interface SelectProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

export default function Select({
  label,
  options,
  value,
  onChange,
  helperText,
  error,
  fullWidth = true
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4 relative`}>
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      
      <button
        type="button"
        className={`
          input-field flex justify-between items-center
          ${error ? 'border-red-500 focus:ring-red-500/50' : ''}
          ${fullWidth ? 'w-full' : ''}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption?.label || 'Select an option'}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {options.map((option) => (
              <li 
                key={option.value}
                className={`
                  px-3 py-2 cursor-pointer hover:bg-primary/10
                  ${option.value === value ? 'bg-primary/20 text-primary' : 'text-neutral-dark'}
                `}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-neutral-dark">
          {helperText}
        </p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
