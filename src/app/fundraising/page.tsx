import { FundraisingView } from '@/features/finance/components/FundraisingView';

export default function FundraisingPage() {
  return (
    <div className='flex-1 bg-cream'>
      <div className='mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-8 py-10'>
        <div>
          <h1 className='text-4xl font-bold text-navy'>Fundraising</h1>
          <p className='text-navy'>Find funding opportunities.</p>
        </div>
        <FundraisingView />
      </div>
    </div>
  );
}
