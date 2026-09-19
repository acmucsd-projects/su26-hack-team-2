import type { ReactNode } from 'react';

type FooterProps = {
  logo?: ReactNode;
};

export function Footer({ logo }: FooterProps) {
  return (
    <footer className="bg-navy text-cream py-6 px-6 flex items-center justify-center gap-2 text-sm">
      {logo}
      <span>© {new Date().getFullYear()} The Triton Clubhouse</span>
    </footer>
  );
}