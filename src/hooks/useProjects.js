import { useQuery, useMutation, useQueryClient } from 'react-query';
import { supabase } from '../lib/supabase';

export const useProjects = () => {
    return useQuery('projects', async () => {
        const { data, error } = await supabase
            .from('projects')
            .select(`
                *,
                author:users!projects_student_id_fkey (
                    full_name,
                    department,
                    year
                )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation(async (newProject) => {
        // 1. Insert Project
        const { data: project, error: projectError } = await supabase
            .from('projects')
            .insert([newProject])
            .select()
            .single();

        if (projectError) throw projectError;

        // 2. Award Points (50 for project creation)
        const { data: user } = await supabase
            .from('users')
            .select('points')
            .eq('id', newProject.student_id)
            .single();

        await supabase
            .from('users')
            .update({ points: (user?.points || 0) + 50 })
            .eq('id', newProject.student_id);

        // 3. Log Activity
        await supabase
            .from('activity_logs')
            .insert([{
                user_id: newProject.student_id,
                activity_type: 'SYNC_START',
                points_awarded: 50
            }]);

        return project;
    }, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('projects');
            queryClient.invalidateQueries(['profile', data.student_id]);
            queryClient.invalidateQueries('leaderboard');
        },
    });
};

export const useSyncProject = () => {
    const queryClient = useQueryClient();
    return useMutation(async ({ projectId, userId, currentSyncs }) => {
        // 1. Update Project Sync Count
        const { data: project, error: projectError } = await supabase
            .from('projects')
            .update({ syncs: (currentSyncs || 0) + 1 })
            .eq('id', projectId)
            .select()
            .single();

        if (projectError) throw projectError;

        // 2. Award Points to the syncer (10 points)
        if (userId) {
            const { data: user } = await supabase
                .from('users')
                .select('points')
                .eq('id', userId)
                .single();

            await supabase
                .from('users')
                .update({ points: (user?.points || 0) + 10 })
                .eq('id', userId);

            // 3. Log Activity
            await supabase
                .from('activity_logs')
                .insert([{
                    user_id: userId,
                    activity_type: 'PROJECT_SYNC',
                    points_awarded: 10
                }]);
        }

        return project;
    }, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('projects');
            queryClient.invalidateQueries('leaderboard');
        },
    });
};

export const useProject = (id) => {
    return useQuery(['project', id], async () => {
        const { data, error } = await supabase
            .from('projects')
            .select(`
                *,
                author:users (
                    *
                )
            `)
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }, {
        enabled: !!id,
    });
};
