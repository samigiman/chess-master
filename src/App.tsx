import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Home } from './pages/Home';
import { Game } from './pages/Game';
import { Shop } from './pages/Shop';
import { Settings } from './pages/Settings';
import { Navigation } from './components/Navigation';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#1a1b2e] to-[#2a2b4a]">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}