import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean; // true = require login, false = require logout
  redirectTo?: string;
}

const AuthGuard = ({ 
  children, 
  requireAuth = true, 
  redirectTo 
}: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return; // Wait for auth check to complete

    if (requireAuth && !isAuthenticated) {
      // User needs to be authenticated but isn't
      navigate(redirectTo || '/');
    } else if (!requireAuth && isAuthenticated) {
      // User needs to be logged out but is authenticated
      navigate(redirectTo || '/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate, requireAuth, redirectTo]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render children if auth requirements aren't met
  if (requireAuth && !isAuthenticated) return null;
  if (!requireAuth && isAuthenticated) return null;

  return <>{children}</>;
};

export default AuthGuard;