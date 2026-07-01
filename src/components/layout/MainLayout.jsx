import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)] w-full overflow-x-hidden selection:bg-[var(--color-primary-100)] selection:text-[var(--color-primary-900)]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-24 md:pb-8 relative">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
