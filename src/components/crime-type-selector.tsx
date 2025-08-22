
'use client';

import { useState } from 'react';
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

  return (
    <div className="space-y-3">
      <Label>{t('reportForm.specificCrimeType')}</Label>
      <Input type="hidden" name="crimeSubType" value={selectedValue} />
      <div className="relative w-full rounded-full bg-muted p-1 grid" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)`}}>
        <div 
          className="absolute top-1 bottom-1 bg-primary rounded-full transition-all duration-300 ease-in-out shadow-md"
          style={{
            width: `calc(${100 / options.length}% - 4px)`,
            left: `calc(${(options.indexOf(selectedValue) / options.length) * 100}% + 2px)`
          }}
        />
        {options.map((option) => (
          <button
            key={option}
            type="button"
            disabled={isPending}
            onClick={() => setSelectedValue(option)}
            className={cn(
              "relative z-10 rounded-full py-1.5 text-sm font-medium transition-colors duration-300 ease-in-out",
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
