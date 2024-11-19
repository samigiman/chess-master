import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';
import { Chess, Square } from 'chess.js';
import { Chessboard } from './Chessboard';

interface RatingGameProps {
  onComplete: (rating: string) => void;
}

export function RatingGame({ onComplete }: RatingGameProps) {
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [wins, setWins] = useState(0);
  const [game] = useState(new Chess());
  const [status, setStatus] = useState('Playing game 1 of 3...');

  const handleMove = (from: Square, to: Square) => {
    try {
      game.move({ from, to });
      // Add AI move logic here
    } catch (e) {
      console.error('Invalid move:', e);
    }
  };

  const determineRating = (winRatio: number) => {
    if (winRatio >= 0.7) return 'Advanced';
    if (winRatio >= 0.4) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#1a1b2e] to-[#4a3b8c] p-6"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Rating Games</h1>
          <p className="text-white/80">Play 3 games to determine your skill level</p>
        </div>

        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-white font-semibold">{status}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white">Wins: {wins}/3</span>
            </div>
          </div>

          <Chessboard position={game} onMove={handleMove} />
        </div>
      </div>
    </motion.div>
  );
}