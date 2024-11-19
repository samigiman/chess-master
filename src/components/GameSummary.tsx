import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Swords, Trophy, X } from 'lucide-react';

interface GameSummaryProps {
  totalMoves: number;
  timeSpent: number;
  result: 'win' | 'loss' | 'draw';
  onClose: () => void;
}

export function GameSummary({ totalMoves, timeSpent, result, onClose }: GameSummaryProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-[#2a2b4a] rounded-xl max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Game Summary</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white/60" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {/* Result Banner */}
          <div className={`text-center p-4 rounded-lg ${
            result === 'win' ? 'bg-green-500/20 text-green-400' :
            result === 'loss' ? 'bg-red-500/20 text-red-400' :
            'bg-yellow-500/20 text-yellow-400'
          }`}>
            <Trophy className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-xl font-bold">
              {result === 'win' ? 'Victory!' :
               result === 'loss' ? 'Defeat' :
               'Draw'}
            </h3>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Swords className="w-5 h-5 text-white/60" />
                <span className="text-white/60">Total Moves</span>
              </div>
              <p className="text-2xl font-bold text-white">{totalMoves}</p>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-white/60" />
                <span className="text-white/60">Time</span>
              </div>
              <p className="text-2xl font-bold text-white">{formatTime(timeSpent)}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#6c5dd3] hover:bg-[#5c4dc3] text-white rounded-lg transition-colors"
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  );
}