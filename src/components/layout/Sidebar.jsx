import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/navItems';

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col border-r border-gray-200 dark:border-gray-800 bg-[var(--card)] h-screen sticky top-0 md:w-20 lg:w-64 transition-all duration-300 z-50">
      <div className="p-4 lg:p-6 h-16 flex items-center justify-center lg:justify-start border-b border-transparent">
        {/* Custom HP Logo — pocket + coin, matching lucide line-icon style */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_2px_10px_rgba(79,70,229,0.25)] flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Pocket body */}
            <path d="M4 6C4 4.9 4.9 4 6 4H18C19.1 4 20 4.9 20 6V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V6Z" />
            {/* Pocket flap */}
            <path d="M4 10H20" />
            {/* Coin circle */}
            <circle cx="12" cy="16" r="2.5" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.5" />
            {/* Coin symbol */}
            <path d="M12 14.5V17.5" strokeWidth="1.2" />
            <path d="M10.8 15.3H13" strokeWidth="1.2" />
          </svg>
        </div>
        <h1 style={{fontFamily:'"Bree serif",cursive'}} className="hidden lg:block ml-3 text-xl font-bold text-gray-900 dark:text-white truncate">
          Happy Pocket
        </h1>
      </div>
      
      <nav className="flex-1 px-3 space-y-2 mt-6 overflow-y-auto no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center md:justify-center lg:justify-start px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-600)] dark:bg-[var(--color-primary-900)]/30 dark:text-[var(--color-primary-400)] font-semibold shadow-sm ring-1 ring-[var(--color-primary-500)]/10' 
                    : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/60'
                }`
              }
              title={item.name}
            >
              <Icon size={22} className="flex-shrink-0" />
              <span className="hidden lg:block ml-3.5 whitespace-nowrap text-sm">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="hidden lg:block text-xs text-gray-400 dark:text-gray-500 text-center">
            v1.0.0 Pro
        </div>
      </div>
    </aside>
  );
}
