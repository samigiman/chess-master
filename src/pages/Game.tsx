import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Chess, Square } from 'chess.js';
import { Chessboard } from '../components/Chessboard';
import { GameInfo } from '../components/GameInfo';
import { GameSummary } from '../components/GameSummary';
import { LoadingScreen } from '../components/LoadingScreen';
import { useTelegram } from '../hooks/useTelegram';

export function Game() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showAlert, showConfirm } = useTelegram();
  const [game] = useState(new Chess());
  const [playerTime, setPlayerTime] = useState(600);
  const [opponentTime, setOpponentTime] = useState(600);
  const [isLoading, setIsLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [gameStartTime] = useState(Date.now());
  const [moves, setMoves] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (game.turn() === 'w') {
        setPlayerTime(time => Math.max(0, time - 1));
      } else {
        setOpponentTime(time => Math.max(0, time - 1));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [game]);

  const handleMove = (from: Square, to: Square) => {
    try {
      const move = game.move({ from, to });
      if (move) {
        setMoves(prev => [...prev, move.san]);
        
        if (game.isGameOver()) {
          const timeSpent = Math.floor((Date.now() - gameStartTime) / 1000);
          setShowSummary(true);
        }
      }
    } catch (e) {
      showAlert('Invalid move');
    }
  };

  const handleResign = async () => {
    const confirmed = await showConfirm('Are you sure you want to resign?');
    if (confirmed) {
      setShowSummary(true);
    }
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#1a1b2e] to-[#2a2b4a] p-4 md:p-6"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Menu</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Chessboard position={game} onMove={handleMove} />
          </div>
          <div className="lg:col-span-1">
            <GameInfo
              playerTime={playerTime}
              opponentTime={opponentTime}
              onResign={handleResign}
              onDrawOffer={() => showAlert('Draw offer sent')}
              moves={moves}
              status={game.isGameOver() ? 'Game Over' : 'Your Move'}
            />
          </div>
        </div>
      </div>

      {showSummary && (
        <GameSummary
          totalMoves={moves.length}
          timeSpent={Math.floor((Date.now() - gameStartTime) / 1000)}
          result={game.isCheckmate() ? (game.turn() === 'w' ? 'loss' : 'win') : 'draw'}
          onClose={() => navigate('/')}
        />
      )}
    </motion.div>
  );
}