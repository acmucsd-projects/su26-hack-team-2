import { CalendarView } from '@/features/calendar/components/CalendarView';

export default function CalendarPage() {
  return (
    <div className='flex-1 bg-cream'>
      <div className='mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-8 py-10'>
        <h1 className='text-4xl font-bold text-navy'>CALENDAR</h1>
        <CalendarView />
      </div>
    </div>
  );
}
