import { Footer } from '@/components/layout/Footer';
import LandingPage from './landing/LandingPage';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col font-sans">
      <LandingPage />
      <Footer />
    </div>
  );
}
