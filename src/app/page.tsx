import Navbar from '@/components/ui/Navbar';
import LandingPage from './landing/LandingPage';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      {/* <main className="flex flex-1 items-center justify-center">
        <h1>hello team</h1>
      </main> */}
      <LandingPage/>
    </div>
  );
}