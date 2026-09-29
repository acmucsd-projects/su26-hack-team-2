'use client'

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Card, type CardSize } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: CardSize;
  className?: string;
};

export function Modal({ isOpen, onClose, title, children, size = 'lg', className }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-navy/40" aria-hidden />
      <Card
        variant="cream"
        size={size}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn('relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto', className)}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="modal-title" className="text-lg font-semibold text-navy">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-navy/70 hover:bg-navy/5 hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {children}
      </Card>
    </div>,
    document.body
  );
}