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
import logomark from '../assets/telehome-logomark.svg';
import logotype from '../assets/telehome-logotype.svg';

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
          'relative z-40 flex h-full flex-col border-r border-[#231b2f] bg-[#0f0b16]/95 backdrop-blur-xl md:static md:translate-x-0 md:w-auto',
          'transition-[width,transform] duration-300 ease-in-out',
          collapsed ? 'w-20' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-[#22192d] px-4">
          <div className="flex items-center gap-3">
            <img
              src={collapsed ? logomark : logotype}
              alt="Telehome CRM logo"
              className={cn(
                'transition-all duration-300',
                collapsed ? 'h-10 w-10' : 'h-10 w-auto'
              )}
            />
          </div>
          <button
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-[#2e2440] text-[#d0c8e7] transition hover:border-[#e11f4f]/70 hover:text-white md:flex"
            onClick={onToggleCollapse}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2e2440] text-[#d0c8e7] transition hover:border-[#e11f4f]/70 hover:text-white md:hidden"
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
                'group flex w-full items-center space-x-3 rounded-xl px-3 py-2 text-sm font-medium text-[#d0c8e7] transition-colors',
                'hover:bg-[#e11f4f]/10 hover:text-white',
                collapsed ? 'justify-center px-0' : ''
              )}
            >
              <Icon className="h-5 w-5" />
              <span className={cn('transition-opacity duration-200', collapsed ? 'w-0 opacity-0' : 'opacity-100')}>{name}</span>
            </button>
          ))}
        </nav>
        <div className={cn('border-t border-[#22192d] p-3 text-xs text-[#8f86a8]', collapsed ? 'text-center' : '')}>
          © {new Date().getFullYear()} Telehome CRM
        </div>
      </aside>
    </>
  );
}
