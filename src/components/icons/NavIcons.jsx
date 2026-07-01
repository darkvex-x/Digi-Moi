import React from 'react';

/**
 * Custom cartoon-style navigation icons matching the Happy Pocket brand.
 * Each icon is an inline SVG component that accepts size and className props
 * to be drop-in compatible with lucide-react icon usage in Sidebar.
 */

export const DashboardIcon = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="2" width="9" height="9" rx="2.5" fill="#F59E0B" stroke="#92400E" strokeWidth="1.2"/>
    <rect x="13" y="2" width="9" height="9" rx="2.5" fill="#3B82F6" stroke="#1E3A5F" strokeWidth="1.2"/>
    <rect x="2" y="13" width="9" height="9" rx="2.5" fill="#10B981" stroke="#065F46" strokeWidth="1.2"/>
    <rect x="13" y="13" width="9" height="9" rx="2.5" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="1.2"/>
    {/* Tiny sparkle on top-left tile */}
    <circle cx="5" cy="5" r="1" fill="#FDE68A" opacity="0.8"/>
  </svg>
);

export const NewEventIcon = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5"/>
    <rect x="10.5" y="6" width="3" height="12" rx="1.5" fill="#3B82F6"/>
    <rect x="6" y="10.5" width="12" height="3" rx="1.5" fill="#3B82F6"/>
    {/* Small highlight */}
    <circle cx="8" cy="8" r="1.5" fill="#93C5FD" opacity="0.6"/>
  </svg>
);

export const CurrentEventIcon = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    {/* Calendar body */}
    <rect x="2" y="4" width="20" height="18" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.3"/>
    {/* Calendar top bar */}
    <rect x="2" y="4" width="20" height="6" rx="3" fill="#F59E0B"/>
    <rect x="2" y="7" width="20" height="3" fill="#F59E0B"/>
    {/* Calendar rings */}
    <rect x="7" y="2" width="2" height="5" rx="1" fill="#92400E"/>
    <rect x="15" y="2" width="2" height="5" rx="1" fill="#92400E"/>
    {/* Date dots */}
    <circle cx="8" cy="14" r="1.2" fill="#D97706"/>
    <circle cx="12" cy="14" r="1.2" fill="#D97706"/>
    <circle cx="16" cy="14" r="1.2" fill="#D97706"/>
    <circle cx="8" cy="18" r="1.2" fill="#D97706"/>
    <circle cx="12" cy="18" r="1.5" fill="#EF4444"/>
    <circle cx="16" cy="18" r="1.2" fill="#D97706"/>
  </svg>
);

export const DatabaseIcon = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    {/* Bottom ellipse */}
    <ellipse cx="12" cy="19" rx="9" ry="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.2"/>
    {/* Body */}
    <rect x="3" y="7" width="18" height="12" fill="#DBEAFE"/>
    <line x1="3" y1="7" x2="3" y2="19" stroke="#3B82F6" strokeWidth="1.2"/>
    <line x1="21" y1="7" x2="21" y2="19" stroke="#3B82F6" strokeWidth="1.2"/>
    {/* Middle stripe */}
    <ellipse cx="12" cy="13" rx="9" ry="3" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1.2"/>
    {/* Top ellipse */}
    <ellipse cx="12" cy="7" rx="9" ry="3" fill="#93C5FD" stroke="#3B82F6" strokeWidth="1.2"/>
    {/* Highlight */}
    <ellipse cx="9" cy="6" rx="3" ry="1" fill="#DBEAFE" opacity="0.7"/>
  </svg>
);

export const HistoryIcon = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="#F3E8FF" stroke="#7C3AED" strokeWidth="1.4"/>
    <circle cx="12" cy="12" r="7" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="0.8"/>
    {/* Clock hands */}
    <line x1="12" y1="12" x2="12" y2="7" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="12" y1="12" x2="16" y2="12" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"/>
    {/* Center dot */}
    <circle cx="12" cy="12" r="1.2" fill="#7C3AED"/>
    {/* Arrow for "history" */}
    <path d="M4 6 L2 9 L5 9" stroke="#7C3AED" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const SettingsIcon = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    {/* Outer gear shape */}
    <path d="M12 1 L14 4 L18 3 L18 7 L22 8 L20 11 L22 14 L18 16 L18 20 L14 19 L12 22 L10 19 L6 20 L6 16 L2 14 L4 11 L2 8 L6 7 L6 3 L10 4 Z"
      fill="#FEE2E2" stroke="#EF4444" strokeWidth="1" strokeLinejoin="round"/>
    {/* Inner circle */}
    <circle cx="12" cy="12" r="4.5" fill="#FECACA" stroke="#EF4444" strokeWidth="1.2"/>
    {/* Center dot */}
    <circle cx="12" cy="12" r="2" fill="#EF4444"/>
    {/* Highlight */}
    <circle cx="10.5" cy="10.5" r="1" fill="#FCA5A5" opacity="0.7"/>
  </svg>
);
