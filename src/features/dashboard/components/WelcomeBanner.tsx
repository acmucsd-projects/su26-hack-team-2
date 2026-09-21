import { Card, type CardVariant } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export type WelcomeBannerVariant = Extract<CardVariant, "sky" | "butter">;

type WelcomeBannerProps = {
  variant: WelcomeBannerVariant;
  greeting: string;
  description?: string;
  upcomingEventsCount?: number;
  className?: string;
};

export function WelcomeBanner({
  variant,
  greeting,
  description,
  upcomingEventsCount,
  className,
}: WelcomeBannerProps) {
  return (
    <Card
      variant={variant}
      size="lg"
      className={cn("flex items-center justify-between gap-6", className)}
    >
      <div>
        <h1 className="text-4xl font-bold">{greeting}</h1>
        {description && (
          <p className="mt-3 text-xl text-navy/85">{description}</p>
        )}
      </div>
      {upcomingEventsCount !== undefined && (
        <div className="shrink-0 rounded-2xl bg-white/60 px-6 py-4 text-center">
          <p className="text-4xl font-bold text-navy">{upcomingEventsCount}</p>
          <p className="text-sm font-semibold text-navy/80">Upcoming Events</p>
        </div>
      )}
    </Card>
  );
}
