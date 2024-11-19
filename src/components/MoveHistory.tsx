import React from 'react';
import { Scroll } from 'lucide-react';

interface MoveHistoryProps {
  moves: string[];
}

export function MoveHistory({ moves = [] }: MoveHistoryProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
      <div className="flex items-center space-x-2 mb-3">
        <Scroll className="w-5 h-5 text-white/60" />
        <h3 className="text-lg font-semibold text-white">Move History</h3>
      </div>

      <div className="max-h-48 overflow-y-auto scrollbar-custom">
        {moves.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {moves.map((move, index) => (
              <div
                key={index}
                className="text-sm text-white/80 p-2 bg-white/5 rounded"
              >
                {index % 2 === 0 ? `${Math.floor(index/2) + 1}.` : ''} {move}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/40 text-center py-4">No moves yet</p>
        )}
      </div>
    </div>
  );
}