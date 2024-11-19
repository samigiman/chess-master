import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Settings } from 'lucide-react';

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: ShoppingBag, label: 'Shop', path: '/shop' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#2a2b4a]/95 backdrop-blur-lg border-t border-white/10 safe-area-bottom">
      <nav className="max-w-4xl mx-auto px-4 py-2">
        <ul className="flex justify-around items-center">
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <li key={path}>
                <button
                  onClick={() => navigate(path)}
                  className="flex flex-col items-center p-2 transition-all duration-200"
                >
                  <div className={`p-3 rounded-xl ${
                    isActive ? 'bg-[#6c5dd3]' : 'bg-white/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isActive ? 'text-white' : 'text-white/60'
                    }`} />
                  </div>
                  <span className={`text-sm mt-1 ${
                    isActive ? 'text-white' : 'text-white/60'
                  }`}>
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}