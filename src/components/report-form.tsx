'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { submitReport } from '@/app/report/actions';
import type { FormState } from '@/app/report/schema';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle, Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useTranslation();
  return (
    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('reportForm.submitting')}
        </>
      ) : (
        t('reportForm.submitAnonymously')
      )}
    </Button>
  );
}

export function ReportForm() {
  const { t } = useTranslation();
  const [state, formAction] = useActionState(submitReport, initialState);
  const { toast } = useToast();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.message && state.errors) {
      const errorMsg = state.errors.reportText?.[0] || state.errors.photoDataUri?.[0] || state.message;
      toast({
        variant: "destructive",
        title: t('toast.submissionError.title'),
        description: errorMsg,
      });
    }
  }, [state, toast, t]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
          toast({ 
            variant: "destructive", 
            title: t('toast.fileTooLarge.title'), 
            description: t('toast.fileTooLarge.description') 
          });
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    if(photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  };

  return (
    <form action={formAction}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{t('reportForm.title')}</CardTitle>
          <CardDescription>
            {t('reportForm.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="reportText">{t('reportForm.reportDetails')}</Label>
            <Textarea
              id="reportText"
              name="reportText"
              placeholder={t('reportForm.reportDetailsPlaceholder')}
              rows={8}
              required
              aria-invalid={!!state.errors?.reportText}
              aria-describedby="reportText-error"
            />
            {state.errors?.reportText && <p id="reportText-error" className="text-sm font-medium text-destructive">{state.errors.reportText[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">{t('reportForm.uploadEvidence')}</Label>
            <input type="hidden" name="photoDataUri" value={photoPreview || ''} />
            {photoPreview ? (
              <div className="relative group">
                <Image src={photoPreview} alt="Photo preview" width={500} height={300} className="rounded-md object-cover w-full h-auto max-h-80 border" />
                <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={removePhoto}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">{t('reportForm.removePhoto')}</span>
                </Button>
              </div>
            ) : (
              <div 
                className="flex justify-center w-full h-48 px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer hover:border-primary transition-colors"
                onClick={() => photoInputRef.current?.click()}
                onKeyDown={(e) => e.key === 'Enter' && photoInputRef.current?.click()}
                tabIndex={0}
                role="button"
                aria-label={t('reportForm.uploadPhotoAriaLabel')}
              >
                <div className="space-y-1 text-center flex flex-col justify-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">{t('reportForm.clickToUpload')}</span> {t('reportForm.dragAndDrop')}
                  </p>
                  <p className="text-xs text-muted-foreground">{t('reportForm.fileTypes')}</p>
                </div>
              </div>
            )}
             <Input
                id="photo"
                name="photo"
                type="file"
                className="hidden"
                ref={photoInputRef}
                accept="image/png, image/jpeg"
                onChange={handlePhotoChange}
                required
                aria-invalid={!!state.errors?.photoDataUri}
                aria-describedby="photo-error"
            />
            {state.errors?.photoDataUri && <p id="photo-error" className="text-sm font-medium text-destructive">{state.errors.photoDataUri[0]}</p>}
          </div>

        </CardContent>
        <CardFooter className="flex-col items-stretch gap-4">
          {state.message && !state.errors && (
             <Alert variant="destructive">
               <AlertCircle className="h-4 w-4" />
               <AlertTitle>{t('toast.error')}</AlertTitle>
               <AlertDescription>{state.message}</AlertDescription>
             </Alert>
          )}
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
