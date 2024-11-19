import React from 'react';
import { Crown } from 'lucide-react';

interface WelcomeModalProps {
  onClose: () => void;
}

export function WelcomeModal({ onClose }: WelcomeModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4">
        <div className="flex items-center justify-center mb-4">
          <Crown className="w-12 h-12 text-indigo-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Welcome to Chess Master!
        </h2>
        
        <p className="text-gray-600 text-center">
          Get ready to embark on your chess journey. Play matches, earn tokens, and unlock exclusive rewards!
        </p>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Getting Started:</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Play matches to earn experience and tokens</li>
            <li>Complete daily challenges for bonus rewards</li>
            <li>Visit the shop to unlock custom pieces and themes</li>
            <li>Climb the leaderboard and showcase your skills</li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
        >
          Let's Play!
        </button>
      </div>
    </div>
  );
}