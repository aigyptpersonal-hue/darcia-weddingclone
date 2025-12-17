import { createClient } from '@supabase/supabase-js';

// Ganti string ini pake URL & ANON KEY dari Dashboard Supabase lo
const supabaseUrl = 'https://abwtmeqdvkoeqyvvnhum.supabase.co';
const supabaseKey = 'sb_publishable_-BtyUiQWCpmyK-6SSdcoiw_oQS9DH8c';

export const supabase = createClient(supabaseUrl, supabaseKey);
