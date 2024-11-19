import React from 'react';
import { Timer, Flag, RotateCcw } from 'lucide-react';
import { MoveHistory } from './MoveHistory';

interface GameInfoProps {
  playerTime: number;
  opponentTime: number;
  moves: string[];
  onResign: () => void;
  onDrawOffer: () => void;
}

export function GameInfo({ 
  playerTime, 
  opponentTime, 
  moves = [],
  onResign, 
  onDrawOffer 
}: GameInfoProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg w-full max-w-md space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Timer className="w-5 h-5 text-white/60" />
            <span className="text-lg font-semibold text-white">Time Control</span>
          </div>
          <div className="space-y-1">
            <div className="text-right">
              <span className="text-white/60">Opponent: </span>
              <span className="font-mono text-white">{formatTime(opponentTime)}</span>
            </div>
            <div className="text-right">
              <span className="text-white/60">You: </span>
              <span className="font-mono text-white">{formatTime(playerTime)}</span>
            </div>
          </div>
        </div>
      </div>

      <MoveHistory moves={moves} />

      <div className="flex space-x-2">
        <button
          onClick={onResign}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
        >
          <Flag className="w-4 h-4" />
          <span>Resign</span>
        </button>
        <button
          onClick={onDrawOffer}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Offer Draw</span>
        </button>
      </div>
    </div>
  );
}