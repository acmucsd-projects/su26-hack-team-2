import type { ReactNode } from 'react';

export type FeatCardVariant = 'plain' | 'boxed';

type FeatCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  variant?: FeatCardVariant;
};

const containerStyles: Record<FeatCardVariant, string> = {
  plain: 'flex flex-col gap-3',
  boxed: 'flex flex-col gap-3 rounded-2xl bg-cream p-6',
};

const ICON_STYLES = 'text-navy';
const TITLE_STYLES = 'text-lg font-bold text-navy';
const DESCRIPTION_STYLES = 'text-navy/70 leading-relaxed';

export default function FeatCard({ icon, title, description, variant = 'plain' }: FeatCardProps) {
  return (
    <div className={containerStyles[variant]}>
      <span className={ICON_STYLES}>{icon}</span>
      <h3 className={TITLE_STYLES}>{title}</h3>
      <p className={DESCRIPTION_STYLES}>{description}</p>
    </div>
  );
}