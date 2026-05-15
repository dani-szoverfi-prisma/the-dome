import Link from "next/link";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "copper" | "gold";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  href,
  onClick,
  children,
  variant = "copper",
  type = "button",
  disabled,
  className = "",
}: ButtonProps) {
  const cls = `btn btn-${variant} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
