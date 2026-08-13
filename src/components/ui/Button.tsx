import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "solid"
  | "outline"
  | "outlineInverted"
  | "ghost";

export type ButtonSize = "sm" | "md";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-12 px-4 text-sm tracking-[0.1px]",
  md: "h-14 px-6 text-base tracking-[0.15px]",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-butter text-navy hover:brightness-95 active:brightness-90 focus-visible:outline-navy",
  solid:
    "bg-navy text-cream hover:brightness-110 active:brightness-95 focus-visible:outline-navy",
  outline:
    "border border-navy text-navy hover:bg-navy/5 active:bg-navy/10 focus-visible:outline-navy",
  outlineInverted:
    "border border-cream text-cream hover:bg-cream/10 active:bg-cream/20 focus-visible:outline-cream",
  ghost:
    "text-navy hover:bg-navy/5 active:bg-navy/10 focus-visible:outline-navy",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
} = {}) {
  return cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    fullWidth && "w-full",
    className
  );
}

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = ButtonOwnProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof ButtonOwnProps> & {
    href?: never;
  };

type ButtonAsLink = ButtonOwnProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, keyof ButtonOwnProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

// `disabled` only applies to the button branch — anchors have no disabled
// state, so a disabled-looking link should render the button branch instead.
export function Button({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = buttonStyles({ variant, size, fullWidth, className });

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkProps } = props as Omit<ButtonAsLink, keyof ButtonOwnProps> & { href: string };
    return (
      <Link href={href} className={styles} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as Omit<ButtonAsButton, keyof ButtonOwnProps>;
  return (
    <button type="button" className={styles} {...buttonProps}>
      {children}
    </button>
  );
}
