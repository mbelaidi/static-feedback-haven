
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Feedback, Comment, FeedbackCategory, SortOption, User } from '@/types';
import {
  getFeedbacks,
  getComments,
  saveFeedback,
  updateFeedback,
  saveComment,
  getUserById,
  getCommentsByFeedbackId
} from '@/utils/localStorage';
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';
import { isMockDataLoaded, loadMockData } from '@/data/mockData';

type FeedbackContextType = {
  feedbacks: Feedback[];
  filteredFeedbacks: Feedback[];
  comments: Comment[];
  loading: boolean;
  activeCategory: FeedbackCategory | 'all';
  sortOption: SortOption;
  searchQuery: string;
  addFeedback: (title: string, description: string, category: FeedbackCategory) => Promise<Feedback | null>;
  addComment: (feedbackId: string, content: string) => Promise<Comment | null>;
  voteForFeedback: (feedbackId: string) => Promise<boolean>;
  unvoteForFeedback: (feedbackId: string) => Promise<boolean>;
  hasUserVoted: (feedbackId: string) => boolean;
  getFeedbackById: (id: string) => Feedback | undefined;
  getCommentsForFeedback: (feedbackId: string) => Comment[];
  getUserById: (userId: string) => User | undefined;
  getUserFeedbacks: (userId: string) => Feedback[];
  getUserTotalVotes: (userId: string) => number;
  setActiveCategory: (category: FeedbackCategory | 'all') => void;
  setSortOption: (option: SortOption) => void;
  setSearchQuery: (query: string) => void;
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<FeedbackCategory | 'all'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('mostVoted');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const { user } = useAuth();
  const { toast } = useToast();

  // Initialize data
  useEffect(() => {
    const loadData = () => {
      // Check if mock data has been loaded
      if (!isMockDataLoaded()) {
        loadMockData();
      }

      // Load data from localStorage
      const storedFeedbacks = getFeedbacks();
      const storedComments = getComments();
      
      setFeedbacks(storedFeedbacks);
      setComments(storedComments);
      setLoading(false);
    };

    loadData();
  }, []);

  // Filter and sort feedbacks when dependencies change
  useEffect(() => {
    let result = [...feedbacks];
    
    // Apply category filter
    if (activeCategory !== 'all') {
      result = result.filter(feedback => feedback.category === activeCategory);
    }
    
    // Apply search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        feedback => 
          feedback.title.toLowerCase().includes(query) || 
          feedback.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    result = sortFeedbacks(result, sortOption);
    
    setFilteredFeedbacks(result);
  }, [feedbacks, activeCategory, sortOption, searchQuery]);

  const sortFeedbacks = (feedbackList: Feedback[], option: SortOption): Feedback[] => {
    switch (option) {
      case 'newest':
        return [...feedbackList].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'oldest':
        return [...feedbackList].sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case 'mostVoted':
        return [...feedbackList].sort((a, b) => b.votes - a.votes);
      case 'leastVoted':
        return [...feedbackList].sort((a, b) => a.votes - b.votes);
      default:
        return feedbackList;
    }
  };

  const addFeedback = async (
    title: string,
    description: string,
    category: FeedbackCategory
  ): Promise<Feedback | null> => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit feedback.",
        variant: "destructive",
      });
      return null;
    }

    try {
      const newFeedback: Feedback = {
        id: uuidv4(),
        title,
        description,
        category,
        createdAt: new Date().toISOString(),
        authorId: user.id,
        votes: 0,
        votedBy: []
      };

      saveFeedback(newFeedback);
      setFeedbacks(prevFeedbacks => [...prevFeedbacks, newFeedback]);
      
      toast({
        title: "Feedback Submitted",
        description: "Your feedback has been successfully submitted.",
      });
      
      return newFeedback;
    } catch (error) {
      console.error('Error adding feedback:', error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while submitting your feedback.",
        variant: "destructive",
      });
      return null;
    }
  };

  const addComment = async (
    feedbackId: string,
    content: string
  ): Promise<Comment | null> => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to comment.",
        variant: "destructive",
      });
      return null;
    }

    try {
      const newComment: Comment = {
        id: uuidv4(),
        feedbackId,
        authorId: user.id,
        content,
        createdAt: new Date().toISOString()
      };

      saveComment(newComment);
      setComments(prevComments => [...prevComments, newComment]);
      
      toast({
        title: "Comment Added",
        description: "Your comment has been posted.",
      });
      
      return newComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Comment Failed",
        description: "An error occurred while posting your comment.",
        variant: "destructive",
      });
      return null;
    }
  };

  const voteForFeedback = async (feedbackId: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to vote.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const feedbackToUpdate = feedbacks.find(f => f.id === feedbackId);
      
      if (!feedbackToUpdate) {
        toast({
          title: "Vote Failed",
          description: "Feedback item not found.",
          variant: "destructive",
        });
        return false;
      }

      // Check if user already voted
      if (feedbackToUpdate.votedBy.includes(user.id)) {
        toast({
          title: "Already Voted",
          description: "You have already voted for this item.",
          variant: "destructive",
        });
        return false;
      }

      // Update feedback with new vote
      const updatedFeedback: Feedback = {
        ...feedbackToUpdate,
        votes: feedbackToUpdate.votes + 1,
        votedBy: [...feedbackToUpdate.votedBy, user.id]
      };

      // Update in localStorage
      updateFeedback(updatedFeedback);

      // Update state
      setFeedbacks(prevFeedbacks =>
        prevFeedbacks.map(feedback =>
          feedback.id === feedbackId ? updatedFeedback : feedback
        )
      );

      return true;
    } catch (error) {
      console.error('Error voting for feedback:', error);
      toast({
        title: "Vote Failed",
        description: "An error occurred while recording your vote.",
        variant: "destructive",
      });
      return false;
    }
  };

  const unvoteForFeedback = async (feedbackId: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to remove your vote.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const feedbackToUpdate = feedbacks.find(f => f.id === feedbackId);
      
      if (!feedbackToUpdate) {
        toast({
          title: "Vote Removal Failed",
          description: "Feedback item not found.",
          variant: "destructive",
        });
        return false;
      }

      // Check if user has voted
      if (!feedbackToUpdate.votedBy.includes(user.id)) {
        toast({
          title: "No Vote Found",
          description: "You haven't voted for this item.",
          variant: "destructive",
        });
        return false;
      }

      // Update feedback by removing the vote
      const updatedFeedback: Feedback = {
        ...feedbackToUpdate,
        votes: feedbackToUpdate.votes - 1,
        votedBy: feedbackToUpdate.votedBy.filter(id => id !== user.id)
      };

      // Update in localStorage
      updateFeedback(updatedFeedback);

      // Update state
      setFeedbacks(prevFeedbacks =>
        prevFeedbacks.map(feedback =>
          feedback.id === feedbackId ? updatedFeedback : feedback
        )
      );

      return true;
    } catch (error) {
      console.error('Error removing vote for feedback:', error);
      toast({
        title: "Vote Removal Failed",
        description: "An error occurred while removing your vote.",
        variant: "destructive",
      });
      return false;
    }
  };

  const hasUserVoted = (feedbackId: string): boolean => {
    if (!user) return false;
    
    const feedback = feedbacks.find(f => f.id === feedbackId);
    return feedback ? feedback.votedBy.includes(user.id) : false;
  };

  const getFeedbackById = (id: string): Feedback | undefined => {
    return feedbacks.find(feedback => feedback.id === id);
  };

  const getCommentsForFeedback = (feedbackId: string): Comment[] => {
    return getCommentsByFeedbackId(feedbackId).sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  };

  const getUserFeedbacks = (userId: string): Feedback[] => {
    return feedbacks.filter(feedback => feedback.authorId === userId);
  };

  const getUserTotalVotes = (userId: string): number => {
    return feedbacks
      .filter(feedback => feedback.authorId === userId)
      .reduce((total, feedback) => total + feedback.votes, 0);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        filteredFeedbacks,
        comments,
        loading,
        activeCategory,
        sortOption,
        searchQuery,
        addFeedback,
        addComment,
        voteForFeedback,
        unvoteForFeedback,
        hasUserVoted,
        getFeedbackById,
        getCommentsForFeedback,
        getUserById,
        getUserFeedbacks,
        getUserTotalVotes,
        setActiveCategory,
        setSortOption,
        setSearchQuery,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
}
