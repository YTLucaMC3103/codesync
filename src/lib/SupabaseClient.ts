import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kzncjeivfvmplhpdedix.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6bmNqZWl2ZnZtcGxocGRlZGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMzA3NjIsImV4cCI6MjA2MDkwNjc2Mn0.JRWdMSf_-pF4Rv_83-dwyoqoMy5MnR_DPuABjLfj710';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);