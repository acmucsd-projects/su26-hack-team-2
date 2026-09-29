import Link from "next/link";
import { cn } from "@/lib/utils";

type QuickActionLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function QuickActionLink({ href, children, className }: QuickActionLinkProps) {
  return (
    <Link
      href={href}
      className={cn("block text-lg text-periwinkle hover:underline", className)}
    >
      {children}
    </Link>
  );
}
