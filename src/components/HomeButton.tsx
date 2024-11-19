import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export function HomeButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="fixed top-4 left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white z-40"
      aria-label="Go to home"
    >
      <Home className="w-6 h-6" />
    </button>
  );
}