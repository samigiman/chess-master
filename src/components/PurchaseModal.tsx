import React from 'react';
import { motion } from 'framer-motion';
import { Coins, X } from 'lucide-react';

interface PurchaseModalProps {
  item: {
    name: string;
    price: number;
    image?: string;
    fallbackImage?: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

export function PurchaseModal({ item, onConfirm, onCancel }: PurchaseModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-[#2a2b4a] rounded-xl max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Confirm Purchase</h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {(item.image || item.fallbackImage) && (
          <div className="aspect-square rounded-lg bg-black/20 mb-4">
            <img
              src={item.image || item.fallbackImage}
              alt={item.name}
              className="w-full h-full object-contain rounded-lg"
              onError={(e) => {
                if (item.fallbackImage) {
                  (e.target as HTMLImageElement).src = item.fallbackImage;
                }
              }}
            />
          </div>
        )}

        <p className="text-white mb-4">
          Are you sure you want to purchase <span className="font-semibold">{item.name}</span>?
        </p>

        <div className="flex items-center justify-center space-x-2 mb-6">
          <Coins className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-bold">{item.price}</span>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-[#6c5dd3] hover:bg-[#5c4dc3] text-white rounded-lg transition-colors"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}