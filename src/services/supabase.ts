import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://owjzrbdmefhaxezwjrpz.supabase.co';
export const supabaseKey = 'sb_publishable_RNfZdYn_Bbf045L21CuSrA_WHysug7A';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
