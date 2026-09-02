import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export type UpcomingEvent = {
  id: string;
  month: string;
  day: string;
  name: string;
  time: string;
  location: string;
};

type UpcomingEventsProps = {
  events: UpcomingEvent[];
  calendarHref: string;
  className?: string;
};

export function UpcomingEvents({
  events,
  calendarHref,
  className,
}: UpcomingEventsProps) {
  return (
    <Card variant="cream" size="lg" className={className}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <Button href={calendarHref} variant="primary" size="sm">
          View Calendar
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <ul className="mt-6 divide-y divide-navy/10">
        {events.map((event) => (
          <li
            key={event.id}
            className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div className="flex h-[50px] w-[52px] shrink-0 flex-col items-center justify-center rounded-lg bg-butter leading-tight">
              <span className="text-xs font-semibold uppercase">
                {event.month}
              </span>
              <span className="text-base font-semibold">{event.day}</span>
            </div>
            <div>
              <p className="font-semibold">{event.name}</p>
              <p className="text-sm text-navy/80">
                {event.time} @{event.location}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
