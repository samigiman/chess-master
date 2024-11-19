import React from 'react';
import { motion } from 'framer-motion';
import { SmilePlus } from 'lucide-react';

const emotes = [
  '👏', '🤔', '😊', '👍', '⭐️', '🎉', '😅', '🤝'
];

interface GameEmotesProps {
  onEmoteSelect: (emote: string) => void;
}

export function GameEmotes({ onEmoteSelect }: GameEmotesProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <SmilePlus className="w-6 h-6 text-white" />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-full right-0 mb-2 bg-[#2a2b4a] rounded-xl p-2 shadow-lg grid grid-cols-4 gap-2"
        >
          {emotes.map((emote) => (
            <button
              key={emote}
              onClick={() => {
                onEmoteSelect(emote);
                setIsOpen(false);
              }}
              className="w-10 h-10 flex items-center justify-center text-xl hover:bg-white/10 rounded-lg transition-colors"
            >
              {emote}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}