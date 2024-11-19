import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';

const tutorialSteps = [
  {
    title: 'Basic Moves',
    content: 'Learn how each piece moves on the board.',
    image: '/tutorial/basic-moves.png'
  },
  {
    title: 'Special Moves',
    content: 'Discover castling, en passant, and pawn promotion.',
    image: '/tutorial/special-moves.png'
  },
  {
    title: 'Check & Checkmate',
    content: 'Learn how to attack the king and win the game.',
    image: '/tutorial/checkmate.png'
  }
];

export function Tutorial() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div className="bg-[#2a2b4a] rounded-xl max-w-2xl w-full p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BookOpen className="w-6 h-6 text-[#6c5dd3]" />
          <h2 className="text-2xl font-bold text-white">Chess Tutorial</h2>
        </div>

        <div className="relative">
          <div className="aspect-video bg-black/20 rounded-lg mb-4">
            <img
              src={tutorialSteps[currentStep].image}
              alt={tutorialSteps[currentStep].title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">
              {tutorialSteps[currentStep].title}
            </h3>
            <p className="text-white/80">
              {tutorialSteps[currentStep].content}
            </p>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(s => s - 1)}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setCurrentStep(s => s + 1)}
              disabled={currentStep === tutorialSteps.length - 1}
              className="flex items-center space-x-2 px-4 py-2 bg-[#6c5dd3] rounded-lg"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}