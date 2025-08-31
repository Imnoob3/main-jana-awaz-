
'use client';

import { useRef, useState, useEffect } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle, Landmark, Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { Checkbox } from './ui/checkbox';
import { submitIccReport } from '@/app/report/icc/actions';
import { IccFormState } from '@/app/report/icc/schema';

function SubmitButton() {
    const { pending } = useFormStatus();
    const { t } = useTranslation();
    return (
        <Button type="submit" className="w-full" variant="destructive" disabled={pending}>
            {pending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('reportForm.submitting')}
              </>
            ) : (
              t('home.iccSection.reportButton')
            )}
        </Button>
    );
}

export function IccReportForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  
  const initialState: IccFormState = {};
  const [state, dispatch] = useActionState(submitIccReport, initialState);

  useEffect(() => {
    if (state.message && state.errors) {
      toast({
        variant: 'destructive',
        title: t('toast.submissionError.title'),
        description: state.message,
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
    <>
    <form action={dispatch}>
      <Card className="w-full max-w-2xl mx-auto border-destructive/50">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-destructive/10 p-3 rounded-lg w-fit">
              <Landmark className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-center">{t('iccReportForm.title')}</CardTitle>
          <CardDescription className="text-center">
            {t('iccReportForm.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('iccReportForm.warningTitle')}</AlertTitle>
            <AlertDescription>{t('iccReportForm.warningDescription')}</AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="reportText">{t('reportForm.reportDetails')}</Label>
            <Textarea
              id="reportText"
              name="reportText"
              placeholder={t('reportForm.reportDetailsPlaceholder')}
              rows={8}
              required
            />
            {state.errors?.reportText && <p className="text-sm font-medium text-destructive">{state.errors.reportText[0]}</p>}
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
                className="flex justify-center w-full h-48 px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer hover:border-destructive transition-colors"
                onClick={() => photoInputRef.current?.click()}
                onKeyDown={(e) => e.key === 'Enter' && photoInputRef.current?.click()}
                tabIndex={0}
                role="button"
                aria-label={t('reportForm.uploadPhotoAriaLabel')}
              >
                <div className="space-y-1 text-center flex flex-col justify-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-destructive">{t('reportForm.clickToUpload')}</span> {t('reportForm.dragAndDrop')}
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
            />
            {state.errors?.photoDataUri && <p className="text-sm font-medium text-destructive">{state.errors.photoDataUri[0]}</p>}
          </div>
          
           <div className="items-top flex space-x-2">
            <Checkbox id="agreeWarning" name="agreeWarning" required/>
            <div className="grid gap-1.5 leading-none">
                <label
                htmlFor="agreeWarning"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                {t('iccReportForm.agreeWarning')}
                </label>
                 {state.errors?.agreeWarning && <p className="text-sm font-medium text-destructive">{state.errors.agreeWarning[0]}</p>}
            </div>
          </div>


        </CardContent>
        <CardFooter className="flex-col items-stretch gap-4">
         <SubmitButton />
        </CardFooter>
      </Card>
    </form>
    </>
  );
}
