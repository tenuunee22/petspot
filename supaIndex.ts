import { createClient } from '@supabase/supabase-js';

const url = process.env.url || '';
const key = process.env.key || '';
export const supabase = createClient(url, key);
