import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Building2 } from 'lucide-react';

const onboardingSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  contactEmail: z.string().email('Valid email is required'),
  contactPhone: z.string().min(10, 'Valid phone number is required'),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

interface OnboardingDialogProps {
  open: boolean;
  onComplete: () => void;
}

export const OnboardingDialog = ({ open, onComplete }: OnboardingDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (data: OnboardingFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('hrms_onboarding_complete', 'true');
      localStorage.setItem('hrms_company_info', JSON.stringify(data));
      
      toast({
        title: "Setup Complete",
        description: "Company information has been saved successfully!",
      });
      
      onComplete();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save company information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            Welcome to HRMS Portal
          </DialogTitle>
          <p className="text-muted-foreground">
            Let's set up your company information
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              placeholder="Enter company name"
              className="transition-all duration-200 focus:scale-[1.02]"
              {...register('companyName')}
            />
            {errors.companyName && (
              <p className="text-sm text-destructive">{errors.companyName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Enter company address"
              className="transition-all duration-200 focus:scale-[1.02]"
              {...register('address')}
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Enter city"
              className="transition-all duration-200 focus:scale-[1.02]"
              {...register('city')}
            />
            {errors.city && (
              <p className="text-sm text-destructive">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="Enter contact email"
              className="transition-all duration-200 focus:scale-[1.02]"
              {...register('contactEmail')}
            />
            {errors.contactEmail && (
              <p className="text-sm text-destructive">{errors.contactEmail.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              placeholder="Enter contact phone"
              className="transition-all duration-200 focus:scale-[1.02]"
              {...register('contactPhone')}
            />
            {errors.contactPhone && (
              <p className="text-sm text-destructive">{errors.contactPhone.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full transition-all duration-200 hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? 'Setting up...' : 'Complete Setup'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};