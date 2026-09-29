// ponytail: hardcoded clubs until club_members resolution exists in Supabase
export const CLUBS = [
  {
    slug: "acm",
    name: "Association for Computing and Machinery (ACM)",
    members: 5000,
    logo: "/acm-logo.png",
  },
  {
    slug: "wic",
    name: "Women in Computing (WiC)",
    members: 3000,
    logo: "/WIC-logo.png",
  },
  {
    slug: "poker",
    name: "Poker Club @ UCSD",
    members: 833,
    logo: "/poker-club-logo.png",
  },
];

export function getClub(slug: string) {
  return CLUBS.find((club) => club.slug === slug);
}
