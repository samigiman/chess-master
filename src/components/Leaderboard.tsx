import React from 'react';
import { Trophy } from 'lucide-react';

export function Leaderboard() {
  const topPlayers = [
    { name: 'GrandMaster123', rating: 2400, position: 1 },
    { name: 'ChessWizard', rating: 2350, position: 2 },
    { name: 'QueenMaster', rating: 2300, position: 3 },
  ];

  return (
    <div className="bg-[#2a2b4a]/60 backdrop-blur-sm p-6 rounded-xl">
      <div className="flex items-center space-x-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h3 className="font-bold text-xl text-white">Top Players</h3>
      </div>

      <div className="space-y-3">
        {topPlayers.map((player) => (
          <div
            key={player.position}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <span className="font-bold text-lg">
                {player.position === 1 && '🥇'}
                {player.position === 2 && '🥈'}
                {player.position === 3 && '🥉'}
              </span>
              <span className="text-white">{player.name}</span>
            </div>
            <span className="font-mono text-white">{player.rating}</span>
          </div>
        ))}
      </div>
    </div>
  );
}