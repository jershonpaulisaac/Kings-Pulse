import { useQuery, useMutation, useQueryClient } from 'react-query';
import { supabase } from '../lib/supabase';

export const useProfile = (userId) => {
    return useQuery(['profile', userId], async () => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    }, {
        enabled: !!userId,
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation(async ({ userId, updates }) => {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['profile', data.id]);
        },
    });
};
export const useUpdateBookmarks = () => {
    const queryClient = useQueryClient();
    return useMutation(async ({ userId, projectId, isBookmarked }) => {
        const { data: user } = await supabase
            .from('users')
            .select('bookmarks')
            .eq('id', userId)
            .single();

        let newBookmarks = user.bookmarks || [];
        if (isBookmarked) {
            newBookmarks = newBookmarks.filter(id => id !== projectId);
        } else {
            newBookmarks = [...newBookmarks, projectId];
        }

        const { data, error } = await supabase
            .from('users')
            .update({ bookmarks: newBookmarks })
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['profile', data.id]);
        },
    });
};

export const useUpdateSettings = () => {
    const queryClient = useQueryClient();
    return useMutation(async ({ userId, settings }) => {
        const { data, error } = await supabase
            .from('users')
            .update({ settings })
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['profile', data.id]);
        },
    });
};
