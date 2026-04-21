

interface BackdropProps {
  isOpen: boolean;
  onClick: () => void;
}

const Backdrop = ({ isOpen, onClick }: BackdropProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
      onClick={onClick}
    />
  );
};

export default Backdrop;
