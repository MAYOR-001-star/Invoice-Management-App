import Backdrop from './Backdrop';
import Button from './Button';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  invoiceId: string;
}

const DeleteModal = ({ isOpen, onClose, onConfirm, invoiceId }: DeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <Backdrop isOpen={isOpen} onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="bg-[var(--color-surface)] w-full max-w-[30rem] p-[2rem] md:p-[3rem] rounded-lg shadow-xl z-50 transition-colors duration-300">
          <h2 className="text-[var(--color-text-primary)] text-[1.5rem] font-bold mb-[0.81rem]">Confirm Deletion</h2>
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
