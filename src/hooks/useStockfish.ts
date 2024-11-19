import { useEffect, useRef, useState } from 'react';
import { Chess } from 'chess.js';

type Difficulty = 'easy' | 'medium' | 'hard';

const DIFFICULTY_SETTINGS = {
  easy: { depth: 5, skill: 5 },
  medium: { depth: 10, skill: 10 },
  hard: { depth: 15, skill: 20 }
};

export function useStockfish() {
  const [isReady, setIsReady] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [evaluation, setEvaluation] = useState<number | null>(null);
  const engineRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Initialize Stockfish
    engineRef.current = new Worker('/stockfish.js');

    engineRef.current.onmessage = (e) => {
      const message = e.data;

      if (message === 'uciok') {
        setIsReady(true);
      } else if (message.includes('bestmove')) {
        setIsThinking(false);
        const move = message.split(' ')[1];
        if (engineRef.current?.onMove) {
          engineRef.current.onMove(move);
        }
      } else if (message.includes('score cp')) {
        const score = parseInt(message.split('score cp ')[1]);
        setEvaluation(score / 100);
      }
    };

    engineRef.current.postMessage('uci');
    engineRef.current.postMessage('isready');

    return () => {
      engineRef.current?.terminate();
    };
  }, []);

  const setDifficulty = (difficulty: Difficulty) => {
    const settings = DIFFICULTY_SETTINGS[difficulty];
    engineRef.current?.postMessage(`setoption name Skill Level value ${settings.skill}`);
    engineRef.current?.postMessage(`setoption name Maximum Depth value ${settings.depth}`);
  };

  const getBestMove = (fen: string, onMove: (move: string) => void) => {
    if (!isReady || !engineRef.current) return;

    setIsThinking(true);
    engineRef.current.onMove = onMove;
    engineRef.current.postMessage(`position fen ${fen}`);
    engineRef.current.postMessage('go');
  };

  return {
    isReady,
    isThinking,
    evaluation,
    setDifficulty,
    getBestMove
  };
}