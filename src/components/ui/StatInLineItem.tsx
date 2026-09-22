import { Fragment } from 'react';

type StatInlineItem = {
  value: string;
  label: string;
};

const VALUE_STYLES = 'text-2xl font-bold text-navy';
const LABEL_STYLES = 'text-sm text-ash';
const GROUP_STYLES = 'flex flex-wrap items-stretch gap-6';
const DIVIDER_STYLES = 'hidden sm:block w-[2px] self-stretch bg-navy';

export function StatInline({ value, label }: StatInlineItem) {
  return (
    <div className="flex flex-col justify-center">
      <span className={VALUE_STYLES}>{value}</span>
      <span className={LABEL_STYLES}>{label}</span>
    </div>
  );
}

export default function StatInlineGroup({ items }: { items: StatInlineItem[] }) {
  return (
    <div className={GROUP_STYLES}>
      {items.map((item, i) => (
        <Fragment key={item.label}>
          {i > 0 && <span className={DIVIDER_STYLES} aria-hidden="true" />}
          <StatInline {...item} />
        </Fragment>
      ))}
    </div>
  );
}