'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { cn } from '@/lib/utils';

type Opportunity = {
  id: string;
  source: string;
  name: string;
  maxAmount: number;
  due: Date;
};

type ApplicationStatus = 'approved' | 'pending' | 'draft' | 'rejected';

type Application = {
  id: string;
  opportunityId: string;
  requested: number;
  status: ApplicationStatus;
  submitted?: Date;
};

// ponytail: mock data until the funding tables exist in Supabase
const opportunities: Opportunity[] = [
  { id: '1', source: 'UC', name: 'UCSD Student Org Funding', maxAmount: 5000, due: new Date(2026, 9, 30) },
  { id: '2', source: 'AS', name: 'A.S. Event Programming Grant', maxAmount: 3000, due: new Date(2026, 10, 14) },
  { id: '3', source: 'GS', name: 'Graduate Student Association Grant', maxAmount: 1500, due: new Date(2026, 10, 21) },
  { id: '4', source: 'CS', name: 'CSE Department Sponsorship', maxAmount: 2000, due: new Date(2026, 11, 5) },
];

const applications: Application[] = [
  { id: 'a1', opportunityId: '1', requested: 2500, status: 'approved', submitted: new Date(2026, 8, 2) },
  { id: 'a2', opportunityId: '2', requested: 1200, status: 'pending', submitted: new Date(2026, 8, 20) },
  { id: 'a3', opportunityId: '4', requested: 2000, status: 'draft' },
];

const statusBadge: Record<ApplicationStatus, { variant: BadgeVariant; label: string }> = {
  approved: { variant: 'complete', label: 'Approved' },
  pending: { variant: 'pending', label: 'Pending' },
  draft: { variant: 'draft', label: 'Draft' },
  rejected: { variant: 'urgent', label: 'Rejected' },
};

const quickLinks = [
  { href: '/fundraising/guide', label: 'Funding Guide' },
  { href: '/fundraising/template', label: 'Application Template' },
  { href: '/fundraising/faq', label: 'Funding FAQ' },
];

const FUNDING_GOAL = 5000;

const tabs = ['Opportunities', 'Applications'] as const;

const formatDate = (d: Date) => d.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export function FundraisingView() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Opportunities');

  const raised = applications
    .filter((a) => a.status === 'approved')
    .reduce((sum, a) => sum + a.requested, 0);

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-2'>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'rounded-md px-3 py-1 text-sm font-semibold text-navy transition',
              tab === t ? 'bg-marigold' : 'hover:bg-gray-200'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]'>
        <ul className='self-start rounded-xl bg-gray-200 px-5'>
          {tab === 'Opportunities'
            ? opportunities.map((o) => (
                <ListRow
                  key={o.id}
                  href={`/fundraising/opportunities/${o.id}`}
                  source={o.source}
                  title={o.name}
                  primary={`Up to $${o.maxAmount.toLocaleString()}`}
                  secondary={`Due ${formatDate(o.due)}`}
                />
              ))
            : applications.map((a) => {
                const o = opportunities.find((op) => op.id === a.opportunityId)!;
                const badge = statusBadge[a.status];
                return (
                  <ListRow
                    key={a.id}
                    href={`/fundraising/applications/${a.id}`}
                    source={o.source}
                    title={o.name}
                    primary={`Requested $${a.requested.toLocaleString()}`}
                    secondary={a.submitted ? `Submitted ${formatDate(a.submitted)}` : 'Not submitted'}
                    badge={<Badge variant={badge.variant}>{badge.label}</Badge>}
                  />
                );
              })}
        </ul>

        <div className='flex flex-col gap-5'>
          <div className='rounded-xl bg-gray-200 p-6'>
            <ProgressBar
              shape='circle'
              variant='amount'
              value={raised}
              max={FUNDING_GOAL}
              label='Your Funding Progress'
              detailsHref='/fundraising/progress'
            />
          </div>

          <div className='rounded-xl bg-gray-200 p-5'>
            <h2 className='mb-2 text-lg font-semibold text-navy'>Quick Links</h2>
            <ul className='flex flex-col gap-2'>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className='text-lg text-periwinkle hover:underline'>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

type ListRowProps = {
  href: string;
  source: string;
  title: string;
  primary: string;
  secondary: string;
  badge?: React.ReactNode;
};

function ListRow({ href, source, title, primary, secondary, badge }: ListRowProps) {
  return (
    <li className='border-b-2 border-cream last:border-b-0'>
      <Link href={href} className='group flex items-center gap-6 px-4 py-8'>
        <div className='flex h-13 w-17 shrink-0 items-center justify-center rounded-lg bg-butter text-2xl font-semibold text-marigold'>
          {source}
        </div>
        <div className='min-w-0 flex-1 text-navy'>
          <p className='truncate text-lg font-semibold'>{title}</p>
          <p className='text-sm'>
            {primary}
            <span className='mx-2 border-l border-navy' />
            <span className='text-ash'>{secondary}</span>
          </p>
        </div>
        {badge}
        <ArrowRight className='h-5 w-5 shrink-0 text-periwinkle transition group-hover:translate-x-1' />
      </Link>
    </li>
  );
}
