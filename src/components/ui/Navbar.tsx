import Link from 'next/link'
import Logo from './Logo';
import Avatar from './Avatar';
import { Button } from './Button';

const NAV_STYLES = 'relative flex items-center justify-between w-full px-8 py-4 bg-navy';
const NAV_LIST_STYLES = 'absolute left-1/2 -translate-x-1/2 flex gap-6 list-none';
const NAV_LINK_STYLES = 'text-cream hover:opacity-80';
const AUTH_BUTTONS_WRAPPER_STYLES = 'flex gap-3';

type NavbarVariant = 'landing' | 'startingClub' | 'boardMember';

type NavbarProps = {
  variant: NavbarVariant;
  userName?: string;
  userImageUrl?: string;
};

const NAV_LINKS_BY_VARIANT:
  Record<NavbarVariant, { href: string; label: string }[]> = {
    landing: [
      { href: '/about', label: 'About' },
      { href: '/resources', label: 'Resources' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
    ],
    startingClub: [
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/guide', label: 'Guide' },
      { href: '/requirements', label: 'Requirements' },
      { href: '/timeline', label: 'Timeline' },
    ],
    boardMember: [
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/plan-events', label: 'Plan Events' },
      { href: '/calendar', label: 'Calendar' },
      { href: '/fundraising', label: 'Fundraising' },
      { href: '/board', label: 'Board' },
    ],
  }

export default function Navbar({ variant, userName, userImageUrl }: NavbarProps) {
  const links = NAV_LINKS_BY_VARIANT[variant];

  return (
    <nav className={NAV_STYLES}>
      <Logo />

      <ul className={NAV_LIST_STYLES}>
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={NAV_LINK_STYLES}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {variant === 'landing' && (
        <div className={AUTH_BUTTONS_WRAPPER_STYLES}>
          <Button variant='outlineInverted' size='sm'>Sign In</Button>
          <Button variant='primary' size='sm'>Sign Up</Button>
        </div>
      )}
      {variant !== 'landing' && (
        <Avatar name={userName} imageUrl={userImageUrl} size='md' />
      )}
    </nav>
  );
}