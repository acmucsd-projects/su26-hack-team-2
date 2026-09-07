import { Flag, Plane, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge, type BadgeVariant } from "./Badge";

export type EventType = "meeting" | "fundraiser" | "social";

export type EventStatus = Extract<BadgeVariant, "complete" | "pending" | "draft">;

export type EventListItemSize = "sm" | "md";

const eventTypeIcons: Record<EventType, LucideIcon> = {
  meeting: Users,
  fundraiser: Flag,
  social: Plane,
};

const statusLabels: Record<EventStatus, string> = {
  complete: "Complete",
  pending: "Pending",
  draft: "Draft",
};

const sizeStyles: Record<
  EventListItemSize,
  { root: string; iconWrap: string; icon: string; name: string; meta: string }
> = {
  sm: {
    root: "gap-2 py-2",
    iconWrap: "size-7",
    icon: "size-3.5",
    name: "text-sm",
    meta: "text-xs",
  },
  md: {
    root: "gap-3 py-3",
    iconWrap: "size-10",
    icon: "size-5",
    name: "text-base",
    meta: "text-sm",
  },
};

export type EventListItemProps = {
  eventType: EventType;
  name: string;
  date: string;
  time: string;
  location: string;
  status: EventStatus;
  size?: EventListItemSize;
  className?: string;
};

export function EventListItem({
  eventType,
  name,
  date,
  time,
  location,
  status,
  size = "md",
  className,
}: EventListItemProps) {
  const Icon = eventTypeIcons[eventType];
  const styles = sizeStyles[size];

  return (
    <div className={cn("flex items-center", styles.root, className)}>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-sky text-navy",
          styles.iconWrap
        )}
      >
        <Icon className={styles.icon} />
      </span>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className={cn("truncate font-semibold text-foreground", styles.name)}>
          {name}
        </span>
        <span className={cn("truncate text-zinc-500", styles.meta)}>
          {date} · {time} · {location}
        </span>
      </div>

      <Badge variant={status} className="shrink-0">
        {statusLabels[status]}
      </Badge>
    </div>
  );
}
