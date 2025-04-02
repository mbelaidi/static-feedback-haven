
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useFeedback } from '@/contexts/FeedbackContext';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ChevronLeft, MessageSquare } from 'lucide-react';
import CommentList from '@/components/feedback/CommentList';
import CommentForm from '@/components/feedback/CommentForm';

const FeedbackDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    getFeedbackById,
    getCommentsForFeedback,
    getUserById,
    voteForFeedback,
    unvoteForFeedback,
    hasUserVoted 
  } = useFeedback();
  const { isAuthenticated } = useAuth();
  const [feedback, setFeedback] = useState(id ? getFeedbackById(id) : undefined);
  const [comments, setComments] = useState(id ? getCommentsForFeedback(id) : []);
  const [author, setAuthor] = useState(feedback ? getUserById(feedback.authorId) : undefined);
  
  useEffect(() => {
    if (id) {
      const feedbackData = getFeedbackById(id);
      if (!feedbackData) {
        navigate('/not-found');
        return;
      }
      
      setFeedback(feedbackData);
      setComments(getCommentsForFeedback(id));
      
      if (feedbackData) {
        setAuthor(getUserById(feedbackData.authorId));
      }
    }
  }, [id, getFeedbackById, getUserById, getCommentsForFeedback, navigate]);

  const handleVoteClick = async () => {
    if (!id || !feedback) return;
    
    if (hasUserVoted(id)) {
      await unvoteForFeedback(id);
    } else {
      await voteForFeedback(id);
    }
    
    // Update feedback data after vote
    setFeedback(getFeedbackById(id));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'feature':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'bug':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'improvement':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  if (!feedback) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="h-10 w-10 border-4 border-t-feedback-blue rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center mb-4"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={16} className="mr-1" />
            Back
          </Button>
          
          <Card className="p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{feedback.title}</h1>
                <div className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(feedback.category)}`}>
                  {feedback.category.charAt(0).toUpperCase() + feedback.category.slice(1)}
                </div>
              </div>
              <Button
                variant={hasUserVoted(feedback.id) ? "secondary" : "outline"}
                className="flex items-center space-x-2"
                onClick={handleVoteClick}
                disabled={!isAuthenticated}
              >
                <ThumbsUp size={16} className={hasUserVoted(feedback.id) ? "fill-current" : ""} />
                <span>{feedback.votes}</span>
              </Button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{feedback.description}</p>
            </div>
            
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-3">
                {author?.avatar ? (
                  <AvatarImage src={author.avatar} alt={author.name} />
                ) : (
                  <AvatarFallback>{getInitials(author?.name)}</AvatarFallback>
                )}
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">{author?.name || 'Unknown'}</div>
                <div className="text-gray-500 dark:text-gray-400">
                  Posted {format(new Date(feedback.createdAt), 'MMMM d, yyyy')}
                </div>
              </div>
            </div>
          </Card>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold flex items-center mb-4">
              <MessageSquare size={18} className="mr-2" />
              Comments ({comments.length})
            </h2>
            
            <Card className="p-6 mb-6">
              <CommentForm feedbackId={feedback.id} />
            </Card>
            
            {comments.length > 0 && (
              <Card className="p-6">
                <CommentList comments={comments} getUser={getUserById} />
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FeedbackDetail;
