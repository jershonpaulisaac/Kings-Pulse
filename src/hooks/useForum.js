import { useQuery } from 'react-query';
import { supabase } from '../lib/supabase';

export const useForumPosts = (category = 'ALL') => {
    return useQuery(['forum_posts', category], async () => {
        let query = supabase
            .from('forum_posts')
            .select(`
                *,
                author:users (
                    full_name,
                    department
                )
            `)
            .order('created_at', { ascending: false });

        if (category !== 'ALL') {
            query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (error) throw error;
        return data;
    });
};
