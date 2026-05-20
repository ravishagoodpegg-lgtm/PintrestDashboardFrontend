import { cn } from '../../lib/utils';

export default function Input({ className, label, ...props }) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        className={cn(
          'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 transition',
          className
        )}
        {...props}
      />
    </div>
  );
}