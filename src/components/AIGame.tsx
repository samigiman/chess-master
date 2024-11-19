import React, { useState, useEffect } from 'react';
import { Chess, Square } from 'chess.js';
import { motion } from 'framer-motion';
import { Bot, Brain } from 'lucide-react';
import { Chessboard } from './Chessboard';
import { useStockfish } from '../hooks/useStockfish';

interface AIGameProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onGameEnd: (result: string) => void;
}

export function AIGame({ difficulty, onGameEnd }: AIGameProps) {
  const [game] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [validMoves, setValidMoves] = useState<Square[]>([]);
  const { isThinking, evaluation, setDifficulty, getBestMove } = useStockfish();

  useEffect(() => {
    setDifficulty(difficulty);
  }, [difficulty]);

  const handleMove = (from: Square, to: Square) => {
    try {
      const move = game.move({ from, to });
      if (move) {
        setSelectedSquare(null);
        setValidMoves([]);

        // Let AI make a move
        if (!game.isGameOver()) {
          getBestMove(game.fen(), (aiMove) => {
            const [from, to] = [aiMove.slice(0, 2), aiMove.slice(2, 4)] as Square[];
            game.move({ from, to });
          });
        } else {
          handleGameEnd();
        }
      }
    } catch (e) {
      console.error('Invalid move:', e);
    }
  };

  const handleSquareSelect = (square: Square) => {
    if (selectedSquare === square) {
      setSelectedSquare(null);
      setValidMoves([]);
    } else {
      const moves = game.moves({ square, verbose: true });
      if (moves.length > 0) {
        setSelectedSquare(square);
        setValidMoves(moves.map(move => move.to));
      }
    }
  };

  const handleGameEnd = () => {
    let result = 'Draw';
    if (game.isCheckmate()) {
      result = game.turn() === 'w' ? 'Black wins' : 'White wins';
    }
    onGameEnd(result);
  };

  return (
    <div className="space-y-6">
      {/* Game Status */}
      <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <Bot className="w-6 h-6 text-[#6c5dd3]" />
          <div>
            <h2 className="font-semibold text-white">Playing Against AI</h2>
            <p className="text-sm text-white/60">Difficulty: {difficulty}</p>
          </div>
        </div>
        {evaluation !== null && (
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-white/60" />
            <span className="text-white font-mono">
              {evaluation > 0 ? '+' : ''}{evaluation.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Thinking Indicator */}
      {isThinking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-2 text-white/80"
        >
          AI is thinking...
        </motion.div>
      )}

      {/* Chessboard */}
      <Chessboard
        position={game}
        onMove={handleMove}
        onSquareSelect={handleSquareSelect}
        selectedSquare={selectedSquare}
        validMoves={validMoves}
      />
    </div>
  );
}