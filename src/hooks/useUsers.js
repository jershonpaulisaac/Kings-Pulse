import { useQuery, useMutation, useQueryClient } from 'react-query';
import { supabase } from '../lib/supabase';

export const useUsers = () => {
    return useQuery('users', async () => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    });
};

export const useUpdateUserKey = () => {
    const queryClient = useQueryClient();
    return useMutation(async ({ userId, key }) => {
        const { data, error } = await supabase
            .from('users')
            .update({ portal_access_key: key })
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};
