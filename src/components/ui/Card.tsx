import Link from "next/link";
import { cn } from "@/lib/utils";

export type CardVariant = "sky" | "butter" | "cream" | "navy";

export type CardSize = "sm" | "md" | "lg";

const baseStyles = "rounded-3xl";

const sizeStyles: Record<CardSize, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const variantStyles: Record<CardVariant, string> = {
  sky: "bg-sky text-navy",
  butter: "bg-butter text-navy",
  cream: "bg-cream text-navy",
  navy: "bg-navy text-cream",
};

export function cardStyles({
  variant = "cream",
  size = "md",
  className,
}: {
  variant?: CardVariant;
  size?: CardSize;
  className?: string;
} = {}) {
  return cn(baseStyles, sizeStyles[size], variantStyles[variant], className);
}

type CardOwnProps = {
  variant?: CardVariant;
  size?: CardSize;
  className?: string;
  children?: React.ReactNode;
};

type CardAsDiv = CardOwnProps &
  Omit<React.ComponentPropsWithoutRef<"div">, keyof CardOwnProps> & {
    href?: never;
  };

type CardAsLink = CardOwnProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, keyof CardOwnProps> & {
    href: string;
  };

export type CardProps = CardAsDiv | CardAsLink;

export function Card({
  variant,
  size,
  className,
  children,
  ...props
}: CardProps) {
  const styles = cardStyles({ variant, size, className });

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkProps } = props as Omit<
      CardAsLink,
      keyof CardOwnProps
    > & { href: string };
    return (
      <Link href={href} className={styles} {...linkProps}>
        {children}
      </Link>
    );
  }

  const divProps = props as Omit<CardAsDiv, keyof CardOwnProps>;
  return (
    <div className={styles} {...divProps}>
      {children}
    </div>
  );
}
