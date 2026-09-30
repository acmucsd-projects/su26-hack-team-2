'use server'

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import type { Tables } from '@/types/database';

export type CreateEventInput = {
  title: string;
  description?: string;
  clubId: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
};

export type EventRow = Tables<'events'>;

export type CreateEventResult =
  | { success: true; event: EventRow }
  | { success: false; error: string };

function validate(input: CreateEventInput): string | null {
  if (!input.title.trim()) return 'Title is required.';
  if (!input.clubId) return 'Club is required.';
  if (!input.date) return 'Date is required.';
  if (!input.startTime) return 'Start time is required.';
  if (!input.endTime) return 'End time is required.';
  if (!input.location.trim()) return 'Location is required.';
  if (input.endTime <= input.startTime) return 'End time must be after start time.';
  return null;
}

export async function createEvent(input: CreateEventInput): Promise<CreateEventResult> {
  const validationError = validate(input);
  if (validationError) return { success: false, error: validationError };

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return { success: false, error: 'You must be signed in to create an event.' };

  const { data, error } = await supabase
    .from('events')
    .insert({
      title: input.title.trim(),
      description: input.description?.trim() || null,
      club_id: input.clubId,
      created_by: user.id,
      start_time: `${input.date}T${input.startTime}:00`,
      end_time: `${input.date}T${input.endTime}:00`,
      location: input.location.trim(),
    })
    .select()
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath('/dashboard');
  revalidatePath('/calendar');

  return { success: true, event: data };
}