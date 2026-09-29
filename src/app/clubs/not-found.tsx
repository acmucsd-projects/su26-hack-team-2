import { Button } from "@/components/ui/Button";

// Lives at /clubs (not [clubSlug]) so it catches notFound() from the [clubSlug] layout.
export default function ClubNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
      <h1 className="text-4xl font-bold text-navy">Club not found</h1>
      <p className="text-navy">We couldn&apos;t find a club at this address.</p>
      <Button href="/clubs" variant="solid" size="sm">
        Back to your clubs
      </Button>
    </div>
  );
}
