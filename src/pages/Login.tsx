import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { OnboardingDialog } from '@/components/OnboardingDialog';
import { ForgotPasswordDialog } from '@/components/ForgotPasswordDialog';
import { Eye, EyeOff, Building2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const onboardingComplete = localStorage.getItem('hrms_onboarding_complete');
      if (!onboardingComplete) {
        setShowOnboarding(true);
      } else {
        // Role-based redirect
        switch (user.role) {
          case 'admin':
          case 'manager':
          case 'employee':
            navigate('/dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      }
    }
  }, [user, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const success = await login(data.email, data.password);
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome to HRMS Portal!",
        });
        // Navigation is handled in useEffect when user state changes
      } else {
        toast({
          title: "Login Failed", 
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    if (user) {
      switch (user.role) {
        case 'admin':
        case 'manager':
        case 'employee':
          navigate('/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md bg-card border-border animate-fade-in">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              HRMS Portal
            </CardTitle>
            <p className="text-muted-foreground">Sign in to your account</p>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-input border-border text-foreground transition-all duration-200 focus:scale-[1.02] hover:shadow-md"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary hover:text-primary/90 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="bg-input border-border text-foreground pr-10 transition-all duration-200 focus:scale-[1.02] hover:shadow-md"
                  {...register('password')}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link
                to="/signup"
                className="text-primary hover:text-primary/90 font-medium"
              >
                Sign up
              </Link>
            </div>

            <div className="mt-4 p-3 bg-muted rounded-md text-xs text-muted-foreground">
              <p className="font-medium mb-1">Demo Credentials:</p>
              <p>Admin: admin@example.com / admin123</p>
              <p>Manager: manager@hrms.com / manager123</p>
              <p>Employee: employee@hrms.com / employee123</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>

    <OnboardingDialog 
      open={showOnboarding} 
      onComplete={handleOnboardingComplete}
    />
    
    <ForgotPasswordDialog
      open={showForgotPassword}
      onOpenChange={setShowForgotPassword}
    />
  </>
  );
};

export default Login;