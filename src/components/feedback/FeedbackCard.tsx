
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Feedback, User } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp } from 'lucide-react';
import { useFeedback } from '@/contexts/FeedbackContext';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface FeedbackCardProps {
  feedback: Feedback;
  author: User | undefined;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback, author }) => {
  const { voteForFeedback, unvoteForFeedback, hasUserVoted } = useFeedback();
  const { isAuthenticated } = useAuth();

  const handleVoteClick = async () => {
    if (hasUserVoted(feedback.id)) {
      await unvoteForFeedback(feedback.id);
    } else {
      await voteForFeedback(feedback.id);
    }
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

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Link to={`/feedback/${feedback.id}`} className="flex-1">
            <h3 className="text-lg font-semibold hover:text-feedback-blue dark:hover:text-feedback-lightBlue transition-colors">
              {feedback.title}
            </h3>
          </Link>
          <div className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(feedback.category)}`}>
            {feedback.category.charAt(0).toUpperCase() + feedback.category.slice(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {truncateDescription(feedback.description, 150)}
        </p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            {author?.avatar ? (
              <AvatarImage src={author.avatar} alt={author.name} />
            ) : (
              <AvatarFallback>{getInitials(author?.name)}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {author?.name || 'Unknown'} • {format(new Date(feedback.createdAt), 'MMM d, yyyy')}
          </span>
        </div>
        <Button
          variant={hasUserVoted(feedback.id) ? "secondary" : "outline"}
          size="sm"
          className="flex items-center space-x-1"
          onClick={handleVoteClick}
          disabled={!isAuthenticated}
        >
          <ThumbsUp size={14} className={hasUserVoted(feedback.id) ? "fill-current" : ""} />
          <span>{feedback.votes}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeedbackCard;
