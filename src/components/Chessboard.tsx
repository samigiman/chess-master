import React from 'react';
import { Chess, Square } from 'chess.js';
import { motion } from 'framer-motion';

interface ChessboardProps {
  position: Chess;
  onMove: (from: Square, to: Square) => void;
}

export function Chessboard({ position, onMove }: ChessboardProps) {
  const [selectedSquare, setSelectedSquare] = React.useState<Square | null>(null);
  const [validMoves, setValidMoves] = React.useState<Square[]>([]);

  const handleSquareClick = (square: Square) => {
    if (selectedSquare === null) {
      const moves = position.moves({ square, verbose: true });
      if (moves.length > 0) {
        setSelectedSquare(square);
        setValidMoves(moves.map(move => move.to as Square));
      }
    } else {
      if (validMoves.includes(square)) {
        onMove(selectedSquare, square);
      }
      setSelectedSquare(null);
      setValidMoves([]);
    }
  };

  const renderSquare = (square: Square, i: number) => {
    const file = i % 8;
    const rank = Math.floor(i / 8);
    const isLight = (file + rank) % 2 === 0;
    const piece = position.get(square);
    const isSelected = square === selectedSquare;
    const isValidMove = validMoves.includes(square);

    return (
      <motion.div
        key={square}
        onClick={() => handleSquareClick(square)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          w-full pb-[100%] relative cursor-pointer
          ${isLight ? 'bg-amber-50' : 'bg-amber-700'}
          ${isSelected ? 'ring-4 ring-blue-400 ring-inset' : ''}
          ${isValidMove ? 'ring-4 ring-green-400/50 ring-inset' : ''}
        `}
      >
        {piece && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={`/pieces/${piece.color}${piece.type}.svg`}
              alt={`${piece.color} ${piece.type}`}
              className="w-4/5 h-4/5 select-none"
              draggable={false}
            />
          </div>
        )}
      </motion.div>
    );
  };

  const squares: Square[] = [
    'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
    'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
    'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
    'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
    'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
    'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
    'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
    'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
  ];

  return (
    <div className="w-full max-w-2xl mx-auto aspect-square">
      <div className="grid grid-cols-8 gap-0 border-4 border-amber-900 rounded-lg overflow-hidden">
        {squares.map((square, i) => renderSquare(square, i))}
      </div>
    </div>
  );
}