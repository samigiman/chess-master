import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  primary?: boolean;
  className?: string;
}

export function ActionButton({ 
  icon: Icon, 
  label, 
  onClick, 
  primary = false,
  className = ''
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${primary
          ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
          : 'bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white'
        } 
        flex items-center justify-center space-x-2 px-8 py-4 
        rounded-xl shadow-lg hover:shadow-xl transition-all 
        w-full md:w-48 transform hover:scale-105 active:scale-95
        ${className}
      `}
    >
      <Icon className="w-5 h-5" />
      <span className="font-semibold">{label}</span>
    </button>
  );
}