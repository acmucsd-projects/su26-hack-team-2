import { StatCard } from "@/components/ui/StatCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { UpcomingEventItem } from "@/components/ui/UpcomingEventItem";
import { MemberListItem } from "@/components/ui/MemberListItem";
import { QuickActionLink } from "@/components/ui/QuickActionLink";

const STATS = [
  { label: "Clubs you manage", value: 2 },
  { label: "Upcoming Events", value: 6 },
  { label: "Pending tasks", value: 7 },
  { label: "Total members", value: 8833 },
];

const UPCOMING_EVENTS = [
  {
    id: "1",
    month: "JUL",
    day: "14",
    name: "ACM Club Meeting",
    club: "ACM",
    time: "5:00 PM",
    location: "Fishbowl (CSE B220)",
  },
  {
    id: "2",
    month: "JUL",
    day: "18",
    name: "Fundraiser Planning",
    club: "ACM",
    time: "12:00 PM – 1:00 PM",
    location: "Warren Lecture Hall Room 119",
  },
  {
    id: "3",
    month: "JUL",
    day: "22",
    name: "Board Meeting",
    club: "TESC",
    time: "4:00 PM – 5:00 PM",
    location: "Warren Lecture Hall Room 115",
  },
  {
    id: "4",
    month: "JUL",
    day: "31",
    name: "Social Event",
    club: "ACM",
    time: "5:00 PM – 7:00 PM",
    location: "Price Center East Ballroom",
  },
];

const QUICK_ACTIONS = [
  { href: "/events/new", label: "Create an Event" },
  { href: "/clubs/new", label: "Start a Club" },
  { href: "/resources", label: "Resources and FAQ" },
  { href: "/profile", label: "My Profile" },
];

const MY_CLUBS = [
  {
    id: "1",
    name: "Association for Computing and Machinery (ACM)",
    members: 5000,
    href: "/clubs/acm",
  },
  {
    id: "2",
    name: "Women in Computing (WiC)",
    members: 3000,
    href: "/clubs/wic",
  },
  {
    id: "3",
    name: "Poker Club @ UCSD",
    members: 833,
    href: "/clubs/poker",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-8 py-10">
      <div>
        <h1 className="text-3xl font-bold text-navy">
          Good morning, <span className="text-amber-500">[Name]</span> 👋
        </h1>
        <p className="mt-1 text-navy/70">
          Here&apos;s what&apos;s happening with your clubs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-8 lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>

          <SectionCard title="Upcoming Events" viewAllHref="/calendar">
            <div className="divide-y divide-navy/10">
              {UPCOMING_EVENTS.map((event) => (
                <UpcomingEventItem
                  key={event.id}
                  month={event.month}
                  day={event.day}
                  name={event.name}
                  club={event.club}
                  time={event.time}
                  location={event.location}
                />
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="flex flex-col gap-8">
          <SectionCard title="Quick Actions">
            <div className="flex flex-col gap-3">
              {QUICK_ACTIONS.map((action) => (
                <QuickActionLink key={action.href} href={action.href}>
                  {action.label}
                </QuickActionLink>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Manage Your Clubs" viewAllHref="/clubs">
            <div className="flex flex-col gap-4">
              {MY_CLUBS.map((club) => (
                <MemberListItem
                  key={club.id}
                  avatarName={club.name}
                  title={club.name}
                  titleHref={club.href}
                  subtitle={`${club.members.toLocaleString()} members`}
                />
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
