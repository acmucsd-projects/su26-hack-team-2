import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { controlStyles } from './FormField';

const TextArea = forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  function TextArea({ className, ...props }, ref) {
    return <textarea ref={ref} className={cn(controlStyles, 'min-h-32', 'resize-y', 'py-3', className)} {...props} />;
  }
);

export default TextArea;
