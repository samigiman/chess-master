import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const tips = [
  "Control the center to dominate the game",
  "Develop your pieces early",
  "Castle to protect your king",
  "Think ahead and plan your moves",
  "Watch out for your opponent's threats"
];

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [tip] = useState(() => tips[Math.floor(Math.random() * tips.length)]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-[#1a1b2e] to-[#4a3b8c] flex flex-col items-center justify-center p-6"
    >
      {/* Logo Animation */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="mb-8"
      >
        <Crown className="w-20 h-20 text-[#6c5dd3]" />
      </motion.div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-white mb-8">
        Chess Master
      </h1>

      {/* Tip */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[#8a7ce4] text-center max-w-md mb-12"
      >
        {tip}
      </motion.p>

      {/* Progress Bar */}
      <div className="w-64 md:w-80 bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="h-full bg-[#6c5dd3] rounded-full"
        />
      </div>

      {/* Progress Text */}
      <p className="text-white/60 text-sm">
        {progress}%
      </p>
    </motion.div>
  );
}