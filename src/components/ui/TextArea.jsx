import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const TextArea = forwardRef(({ className, error, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col space-y-1.5">
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-shadow disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';
export default TextArea;
