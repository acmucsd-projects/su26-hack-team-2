import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import StatInlineGroup from './StatInLineItem';

const STATS = [
  { value: '10+', label: 'Clubs' },
  { value: '100+', label: 'Students' },
  { value: '1', label: 'Triton Community' },
];

export default function Hero() {
  return (
  <section className="relative overflow-hidden">
    <Image
      src="/BG.png"
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
    <div className="absolute inset-0 bg-cream/70" aria-hidden="true" />

    <div className="relative flex flex-col gap-8 px-8 py-24 sm:pl-24 sm:pr-12 sm:py-32 max-w-3xl">
      <div>
        <p className="text-xl font-medium text-navy tracking-wide">THE</p>
        <h1 className="text-6xl sm:text-7xl font-extrabold text-navy leading-none">
          TRITON
        </h1>
        <p className="text-5xl sm:text-6xl text-navy leading-none mt-1">
          CLUBHOUSE
        </p>
      </div>

      <p className="text-navy/80 text-lg max-w-xl">
        A one-stop shop for everything you need to start, run, or grow your club at UC San Diego.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <Button href="/get-started" variant="primary">
          Get Started
        </Button>
        <Button
          href="/resources"
          variant="ghost"
          className="text-triton-blue hover:text-triton-blue/70"
        >
          Explore Resources
        </Button>
      </div>

      <StatInlineGroup items={STATS} />
    </div>
  </section>
    );
}