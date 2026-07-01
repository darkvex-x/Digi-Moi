import React from 'react';
import { Search } from 'lucide-react';
import Input from './Input';

export default function SearchInput({ className, ...props }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="search"
        className={`pl-10 ${className || ''}`}
        {...props}
      />
    </div>
  );
}
