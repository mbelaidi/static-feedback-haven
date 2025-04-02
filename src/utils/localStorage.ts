
import { User, Feedback, Comment } from '@/types';

// User related functions
export const saveUser = (user: User): void => {
  try {
    const users = getUsers();
    const updatedUsers = [...users, user];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const getUsers = (): User[] => {
  try {
    const usersData = localStorage.getItem('users');
    return usersData ? JSON.parse(usersData) : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

export const getUserById = (id: string): User | undefined => {
  try {
    const users = getUsers();
    return users.find(user => user.id === id);
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return undefined;
  }
};

export const getUserByEmail = (email: string): User | undefined => {
  try {
    const users = getUsers();
    return users.find(user => user.email === email);
  } catch (error) {
    console.error('Error getting user by email:', error);
    return undefined;
  }
};

// Authentication related functions
export const setCurrentUser = (user: User): void => {
  try {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } catch (error) {
    console.error('Error setting current user:', error);
  }
};

export const getCurrentUser = (): User | null => {
  try {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const clearCurrentUser = (): void => {
  try {
    localStorage.removeItem('currentUser');
  } catch (error) {
    console.error('Error clearing current user:', error);
  }
};

// Feedback related functions
export const saveFeedback = (feedback: Feedback): void => {
  try {
    const feedbacks = getFeedbacks();
    const updatedFeedbacks = [...feedbacks, feedback];
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
  } catch (error) {
    console.error('Error saving feedback:', error);
  }
};

export const getFeedbacks = (): Feedback[] => {
  try {
    const feedbacksData = localStorage.getItem('feedbacks');
    return feedbacksData ? JSON.parse(feedbacksData) : [];
  } catch (error) {
    console.error('Error getting feedbacks:', error);
    return [];
  }
};

export const getFeedbackById = (id: string): Feedback | undefined => {
  try {
    const feedbacks = getFeedbacks();
    return feedbacks.find(feedback => feedback.id === id);
  } catch (error) {
    console.error('Error getting feedback by ID:', error);
    return undefined;
  }
};

export const updateFeedback = (updatedFeedback: Feedback): void => {
  try {
    const feedbacks = getFeedbacks();
    const updatedFeedbacks = feedbacks.map(feedback => 
      feedback.id === updatedFeedback.id ? updatedFeedback : feedback
    );
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
  } catch (error) {
    console.error('Error updating feedback:', error);
  }
};

export const deleteFeedback = (id: string): void => {
  try {
    const feedbacks = getFeedbacks();
    const updatedFeedbacks = feedbacks.filter(feedback => feedback.id !== id);
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
  } catch (error) {
    console.error('Error deleting feedback:', error);
  }
};

// Comment related functions
export const saveComment = (comment: Comment): void => {
  try {
    const comments = getComments();
    const updatedComments = [...comments, comment];
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  } catch (error) {
    console.error('Error saving comment:', error);
  }
};

export const getComments = (): Comment[] => {
  try {
    const commentsData = localStorage.getItem('comments');
    return commentsData ? JSON.parse(commentsData) : [];
  } catch (error) {
    console.error('Error getting comments:', error);
    return [];
  }
};

export const getCommentsByFeedbackId = (feedbackId: string): Comment[] => {
  try {
    const comments = getComments();
    return comments.filter(comment => comment.feedbackId === feedbackId);
  } catch (error) {
    console.error('Error getting comments by feedback ID:', error);
    return [];
  }
};

export const updateComment = (updatedComment: Comment): void => {
  try {
    const comments = getComments();
    const updatedComments = comments.map(comment => 
      comment.id === updatedComment.id ? updatedComment : comment
    );
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  } catch (error) {
    console.error('Error updating comment:', error);
  }
};

export const deleteComment = (id: string): void => {
  try {
    const comments = getComments();
    const updatedComments = comments.filter(comment => comment.id !== id);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};

// Initialize localStorage with mock data if needed
export const initializeLocalStorage = (): void => {
  // Check if localStorage has been initialized
  if (!localStorage.getItem('initialized')) {
    // Set initialized flag
    localStorage.setItem('initialized', 'true');
    
    // Initialize with empty arrays if they don't exist
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('feedbacks')) {
      localStorage.setItem('feedbacks', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('comments')) {
      localStorage.setItem('comments', JSON.stringify([]));
    }
  }
};
