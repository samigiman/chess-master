import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Gift } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  goal: number;
  progress: number;
  reward: number;
  type: 'wins' | 'captures' | 'games';
}

export function DailyChallenge() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'daily-wins',
      title: 'Daily Wins',
      description: 'Win games today',
      goal: 3,
      progress: 0,
      reward: 50,
      type: 'wins'
    },
    {
      id: 'piece-captures',
      title: 'Master Tactician',
      description: 'Capture pieces in a single game',
      goal: 5,
      progress: 0,
      reward: 20,
      type: 'captures'
    }
  ]);

  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Load saved progress
    const savedProgress = localStorage.getItem('dailyChallenges');
    if (savedProgress) {
      setChallenges(JSON.parse(savedProgress));
    }

    // Update countdown timer
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000);
    return () => clearInterval(timer);
  }, []);

  const claimReward = (challenge: Challenge) => {
    if (challenge.progress >= challenge.goal) {
      // Add tokens to user's balance
      const currentTokens = parseInt(localStorage.getItem('userTokens') || '0');
      localStorage.setItem('userTokens', (currentTokens + challenge.reward).toString());

      // Reset challenge progress
      const updatedChallenges = challenges.map(c => 
        c.id === challenge.id ? { ...c, progress: 0 } : c
      );
      setChallenges(updatedChallenges);
      localStorage.setItem('dailyChallenges', JSON.stringify(updatedChallenges));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#2a2b4a]/60 backdrop-blur-sm rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold text-white">Daily Challenges</h2>
        </div>
        <div className="flex items-center space-x-2 text-white/60">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Resets in: {timeLeft}</span>
        </div>
      </div>

      <div className="space-y-4">
        {challenges.map(challenge => {
          const progress = (challenge.progress / challenge.goal) * 100;
          const isComplete = challenge.progress >= challenge.goal;

          return (
            <div key={challenge.id} className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-white font-semibold">{challenge.title}</h3>
                  <p className="text-white/60 text-sm">{challenge.description}</p>
                </div>
                <div className="flex items-center space-x-1 bg-yellow-400/20 px-2 py-1 rounded">
                  <Gift className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">{challenge.reward}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Progress</span>
                  <span className="text-white font-medium">
                    {challenge.progress}/{challenge.goal}
                  </span>
                </div>

                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className={`h-full rounded-full ${
                      isComplete ? 'bg-green-500' : 'bg-[#6c5dd3]'
                    }`}
                  />
                </div>

                {isComplete && (
                  <button
                    onClick={() => claimReward(challenge)}
                    className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors mt-2"
                  >
                    Claim Reward
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}