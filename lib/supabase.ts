
import { createClient } from '@supabase/supabase-js';

// Safely access env variables or fallback to provided credentials
const getEnv = (key: string, fallback: string) => {
  try {
    return (typeof process !== 'undefined' && process.env && process.env[key]) || fallback;
  } catch {
    return fallback;
  }
};

const supabaseUrl = getEnv('SUPABASE_URL', 'https://khkjftledfhjlmzrogok.supabase.co');
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY', 'sb_publishable_E8ILD31f3jqjGVggbu5D2g_FpcM74nK');

if (!supabaseUrl || supabaseUrl === 'undefined') {
  console.error("Supabase URL is missing. Ensure SUPABASE_URL is set.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
