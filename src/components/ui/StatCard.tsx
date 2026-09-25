import { Card } from "./Card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  value: string | number;
  label: string;
  className?: string;
};

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <Card variant="cream" size="md" className={cn("flex flex-col gap-1", className)}>
      <span className="text-3xl font-bold text-navy">{value}</span>
      <span className="text-sm text-navy/70">{label}</span>
    </Card>
  );
}
