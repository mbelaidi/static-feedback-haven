
import React from 'react';
import { useFeedback } from '@/contexts/FeedbackContext';
import FeedbackCard from './FeedbackCard';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { FeedbackCategory, SortOption } from '@/types';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FeedbackList: React.FC = () => {
  const {
    filteredFeedbacks,
    loading,
    activeCategory,
    sortOption,
    setActiveCategory,
    setSortOption,
    getUserById,
  } = useFeedback();

  const categories: { value: FeedbackCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'feature', label: 'Feature Requests' },
    { value: 'bug', label: 'Bug Reports' },
    { value: 'improvement', label: 'Improvements' },
    { value: 'other', label: 'Other' },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'mostVoted', label: 'Most Voted' },
    { value: 'leastVoted', label: 'Least Voted' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ];

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value as FeedbackCategory | 'all');
  };

  const handleSortChange = (value: string) => {
    setSortOption(value as SortOption);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-10 w-10 border-4 border-t-feedback-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {filteredFeedbacks.length} {filteredFeedbacks.length === 1 ? 'item' : 'items'}
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <div className="flex items-center">
            <Select value={activeCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full md:w-[180px]">
                <span className="flex items-center">
                  <Filter size={16} className="mr-2" />
                  <SelectValue placeholder="Select category" />
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center">
            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full md:w-[180px]">
                <span className="flex items-center">
                  {sortOption.includes('Voted') ? (
                    sortOption === 'mostVoted' ? (
                      <ChevronUp size={16} className="mr-2" />
                    ) : (
                      <ChevronDown size={16} className="mr-2" />
                    )
                  ) : sortOption === 'newest' ? (
                    <ChevronUp size={16} className="mr-2" />
                  ) : (
                    <ChevronDown size={16} className="mr-2" />
                  )}
                  <SelectValue placeholder="Sort by" />
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredFeedbacks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No feedback found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md">
            We couldn't find any feedback items matching your criteria. Try adjusting your filters or add the first one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredFeedbacks.map((feedback) => (
            <FeedbackCard
              key={feedback.id}
              feedback={feedback}
              author={getUserById(feedback.authorId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
