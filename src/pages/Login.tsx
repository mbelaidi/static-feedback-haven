
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import LoginForm from '@/components/auth/LoginForm';
import { Card } from '@/components/ui/card';

const Login = () => {
  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
          <LoginForm />
        </Card>
      </div>
    </MainLayout>
  );
};

export default Login;
