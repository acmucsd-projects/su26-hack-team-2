import { Rocket, Calendar, BarChart } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import FeatCard from './FeatCard';

const FEATURES = [
  {
    icon: <Rocket size={28} />,
    title: 'Start your Club',
    description: "Got an idea for a club? We'll help you make it happen.",
  },
  {
    icon: <Calendar size={28} />,
    title: 'Run your Club',
    description: "Plan your events, understand your club's timelines, and manage deadlines.",
  },
  {
    icon: <BarChart size={28} />,
    title: 'Understand your Club',
    description: 'Know where your club funds are going, manage your board members, and more.',
  },
];

export default function FeatureGrid() {
  return (
    <section className="bg-cream px-6 py-24 sm:px-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-navy leading-tight max-w-3xl">
          Everything your club needs to launch and run smoothly.
        </h2>

        <Badge variant="role" className="h-auto gap-2 self-start bg-triton-blue px-4 py-1.5 text-sm text-cream">
          <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
          Built by UCSD Students for UCSD Students
        </Badge>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {FEATURES.map((feature) => (
            <FeatCard key={feature.title} {...feature} />
          ))}
        </div>

        <Button href="/get-started" variant="primary" className="self-start">
          Get Started
        </Button>
      </div>
    </section>
  );
}