import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, type CardSize } from "./Card";

type SectionCardProps = {
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  size?: CardSize;
  children?: React.ReactNode;
  className?: string;
};

export function SectionCard({
  title,
  viewAllHref,
  viewAllLabel = "View All",
  size = "lg",
  children,
  className,
}: SectionCardProps) {
  return (
    <Card variant="cream" size={size} className={className}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-navy">{title}</h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="flex shrink-0 items-center gap-1 text-sm font-medium text-navy hover:opacity-80"
          >
            {viewAllLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
      <div className="mt-6">{children}</div>
    </Card>
  );
}
