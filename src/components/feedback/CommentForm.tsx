
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useFeedback } from '@/contexts/FeedbackContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  content: z
    .string()
    .min(3, 'Comment must be at least 3 characters')
    .max(500, 'Comment must be less than 500 characters'),
});

type FormData = z.infer<typeof formSchema>;

interface CommentFormProps {
  feedbackId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ feedbackId }) => {
  const { addComment } = useFeedback();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'You must be logged in to comment.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = await addComment(feedbackId, data.content);
      
      if (result) {
        form.reset();
        toast({
          title: 'Success!',
          description: 'Your comment has been posted.',
        });
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to post comment. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Please log in to leave a comment.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Add a comment..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Post Comment</Button>
        </div>
      </form>
    </Form>
  );
};

export default CommentForm;
