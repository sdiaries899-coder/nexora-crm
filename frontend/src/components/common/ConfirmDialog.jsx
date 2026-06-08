const ConfirmDialog = ({
  open,
  title = "Are you sure?",
  description = "",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-zinc-900 p-6 rounded-xl w-80 space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>

        {description && (
          <p className="text-sm text-gray-400">{description}</p>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="bg-zinc-700 px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;