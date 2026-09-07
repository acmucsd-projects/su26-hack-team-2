import Link from 'next/link';

const LOGO_WRAPPER_STYLES = 'flex items-center';
const LOGO_TEXT_STYLES = 'text-cream font-semibold text-lg';

export default function Logo() {
  return (
    <Link href='/' className={LOGO_WRAPPER_STYLES}>
      <span className={LOGO_TEXT_STYLES}>LOGO</span>
    </Link>
  );
}