'use server';

import { createClient } from '@/lib/supabase/server';

export type ClubOption = { id: string; name: string };

export async function getClubs(): Promise<ClubOption[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('clubs').select('id, name').order('name');
  if (error) throw new Error(error.message);
  return data;
}