
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useFeedback } from '@/contexts/FeedbackContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FeedbackCard from '@/components/feedback/FeedbackCard';
import { format } from 'date-fns';
import { MessageSquare, ThumbsUp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { 
    getUserFeedbacks, 
    getUserTotalVotes,
    getUserById,
    feedbacks
  } = useFeedback();

  // Get user's submitted feedback
  const userFeedbacks = user ? getUserFeedbacks(user.id) : [];
  
  // Get user's total votes received
  const totalVotesReceived = user ? getUserTotalVotes(user.id) : 0;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        {user && (
          <div className="grid gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <Avatar className="h-20 w-20">
                    {user?.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Joined {format(new Date(user.registeredAt), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Plus size={16} className="mr-2" />
                    Submitted
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{userFeedbacks.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <ThumbsUp size={16} className="mr-2" />
                    Votes Received
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalVotesReceived}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare size={16} className="mr-2" />
                    Engagement Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {userFeedbacks.length > 0
                      ? `${Math.round((totalVotesReceived / userFeedbacks.length) * 10) / 10}`
                      : "0"}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        <Tabs defaultValue="myFeedback" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-1 md:grid-cols-2">
            <TabsTrigger value="myFeedback">My Submissions</TabsTrigger>
            <TabsTrigger value="activityFeed">Activity Feed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="myFeedback" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">My Submissions</h3>
              <Link to="/feedback/new">
                <Button size="sm">
                  <Plus size={16} className="mr-1" />
                  New Feedback
                </Button>
              </Link>
            </div>
            
            {userFeedbacks.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="text-4xl mb-4">🤔</div>
                <h3 className="text-xl font-semibold mb-2">No Submissions Yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  You haven't submitted any feedback yet. Share your ideas and suggestions!
                </p>
                <Link to="/feedback/new">
                  <Button>Submit Your First Feedback</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {userFeedbacks.map((feedback) => (
                  <FeedbackCard
                    key={feedback.id}
                    feedback={feedback}
                    author={user}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="activityFeed" className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            
            {feedbacks.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  No recent activity to show.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {feedbacks.slice(0, 5).map((feedback) => (
                  <FeedbackCard
                    key={feedback.id}
                    feedback={feedback}
                    author={getUserById(feedback.authorId)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
