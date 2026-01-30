import { createClient } from '@supabase/supabase-js';

// Kings Pulse: Secure Node Configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials missing. Signal sync disabled.');
}

export const supabase = createClient(
    SUPABASE_URL || 'https://placeholder.supabase.co',
    SUPABASE_ANON_KEY || 'placeholder'
);
