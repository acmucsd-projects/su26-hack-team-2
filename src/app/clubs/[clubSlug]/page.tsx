import { notFound } from "next/navigation";
import { StatCard } from "@/components/ui/StatCard";
import { getClub } from "@/features/club/data/clubs";

export default async function ClubPage({ params }: PageProps<"/clubs/[clubSlug]">) {
  const club = getClub((await params).clubSlug) ?? notFound();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard value={club.members} label="Members" />
    </div>
  );
}
