'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

export default function CreateRitual() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ritualData, setRitualData] = useState({
    name: '',
    purpose: '',
    duration: '60',
    elements: [] as string[],
    trigger: '',
    triggerType: 'time',
    environment: '',
    values: [] as string[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setRitualData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setRitualData(prev => {
      const currentValues = [...prev[field as keyof typeof prev]] as string[];
      
      if (checked) {
        return {
          ...prev,
          [field]: [...currentValues, value]
        };
      } else {
        return {
          ...prev,
          [field]: currentValues.filter(item => item !== value)
        };
      }
    });
  };

  const purposeOptions = [
    { value: 'grounding', label: 'Grounding & Centering' },
    { value: 'transition', label: 'Transition Between Activities' },
    { value: 'connection', label: 'Connection With Others' },
    { value: 'reflection', label: 'Reflection & Awareness' },
    { value: 'celebration', label: 'Celebration & Gratitude' }
  ];

  const durationOptions = [
    { value: '30', label: '30 seconds' },
    { value: '60', label: '1 minute' },
    { value: '120', label: '2 minutes' },
    { value: '180', label: '3 minutes' },
    { value: '300', label: '5 minutes' }
  ];

  const triggerTypeOptions = [
    { value: 'time', label: 'Specific Time' },
    { value: 'location', label: 'Location' },
    { value: 'activity', label: 'After an Activity' }
  ];

  const elementOptions = [
    'Physical action', 
    'Breath focus', 
    'Verbal phrase', 
    'Visual focus', 
    'Sound', 
    'Touch'
  ];

  const valueOptions = [
    'Presence', 
    'Connection', 
    'Growth', 
    'Creativity', 
    'Rest', 
    'Gratitude', 
    'Focus', 
    'Joy', 
    'Reflection', 
    'Boundaries'
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!ritualData.name.trim()) {
        newErrors.name = 'Ritual name is required';
      }
      if (!ritualData.purpose) {
        newErrors.purpose = 'Please select a purpose';
      }
    } else if (step === 2) {
      if (ritualData.elements.length === 0) {
        newErrors.elements = 'Please select at least one element';
      }
      if (!ritualData.environment.trim()) {
        newErrors.environment = 'Environment is required';
      }
      if (ritualData.values.length === 0) {
        newErrors.values = 'Please select at least one value';
      } else if (ritualData.values.length > 3) {
        newErrors.values = 'Please select no more than 3 values';
      }
    } else if (step === 3) {
      if (!ritualData.trigger.trim()) {
        newErrors.trigger = 'Trigger is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate saving to localStorage
      const rituals = JSON.parse(localStorage.getItem('rituals') || '[]');
      const newRitual = {
        ...ritualData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      
      rituals.push(newRitual);
      localStorage.setItem('rituals', JSON.stringify(rituals));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to rituals page
      router.push('/rituals');
    } catch (error) {
      console.error('Error saving ritual:', error);
      setErrors({
        submit: 'There was an error saving your ritual. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fade-in max-w-2xl mx-auto">
      <h1>Create Your Micro-Ritual</h1>
      
      {/* Progress Indicator */}
      <div className="flex mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex-1">
            <div className={`h-2 ${currentStep >= step ? 'bg-primary' : 'bg-neutral'}`}></div>
            <p className={`text-xs mt-1 ${currentStep === step ? 'text-primary font-medium' : 'text-neutral-dark'}`}>
              {step === 1 && 'Basics'}
              {step === 2 && 'Elements'}
              {step === 3 && 'Trigger'}
              {step === 4 && 'Review'}
            </p>
          </div>
        ))}
      </div>
      
      <Card>
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <p className="text-neutral-dark mb-6">
              Start by defining the core aspects of your micro-ritual.
            </p>
            
            <Input
              label="Ritual Name"
              placeholder="e.g., Morning Threshold, Work Closing"
              value={ritualData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              helperText="Choose a name that will be meaningful to you"
              error={errors.name}
            />
            
            <Select
              label="Purpose"
              options={purposeOptions}
              value={ritualData.purpose}
              onChange={(value) => handleChange('purpose', value)}
              helperText="What is the primary intention of this ritual?"
              error={errors.purpose}
            />
            
            <Select
              label="Duration"
              options={durationOptions}
              value={ritualData.duration}
              onChange={(value) => handleChange('duration', value)}
              helperText="How long will this ritual take to complete?"
            />
            
            <div className="mt-8 flex justify-end">
              <Button onClick={nextStep}>
                Continue to Elements
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 2: Ritual Elements */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Ritual Elements</h2>
            <p className="text-neutral-dark mb-6">
              Define the specific actions and elements that make up your ritual.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Elements (Select all that apply)
              </label>
              <div className="space-y-2">
                {elementOptions.map((element) => (
                  <div key={element} className="flex items-center">
                    <input
                      type="checkbox"
                      id={element}
                      className="mr-2 h-4 w-4 text-primary focus:ring-primary border-neutral rounded"
                      checked={ritualData.elements.includes(element)}
                      onChange={(e) => handleCheckboxChange('elements', element, e.target.checked)}
                    />
                    <label htmlFor={element}>{element}</label>
                  </div>
                ))}
              </div>
              {errors.elements && (
                <p className="mt-1 text-sm text-red-600">{errors.elements}</p>
              )}
            </div>
            
            <Input
              label="Environment"
              placeholder="e.g., Home office, Front door, Kitchen"
              value={ritualData.environment}
              onChange={(e) => handleChange('environment', e.target.value)}
              helperText="Where will this ritual typically take place?"
              error={errors.environment}
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Values Connection (Select up to 3)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {valueOptions.map((value) => (
                  <div key={value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`value-${value}`}
                      className="mr-2 h-4 w-4 text-primary focus:ring-primary border-neutral rounded"
                      checked={ritualData.values.includes(value)}
                      onChange={(e) => handleCheckboxChange('values', value, e.target.checked)}
                    />
                    <label htmlFor={`value-${value}`}>{value}</label>
                  </div>
                ))}
              </div>
              {errors.values && (
                <p className="mt-1 text-sm text-red-600">{errors.values}</p>
              )}
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>
                Continue to Trigger
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 3: Ritual Trigger */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Ritual Trigger</h2>
            <p className="text-neutral-dark mb-6">
              Define what will initiate your ritual in your daily life.
            </p>
            
            <Select
              label="Trigger Type"
              options={triggerTypeOptions}
              value={ritualData.triggerType}
              onChange={(value) => handleChange('triggerType', value)}
              helperText="What type of cue will remind you to perform this ritual?"
            />
            
            <Input
              label="Specific Trigger"
              placeholder={
                ritualData.triggerType === 'time' ? 'e.g., 8:30 AM, Before lunch' :
                ritualData.triggerType === 'location' ? 'e.g., Front door, Desk, Car' :
                'e.g., After brushing teeth, Before opening email'
              }
              value={ritualData.trigger}
              onChange={(e) => handleChange('trigger', e.target.value)}
              helperText="Be as specific as possible to help build consistency"
              error={errors.trigger}
            />
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>
                Review Ritual
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Review Your Ritual</h2>
            <p className="text-neutral-dark mb-6">
              Review the details of your micro-ritual before saving.
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-medium">Name</h3>
                <p>{ritualData.name || 'Not specified'}</p>
              </div>
              
              <div>
                <h3 className="font-medium">Purpose</h3>
                <p>{purposeOptions.find(o => o.value === ritualData.purpose)?.label || 'Not specified'}</p>
              </div>
              
              <div>
                <h3 className="font-medium">Duration</h3>
                <p>{durationOptions.find(o => o.value === ritualData.duration)?.label || 'Not specified'}</p>
              </div>
              
              <div>
                <h3 className="font-medium">Elements</h3>
                <p>{ritualData.elements.length > 0 ? ritualData.elements.join(', ') : 'None selected'}</p>
              </div>
              
              <div>
                <h3 className="font-medium">Environment</h3>
                <p>{ritualData.environment || 'Not specified'}</p>
              </div>
              
              <div>
                <h3 className="font-medium">Values</h3>
                <p>{ritualData.values.length > 0 ? ritualData.values.join(', ') : 'None selected'}</p>
              </div>
              
              <div>
                <h3 className="font-medium">Trigger</h3>
                <p>
                  {triggerTypeOptions.find(o => o.value === ritualData.triggerType)?.label}: {ritualData.trigger || 'Not specified'}
                </p>
              </div>
            </div>
            
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {errors.submit}
              </div>
            )}
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Ritual'}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
