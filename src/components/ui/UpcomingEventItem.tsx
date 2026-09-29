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
    <div className={cn("flex items-center gap-6", className)}>
      <div className="w-12 shrink-0 text-center leading-tight">
        <div className="text-xs font-semibold text-periwinkle uppercase">{month}</div>
        <div className="text-2xl font-bold text-navy">{day}</div>
      </div>
      <div className="min-w-0 text-navy">
        <p className="truncate text-lg font-semibold">{name}</p>
        <p className="truncate text-sm">
          {club}
          <span className="mx-2 border-l border-navy" />
          {time}
          <span className="mx-2 border-l border-navy" />
          {location}
        </p>
      </div>
    </div>
  );
}
