import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swords, Bot, Users, Trophy, X } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';

interface PlayOptionsProps {
  onClose: () => void;
}

export function PlayOptions({ onClose }: PlayOptionsProps) {
  const navigate = useNavigate();
  const { showAlert } = useTelegram();

  const gameOptions = [
    {
      icon: Swords,
      title: 'Quick Match',
      description: 'Play against a random opponent',
      color: '#6c5dd3',
      onClick: () => {
        navigate('/game');
        showAlert('Finding an opponent...');
      }
    },
    {
      icon: Bot,
      title: 'Practice with Computer',
      description: 'Play against the computer',
      color: '#4CAF50',
      onClick: () => {
        navigate('/game', { state: { mode: 'computer', difficulty: 'medium' }});
      }
    },
    {
      icon: Users,
      title: 'Play with Friends',
      description: 'Challenge your Telegram friends',
      color: '#2196F3',
      onClick: () => {
        const gameLink = `https://t.me/share/url?url=${window.location.origin}/game&text=Join me for a game of chess!`;
        window.open(gameLink, '_blank');
      }
    },
    {
      icon: Trophy,
      title: 'Daily Challenge',
      description: 'Win 3 games to earn bonus tokens',
      color: '#FF9800',
      onClick: () => {
        navigate('/game', { state: { mode: 'challenge' }});
        showAlert('Challenge mode activated! Win 3 games to earn bonus tokens.');
      }
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div className="bg-[#2a2b4a] rounded-2xl max-w-md w-full p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Choose Game Mode</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="grid gap-4">
          {gameOptions.map((option) => (
            <motion.button
              key={option.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={option.onClick}
              className="flex items-center space-x-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-left group"
            >
              <div 
                className="p-3 rounded-xl transition-colors"
                style={{ backgroundColor: `${option.color}20` }}
              >
                <option.icon 
                  className="w-8 h-8 transition-transform group-hover:scale-110"
                  style={{ color: option.color }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-white">{option.title}</h3>
                <p className="text-sm text-white/60">{option.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}