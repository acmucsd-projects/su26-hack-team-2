import { cn } from '@/lib/utils';

export const controlStyles = 'w-full rounded-xl border border-navy bg-white px-4 text-base text-navy placeholder:text-navy/60 focus-visible:outline-2 aria-invalid:border-red-600 disabled:cursor-not-allowed disabled:bg-navy/5 disabled:opacity-50 focus-visible:outline-offset-2 focus-visible:outline-navy';

type FormFieldProps = {
    label: string;
    htmlFor: string;
    required?: boolean;
    error?: string;
    helperText?: string;
    className?: string;
    children: React.ReactNode;
};

export default function FormField({ label, htmlFor, required, error, helperText, className, children }: FormFieldProps) {
    const message = error ?? helperText;
    return (
      <div className={cn('grid items-start gap-x-6 gap-y-2 sm:grid-cols-[10rem_1fr]', className)}>
        <label htmlFor={htmlFor} className='flex h-12 items-center text-sm font-semibold text-navy'>
          {label}
          {required && <span aria-hidden className='ml-1 text-red-600'>*</span>}
        </label>
        <div>
          {children}
          {message && <p className={cn('mt-1 text-sm', error ? 'text-red-600' : 'text-navy/70')} role={error ? 'alert' : undefined}>{message}</p>}
        </div>
      </div>
    );
}

