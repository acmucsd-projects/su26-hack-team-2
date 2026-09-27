import { cn } from "@/lib/utils";

export type UpcomingEventItemProps = {
  month: string;
  day: string;
  name: string;
  club: string;
  time: string;
  location: string;
  className?: string;
};

export function UpcomingEventItem({
  month,
  day,
  name,
  club,
  time,
  location,
  className,
}: UpcomingEventItemProps) {
  return (
    <div className={cn("flex items-center gap-4 py-4 first:pt-0 last:pb-0", className)}>
      <div className="flex h-[50px] w-[52px] shrink-0 flex-col items-center justify-center rounded-lg bg-butter leading-tight">
        <span className="text-xs font-semibold text-navy uppercase">{month}</span>
        <span className="text-base font-semibold text-navy">{day}</span>
      </div>
      <div className="min-w-0">
        <p className="truncate font-semibold text-navy">{name}</p>
        <p className="truncate text-sm text-navy/80">
          {club} | {time} | {location}
        </p>
      </div>
    </div>
  );
}
