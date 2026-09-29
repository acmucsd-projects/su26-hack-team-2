import { Card } from "./Card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  value: string | number;
  label: string;
  className?: string;
};

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <Card
      size="sm"
      className={cn("flex flex-col gap-1 rounded-xl bg-gray-200 p-5", className)}
    >
      <span className="text-4xl font-bold text-navy">{value}</span>
      <span className="text-base text-navy">{label}</span>
    </Card>
  );
}
