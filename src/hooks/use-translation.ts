'use client';

import { useLanguage } from '@/context/language-context';

type Params = {
  [key: string]: string | number;
};

export function useTranslation() {
  const { translations } = useLanguage();

  const t = (key: string, params?: Params): string => {
    const keys = key.split('.');
    let result = translations;
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key; // Return key if not found
      }
    }

    if (typeof result === 'string' && params) {
        return Object.entries(params).reduce(
            (acc, [paramKey, paramValue]) => acc.replace(`{${paramKey}}`, String(paramValue)),
            result
        );
    }

    return result || key;
  };

  return { t };
}
