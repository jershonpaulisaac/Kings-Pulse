import { useQuery } from 'react-query';
import { supabase } from '../lib/supabase';

export const useEvents = () => {
    return useQuery('events', async () => {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: true });

        if (error) throw error;
        return data;
    });
};
