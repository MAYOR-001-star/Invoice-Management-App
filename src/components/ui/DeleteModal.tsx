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
        <div className="bg-white rounded-lg p-8 md:p-12 max-w-[480px] w-full shadow-2xl animate-in fade-in zoom-in duration-300">
          <h2 className="text-[#0C0E16] text-[1.5rem] font-bold mb-3 tracking-[-0.5px]">Confirm Deletion</h2>
          <p className="text-[#888EB0] text-[0.81rem] font-medium leading-6 mb-4">
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
