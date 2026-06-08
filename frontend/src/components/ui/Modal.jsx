const Modal = ({
  open,
  title,
  children,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-xl w-full max-w-md p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;