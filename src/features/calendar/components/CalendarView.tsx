'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarDayCell, { type CalendarEvent } from '@/components/ui/CalendarDayCell';
import { cn } from '@/lib/utils';

type MockEvent = CalendarEvent & { date: Date; time: string; club: string };

const events: MockEvent[] = [
  { id: '1', label: 'ACM Club Meeting', type: 'meeting', date: new Date(2026, 8, 15), time: '5:00 PM', club: 'ACM' },
  { id: '2', label: 'Fundraiser Planning', type: 'fundraising', date: new Date(2026, 8, 26), time: '12:00 PM - 1:00 PM', club: 'ACM' },
  { id: '3', label: 'Board Meeting', type: 'meeting', date: new Date(2026, 8, 30), time: '4:00 PM - 5:00 PM', club: 'TESC' },
  { id: '4', label: 'Social Event', type: 'social', date: new Date(2026, 9, 2), time: '5:00 PM - 7:00 PM', club: 'ACM' },
  { id: '5', label: 'ACM Club Meeting', type: 'meeting', date: new Date(2026, 9, 17), time: '5:00 PM', club: 'ACM' },
];

const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const views = ['Day', 'Month', 'Year'] as const;

const navButton = 'rounded-md bg-gray-200 px-3 py-2 text-navy transition hover:bg-gray-300';

export function CalendarView() {
  const router = useRouter();
  const today = new Date();
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [view, setView] = useState<(typeof views)[number]>('Month');

  const y = month.getFullYear();
  const m = month.getMonth();
  const first = month.getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const days = Array.from(
    { length: Math.ceil((first + daysInMonth) / 7) * 7 },
    (_, i) => new Date(y, m, 1 - first + i)
  );

  const upcoming = events
    .filter((e) => e.date >= new Date(today.toDateString()))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 4);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div className='flex items-center gap-2'>
          <button className={navButton} aria-label='Previous month' onClick={() => setMonth(new Date(y, m - 1, 1))}>
            <ChevronLeft className='h-4 w-4' />
          </button>
          <span className='w-48 whitespace-nowrap text-center text-2xl text-navy'>
            {month.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button className={navButton} aria-label='Next month' onClick={() => setMonth(new Date(y, m + 1, 1))}>
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex rounded-full bg-gray-200 p-1'>
            {views.map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  'rounded-full px-5 py-1.5 text-sm font-semibold text-navy transition',
                  view === v && 'bg-periwinkle'
                )}
              >
                {v}
              </button>
            ))}
          </div>
          {/* ponytail: no create-event flow yet */}
          <button className='rounded-md bg-marigold px-5 py-2 text-sm font-semibold text-navy transition hover:brightness-95'>
            Add Event +
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px]'>
        <div className='grid grid-cols-7 overflow-hidden rounded-xl'>
          {weekdays.map((d) => (
            <div key={d} className='bg-marigold py-2 text-center text-lg font-semibold text-navy'>
              {d}
            </div>
          ))}
          {days.map((d) => {
            const dayEvents = events.filter((e) => e.date.toDateString() === d.toDateString());
            return (
              <CalendarDayCell
                key={d.toDateString()}
                day={d.getDate()}
                isCurrentMonth={d.getMonth() === m}
                isToday={d.toDateString() === today.toDateString()}
                events={dayEvents}
                onClick={dayEvents.length ? () => router.push(`/events/${dayEvents[0].id}`) : undefined}
              />
            );
          })}
        </div>

        <div className='self-start rounded-xl bg-gray-200 p-6'>
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-navy'>Upcoming Events</h2>
            <Link href='/events' className='flex items-center gap-1 text-sm text-periwinkle hover:underline'>
              View All <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
          <ul className='flex flex-col gap-6'>
            {upcoming.map((e) => (
              <li key={e.id} className='flex items-center gap-6'>
                <div className='w-10 text-center leading-tight'>
                  <div className='text-xs font-semibold text-periwinkle'>
                    {e.date.toLocaleString('en-US', { month: 'short' }).toUpperCase()}
                  </div>
                  <div className='text-3xl font-bold text-navy'>{e.date.getDate()}</div>
                </div>
                <div className='text-navy'>
                  <p className='text-lg font-semibold'>{e.label}</p>
                  <p className='text-sm'>
                    {e.club}
                    <span className='mx-2 border-l border-navy' />
                    {e.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
