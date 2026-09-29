import { StatCard } from "@/components/ui/StatCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { UpcomingEventItem } from "@/components/ui/UpcomingEventItem";
import { MemberListItem } from "@/components/ui/MemberListItem";
import { QuickActionLink } from "@/components/ui/QuickActionLink";
import { getUser } from "@/lib/supabase/session";
import { CLUBS } from "@/features/club/data/clubs";

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
  { href: "/fundraising", label: "Fundraising and Finances" },
];

export default async function DashboardPage() {
  const user = await getUser();
  const fullName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    "there";
  const firstName = fullName.trim().split(/\s+/)[0] || "there";

  return (
    <div className="flex-1 bg-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-8 py-10">
        <div>
          <h1 className="text-4xl font-bold text-navy">
            Good morning, <span className="text-marigold">{firstName}</span> 👋
          </h1>
          <p className="text-sm text-navy">
            Here&apos;s what&apos;s happening with your clubs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[3fr_2fr]">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((stat) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>

            <SectionCard title="Upcoming Events" viewAllHref="/calendar" className="flex-1">
              <div className="flex flex-1 flex-col justify-between gap-5">
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

          <div className="flex flex-col gap-5">
            <SectionCard title="Quick Links">
              <div className="flex flex-col gap-1">
                {QUICK_ACTIONS.map((action) => (
                  <QuickActionLink key={action.href} href={action.href}>
                    {action.label}
                  </QuickActionLink>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Your Clubs" viewAllHref="/clubs" className="flex-1">
              <div className="flex flex-col gap-4">
                {CLUBS.map((club) => (
                  <MemberListItem
                    key={club.slug}
                    avatarImageUrl={club.logo}
                    avatarName={club.name}
                    avatarClassName="rounded-lg"
                    title={club.name}
                    titleHref={`/clubs/${club.slug}`}
                    subtitle={`${club.members.toLocaleString()} members`}
                  />
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
