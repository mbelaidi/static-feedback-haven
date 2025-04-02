
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewFeedback = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center mb-4"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={16} className="mr-1" />
          Back
        </Button>
        
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Submit New Feedback</h1>
          <FeedbackForm />
        </Card>
      </div>
    </MainLayout>
  );
};

export default NewFeedback;
