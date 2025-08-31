
'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Upload, X, Shield, Users } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { districtsOfNepal } from '@/lib/districts';
import { CrimeTypeSelector } from './crime-type-selector';


function SubmitButton({ isPending }: { isPending: boolean }) {
    const { t } = useTranslation();
    return (
        <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
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
  const { toast } = useToast();
  const router = useRouter();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [crimeType, setCrimeType] = useState<'government' | 'civilian' | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    // Simulate a network request
    setTimeout(() => {
        router.push('/submission-confirmation/success');
    }, 1000);
  };

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
    <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-2xl mx-auto shadow-2xl">
          <CardHeader>
            <CardTitle>{t('reportForm.title')}</CardTitle>
            <CardDescription>
              {t('reportForm.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
                <Label>{t('reportForm.crimeType')}</Label>
                <RadioGroup 
                  name="crimeType" 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4" 
                  onValueChange={(value) => setCrimeType(value as 'government' | 'civilian')}
                  required
                >
                  <div>
                    <RadioGroupItem value="government" id="government" className="peer sr-only" />
                    <Label
                      htmlFor="government"
                      className={cn(
                        "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary shadow-lg transition-all hover:-translate-y-1 cursor-pointer",
                        crimeType === 'government' && "border-primary"
                      )}
                    >
                      <Shield className="mb-3 h-6 w-6" />
                      {t('reportForm.governmentCrime.title')}
                      <span className="text-xs text-muted-foreground text-center mt-1">{t('reportForm.governmentCrime.description')}</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="civilian" id="civilian" className="peer sr-only" />
                    <Label
                      htmlFor="civilian"
                      className={cn(
                        "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary shadow-lg transition-all hover:-translate-y-1 cursor-pointer",
                        crimeType === 'civilian' && "border-primary"
                      )}
                    >
                      <Users className="mb-3 h-6 w-6" />
                      {t('reportForm.civilianCrime.title')}
                      <span className="text-xs text-muted-foreground text-center mt-1">{t('reportForm.civilianCrime.description')}</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {crimeType && (
                <div className="space-y-3">
                    <CrimeTypeSelector
                      key={crimeType} // Re-mount when crimeType changes
                      crimeType={crimeType}
                      isPending={false}
                    />
                </div>
              )}


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="district">{t('reportForm.district')}</Label>
                  <Select name="district" required>
                      <SelectTrigger id="district" className="shadow-lg">
                          <SelectValue placeholder={t('reportForm.selectDistrict')} />
                      </SelectTrigger>
                      <SelectContent>
                          {districtsOfNepal.map((district) => (
                              <SelectItem key={district} value={district}>
                                  {district}
                              </SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="localAddress">{t('reportForm.localAddress')}</Label>
                  <Input 
                    id="localAddress" 
                    name="localAddress" 
                    placeholder={t('reportForm.localAddressPlaceholder')} 
                    required
                    className="shadow-lg"
                  />
                </div>
              </div>

            <div className="space-y-2">
              <Label htmlFor="reportText">{t('reportForm.reportDetails')}</Label>
              <Textarea
                id="reportText"
                name="reportText"
                placeholder={t('reportForm.reportDetailsPlaceholder')}
                rows={8}
                required
                className="shadow-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">{t('reportForm.uploadEvidence')}</Label>
              <input type="hidden" name="photoDataUri" value={photoPreview || ''} />
              {photoPreview ? (
                <div className="relative group">
                  <Image src={photoPreview} alt="Photo preview" width={500} height={300} className="rounded-md object-cover w-full h-auto max-h-80 border shadow-lg" />
                  <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={removePhoto}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">{t('reportForm.removePhoto')}</span>
                  </Button>
                </div>
              ) : (
                <div 
                  className={cn(
                    "flex justify-center w-full h-48 px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors shadow-lg cursor-pointer hover:border-primary"
                  )}
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
              />
            </div>

          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
             <SubmitButton isPending={isPending} />
          </CardFooter>
        </Card>
      </form>
  );
}
