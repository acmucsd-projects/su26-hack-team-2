const CARD_STYLES = 'flex flex-col gap-1 rounded-2xl px-5 py-4';
const CARD_FEATURED_STYLES = 'flex flex-col items-center justify-center gap-1 rounded-2xl px-6 py-7 text-center';
const PILL_STYLES = 'inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold whitespace-nowrap';
const LABEL_STYLES = 'text-xs font-medium opacity-70';
const FEATURED_LABEL_STYLES = 'text-sm font-medium opacity-70';
const VALUE_STYLES = 'text-2xl font-bold leading-none';
const FEATURED_VALUE_STYLES = 'text-3xl font-bold leading-none';

type StatCardSize = 'sm' | 'lg';
type StatCardShape = 'card' | 'pill';
type StatCardVariant = 'number' | 'currency';
export type StatCardColor = 'navy' | 'sand' | 'cream' | 'butter' | 'sky';

type StatCardProps = {
  label: string;
  value: number;
  max?: number;
  variant?: StatCardVariant;
  color?: StatCardColor;
  size?: StatCardSize;
  shape?: StatCardShape;
};

const colorStyles: Record<StatCardColor, string> = {
  navy: 'bg-navy text-cream',
  sand: 'bg-sand text-navy',
  cream: 'bg-cream text-navy',
  butter: 'bg-butter text-navy',
  sky: 'bg-sky text-navy',
};

export default function StatCard({
  label,
  value,
  max,
  variant = 'number',
  color = 'cream',
  size = 'sm',
  shape = 'card',
}: StatCardProps) {
  const valueDisplay =
    variant === 'currency' && max !== undefined ? `$${value} / $${max}`: `${value}`;

  if (shape === 'pill') {
    return <span className={`${PILL_STYLES} ${colorStyles[color]}`}>{valueDisplay}</span>;
  }

  if (size === 'lg') {
    return (
      <div className={`${CARD_FEATURED_STYLES} ${colorStyles[color]}`}>
        <span className={FEATURED_VALUE_STYLES}>{valueDisplay}</span>
        <span className={FEATURED_LABEL_STYLES}>{label}</span>
      </div>
    );
  }

  return (
    <div className={`${CARD_STYLES} ${colorStyles[color]}`}>
      <span className={LABEL_STYLES}>{label}</span>
      <span className={VALUE_STYLES}>{valueDisplay}</span>
    </div>
  );
}

const GROUP_STYLES = 'grid grid-cols-1 sm:grid-cols-3 gap-3';

export function StatCardGroup({ items }: { items: StatCardProps[] }) {
  return (
    <div className={GROUP_STYLES}>
      {items.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
}