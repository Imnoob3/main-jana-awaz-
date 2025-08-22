
'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';
import { Input } from './ui/input';

const governmentCrimeTypes = [
  'Bribery',
  'Embezzlement',
  'Nepotism',
  'Abuse of Authority',
  'Other',
];

const civilianCrimeTypes = [
  'Theft',
  'Assault',
  'Vandalism',
  'Fraud',
  'Other',
];

interface CrimeTypeSelectorProps {
  crimeType: 'government' | 'civilian';
  isPending: boolean;
  error?: string;
}

export function CrimeTypeSelector({ crimeType, isPending, error }: CrimeTypeSelectorProps) {
  const { t } = useTranslation();
  const options = crimeType === 'government' ? governmentCrimeTypes : civilianCrimeTypes;
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [bubbleStyle, setBubbleStyle] = useState({});
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);


  useLayoutEffect(() => {
    const selectedIndex = options.indexOf(selectedValue);
    const selectedButton = buttonsRef.current[selectedIndex];
    const container = containerRef.current;
    
    if (selectedButton && container) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = selectedButton.getBoundingClientRect();

        setBubbleStyle({
          width: `${buttonRect.width}px`,
          left: `${buttonRect.left - containerRect.left}px`,
        });
    }
  }, [selectedValue, options]);


  return (
    <div className="space-y-3">
      <Label>{t('reportForm.specificCrimeType')}</Label>
      <Input type="hidden" name="crimeSubType" value={selectedValue} />
      <div ref={containerRef} className="relative w-full rounded-full bg-muted p-1 flex justify-between items-center">
        <div 
          className="absolute top-1 bottom-1 bg-primary rounded-full transition-all duration-300 ease-in-out shadow-md"
          style={bubbleStyle}
        />
        {options.map((option, index) => (
          <button
            key={option}
            ref={el => buttonsRef.current[index] = el}
            type="button"
            disabled={isPending}
            onClick={() => setSelectedValue(option)}
            className={cn(
              "relative z-10 rounded-full py-1.5 px-4 text-sm font-medium transition-colors duration-300 ease-in-out flex-grow text-center",
              selectedValue === option ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t(`crimeSubTypes.${option.toLowerCase().replace(' ', '')}`)}
          </button>
        ))}
      </div>
       {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}
