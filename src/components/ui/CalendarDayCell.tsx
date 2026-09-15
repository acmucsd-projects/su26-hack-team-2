import { cn } from '@/lib/utils';

export type EventType = 'meeting' | 'fundraising' | 'social';

export type CalendarEvent = {
  id: string;
  label: string;
  type: EventType;
};

const eventTypeStyles: Record<EventType, string> = {
  meeting: 'bg-butter',
  fundraising: 'bg-sky',
  social: 'bg-sand',
};

type EventPillProps = {
  event: CalendarEvent;
};

function EventPill({ event }: EventPillProps) {
  return (
    <div className='flex items-center gap-1 text-xs text-navy truncate'>
      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', eventTypeStyles[event.type])} />
      <span className='truncate'>{event.label}</span>
    </div>
  );
}

const baseStyles = 
  'flex flex-col gap-1 p-2 border border-gray-200 h-[90px] sm:min-h-[110px] overflow-hidden cursor-pointer transition hover:bg-navy/5';

function cellStyles({
  isCurrentMonth,
  className,
}: {
  isCurrentMonth: boolean;
  className?: string;
}) {
  return cn(
    baseStyles,
    !isCurrentMonth && 'text-gray-400 bg-gray-50',
    className
  );
}

function dayNumberStyles({
  isCurrentMonth,
  isToday,
}: {
  isCurrentMonth: boolean;
  isToday: boolean;
}) {
  return cn(
    'text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-full',
    isCurrentMonth ? 'text-navy': 'text-gray-400',
    isToday && 'bg-butter text-navy'
  );
}

type CalendarDayCellProps = {
  day: number;
  isCurrentMonth: boolean;
  isToday?: boolean;
  events?: CalendarEvent[];
  maxEventsShown?: number;
  onClick?: () => void;
  className?: string;
};

export default function CalendarDayCell({
  day,
  isCurrentMonth,
  isToday = false,
  events = [],
  maxEventsShown = 2,
  onClick,
  className,
}: CalendarDayCellProps) {
  const visibleEvents = events.slice(0, maxEventsShown);
  const overflowCount = events.length - visibleEvents.length;

  return (
    <div
      className={cellStyles({ isCurrentMonth, className })}
      onClick={onClick}
    >
      <span className={dayNumberStyles({ isCurrentMonth, isToday })}>
        {day}
      </span>

      <div className='flex flex-col gap-0.5'>
        {visibleEvents.map((event) => (
          <EventPill key={event.id} event={event} />
        ))}
        {overflowCount > 0 && (
          <span className='text-xs text-gray-500'>+{overflowCount} more</span>
        )}
      </div>
    </div>
  );
}