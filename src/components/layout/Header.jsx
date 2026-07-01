import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Moon, Sun, ChevronRight } from 'lucide-react';
import { SettingsContext } from '../../context/SettingsContext';
import { ROUTES } from '../../constants/routes';

export default function Header() {
  const { theme, toggleTheme } = useContext(SettingsContext);
  const location = useLocation();

  const getBreadcrumbs = () => {
    switch(location.pathname) {
      case ROUTES.DASHBOARD: return ['Home', 'Dashboard'];
      case ROUTES.CREATE_EVENT: return ['Events', 'Create New Event'];
      case ROUTES.CURRENT_EVENT: return ['Events', 'Current Event'];
      case ROUTES.DATABASE: return ['Database', 'Overview'];
      case ROUTES.HISTORY: return ['Events', 'History'];
      case ROUTES.SETTINGS: return ['Application', 'Settings'];
      default: return ['Happy Pocket'];
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-[var(--card)] flex items-center justify-between px-4 md:px-6 sticky top-0 z-40 bg-opacity-90 backdrop-blur-md">
      <div className="flex items-center text-sm font-medium">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <span className={index === breadcrumbs.length - 1 ? 'text-gray-900 dark:text-gray-100 font-semibold cursor-default' : 'text-gray-500 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300'}>
              {crumb}
            </span>
            {index < breadcrumbs.length - 1 && <ChevronRight size={16} className="text-gray-400 mx-1.5" />}
          </React.Fragment>
        ))}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden sm:block text-sm text-gray-500 font-medium">
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300 active:scale-95"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
}
