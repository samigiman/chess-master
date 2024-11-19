import React from 'react';
import { motion } from 'framer-motion';
import { Award, Coins } from 'lucide-react';

interface RatingCompleteProps {
  rating: string;
  onClose: () => void;
}

export function RatingComplete({ rating, onClose }: RatingCompleteProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-[#2a2b4a] rounded-xl max-w-md w-full p-6 text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4"
        >
          <Award className="w-16 h-16 text-yellow-400" />
        </motion.div>

        <h2 className="text-2xl font-bold text-white mb-2">
          Rating Complete!
        </h2>
        
        <p className="text-white/80 mb-6">
          Congratulations! Your skill level is:
        </p>

        <div className="text-3xl font-bold text-[#6c5dd3] mb-6">
          {rating}
        </div>

        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-2">
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="text-white">+50 Chess Tokens Earned!</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#6c5dd3] hover:bg-[#5c4dc3] text-white rounded-lg transition-colors"
        >
          Continue to Game
        </button>
      </motion.div>
    </motion.div>
  );
}