import { Modal } from '@/components/ui/Modal';
import { CreateEventForm } from './EventForm';
import type { EventRow } from '@/app/actions/events';
import { ClubOption } from '@/app/actions/clubs';

type CreateEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (event: EventRow) => void;
  clubs: ClubOption[];
};

export function CreateEventModal({ isOpen, onClose, onCreated, clubs }: CreateEventModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create event">
      <CreateEventForm
        clubs={clubs}
        onCancel={onClose}
        onSuccess={(event) => {
          onCreated(event);
          onClose();
        }}
      />
    </Modal>
  );
}