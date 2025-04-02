
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const About = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">About FeedbackHub</h1>
        
        <div className="mb-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            FeedbackHub is a platform that empowers users to submit, discuss, and vote on feedback,
            feature requests, and bug reports. Our mission is to create a seamless bridge between
            users and product teams.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <div className="text-feedback-blue mt-0.5">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Submit Your Feedback</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Share your ideas, feature requests, or report bugs you've encountered.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-feedback-blue mt-0.5">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Upvote &amp; Discuss</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Vote for the ideas that matter to you and participate in discussions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-feedback-blue mt-0.5">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Track Progress</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Stay updated on the status and progress of feedback items.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                To create a transparent, collaborative environment where users can directly influence
                product development through structured feedback and voting.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Technology</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                FeedbackHub is built with modern web technologies including React, TypeScript,
                and Tailwind CSS. This is a static demo that uses local browser storage.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">About This Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This is a static demonstration of a feedback management system. All data is stored
              locally in your browser and will be reset when you clear your browser's local storage.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              In a production environment, this would be connected to a backend database and include
              additional features such as user authentication, email notifications, and admin controls.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default About;
