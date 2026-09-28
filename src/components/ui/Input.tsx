import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { controlStyles } from './FormField';

const Input = forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(controlStyles, 'h-12', className)} {...props} />;
  }
);

export default Input;
