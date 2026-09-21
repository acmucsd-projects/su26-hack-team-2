import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "complete"
  | "pending"
  | "draft"
  | "urgent"
  | "role"
  | "filter";

const baseStyles =
  "inline-flex h-6 items-center gap-1 whitespace-nowrap rounded-full px-3 text-xs font-medium";

const variantStyles: Record<BadgeVariant, string> = {
  complete: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  draft: "bg-zinc-100 text-zinc-600",
  urgent: "bg-red-100 text-red-800",
  role: "bg-sky text-navy",
  filter: "bg-zinc-100 text-zinc-700",
};

export function badgeStyles({
  variant,
  className,
}: {
  variant: BadgeVariant;
  className?: string;
}) {
  return cn(baseStyles, variantStyles[variant], className);
}

export type BadgeProps = {
  variant: BadgeVariant;
  className?: string;
  children?: React.ReactNode;
  /** Renders a close button and calls this when it's clicked (used by filter tags). */
  onDismiss?: () => void;
  /** Accessible label for the dismiss button. Defaults to "Remove {children}". */
  dismissLabel?: string;
};

export function Badge({
  variant,
  className,
  children,
  onDismiss,
  dismissLabel,
}: BadgeProps) {
  return (
    <span className={badgeStyles({ variant, className })}>
      {children}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel ?? `Remove ${children?.toString() ?? ""}`}
          className="-mr-1 rounded-full p-0.5 hover:bg-black/10"
        >
          <X className="size-3" />
        </button>
      )}
    </span>
  );
}
