import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swords } from 'lucide-react';
import { UserStats } from '../components/UserStats';
import { DailyChallenge } from '../components/DailyChallenge';
import { Leaderboard } from '../components/Leaderboard';
import { PlayOptions } from '../components/PlayOptions';
import { LoadingScreen } from '../components/LoadingScreen';
import { WelcomeModal } from '../components/WelcomeModal';
import { useTelegram } from '../hooks/useTelegram';

export function Home() {
  const navigate = useNavigate();
  const { user } = useTelegram();
  const [showPlayOptions, setShowPlayOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if first time user
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('hasVisited', 'true');
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1b2e] to-[#4a3b8c] p-6 pb-24">
      {showWelcome && (
        <WelcomeModal onClose={() => setShowWelcome(false)} />
      )}

      {showPlayOptions && (
        <PlayOptions onClose={() => setShowPlayOptions(false)} />
      )}

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Chess Master</h1>
          <p className="text-white/90">Welcome back, {user?.first_name || 'Grandmaster'}!</p>
        </div>

        {/* User Stats */}
        <UserStats stats={{
          level: 1,
          tokens: 0,
          totalGames: 0,
          experience: 0
        }} />

        {/* Play Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowPlayOptions(true)}
            className="group flex items-center space-x-3 px-8 py-4 bg-[#6c5dd3] hover:bg-[#5c4dc3] rounded-xl transition-all transform hover:scale-105 active:scale-95"
          >
            <Swords className="w-6 h-6 text-white transition-transform group-hover:rotate-12" />
            <span className="text-lg font-semibold text-white">Play Chess</span>
          </button>
        </div>

        {/* Daily Challenge and Leaderboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DailyChallenge />
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}