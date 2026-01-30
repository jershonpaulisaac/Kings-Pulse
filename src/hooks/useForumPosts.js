import { useQuery, useMutation, useQueryClient } from 'react-query';
import { supabase } from '../lib/supabase';

export const useForumPosts = () => {
    return useQuery('forum_posts', async () => {
        const { data, error } = await supabase
            .from('forum_posts')
            .select(`
                *,
                author:users (
                    full_name,
                    department,
                    year,
                    profile_photo_url
                )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    });
};

export const useCreateForumPost = () => {
    const queryClient = useQueryClient();
    return useMutation(async (newPost) => {
        // 1. Insert Post
        const { data: post, error: postError } = await supabase
            .from('forum_posts')
            .insert([newPost])
            .select()
            .single();

        if (postError) throw postError;

        // 2. Award Points (30 for signal broadcast)
        const { data: user } = await supabase
            .from('users')
            .select('points')
            .eq('id', newPost.author_id)
            .single();

        await supabase
            .from('users')
            .update({ points: (user?.points || 0) + 30 })
            .eq('id', newPost.author_id);

        // 3. Log Activity
        await supabase
            .from('activity_logs')
            .insert([{
                user_id: newPost.author_id,
                activity_type: 'SIGNAL_BROADCAST',
                points_awarded: 30
            }]);

        return post;
    }, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('forum_posts');
            queryClient.invalidateQueries(['profile', data.author_id]);
            queryClient.invalidateQueries('leaderboard');
        },
    });
};

export const useUpvotePost = () => {
    const queryClient = useQueryClient();
    return useMutation(async ({ id, userId, currentUpvotes }) => {
        // 1. Update Upvotes
        const { data: post, error: postError } = await supabase
            .from('forum_posts')
            .update({ upvotes: currentUpvotes + 1 })
            .eq('id', id)
            .select()
            .single();

        if (postError) throw postError;

        // 2. Award Points to upvoter (5 points)
        if (userId) {
            const { data: user } = await supabase
                .from('users')
                .select('points')
                .eq('id', userId)
                .single();

            await supabase
                .from('users')
                .update({ points: (user?.points || 0) + 5 })
                .eq('id', userId);

            // 3. Log Activity
            await supabase
                .from('activity_logs')
                .insert([{
                    user_id: userId,
                    activity_type: 'SIGNAL_UPVOTE',
                    points_awarded: 5
                }]);
        }

        return post;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('forum_posts');
            queryClient.invalidateQueries('leaderboard');
        },
    });
};
