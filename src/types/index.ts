
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  registeredAt: string;
};

export type FeedbackCategory = 'feature' | 'bug' | 'improvement' | 'other';

export type Feedback = {
  id: string;
  title: string;
  description: string;
  category: FeedbackCategory;
  createdAt: string;
  authorId: string;
  votes: number;
  votedBy: string[];
};

export type Comment = {
  id: string;
  feedbackId: string;
  authorId: string;
  content: string;
  createdAt: string;
};

export type SortOption = 'newest' | 'oldest' | 'mostVoted' | 'leastVoted';

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};
