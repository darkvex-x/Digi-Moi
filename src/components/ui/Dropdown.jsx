import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

const Dropdown = forwardRef(({ className, options = [], error, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col space-y-1.5 relative">
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "appearance-none flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 pr-10 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-shadow cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        >
          {options.map((opt, i) => (
            <option key={i} value={typeof opt === 'string' ? opt : opt.value}>
              {typeof opt === 'string' ? opt : opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
          <ChevronDown size={16} />
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';
export default Dropdown;
