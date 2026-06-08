const ErrorState = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <p className="text-red-400 mb-4">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;