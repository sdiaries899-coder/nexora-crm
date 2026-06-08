const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-zinc-900 p-4 rounded-xl shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;