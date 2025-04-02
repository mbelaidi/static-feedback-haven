
import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to access this page.',
        variant: 'destructive',
      });
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, loading, navigate, toast]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="h-10 w-10 border-4 border-t-feedback-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  // If authenticated, render the child routes
  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;
