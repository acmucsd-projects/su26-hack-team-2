const CONTAINER_STYLES = 'flex flex-col gap-2';
const HEADER_STYLES = 'flex items-center justify-between';
const LABEL_STYLES = 'text-navy font-semibold text-sm';
const VALUE_STYLES = 'text-navy font-semibold text-sm';

type ProgressBarVariant = 'amount' | 'percentage';
type ProgressBarColor = 'navy' | 'sky';

type ProgressBarProps = {
  variant: ProgressBarVariant;
  color: ProgressBarColor;
  value: number;
  max: number;
  label: string;
};

const trackColorStyles: Record<ProgressBarColor, string> = {
  navy: 'bg-navy/30',
  sky: 'bg-cream/30',
}

const fillColorStyles: Record<ProgressBarColor, string> = {
  navy: 'bg-navy',
  sky: 'bg-sky',
}

export default function ProgressBar({ variant, color, value, max, label }: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((value / max) * 100));

  const valueDisplay = 
    variant === 'percentage' ? `${percentage}% Complete` : `$${value} / $${max}`;

    const trackStyles = `w-full h-3 rounded-full overflow-hidden ${trackColorStyles[color]}`;
    const fillStyles = `h-full rounded-full transition-all ${fillColorStyles[color]}`;
  
  return (
    <div className={CONTAINER_STYLES}>
      <div className={HEADER_STYLES}>
        <span className={LABEL_STYLES}>{label}</span>
        <span className={VALUE_STYLES}>{valueDisplay}</span>
      </div>

      <div className={trackStyles}>
        <div className={fillStyles} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}