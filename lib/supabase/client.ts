'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/types/supabase';

const supabase = createClientComponentClient<Database>();

export default supabase;