import { Card } from "@/components/ui/Card";

export type Fund = {
  id: string;
  label: string;
  raised: number;
  goal: number;
};

type FundraisingProps = {
  funds: Fund[];
  className?: string;
};

export function Fundraising({ funds, className }: FundraisingProps) {
  return (
    <Card variant="cream" size="lg" className={className}>
      <h2 className="text-2xl font-bold">Fundraising</h2>
      <div className="mt-6 flex flex-col gap-6">
        {funds.map((fund) => {
          const percent =
            fund.goal > 0 ? Math.min(100, (fund.raised / fund.goal) * 100) : 0;

          return (
            <div key={fund.id}>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-semibold">{fund.label}</span>
                <span className="text-sm font-semibold">
                  ${fund.raised.toLocaleString()}/${fund.goal.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 h-3 w-full rounded-full bg-navy/15">
                <div
                  className="h-full rounded-full bg-navy"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
