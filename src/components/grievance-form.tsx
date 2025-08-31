
'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitGrievance } from '@/app/grievance/actions';
import type { GrievanceFormState } from '@/app/grievance/schema';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle, Loader2, MessageSquareWarning, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

const initialState: GrievanceFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useTranslation();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('reportForm.submitting')}
        </>
      ) : (
        'Submit Grievance Anonymously'
      )}
    </Button>
  );
}

export function GrievanceForm() {
  const { t } = useTranslation();
  const [state, formAction] = useActionState(submitGrievance, initialState);
  const { toast } = useToast();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  
  // We need to get the pending state from the form status to disable inputs
  const { pending: isPending } = useFormStatus();

  useEffect(() => {
    if (state?.message && state?.errors) {
      const errorMsg = state.errors?.title?.[0] 
        || state.errors?.description?.[0] 
        || state.errors?.photoDataUri?.[0] 
        || state.message;
      toast({
        variant: "destructive",
        title: t('toast.submissionError.title'),
        description: errorMsg,
      });
    } else if (state?.message) {
       toast({
        variant: "destructive",
        title: t('toast.error'),
        description: state.message,
      });
    }
  }, [state, t, toast]);

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
        <Card className="w-full max-w-2xl mx-auto shadow-2xl">
          <CardHeader>
            <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                    <MessageSquareWarning className="h-8 w-8 text-primary" />
                </div>
            </div>
            <CardTitle className="text-center">Voice a Grievance</CardTitle>
            <CardDescription className="text-center">
              Submit your concerns about rules, governance, or social issues. Your submission is anonymous.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Grievance Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="A brief title for your grievance"
                required
                aria-invalid={!!state?.errors?.title}
                aria-describedby="title-error"
                disabled={isPending}
                className="shadow-lg"
              />
              {state?.errors?.title && <p id="title-error" className="text-sm font-medium text-destructive">{state.errors.title[0]}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the issue in detail. What is the problem, who does it affect, and what change would you like to see?"
                rows={8}
                required
                aria-invalid={!!state?.errors?.description}
                aria-describedby="description-error"
                disabled={isPending}
                className="shadow-lg"
              />
              {state?.errors?.description && <p id="description-error" className="text-sm font-medium text-destructive">{state.errors.description[0]}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Upload Supporting Photo (Optional)</Label>
              <input type="hidden" name="photoDataUri" value={photoPreview || ''} />
              {photoPreview ? (
                <div className="relative group">
                  <Image src={photoPreview} alt="Photo preview" width={500} height={300} className="rounded-md object-cover w-full h-auto max-h-80 border shadow-lg" />
                  <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={removePhoto} disabled={isPending}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">{t('reportForm.removePhoto')}</span>
                  </Button>
                </div>
              ) : (
                <div 
                  className={cn(
                    "flex justify-center w-full h-48 px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors shadow-lg",
                    !isPending && "cursor-pointer hover:border-primary",
                    isPending && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => !isPending && photoInputRef.current?.click()}
                  onKeyDown={(e) => !isPending && e.key === 'Enter' && photoInputRef.current?.click()}
                  tabIndex={isPending ? -1 : 0}
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
                  aria-invalid={!!state?.errors?.photoDataUri}
                  aria-describedby="photo-error"
                  disabled={isPending}
              />
              {state?.errors?.photoDataUri && <p id="photo-error" className="text-sm font-medium text-destructive">{state.errors.photoDataUri[0]}</p>}
            </div>

          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
            {state?.message && !state?.errors && (
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
