import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Building2, ArrowLeft } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const otpSchema = z.object({
  otp: z.string().min(6, 'OTP must be 6 digits').max(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must contain only numbers'),
});

type OTPFormData = z.infer<typeof otpSchema>;

interface OTPVerificationProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

const OTPVerification = ({ email, onVerified, onBack }: OTPVerificationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { toast } = useToast();
  const scrollRef = useScrollAnimation();

  const { register, handleSubmit, formState: { errors } } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: OTPFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call for OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any 6-digit OTP
      if (data.otp.length === 6) {
        toast({
          title: "Email Verified",
          description: "Your email has been verified successfully!",
        });
        onVerified();
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please enter a valid 6-digit OTP",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      // Simulate API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "OTP Sent",
        description: "A new OTP has been sent to your email",
      });
    } catch (error) {
      toast({
        title: "Failed to Send OTP",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div ref={scrollRef} className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card border-border animate-fade-in hover-lift">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-between w-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-muted transition-all duration-200 hover-lift"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex-1" />
          </div>
          <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Verify Your Email
          </CardTitle>
          <p className="text-muted-foreground">
            We've sent a 6-digit code to <br />
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-foreground">Enter OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="bg-input border-border text-foreground input-hover hover-lift animate-on-scroll text-center text-lg tracking-widest"
                {...register('otp')}
                onChange={(e) => {
                  // Only allow numbers
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }}
              />
              {errors.otp && (
                <p className="text-sm text-destructive">{errors.otp.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground button-glow hover-lift animate-on-scroll"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </Button>

            <div className="text-center text-sm space-y-2">
              <p className="text-muted-foreground">Didn't receive the code?</p>
              <Button
                type="button"
                variant="link"
                onClick={handleResendOTP}
                disabled={resendLoading}
                className="text-primary hover:text-primary/90 font-medium p-0 h-auto"
              >
                {resendLoading ? 'Sending...' : 'Resend OTP'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerification;