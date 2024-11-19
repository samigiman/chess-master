import React from 'react';
import { Trophy, Swords, Crown, Target } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface UserStatsProps {
  stats: {
    level: number;
    tokens: number;
    totalGames: number;
    experience: number;
  };
}

export function UserStats({ stats }: UserStatsProps) {
  const statsConfig = [
    { 
      icon: Crown, 
      label: 'Level', 
      value: stats.level.toString(),
      tooltip: 'Your current level. Win games to gain XP and level up!' 
    },
    { 
      icon: Trophy, 
      label: 'Chess Tokens', 
      value: stats.tokens.toString(),
      tooltip: 'Earn tokens by winning games and completing challenges' 
    },
    { 
      icon: Swords, 
      label: 'Total Games', 
      value: stats.totalGames.toString(),
      tooltip: 'Total number of games played' 
    },
    { 
      icon: Target, 
      label: 'Experience', 
      value: `${stats.experience}/1000`,
      tooltip: 'Current progress towards next level' 
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {statsConfig.map(({ icon: Icon, label, value, tooltip }) => (
        <Tooltip key={label} content={tooltip}>
          <div className="bg-[#2a2b4a]/60 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3">
              <Icon className="w-8 h-8 text-[#6c5dd3]" />
              <div>
                <p className="text-gray-400 text-sm">{label}</p>
                <p className="font-bold text-lg text-white">{value}</p>
              </div>
            </div>
          </div>
        </Tooltip>
      ))}
    </div>
  );
}