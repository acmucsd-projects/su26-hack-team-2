import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, type CardSize } from "./Card";
import { cn } from "@/lib/utils";

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
  size = "md",
  children,
  className,
}: SectionCardProps) {
  return (
    <Card size={size} className={cn("flex flex-col rounded-xl bg-gray-200", className)}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-navy">{title}</h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="flex shrink-0 items-center gap-1 text-sm text-periwinkle hover:underline"
          >
            {viewAllLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      <div className="mt-4 flex flex-1 flex-col">{children}</div>
    </Card>
  );
}
