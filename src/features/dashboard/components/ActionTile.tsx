import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type ActionTileProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  className?: string;
};

export function ActionTile({
  icon: Icon,
  title,
  description,
  href,
  className,
}: ActionTileProps) {
  return (
    <Card
      variant="navy"
      size="lg"
      href={href}
      className={cn("flex items-center gap-4 text-butter", className)}
    >
      <Icon className="h-10 w-10 shrink-0" />
      <div>
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-sm text-butter/85">{description}</p>
      </div>
    </Card>
  );
}
