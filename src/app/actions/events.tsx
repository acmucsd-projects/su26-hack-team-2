'use server'

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export type CreateEventInput = {
  title: string;
  description?: string;
  clubId: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
};

export type EventRow = {
  id: string;
  title: string;
  description: string | null;
  club: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
};

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

  const { data, error } = await supabase
    .from('events')
    .insert({
      title: input.title.trim(),
      description: input.description?.trim() || null,
      club_id: input.clubId,
      date: input.date,
      start_time: input.startTime,
      end_time: input.endTime,
      location: input.location.trim(),
    })
    .select()
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath('/dashboard');
  revalidatePath('/calendar');

  return { success: true, event: data as EventRow };
}