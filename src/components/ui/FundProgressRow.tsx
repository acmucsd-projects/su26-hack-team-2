import StatCard from './StatCard';
import type { StatCardColor } from './StatCard';
import ProgressBar from './ProgressBar';
import type { ProgressBarColor } from './ProgressBar';

const CONTAINER_STYLES = 'flex flex-col gap-2';
const HEADER_STYLES = 'flex items-center justify-between gap-3';
const LABEL_STYLES = 'text-navy font-semibold text-sm';

type FundProgressRowProps = {
  label: string;
  value: number;
  max: number;
  pillColor?: StatCardColor;
  barColor?: ProgressBarColor;
};

export default function FundProgressRow({
  label,
  value,
  max,
  pillColor = 'sand',
  barColor = 'navy',
}: FundProgressRowProps) {
  return (
    <div className={CONTAINER_STYLES}>
      <div className={HEADER_STYLES}>
        <span className={LABEL_STYLES}>{label}</span>
        <StatCard shape="pill" variant="currency" color={pillColor} label={label} value={value} max={max} />
      </div>

      <ProgressBar variant="amount" color={barColor} value={value} max={max} label={label} hideHeader/>
    </div>
  );
}