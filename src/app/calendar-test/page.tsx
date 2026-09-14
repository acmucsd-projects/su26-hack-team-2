import CalendarDayCell from '@/components/ui/CalendarDayCell';

export default function CalendarTestPage() {
  return (
    <div className='flex flex-wrap gap-4 p-10'>
      <div className='w-32'>
        <CalendarDayCell day={16} isCurrentMonth={true} />
      </div>

      <div className='w-32'>
        <CalendarDayCell day={9} isCurrentMonth={true} isToday={true} />
      </div>

      <div className='w-32'>
        <CalendarDayCell day={30} isCurrentMonth={false} />
      </div>

      <div className='w-32'>
        <CalendarDayCell
          day={14}
          isCurrentMonth={true}
          events={[{ id: '1', label: 'Club Meeting', type: 'meeting' }]}
        />
      </div>

      <div className='w-32'>
        <CalendarDayCell
          day={18}
          isCurrentMonth={true}
          events={[
            { id: '1', label: "Club Meeting", type: 'meeting' },
            { id: '2', label: "Fundraiser Planning", type: 'fundraising' },
            { id: '3', label: "Social Event", type: 'social' },
          ]}
        />
      </div>

      <div className='w-32'>
        <CalendarDayCell
          day={9}
          isCurrentMonth={true}
          isToday={true}
          events={[{ id: '1', label: "Social Event", type: 'social' }]}
        />
      </div>
    </div>
  );
}