import { useEffect, useRef } from 'react';
import Backdrop from './Backdrop';
import Button from './Button';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  invoiceId: string;
}

const DeleteModal = ({ isOpen, onClose, onConfirm, invoiceId }: DeleteModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      
      if (e.key === 'Tab' && isOpen) {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      const timer = setTimeout(() => {
        (modalRef.current?.querySelector('button') as HTMLElement)?.focus();
      }, 100);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <Backdrop isOpen={isOpen} onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div 
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
          className="bg-[var(--color-surface)] w-full max-w-[30rem] p-[2rem] md:p-[3rem] rounded-lg shadow-xl z-50 transition-colors duration-300">
          <h2 id="delete-modal-title" className="text-[var(--color-text-primary)] text-[1.5rem] font-bold mb-[0.81rem]">Confirm Deletion</h2>
          <p className="text-[var(--color-text-accent)] text-[0.81rem] font-medium leading-[1.38rem] mb-[1rem]">
            Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              text="Cancel"
              variant="edit"
              onClick={onClose}
            />
            <Button
              text="Delete"
              variant='delete'
              onClick={onConfirm}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
