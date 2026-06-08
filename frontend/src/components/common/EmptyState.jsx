const EmptyState = ({ message = "No data available" }) => {
  return (
    <div className="flex items-center justify-center py-10 text-gray-400">
      {message}
    </div>
  );
};

export default EmptyState;