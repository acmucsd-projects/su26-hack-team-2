import { SectionCard } from "@/components/ui/SectionCard";
import { MemberListItem } from "@/components/ui/MemberListItem";
import { CLUBS } from "@/features/club/data/clubs";

export default function ClubsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-8 py-10">
      <div>
        <h1 className="text-4xl font-bold text-navy">Your Clubs</h1>
        <p className="text-navy">Pick a club to manage.</p>
      </div>

      <SectionCard title="Clubs">
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
  );
}
