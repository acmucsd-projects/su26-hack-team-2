import Link from "next/link";
import { notFound } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import { getClub } from "@/features/club/data/clubs";

export default async function ClubLayout({ children, params }: LayoutProps<"/clubs/[clubSlug]">) {
  const { clubSlug } = await params;
  const club = getClub(clubSlug) ?? notFound();

  const links = [
    { href: `/clubs/${club.slug}`, label: "Overview" },
    { href: `/clubs/${club.slug}/fundraising`, label: "Fundraising" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-8 py-10">
      <div className="flex items-center gap-4">
        <Avatar imageUrl={club.logo} name={club.name} size="lg" className="rounded-lg" />
        <h1 className="text-4xl font-bold text-navy">{club.name}</h1>
      </div>
      <nav className="flex gap-6 border-b border-navy/10 pb-2">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} className="font-semibold text-navy hover:opacity-80">
            {label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
