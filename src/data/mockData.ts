
import { User, Feedback, Comment, FeedbackCategory } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const generateMockUsers = (): User[] => {
  return [
    {
      id: uuidv4(),
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      registeredAt: new Date('2023-01-15').toISOString(),
    },
    {
      id: uuidv4(),
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://i.pravatar.cc/150?img=2',
      registeredAt: new Date('2023-02-20').toISOString(),
    },
    {
      id: uuidv4(),
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: 'https://i.pravatar.cc/150?img=3',
      registeredAt: new Date('2023-03-05').toISOString(),
    },
  ];
};

export const generateMockFeedbacks = (users: User[]): Feedback[] => {
  if (!users.length) return [];

  const categoryOptions: FeedbackCategory[] = ['feature', 'bug', 'improvement', 'other'];

  return [
    {
      id: uuidv4(),
      title: 'Add dark mode support',
      description: 'It would be great to have a dark mode option to reduce eye strain when using the app at night.',
      category: 'feature',
      createdAt: new Date('2023-04-10').toISOString(),
      authorId: users[0].id,
      votes: 15,
      votedBy: [users[1].id, users[2].id]
    },
    {
      id: uuidv4(),
      title: 'Login button not working on mobile',
      description: 'When trying to login on mobile devices, the button doesn\'t respond to taps.',
      category: 'bug',
      createdAt: new Date('2023-04-15').toISOString(),
      authorId: users[1].id,
      votes: 8,
      votedBy: [users[0].id]
    },
    {
      id: uuidv4(),
      title: 'Improve loading time of the dashboard',
      description: 'The dashboard takes too long to load, especially when there are many items.',
      category: 'improvement',
      createdAt: new Date('2023-04-20').toISOString(),
      authorId: users[2].id,
      votes: 12,
      votedBy: [users[0].id, users[1].id]
    },
    {
      id: uuidv4(),
      title: 'Add export to CSV feature',
      description: 'Would be helpful to export data to CSV for further analysis.',
      category: 'feature',
      createdAt: new Date('2023-04-25').toISOString(),
      authorId: users[0].id,
      votes: 6,
      votedBy: []
    },
    {
      id: uuidv4(),
      title: 'Email notifications for feedback updates',
      description: 'Send email notifications when there are updates to feedback items I\'ve subscribed to.',
      category: 'feature',
      createdAt: new Date('2023-05-01').toISOString(),
      authorId: users[1].id,
      votes: 9,
      votedBy: [users[2].id]
    },
  ];
};

export const generateMockComments = (users: User[], feedbacks: Feedback[]): Comment[] => {
  if (!users.length || !feedbacks.length) return [];

  return [
    {
      id: uuidv4(),
      feedbackId: feedbacks[0].id,
      authorId: users[1].id,
      content: 'I completely agree. Dark mode would be a great addition!',
      createdAt: new Date('2023-04-11').toISOString()
    },
    {
      id: uuidv4(),
      feedbackId: feedbacks[0].id,
      authorId: users[2].id,
      content: 'Maybe also add an auto-switch based on system preferences?',
      createdAt: new Date('2023-04-12').toISOString()
    },
    {
      id: uuidv4(),
      feedbackId: feedbacks[1].id,
      authorId: users[0].id,
      content: 'I\'ve experienced this issue on my iPhone. Using iOS 16.2.',
      createdAt: new Date('2023-04-16').toISOString()
    },
    {
      id: uuidv4(),
      feedbackId: feedbacks[2].id,
      authorId: users[1].id,
      content: 'Loading time is definitely an issue. Maybe implement lazy loading?',
      createdAt: new Date('2023-04-21').toISOString()
    },
    {
      id: uuidv4(),
      feedbackId: feedbacks[4].id,
      authorId: users[2].id,
      content: 'Would be nice to have customizable notification settings too.',
      createdAt: new Date('2023-05-02').toISOString()
    }
  ];
};

// Function to load mock data into localStorage
export const loadMockData = () => {
  const mockUsers = generateMockUsers();
  const mockFeedbacks = generateMockFeedbacks(mockUsers);
  const mockComments = generateMockComments(mockUsers, mockFeedbacks);

  localStorage.setItem('users', JSON.stringify(mockUsers));
  localStorage.setItem('feedbacks', JSON.stringify(mockFeedbacks));
  localStorage.setItem('comments', JSON.stringify(mockComments));
  localStorage.setItem('mockDataLoaded', 'true');

  return {
    users: mockUsers,
    feedbacks: mockFeedbacks,
    comments: mockComments
  };
};

// Function to check if mock data has been loaded
export const isMockDataLoaded = () => {
  return localStorage.getItem('mockDataLoaded') === 'true';
};
