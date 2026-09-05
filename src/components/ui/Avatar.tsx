import Image from 'next/image';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

export type AvatarSize = 'sm' | 'md' | 'lg';

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

const baseStyles = `
  flex items-center justify-center rounded-full bg-butter text-navy
  font-semibold overflow-hidden shrink-0
  `;

export function avatarStyles({
  size='md',
  className,
}: {
  size?: AvatarSize;
  className?: string;
} = {}) {
  return cn(baseStyles, sizeStyles[size], className);
}

function getInitials(name?: string): string {
  if (!name) return '';
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join('');
}

function PlaceholderIcon() {
  return <User className='block w-3/5 h-3/5' />;
}

type AvatarProps = {
  imageUrl?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
};

export default function Avatar({ imageUrl, name, size='md', className }: AvatarProps) {
  const styles = avatarStyles({ size, className });

  if (imageUrl) {
    return (
      <div className={cn(styles, 'relative')}>
        <Image 
          src={imageUrl}
          alt={name ?? 'User avatar'}
          fill
          className='object-cover'
        />
      </div>
    );
  }

  if (name) {
    return <div className={styles}>{getInitials(name)}</div>;
  }

  return (
    <div className={styles}>
      <PlaceholderIcon />
    </div>
  );
}