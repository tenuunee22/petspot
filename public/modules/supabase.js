import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const url="https://gsxccgtamjhbsrkzfgjd.supabase.co";
const key="sb_publishable_qgE2p7ZF8mLMajwsRA9cQg_F1yv4gfD";

export const supabase = createClient(url, key);
