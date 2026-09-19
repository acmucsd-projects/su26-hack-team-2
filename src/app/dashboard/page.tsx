import { Calendar, Clipboard, DollarSign } from "lucide-react";
import { WelcomeBanner } from "@/features/dashboard/components/WelcomeBanner";
import { UpcomingEvents } from "@/features/dashboard/components/UpcomingEvents";
import { Fundraising } from "@/features/dashboard/components/Fundraising";
import { ActionTile } from "@/features/dashboard/components/ActionTile";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-8 py-10">
      <WelcomeBanner
        variant="butter"
        greeting="Welcome back, [Name]"
        description="Description Description Description"
        upcomingEventsCount={3}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <UpcomingEvents
          calendarHref="/calendar"
          events={[
            { id: "1", month: "SEP", day: "26", name: "Event Name", time: "4:00PM", location: "Location" },
            { id: "2", month: "OCT", day: "2", name: "Event Name", time: "10:30AM", location: "Location" },
            { id: "3", month: "OCT", day: "17", name: "Event Name", time: "6:00PM", location: "Location" },
          ]}
        />
        <Fundraising
          funds={[
            { id: "1", label: "Program Funds", raised: 3950, goal: 5000 },
            { id: "2", label: "Operating Funds", raised: 4650, goal: 5000 },
            { id: "3", label: "Parent Funds", raised: 2100, goal: 4000 },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <ActionTile
          icon={Calendar}
          title="Plan Events"
          description="Description Description Description"
          href="/plan-events"
        />
        <ActionTile
          icon={Calendar}
          title="Calendar"
          description="Description Description Description"
          href="/calendar"
        />
        <ActionTile
          icon={DollarSign}
          title="Fundraising"
          description="Description Description Description"
          href="/fundraising"
        />
        <ActionTile
          icon={Clipboard}
          title="Board Template"
          description="Description Description Description"
          href="/board"
        />
      </div>
    </div>
  );
}
