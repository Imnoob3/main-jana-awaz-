
'use client';

import { useState, useRef, useEffect } from 'react';
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
}

export function CrimeTypeSelector({ crimeType, isPending }: CrimeTypeSelectorProps) {
  const { t } = useTranslation();
  const options = crimeType === 'government' ? governmentCrimeTypes : civilianCrimeTypes;
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [bubbleStyle, setBubbleStyle] = useState({});
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const selectedIndex = options.indexOf(selectedValue);
    const selectedButton = buttonsRef.current[selectedIndex];
    const container = containerRef.current;
    
    if (selectedButton && container) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = selectedButton.getBoundingClientRect();

        setBubbleStyle({
          width: `${buttonRect.width}px`,
          height: `${buttonRect.height}px`,
          top: `${buttonRect.top - containerRect.top}px`,
          left: `${buttonRect.left - containerRect.left}px`,
        });
    }
  }, [selectedValue, options]);


  return (
    <div className="space-y-3">
      <Label>{t('reportForm.specificCrimeType')}</Label>
      <Input type="hidden" name="crimeSubType" value={selectedValue} />
      <div ref={containerRef} className="relative w-full rounded-2xl bg-muted p-1 flex flex-wrap justify-center items-center gap-1">
        <div 
          className="absolute bg-primary rounded-full transition-all duration-300 ease-in-out shadow-md"
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
            {t(`crimeSubTypes.${option.toLowerCase().replace(/ /g, '')}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
