//import Image from "next/image";
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 items-center justify-center">
        <h1>hello team</h1>
      </main>
      <Footer />
    </div>
  );
}
