import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/ui/Hero';
import FeatureGrid from '@/components/ui/FeatureGrid';
import CalendarTestPage from './calendar-test/page';

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar variant="landing" />
      <Hero />
      <FeatureGrid />
    </div>
  );
}