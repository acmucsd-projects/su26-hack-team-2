import Image from 'next/image';
import Link from 'next/link';
import type { NavbarVariant } from './Navbar';

const LOGO_WRAPPER_STYLES = 'flex items-center gap-2';

const BLUE_LOGO = '/logo-navbar-blue.png';
const WHITE_LOGO = '/logo-navbar-white.png';

type LogoProps = {
  variant?: NavbarVariant;
};

export default function Logo({ variant = 'cream' }: LogoProps) {
  return (
    <Link href='/' className={LOGO_WRAPPER_STYLES}>
      {variant === 'transparent' ? (
        <>
          <Image src={BLUE_LOGO} alt='Club Portal logo' width={32} height={32} priority className='dark:hidden' />
          <Image src={WHITE_LOGO} alt='Club Portal logo' width={32} height={32} priority className='hidden dark:block' />
        </>
      ) : (
        <Image src={BLUE_LOGO} alt='Club Portal logo' width={32} height={32} priority />
      )}
    </Link>
  );
}
