import { CalendarDays, Code2, Megaphone, Wallet } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { CLUBS } from "@/features/club/data/clubs";

const TEAMS = {
  Dev: { icon: Code2, accent: "bg-periwinkle", tint: "bg-periwinkle/15", avatar: "bg-periwinkle/25" },
  Events: { icon: CalendarDays, accent: "bg-marigold", tint: "bg-butter/60", avatar: "bg-marigold/40" },
  Marketing: { icon: Megaphone, accent: "bg-triton-blue", tint: "bg-sky/50", avatar: "bg-sky" },
  Finance: { icon: Wallet, accent: "bg-sand", tint: "bg-tan/70", avatar: "bg-sand/60" },
};

type Team = keyof typeof TEAMS;

// ponytail: mock members, swap for club_members query when it exists
const MOCK_MEMBERS: Record<string, Record<Team, [name: string, role: string][]>> = {
  acm: {
    Dev: [["Alex Nguyen", "Tech Lead"], ["Priya Patel", "Frontend Developer"]],
    Events: [["Jordan Lee", "Events Director"], ["Sam Rivera", "Events Coordinator"]],
    Marketing: [["Taylor Kim", "Marketing Lead"], ["Chris Park", "Graphic Designer"]],
    Finance: [["Morgan Chen", "Treasurer"], ["Riley Davis", "Finance Associate"]],
  },
  wic: {
    Dev: [["Maya Singh", "Web Developer"], ["Emma Lopez", "Backend Developer"]],
    Events: [["Hannah Cho", "Events Chair"], ["Olivia Tran", "Workshop Coordinator"]],
    Marketing: [["Sofia Garcia", "Social Media Lead"], ["Ava Wong", "Content Writer"]],
    Finance: [["Grace Liu", "Treasurer"], ["Chloe Martin", "Sponsorship Lead"]],
  },
  poker: {
    Dev: [["Ethan Brooks", "Web Developer"], ["Leo Tanaka", "Tournament App Dev"]],
    Events: [["Noah Kim", "Tournament Director"], ["Ryan Shah", "Dealer Coordinator"]],
    Marketing: [["Mia Johnson", "Marketing Lead"], ["Zoe Adams", "Photographer"]],
    Finance: [["Lucas Wright", "Treasurer"], ["Ben Ortiz", "Budget Analyst"]],
  },
};

export default function TeamsPage() {
  return (
    <div className="flex-1 bg-cream">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-8 py-10">
        <div>
          <h1 className="text-4xl font-bold text-navy">TEAMS</h1>
          <p className="mt-1 text-ash">The people behind every club you&apos;re part of.</p>
        </div>

        {CLUBS.map((club) => (
          <section key={club.slug} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/5">
            <div className="mb-6 flex items-center gap-4">
              <Avatar imageUrl={club.logo} name={club.name} size="lg" className="h-14 w-14 rounded-xl" />
              <div>
                <h2 className="text-2xl font-semibold text-navy">{club.name}</h2>
                <p className="text-sm text-ash">{club.members.toLocaleString()} members</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(Object.keys(TEAMS) as Team[]).map((team) => {
                const { icon: Icon, accent, tint, avatar } = TEAMS[team];
                const members = MOCK_MEMBERS[club.slug]?.[team] ?? [];

                return (
                  <div
                    key={team}
                    className={`group relative overflow-hidden rounded-xl ${tint} p-5 transition duration-200 hover:-translate-y-1 hover:shadow-md`}
                  >
                    <span className={`absolute inset-x-0 top-0 h-1.5 ${accent}`} aria-hidden="true" />
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent} text-white transition-transform group-hover:rotate-6`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="text-lg font-semibold text-navy">{team}</h3>
                      </div>
                      <span className="rounded-full bg-white/70 px-2.5 py-0.5 text-xs font-medium text-navy">
                        {members.length} {members.length === 1 ? "member" : "members"}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-3">
                      {members.map(([name, role]) => (
                        <li key={name} className="flex items-center gap-3 rounded-lg bg-white/60 p-2">
                          <Avatar name={name} className={avatar} />
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-navy">{name}</p>
                            <p className="truncate text-sm text-ash">{role}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
