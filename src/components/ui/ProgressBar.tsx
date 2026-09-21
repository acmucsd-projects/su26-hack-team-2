import Link from 'next/link';

const CONTAINER_STYLES = 'flex flex-col gap-2';
const HEADER_STYLES = 'flex items-center justify-between';
const LABEL_STYLES = 'text-navy font-semibold text-sm';
const VALUE_STYLES = 'text-navy font-semibold text-sm';

type ProgressBarVariant = 'amount' | 'percentage';
export type ProgressBarColor = 'navy' | 'sky';

const trackColorStyles: Record<ProgressBarColor, string> = {
  navy: 'bg-navy/30 border border-black',
  sky: 'bg-cream/30 border border-black',
};

const fillColorStyles: Record<ProgressBarColor, string> = {
  navy: 'bg-navy',
  sky: 'bg-sky',
};

type ProgressBarOwnProps = {
  variant: ProgressBarVariant;
  value: number;
  max: number;
  label: string;
};

type ProgressBarAsBar = ProgressBarOwnProps & {
  shape?: 'bar';
  color: ProgressBarColor;
  hideHeader?: boolean;
};

type ProgressBarAsCircle = ProgressBarOwnProps & {
  shape: 'circle';
  detailsHref?: string;
};

export type ProgressBarProps = ProgressBarAsBar | ProgressBarAsCircle;

const SIZE = 200;
const CENTER = SIZE / 2;
const RADIUS = 80;
const STROKE_WIDTH = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ProgressBar(props: ProgressBarProps) {
  const { variant, value, max, label } = props;
  const percentage = Math.min(100, Math.round((value / max) * 100));

  if (props.shape === 'circle') {
    const fillLength = (percentage / 100) * CIRCUMFERENCE;

    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <h3 className="text-lg font-bold text-navy">{label}</h3>

        <div className="relative inline-flex">
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              className="stroke-sky"
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={`${fillLength} ${CIRCUMFERENCE - fillLength}`}
              transform={`rotate(-90 ${CENTER} ${CENTER})`}
              className="stroke-navy transition-all"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {variant === 'percentage' ? (
              <>
                <span className="text-2xl font-bold text-navy">{percentage}%</span>
                <span className="text-sm text-ash">Complete</span>
              </>
            ) : (
              <>
                <span className="text-2xl font-bold text-navy">${value}</span>
                <span className="text-sm text-ash">/ ${max}</span>
              </>
            )}
          </div>
        </div>

        {props.detailsHref && (
          <Link
            href={props.detailsHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-triton-blue hover:text-triton-blue/70"
          >
            View Details
          </Link>
        )}
      </div>
    );
  }

  const { color, hideHeader = false } = props;
  const valueDisplay =
    variant === 'percentage' ? `${percentage}% Complete` : `$${value} / $${max}`;

  const trackStyles = `w-full h-3 rounded-full overflow-hidden ${trackColorStyles[color]}`;
  const fillStyles = `h-full rounded-full transition-all ${fillColorStyles[color]}`;

  return (
    <div className={CONTAINER_STYLES}>
      {!hideHeader && (
        <div className={HEADER_STYLES}>
          <span className={LABEL_STYLES}>{label}</span>
          <span className={VALUE_STYLES}>{valueDisplay}</span>
        </div>
      )}

      <div className={trackStyles}>
        <div className={fillStyles} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}