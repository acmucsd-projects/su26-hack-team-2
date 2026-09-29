'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CreateEventModal } from '@/components/ui/EventModal';
import type { ClubOption } from '@/app/actions/clubs';

type EventButtonProps = { clubs: ClubOption[] };

export function EventButton({ clubs }: EventButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add event +</Button>
      <CreateEventModal
        clubs={clubs}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreated={() => {}}
      />
    </>
  );
}