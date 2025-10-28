import React from 'react';
import { cn } from '../utils/cn';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Package2,
  BarChart3,
  ShieldCheck,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Müştərilər', icon: Users },
  { name: 'Söhbətlər', icon: MessageSquare },
  { name: 'Məhsullar', icon: Package2 },
  { name: 'Analitika', icon: BarChart3 },
  { name: 'İcazələr', icon: ShieldCheck },
  { name: 'Ayarlar', icon: Settings }
];

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 md:hidden',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onCloseMobile}
      />
      <aside
        className={cn(
          'relative z-40 flex h-full flex-col border-r border-slate-800 bg-slate-950/95 backdrop-blur md:static md:translate-x-0 md:w-auto',
          'transition-[width,transform] duration-300 ease-in-out',
          collapsed ? 'w-20' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-lg font-bold text-white">
              T
            </div>
            <span className={cn('text-lg font-semibold text-white transition-opacity duration-200', collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto')}>
              Telehome
            </span>
          </div>
          <button
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-300 hover:border-indigo-500 hover:text-white md:flex"
            onClick={onToggleCollapse}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-300 hover:border-indigo-500 hover:text-white md:hidden"
            onClick={onCloseMobile}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navigationItems.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={cn(
                'group flex w-full items-center space-x-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-300 transition-colors',
                'hover:bg-indigo-500/10 hover:text-white',
                collapsed ? 'justify-center px-0' : ''
              )}
            >
              <Icon className="h-5 w-5" />
              <span className={cn('transition-opacity duration-200', collapsed ? 'w-0 opacity-0' : 'opacity-100')}>{name}</span>
            </button>
          ))}
        </nav>
        <div className={cn('border-t border-slate-800 p-3 text-xs text-slate-500', collapsed ? 'text-center' : '')}>
          © {new Date().getFullYear()} Telehome CRM
        </div>
      </aside>
    </>
  );
}
