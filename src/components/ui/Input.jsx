import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({ className, type = 'text', error, helperText, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col space-y-1.5">
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-shadow disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:ring-red-500 dark:border-red-700",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 font-medium">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
