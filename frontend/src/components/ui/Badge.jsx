const Badge = ({ children, variant = "default", className = "" }) => {
  const base =
    "px-2 py-1 text-xs rounded-full font-medium inline-block";

  const variants = {
    default: "bg-zinc-700 text-white",
    success: "bg-green-600 text-white",
    danger: "bg-red-600 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-600 text-white",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;