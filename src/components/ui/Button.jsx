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
    "inline-flex items-center justify-center text-[0.875rem] font-medium transition-colors cursor-pointer mr-2";

  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }[size];

  const variantStyles = {
    default: "hover:text-[#000]",
    ghost: "bg-transparent text-[var(--color-bg-tertiary)] hover:text-[#000]",
    outline: "border text-[var(--color-btn-bg)] hover:text-[#000]",
  }[variant];

  return (
    <a
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
    </a>
  );
};

export default Button;
