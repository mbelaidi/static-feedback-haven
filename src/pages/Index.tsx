
import React, { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import FeedbackList from '@/components/feedback/FeedbackList';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useFeedback } from '@/contexts/FeedbackContext';
import { useAuth } from '@/contexts/AuthContext';
import { isMockDataLoaded, loadMockData } from '@/data/mockData';

const Index = () => {
  const { setSearchQuery } = useFeedback();
  const { isAuthenticated } = useAuth();

  // Initialize mock data if it hasn't been loaded yet
  useEffect(() => {
    if (!isMockDataLoaded()) {
      loadMockData();
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Feedback</h1>
          
          {isAuthenticated && (
            <Link to="/feedback/new">
              <Button className="flex items-center gap-2">
                <Plus size={18} />
                <span>New Feedback</span>
              </Button>
            </Link>
          )}
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search feedback..." 
              className="pl-10"
              onChange={handleSearch}
            />
          </div>
        </div>

        <FeedbackList />
      </div>
    </MainLayout>
  );
};

export default Index;
