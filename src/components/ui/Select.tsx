import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { controlStyles } from './FormField';

type SelectProps = React.ComponentProps<'select'> & { placeholder?: string };

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, placeholder, children, ...props }, ref) {
    return (
      <div className='relative'>
        <select ref={ref} className={cn(controlStyles, 'h-12 appearance-none pr-10', className)} {...props}>
          {placeholder && <option value='' disabled>{placeholder}</option>}
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-navy"></ChevronDown>
      </div>
    );
  }
);

export default Select;
