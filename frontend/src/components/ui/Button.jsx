const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) => {
  const base =
    "px-4 py-2 rounded transition duration-200 text-sm font-medium";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-zinc-700 hover:bg-zinc-600 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;