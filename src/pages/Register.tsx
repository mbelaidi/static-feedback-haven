
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import RegisterForm from '@/components/auth/RegisterForm';
import { Card } from '@/components/ui/card';

const Register = () => {
  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
          <RegisterForm />
        </Card>
      </div>
    </MainLayout>
  );
};

export default Register;
