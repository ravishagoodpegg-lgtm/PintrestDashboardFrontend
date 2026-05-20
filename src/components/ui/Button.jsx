import { cn } from '../../lib/utils';

export default function Button({ children, variant = 'primary', className, ...props }) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-full text-sm font-medium transition active:scale-95 disabled:opacity-50',
        variant === 'primary' && 'bg-black text-white hover:bg-gray-800',
        variant === 'secondary' && 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        variant === 'danger' && 'bg-red-500 text-white hover:bg-red-600',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}