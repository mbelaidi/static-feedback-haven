
import React from 'react';
import { Comment, User } from '@/types';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CommentListProps {
  comments: Comment[];
  getUser: (userId: string) => User | undefined;
}

const CommentList: React.FC<CommentListProps> = ({ comments, getUser }) => {
  const getInitials = (name: string | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => {
        const author = getUser(comment.authorId);
        
        return (
          <div key={comment.id} className="flex space-x-4">
            <Avatar className="h-10 w-10">
              {author?.avatar ? (
                <AvatarImage src={author.avatar} alt={author.name} />
              ) : (
                <AvatarFallback>{getInitials(author?.name)}</AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">{author?.name || 'Unknown User'}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {format(new Date(comment.createdAt), 'MMM d, yyyy • h:mm a')}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">{comment.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
