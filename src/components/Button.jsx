import clsx from "clsx";

const Button = ({
  children,
  onClick,
  variant = "default", // "default" | "ghost" | "outline"
  size = "md",
  disabled = false,
  startIcon,
  endIcon,
  type = "button",
  className,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full text-[0.875rem] font-medium transition-colors focus:outline focus:ring-2 focus:ring-offset-2";

  const sizeStyles = {
    sm: "text-sm px-3 py-1",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-3",
  }[size];

  const variantStyles = {
    default:
      "bg-[var(--color-btn-bg)] text-[var(--color-btn-text)] hover:opacity-90",
    ghost:
      "bg-transparent  hover:bg-[var(--color-btn-bg)] hover:text-[var(--color-btn-text)]",
    outline:
      "border border-[var(--color-btn-bg)] text-[var(--color-btn-bg)] hover:bg-[var(--color-btn-bg)] hover:text-[var(--color-btn-text)]",
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        sizeStyles,
        variantStyles,
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {startIcon && <span className="mr-2 inline-flex">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2 inline-flex">{endIcon}</span>}
    </button>
  );
};

export default Button;
