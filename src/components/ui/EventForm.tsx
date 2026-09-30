import { useState, useTransition } from 'react';
import FormField, { controlStyles } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { createEvent, type CreateEventInput, type EventRow } from '@/app/actions/events';
import { ClubOption } from '@/app/actions/clubs';

type CreateEventFormProps = {
  clubs: ClubOption[];
  onSuccess: (event: EventRow) => void;
  onCancel: () => void;
};

const initialState: CreateEventInput = {
  title: '',
  description: '',
  clubId: '',
  date: '',
  startTime: '',
  endTime: '',
  location: '',
};

export function CreateEventForm({ clubs, onSuccess, onCancel }: CreateEventFormProps) {
  const [form, setForm] = useState<CreateEventInput>(initialState);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof CreateEventInput, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function update<K extends keyof CreateEventInput>(key: K, value: CreateEventInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validateClient(): boolean {
    const errors: Partial<Record<keyof CreateEventInput, string>> = {};
    if (!form.title.trim()) errors.title = 'Required.';
    if (!form.clubId.trim()) errors.clubId = 'Required.';
    if (!form.date) errors.date = 'Required.';
    if (!form.startTime) errors.startTime = 'Required.';
    if (!form.endTime) errors.endTime = 'Required.';
    if (!form.location.trim()) errors.location = 'Required.';
    if (form.startTime && form.endTime && form.endTime <= form.startTime) {
      errors.endTime = 'Must be after start time.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!validateClient()) return;

    startTransition(async () => {
      const result = await createEvent(form);
      if (!result.success) {
        setFormError(result.error);
        return;
      }
      onSuccess(result.event);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField label="Title" htmlFor="title" required error={fieldErrors.title}>
        <input id="title" className={`${controlStyles} h-12`} value={form.title}
          onChange={(e) => update('title', e.target.value)} aria-invalid={!!fieldErrors.title} />
      </FormField>

      <FormField label="Club" htmlFor="clubId" required error={fieldErrors.clubId}>
        <select id="clubId" className={`${controlStyles} h-12`} value={form.clubId}
          onChange={(e) => update('clubId', e.target.value)} aria-invalid={!!fieldErrors.clubId}>
          <option value="" disabled>Select a club</option>
          {clubs.map((club) => (
            <option key={club.id} value={club.id}>{club.name}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Description" htmlFor="description">
        <textarea id="description" rows={3} className={`${controlStyles} py-3`} value={form.description}
          onChange={(e) => update('description', e.target.value)} />
      </FormField>

      <FormField label="Date" htmlFor="date" required error={fieldErrors.date}>
        <input id="date" type="date" className={`${controlStyles} h-12`} value={form.date}
          onChange={(e) => update('date', e.target.value)} aria-invalid={!!fieldErrors.date} />
      </FormField>

      <FormField label="Start time" htmlFor="startTime" required error={fieldErrors.startTime}>
        <input id="startTime" type="time" className={`${controlStyles} h-12`} value={form.startTime}
          onChange={(e) => update('startTime', e.target.value)} aria-invalid={!!fieldErrors.startTime} />
      </FormField>

      <FormField label="End time" htmlFor="endTime" required error={fieldErrors.endTime}>
        <input id="endTime" type="time" className={`${controlStyles} h-12`} value={form.endTime}
          onChange={(e) => update('endTime', e.target.value)} aria-invalid={!!fieldErrors.endTime} />
      </FormField>

      <FormField label="Location" htmlFor="location" required error={fieldErrors.location}>
        <input id="location" className={`${controlStyles} h-12`} value={form.location}
          onChange={(e) => update('location', e.target.value)} aria-invalid={!!fieldErrors.location} />
      </FormField>

      {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}

      <div className="mt-2 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isPending}>Cancel</Button>
        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? 'Creating…' : 'Create event'}
        </Button>
      </div>
    </form>
  );
}